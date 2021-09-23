import React, { useState } from 'react';

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

  const logo = require('../../assets/Logo.png');

  const getEmail = text => setEmail(text);
  const getPassword = text => setPassword(text);

  return (
    <Background>
      <Container>
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

        <Link>
          <LinkText>Criar uma conta</LinkText>
        </Link>

      </Container>
    </Background>
  );
}