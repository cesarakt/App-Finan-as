import React, { useContext, useState, useEffect } from 'react';
import { Alert, Platform, TouchableOpacity } from 'react-native';

import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import {
  Background,
  Container,
  Nome,
  Saldo,
  Title,
  List,
  AreaFilter
}
  from './styles';

import { format, isBefore } from 'date-fns';
import HistoricList from '../../components/HistoricList';
import firebase from '../../services/firebaseConnection';
import { MaterialIcons } from '@expo/vector-icons';
import DatePicker from '../../components/DatePicker';

export default function Home() {
  const { user } = useContext(AuthContext)
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const key = item => item.key;
  const render = ({ item }) => <HistoricList data={item} deleteItem={handleDelete} />

  const nome = user && user.nome;
  const uid = user && user.uid;
  const saldoAtual = saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
    console.log(date);
  }

  const showPickerDate = show && (
    <DatePicker
      onclose={handleClose}
      date={newDate}
      onChange={onChange}
    />
  )

  useEffect(() => {
    async function loadList() {
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico').child(uid)
        .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
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
  }, [newDate])

  function handleDelete(data) {

    //Data do item
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);
    console.log(dateItem);

    //Data de hoje
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);
    console.log(dateHoje)

    if (isBefore(dateItem, dateHoje)) {
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

  function handleShowPicker() {
    setShow(true)
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{nome}</Nome>
        <Saldo>R$ {saldoAtual}</Saldo>
      </Container>

      <AreaFilter>
        <TouchableOpacity onPress={() => handleShowPicker()}>
          <MaterialIcons name='event' size={25} color='#FFF' />
        </TouchableOpacity>
        <Title>Ultimas Movimentações</Title>
      </AreaFilter>


      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={key}
        renderItem={render}
      />

      {showPickerDate}
    </Background>
  );
}