import React, { useContext } from 'react';
import { View, ActivityIndicator} from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { AuthContext } from '../contexts/auth';

function Routes() {
    const { signed, loading } = useContext(AuthContext);
    const showScreen = signed ? <AppRoutes /> : <AuthRoutes />;

    if(loading) {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color='#131313' />
            </View>
        )
    }

    return (
        showScreen
    )
}

export default Routes;