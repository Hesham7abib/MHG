import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import MaterialCommunityIconsstyle from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlert from '../../CustomAlerts/CustomALert';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/Actions/User';
import { firebase } from '@react-native-firebase/firestore';
import Parse from '../../ParseConfig';
import { RNToasty } from 'react-native-toasty';
import storage from '@react-native-firebase/storage';

const Profile = ({ route, navigation }) => {
  const [showAlert, setshowAlert] = useState(false);
  const [image, setImage] = useState(null);
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const actionSheetRef = useRef(null);
  const userData = useSelector(state => state?.user?.userData);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState({
    FirstName: false,
    LastName: false,
    Phone: false,
    JobTitle: false,
  });

  const handleShowAlert = () => {
    setshowAlert(true);
  };

  const handleCloseAlert = () => {
    setshowAlert(false);
  };

  const handleShowingAlert = () => {
    handleShowAlert();
  };

  const handleEdit = (field) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };




  const handleSignOut = async () => {
    handleCloseAlert();
    try {
      await Parse.User.logOut();
      showToast();
      navigation.navigate('Start Up');
      console.log('User signed out!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  const MailFupper = capitalizeFirstLetter(userData.email);


  const handleSave = async (field) => {
    setIsUpdating(true); // Show activity indicator

    setEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));

    try {
      // Update the corresponding field in Parse
      const currentUser = Parse.User.current();
      currentUser.set(field, userData[field]); // Set the value of the field directly
      await currentUser.save();

      // Update data in Redux store
      dispatch(updateUser({ [field]: userData[field] }));
      setIsUpdating(false); // Hide activity indicator on success

      RNToasty.Show({
        title: `${capitalizeFirstLetter(field)} updated successfully`,
        fontSize: 15,
        textColor: '#f6d626',
        position: 'bottom',
        color: '#f6d626',
      });
    } catch (error) {
      console.log('Error saving data:', error);
      setIsUpdating(false); // Hide activity indicator on error

      // Handle error saving data
    }
  };

  const handleChange = (field, value) => {
    const updatedUserData = { ...userData, [field]: value };
    dispatch(updateUser(updatedUserData));
  };

  const MailUpper = userData.email.toUpperCase();

  const UploadImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        useNativeDriver: true,
      });

      if (image) {
        setIsUpdatingImage(true); // Show activity indicator while updating image
        const email = userData.email;
        const filename = `${MailUpper}_profile_pic.jpg`;
        const storageRef = storage().ref(`profile_pics/${filename}`);

        await storageRef.putFile(image.path);

        const downloadUrl = await storageRef.getDownloadURL();

        const userRef = firebase.firestore().collection('Users').doc(MailUpper);
        await userRef.update({
          profilePic: downloadUrl,
        });

        setImage(downloadUrl);
        setIsUpdatingImage(false); // Hide activity indicator after updating image
        RNToasty.Show({
          title: 'Profile picture updated',
          fontSize: 15,
          textColor: '#f6d626',
          position: 'bottom',
          color: '#f6d626',
        });
      }
    } catch (error) {
      console.log('Error uploading image:', error);
      setIsUpdatingImage(false); // Hide activity indicator on error
    }
  };


  const CameraImage = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        useNativeDriver: true,
      });

      if (image) {
        const email = userData.email; // Use the email as a unique identifier
        const filename = `${MailUpper}_profile_pic.jpg`; // Add the email to the filename
        const storageRef = storage().ref(`profile_pics/${filename}`);

        await storageRef.putFile(image.path);

        const downloadUrl = await storageRef.getDownloadURL();

        // Save the download URL in Firestore or wherever you store user data
        // For example, if you have a 'profilePic' field in your 'Users' collection:
        const userRef = firebase.firestore().collection('Users').doc(MailUpper);
        await userRef.update({
          profilePic: downloadUrl,
        });

        // Update the state to display the newly uploaded image
        setImage(downloadUrl);
        RNToasty.Show({
          title: 'Profile picture updated',
          fontSize: 15,
          textColor: '#f6d626',
          position: 'bottom',
          color: '#f6d626',
        });
      }
    } catch (error) {
      console.log('Error uploading image:', error);
      // Handle error uploading image
    }
  };





  const getProfilePicUrl = async () => {
    try {
      const filename = `${MailUpper}_profile_pic.jpg`; // Add the email to the filename
      const storageRef = storage().ref(`profile_pics/${filename}`);

      const downloadUrl = await storageRef.getDownloadURL();
      setImage(downloadUrl); // Update the state to display the profile picture
    } catch (error) {
      console.log('Error retrieving profile picture:', error);
      // Handle error retrieving profile picture
    }
  };


  const generateUniqueFileName = (path) => {
    const timestamp = new Date().getTime();
    const extension = path.split('.').pop();
    return `profile_${timestamp}.${extension}`;
  };

  const handleActionSheet = () => {
    actionSheetRef.current.show();
  };

  const handleActionSheetOption = (index) => {
    if (index === 0) {
      UploadImage();
    } else if (index === 1) {
      CameraImage();
    } else if (index === 2) {
      handleRemoveProfilePic();
    }
  };

  const showToast = () => {
    RNToasty.Show({
      title: 'Signed Out Successfully',
      fontSize: 15,
      textColor: '#f6d626',
      position: 'bottom',
      color: '#f6d626',
    });
  };

  useEffect(() => {
    getProfilePicUrl();
  }, []);


  const handleRemoveProfilePic = async () => {
    try {
      // Remove the profile picture URL from Firestore
      const userRef = firebase.firestore().collection('Users').doc(MailUpper);
      await userRef.update({
        profilePic: firebase.firestore.FieldValue.delete(),
      });

      // Remove the profile picture from storage
      const filename = `${MailUpper}_profile_pic.jpg`;
      const storageRef = storage().ref(`profile_pics/${filename}`);
      await storageRef.delete();

      // Update the state to remove the profile picture
      setImage(null);

      RNToasty.Show({
        title: 'Profile picture removed',
        fontSize: 15,
        textColor: '#f6d626',
        position: 'bottom',
        color: '#f6d626',
      });
    } catch (error) {
      console.log('Error removing profile picture:', error);
    }
  };

  const getPlaceholder = (field) => {
    return `Enter ${field}`;
  };

  const isFieldEmpty = (field) => {
    return userData[field].trim() === '';
  };


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ImageBackground style={styles.background} source={{ uri: 'https://i.imgur.com/ibbxFh4.jpg' }}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }} />
            <View style={styles.logoutContainer}>
              <MaterialCommunityIconsstyle
                style={styles.logoutIcon}
                name="logout"
                size={32}
                color="#1c1105"
                onPress={handleShowingAlert}
              />
              <Text
                style={styles.logoutText}
                onPress={handleShowingAlert}
              >
                Sign Out
              </Text>
            </View>

            <CustomAlert
              visible={showAlert}
              title="Sign Out Confirmation"
              message="Are you sure you want to sign out?"
              onOk={handleSignOut}
              onCancel={handleCloseAlert}
            />
          </View>
          {isUpdatingImage && <ActivityIndicator size="large" color="gold" style={styles.activityIndicator} />}
          {isUpdating && <ActivityIndicator size="large" color="gold" style={styles.activityIndicator} />}

          {image ? (
            <Image style={styles.profilePic} source={{ uri: image }} />
          ) : (
            <Image
              style={styles.profilePic}
              source={{ uri: 'https://i.postimg.cc/XJy7Xc7v/PC.png' }}
            />
          )}

          <View style={[styles.uploadView, { marginBottom: 5 }]}>
            <TouchableOpacity style={styles.uploadButton} onPress={handleActionSheet}>
              <Text style={styles.buttonText}>Update Profile Picture</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ alignSelf: 'center', marginBottom: 30, color: 'gold' }}>{MailFupper}</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.label, { marginBottom: 7, }]}>First Name</Text>

            <View style={styles.fieldContainer}>
              {editMode.FirstName ? (
                <TextInput
                  style={styles.input}
                  value={userData.FirstName}
                  onChangeText={(value) => handleChange('FirstName', value)}
                  placeholder="Enter First Name"
                />
              ) : (
                <Text style={[styles.value, isFieldEmpty('FirstName') && { fontStyle: 'italic' }]}>
                  {isFieldEmpty('FirstName') ? getPlaceholder('FirstName') : userData.FirstName}
                </Text>
              )}
              {editMode.FirstName ? (
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('FirstName')}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('FirstName')}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.label, { marginBottom: 7, }]}>Last Name</Text>
            <View style={styles.fieldContainer}>
              {editMode.LastName ? (
                <TextInput
                  style={styles.input}
                  value={userData.LastName}
                  onChangeText={(value) => handleChange('LastName', value)}
                  placeholder="Enter Last Name"
                />
              ) : (
                <Text style={[styles.value, isFieldEmpty('LastName') && { fontStyle: 'italic' }]}>
                  {isFieldEmpty('LastName') ? getPlaceholder('LastName') : userData.LastName}
                </Text>)}
              {editMode.LastName ? (
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('LastName')}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('LastName')}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.label, { marginBottom: 7, }]}>Phone Number</Text>
            <View style={styles.fieldContainer}>
              {editMode.Phone ? (
                <TextInput
                  style={styles.input}
                  value={userData.Phone}
                  onChangeText={(value) => handleChange('Phone', value)}
                  placeholder="Enter Phone Number"
                />
              ) : (
                <Text style={[styles.value, isFieldEmpty('Phone') && { fontStyle: 'italic' }]}>
                  {isFieldEmpty('Phone') ? getPlaceholder('Phone') : userData.Phone}
                </Text>)}
              {editMode.Phone ? (
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('Phone')}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('Phone')}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.label, { marginBottom: 7, }]}>Job Title</Text>
            <View style={styles.fieldContainer}>
              {editMode.JobTitle ? (
                <TextInput
                  style={styles.input}
                  value={userData.JobTitle}
                  onChangeText={(value) => handleChange('JobTitle', value)}
                  placeholder={getPlaceholder('JobTitle')}
                />
              ) : (
                <Text style={[styles.value, isFieldEmpty('FirstName') && { fontStyle: 'italic' }]}>
                  {isFieldEmpty('JobTitle') ? getPlaceholder('JobTitle') : userData.JobTitle}
                </Text>

              )}
              {editMode.JobTitle ? (
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('JobTitle')}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('JobTitle')}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <ActionSheet
            ref={actionSheetRef}
            title="Select an option"
            options={['Choose from Gallery', 'Take a Picture', 'Remove Profile Pic', 'Cancel']}
            cancelButtonIndex={3}
            onPress={handleActionSheetOption}
          />
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1,
  },

  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
  },
  logo: {
    width: 160,
    height: undefined,
    aspectRatio: 2,
    resizeMode: 'contain',
    marginTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
  },
  logoutContainer: {
    paddingTop: 5,
    marginBottom: 15,
    paddingLeft: 100,
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  logoutIcon: {
    alignSelf: 'center',
    color: 'white',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  profilePic: {
    width: 140,
    height: undefined,
    aspectRatio: 1,
    marginTop: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 70,
    borderWidth: 3,
    borderColor: 'gold',
    marginBottom: 20,
  },
  uploadView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  uploadButton: {
    alignSelf: 'center',
    backgroundColor: '#c69d46',
    width: 150,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    // marginRight: 10,
    marginBottom: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    color: 'white',
    marginLeft: 7,
    // width: 65,

  },
  value: {
    alignSelf: 'center',
    height: 40,
    width: 250,
    borderColor: 'white',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    // marginRight: 10,
    paddingTop: 9,
    alignContent: 'center',
  },
  input: {
    alignSelf: 'center',
    height: 40,
    width: 250,
    borderColor: 'white',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    // marginRight: 5,
  },
  editButton: {
    backgroundColor: 'white',
    // borderRadius: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius:10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // marginLeft: 5,
    height  :40,
  },
  saveButton: {
    backgroundColor: 'white',
    // borderRadius: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius:10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // marginLeft: 5,
    height:40,
  },
  buttonText: {
    color: 'black',
    alignSelf: 'center',
  },
});

export { Profile };
