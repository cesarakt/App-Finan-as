import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCpNaYUBSQKG9DG3DOglFeEQRtR6mvSiCQ',
    authDomain: 'financas-34e1a.firebaseapp.com',
    projectId: 'financas-34e1a',
    storageBucket: 'financas-34e1a.appspot.com',
    messagingSenderId: '1044883839052',
    appId: '1:1044883839052:web:4676c5d240f3350d697ce9'
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;