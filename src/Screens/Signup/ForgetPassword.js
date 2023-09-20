import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
// import { sendPasswordResetEmail } from './firebaseUtils'; // Import your own utility function for sending emails





const Forgetpasswrod = async () => {
  // Note that this value come from state variables linked to your text input
  const emailValue = email;
  return await Parse.User.requestPasswordReset(emailValue)
    .then(() => {
      // logIn returns the corresponding ParseUser object
      Alert.alert(
        'Success!',
        `Please check ${email} to proceed with password reset.`,
      );
      return true;
    })
    .catch((error) => {
      // Error can be caused by lack of Internet connection
      Alert.alert('Error!', error.message);
      return false;
    });
};
  
    return (
      <View>
        <TextInput
          placeholder="Verification Code"
          onChangeText={setVerificationCode}
          value={verificationCode}
        />
        <TextInput
          placeholder="New Password"
          onChangeText={setNewPassword}
          value={newPassword}
          secureTextEntry
        />
        <Button title="Reset Password" onPress={handleResetPassword} />
      </View>
    );
  };
  

export { Forgetpasswrod };
