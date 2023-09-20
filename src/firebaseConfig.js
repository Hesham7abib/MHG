
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAEHmbzrybzYm7O42IzxaswtxwCrjlY6YI',
  authDomain: '1076932314221-jvfqjmq57ge5bsiv47kdhh4dceqd2fbq.apps.googleusercontent.com',
  projectId: 'newlastapp',
  appId: '1:1076932314221:android:c57e83fabe4935ad3beb64',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;