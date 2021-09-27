import React, { useState } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Header from '../../components/Header';
import Picker from '../../components/Picker';
import {
  Background,
  Input,
  SubmitButton,
  SubmitText
}
  from './styles';

export default function New() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');

  const closeKeyboard = () => Keyboard.dismiss();
  const getValor = text => setValor(text);

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

          <SubmitButton>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>

  );
}