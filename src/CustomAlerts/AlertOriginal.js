import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

const AlertOrig = ({ visible, message, onCancel, onConfirm }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(16, 16, 16, 0.75)',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: 'gold',
    marginLeft: 20,
    width: 80,
    height: 30,
    alignItems: 'center',
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    // selfAlign: 'center',
    paddingTop: 3,
    color: 'black',
  },
  confirmButton: {
    backgroundColor: 'gold',
    marginLeft: 20,
    width: 80,
    height: 30,
    alignItems: 'center',
    borderRadius: 8,

  },
  confirmButtonText: {
    fontSize: 16,
    // selfAlign: 'center',
    
    paddingTop: 3,
    color: 'black',
  },
};

export default AlertOrig;
