import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Home() {
  const { user, signOut } = useContext(AuthContext)

  function deslogar() {
    signOut();
  }

  return (
    <View>
      <Text>{user && user.nome}</Text>
      <Text>{user && user.email}</Text>
      <Button
        title='Sair'
        onPress={deslogar}
      />
    </View>
  );
}