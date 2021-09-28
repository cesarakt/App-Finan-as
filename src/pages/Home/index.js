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

import { format } from 'date-fns';
import HistoricList from '../../components/HistoricList';
import firebase from '../../services/firebaseConnection';


export default function Home() {
  const { user } = useContext(AuthContext)
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const key = item => item.key;
  const render = ({ item }) => <HistoricList data={item} />

  const nome = user && user.nome;
  const uid = user && user.uid;
  const saldoAtual = saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

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
              valor: childItem.val().valor
            }

            setHistorico(oldArray => [...oldArray, list].reverse());
          })
        })
    }

    loadList();
  }, [])

  console.log(saldo);

  function deslogar() {
    signOut();
  }

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{nome}</Nome>
        <Saldo>R$ {saldoAtual}</Saldo>
      </Container>

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