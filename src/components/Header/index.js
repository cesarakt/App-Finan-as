import React from 'react';

import { Feather } from '@expo/vector-icons';
import {
    Container,
    ButtonMenu
}
    from './styles';

import { useNavigation } from '@react-navigation/core';

export default function Header() {
    const navigation = useNavigation();
    const openMenu = () => navigation.toggleDrawer();

    return (
        <Container>
            <ButtonMenu onPress={openMenu}>
                <Feather name='menu' size={30} color='#FFF' />
            </ButtonMenu>
        </Container>
    );
}