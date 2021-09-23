import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';

const AppStack = createNativeStackNavigator();

function AppRoutes(){
    return(
        <AppStack.Navigator>
            <AppStack.Screen name='Home' component={Home} />
        </AppStack.Navigator>
    )
}

export default AppRoutes;