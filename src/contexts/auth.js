import React, { createContext, useState } from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    //Cadastrar Usuário
    async function signUp(email, password, nome) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                const uid = value.user.uid;
                await firebase.database().ref('users').child(uid).set({
                    saldo: 0,
                    nome: nome
                })
                    .then(() => {
                        const data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email
                        }
                        setUser(data);
                    })
                    .catch((e) => {
                        alert('Ops, Algo deu errado!');
                        console.log(e);
                    })
            })
            .catch((e) => {
                alert('Ops, Algo deu errado!');
                console.log(e);
            })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;