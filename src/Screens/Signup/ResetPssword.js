import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ImageBackground, Image, Text } from 'react-native';
import Parse from '../../ParseConfig';
import styles from './Styles';
import { h } from '../../Dimenstions/Metrices';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useEffect } from 'react';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [validating, setValidating] = useState(false);


  const uppercaseEmail = email.toUpperCase();
 
  const validate = () => {
    return email.length ;
};
  const handleResetPassword = async () => {
    try {
      await Parse.User.requestPasswordReset(uppercaseEmail);
      Alert.alert('Password Reset', 'An email with password reset instructions has been sent to your email address.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    useEffect(() => {
      const validating = validate();
      setValidating(validating);
  }, [email]);

  };
    useEffect(() => {
        const validating = validate();
        setValidating(validating);
    }, [email]);

  return (
    <View style={styles.Background}>
      <ImageBackground style={styles.Background} source={{ uri: 'https://i.imgur.com/ibbxFh4.jpg' }}>
        <Image style={styles.Logo} source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }} />

        <Text style={styles.subtitle}>enter your email address</Text>

        <View style={{ paddingTop: 10 }}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Pressable style={[styles.LoginButtonsText,!validating && { backgroundColor: "gray" }]}
           onPress={() =>validating && handleResetPassword()}>
            <Text style={{ marginTop: h(2), color: 'white', fontSize: 18 }}>Reset Password</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export { ResetPasswordScreen };
