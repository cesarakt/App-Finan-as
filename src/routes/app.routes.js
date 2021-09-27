import React from "react";

import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
    return (
        <AppDrawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#171717'
                },
                drawerLabelStyle: {
                    fontWeight: 'bold',
                    fontSize: 18
                },
                drawerActiveTintColor: '#FFF',
                drawerActiveBackgroundColor: '#00b94a',
                drawerInactiveBackgroundColor: '#000',
                drawerInactiveTintColor: '#DDD',
                drawerItemStyle: {
                    marginVertical: 5
                },
                headerShown: false
            }}
        >
            <AppDrawer.Screen name='Home' component={Home} />
            <AppDrawer.Screen name='Registrar' component={New} />
            <AppDrawer.Screen name='Perfil' component={Profile} />
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;