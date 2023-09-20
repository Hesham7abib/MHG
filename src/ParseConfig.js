// In a React Native application
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';


//Initializing the SDK. 
Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
Parse.initialize('mzPZzHbjZzMUCmnpjyjxIH57pTNkwih7Q4qUmWiZ', 'PJRAOh2XISRO8wMvvKNiVxDJ05F5oi7WJeg1EOh4');
Parse.serverURL = 'https://parseapi.back4app.com/';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


export default Parse;




