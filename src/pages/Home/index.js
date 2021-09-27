import React, { useContext, useState } from 'react';

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

import HistoricList from '../../components/HistoricList';


export default function Home() {
  const { user } = useContext(AuthContext)
  const [historico, setHistorico] = useState([
    { key: '1', tipo: 'receita', valor: 1200 },
    { key: '2', tipo: 'despesa', valor: 200 },
    { key: '3', tipo: 'receita', valor: 40 },
    { key: '4', tipo: 'despesa', valor: 89.65 },
    { key: '5', tipo: 'receita', valor: 50 },
    { key: '6', tipo: 'despesa', valor: 100 },
  ]);

  const key = item => item.key;
  const render = ({ item }) => <HistoricList data={item} />

  const nome = user && user.nome;

  function deslogar() {
    signOut();
  }

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{nome}</Nome>
        <Saldo>R$ 100,00</Saldo>
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