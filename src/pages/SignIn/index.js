import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText
}
  from './styles';

import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const logo = require('../../assets/Logo.png');

  const getEmail = text => setEmail(text);
  const getPassword = text => setPassword(text);
  const goSignUp = () => navigation.navigate('SignUp');

  const behaviorPlataform = Platform.OS === 'ios' ? 'padding' : '';

  function handleLogin() {
    signIn(email, password);
  }


  return (
    <Background>
      <Container
        bahavior={behaviorPlataform}
        enabled
      >
        <Logo source={logo} />

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
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleLogin}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={goSignUp} >
          <LinkText>Criar uma conta</LinkText>
        </Link>

      </Container>
    </Background>
  );
}