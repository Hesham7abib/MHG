import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { Text, View, Image, ImageBackground, Alert, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import { w, h, } from '../../Dimenstions/Metrices.js';
import MaterialCommunityIconsstyle from 'react-native-vector-icons/MaterialCommunityIcons';
import auth, { firebase } from '@react-native-firebase/auth';
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Toasty, { RNToasty } from 'react-native-toasty';
import CustomAlert from "../../CustomAlerts/CustomALert";

import Parse from '../../ParseConfig';





const ECDSafe = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false)
    const [showAlert, setshowAlert] = useState(false)
    const dispatch = useDispatch()

    const userData = useSelector(state => state?.user?.userData)





    const handleSignOut = async () => {
        handleCloseAlert();
        try {
            await Parse.User.logOut();


            showToast(),
                navigation.navigate('Start Up'),
                console.log('User signed out!')



        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleShowAlert = () => {
        setshowAlert(true);
    };

    const handleCloseAlert = () => {
        setshowAlert(false);
    };

    const handleShowingAlert = () => {
        handleShowAlert();
    };







    const showToast = () => {
        RNToasty.Show({
            title: 'Signed Out Successfully',
            fontSize: 15,
            textColor: '#f6d626',
            position: 'bottom',
            color: '#f6d626',


        })
    };

    return (
        <View style={styles.Background}>
            <ImageBackground style={styles.Background} source={{ uri: 'https://i.postimg.cc/6qYTQ48D/asdasd.jpg' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.Logo} source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }} />




                

                </View>


                <View style={{ alignSelf: 'center', paddingTop: h(50), flexDirection: 'row' }}>
                    <View >


                        <Text style={[styles.HomeButton, { borderTopRightRadius: 10, borderTopLeftRadius: 10, height: h(60), width: w(200) }]}>
                            ECD Safe Content
                        </Text>

                    </View>



                </View>






            </ImageBackground >
        </View >

    )

};


export { ECDSafe };