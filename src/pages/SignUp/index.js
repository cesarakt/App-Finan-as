import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import {
  Background,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText
}
  from '../SignIn/styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const { signUp } = useContext(AuthContext);

  const getEmail = text => setEmail(text);
  const getPassword = text => setPassword(text);
  const getNome = text => setNome(text);

  const behaviorPlataform = Platform.OS === 'ios' ? 'padding' : '';

  function handleSignUp() {
    signUp(email, password, nome);
  }

  return (

    <Background>
      <Container
        bahavior={behaviorPlataform}
        enabled
      >

        <AreaInput>
          <Input
            placeholder='Nome'
            autoCorrect={false}
            autoCapitalize='none'
            value={nome}
            onChangeText={getNome}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder='Email'
            autoCorrect={false}
            autoCapitalize='none'
            value={email}
            onChangeText={getEmail}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder='Senha'
            autoCorrect={false}
            autoCapitalize='none'
            value={password}
            onChangeText={getPassword}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>


      </Container>
    </Background>
  );
}