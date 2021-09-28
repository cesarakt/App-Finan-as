import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../../contexts/auth';

export default function CustomDrawer(props) {
    const { user, signOut } = useContext(AuthContext);
    const img = require('../../assets/Logo.png');
    const name = user && user.nome;

    function sair() {
        signOut();
    }
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <Image
                    source={img}
                    style={{ width: 85, height: 85, }}
                    resizeMode='contain'
                />

                <Text style={{ color: '#FFF', fontSize: 18, marginTop: 5 }}>
                    Bem-vindo
                </Text>
                <Text style={{ color: '#FFF', fontSize: 17, fontWeight: 'bold', paddingBottom: 25 }}>
                    {name}
                </Text>
            </View>

            <DrawerItemList {...props} />

            <DrawerItem
                label='Sair do app'
                onPress={sair}
                inactiveBackgroundColor='#c62c36'
                inactiveTintColor='#DDD'
                labelStyle={{
                    fontWeight: 'bold',
                    fontSize: 18
                }}
            />
        </DrawerContentScrollView>
    );
}