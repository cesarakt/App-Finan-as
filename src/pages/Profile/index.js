import React, { useContext } from 'react';

import { AuthContext } from '../../contexts/auth';
import {
  Container,
  Nome,
  NewLink,
  NewText,
  Logout,
  LogoutText
}
from './styles';

import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';



export default function Profile() {
  const navigation = useNavigation();
  const { user, signOut } = useContext(AuthContext);

  const nome = user && user.nome;

  const goRegister = () => navigation.navigate('Registrar');
  const sair = () => signOut();

  return (
    <Container>
      <Header />
      <Nome>
        {nome}
      </Nome>

      <NewLink onPress={goRegister}>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <Logout onPress={sair}>
        <LogoutText>Sair</LogoutText>
      </Logout>

    </Container>
  );
}