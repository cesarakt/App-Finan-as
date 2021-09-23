import React, { useState } from 'react';
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

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const logo = require('../../assets/Logo.png');

  const getEmail = text => setEmail(text);
  const getPassword = text => setPassword(text);

  const goSignUp = () => navigation.navigate('SignUp');

  const behaviorPlataform = Platform.OS === 'ios' ? 'padding' : '';

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
          />
        </AreaInput>

        <SubmitButton>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={goSignUp} >
          <LinkText>Criar uma conta</LinkText>
        </Link>

      </Container>
    </Background>
  );
}