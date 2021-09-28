import React, { useContext, useState, useEffect } from 'react';

import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import {
  Background,
  Container,
  Nome,
  Saldo,
  Title,
  List
}
  from './styles';

import { format, isPast } from 'date-fns';
import HistoricList from '../../components/HistoricList';
import firebase from '../../services/firebaseConnection';
import { Alert } from 'react-native';


export default function Home() {
  const { user } = useContext(AuthContext)
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const key = item => item.key;
  const render = ({ item }) => <HistoricList data={item} deleteItem={handleDelete} />

  const nome = user && user.nome;
  const uid = user && user.uid;
  const saldoAtual = saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  const dataHoje = format(new Date, 'dd/MM/yyyy');

  useEffect(() => {
    async function loadList() {
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico').child(uid)
        .orderByChild('date').equalTo(format(new Date, 'dd/MM/yy'))
        .limitToLast(10)
        .on('value', (snapshot) => {
          setHistorico([]);

          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              date: childItem.val().date,
            }

            setHistorico(oldArray => [...oldArray, list].reverse());
          })
        })
    }

    loadList();
  }, [])

  function handleDelete(data) {
    if (isPast(new Date(data.date))) {
      alert('Você não pode excluir uma movimentação antiga!');
      return;
    }
    Alert.alert(
      'Atenção!',
      `Você deseja excluir ${data.tipo} - Valor: R$ ${parseFloat(data.valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )
  }

  async function handleDeleteSuccess(data) {
    await firebase.database().ref('historico')
      .child(uid).child(data.key).remove()
      .then(async () => {
        let saldoAtualizado = saldo;

        data.tipo === 'despesa' ? saldoAtualizado += parseFloat(data.valor) : saldoAtualizado -= parseFloat(data.valor)

        await firebase.database().ref('users').child(uid)
          .child('saldo').set(saldoAtualizado);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{nome}</Nome>
        <Saldo>R$ {saldoAtual}</Saldo>
      </Container>

      <Title>{dataHoje}</Title>
      <Title>Ultimas Movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={key}
        renderItem={render}
      />
    </Background>
  );
}