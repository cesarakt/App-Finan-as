import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
}
  from 'react-native';

import Header from '../../components/Header';
import Picker from '../../components/Picker';
import {
  Background,
  Input,
  SubmitButton,
  SubmitText
}
  from './styles';

import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';

export default function New() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const closeKeyboard = () => Keyboard.dismiss();
  const getValor = text => setValor(text);

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert('Preencha todos os campos');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo: ${tipo} - Valor: R$ ${parseFloat(valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }

  async function handleAdd() {
    let uid = user.uid;

    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yy')
    })

    //Atualizar o Saldo
    let usuario = firebase.database().ref('users').child(uid);
    await usuario.once('value')
      .then((snapshot) => {
        let saldo = parseFloat(snapshot.val().saldo);

        tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

        usuario.child('saldo').set(saldo);

      })
    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');
  }

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <Background>
        <Header />

        <SafeAreaView style={{ alignItems: 'center' }} >
          <Input
            placeholder='Valor desejado'
            keyboardType='numeric'
            returnKeyType='next'
            onSubmitEditing={closeKeyboard}
            value={valor}
            onChangeText={getValor}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>

  );
}