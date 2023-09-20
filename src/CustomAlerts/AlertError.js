import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

const AlertError = ({ visible, message, onOk }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.okButton} onPress={onOk}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    backgroundColor: '#242526',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  message: {
    fontSize: 17,
    marginBottom: 20,
    color: 'white',
  },
  okButton: {
    backgroundColor: 'gold',
    width: 90,
    height: 30,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  okButtonText: {
    fontSize: 16,
    alignSelf: 'center',
    paddingTop: 3,
    color: 'black',
  },
};

export default AlertError;