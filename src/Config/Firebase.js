import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDk6szGgkf8ejx8JbCYaF6JVeI7jLStaN8",
    authDomain: "map-route-suggestor.firebaseapp.com",
    databaseURL: "https://map-route-suggestor.firebaseio.com",
    projectId: "map-route-suggestor",
    storageBucket: "map-route-suggestor.appspot.com",
    messagingSenderId: "525002936586",
    appId: "1:525002936586:web:6c8e8501dec37c2569aaf3"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase;