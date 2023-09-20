import React, { useEffect, useState, useCallback } from "react";
import styles from "./Styles";
import { Text, View, Image, TextInput, Pressable, ToastAndroid, ImageBackground, RefreshControl, LogBox, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { w, h, moderateScale } from '../../Dimenstions/Metrices.js';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from "react-native-gesture-handler";
import MaterialCommunityIconsstyle from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import { firebase } from "@react-native-firebase/auth";
import { RNToasty } from "react-native-toasty";





const Reports = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false)
    const [currencyData, setCurrencyData] = useState(1)
    const [ImageURL, setImageURL] = useState(1)
    const linksData = useSelector(state => state?.links?.linksData)
    const [refreshing, setRefreshing] = React.useState(false);
    const [imageUri, setImageUri] = useState('');



    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        getFireSoreData()


        const fetchImage = async () => {
            try {
                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child('PersonalSafe.gif');

                const url = await imageRef.getDownloadURL();

                setImageUri(url);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching image:', error);
                setLoading(false);
            }
        };

        fetchImage();

    }, []);


    const showToast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Reports Being Prepared ,we will be notify you When Finish',
            ToastAndroid.LONG, // You can use SHORT, LONG, or any duration in milliseconds.
            ToastAndroid.TOP,
            5,
            25
        );
    };
    const getFireSoreData = async () => {
        setLoading(true)
        let formatedData = []
        await firestore()
            .collection('Currency')
            .get()
            .then(collectionSnapshot => {
                // console.log('Total Currency: ', collectionSnapshot);
                formatedData = collectionSnapshot?._docs.map(snapshot => {
                    return snapshot._data
                })
                setCurrencyData(collectionSnapshot)
                setLoading(false)

            });


    }






    return (


        <View style={styles.Background}>
            <ImageBackground style={styles.Background} source={{ uri: 'https://i.imgur.com/ibbxFh4.jpg' }}>
                <Image style={styles.Logo} source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }} />
                <Text style={styles.Header}>Select Report</Text>

                <View>
                    <ScrollView

                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={getFireSoreData} />
                        }>
                        {/* <View style={{ flex: 1, height: h(20) }}> */}

                        <View style={{ alignSelf: 'center', paddingTop: h(50), flexDirection: 'row' }}>

                            <View >

                                <TouchableOpacity
                                    style={{ alignSelf: 'center', marginHorizontal: w(15) }}
                                    onPress={() =>
                                        Linking.openURL('http://tiny.cc/CostReport')
                                    }>
                                    <MaterialCommunityIconsstyle style={styles.IconstyleHome} name="clipboard-flow-outline" size={50} color="#1c1105" />
                                    <Text style={styles.HomeButton} > Cost Report </Text>
                                </TouchableOpacity>


                            </View>
                            <View >

                                <TouchableOpacity style={{ alignSelf: 'center', marginHorizontal: w(15) }} onPress={() => navigation.navigate('Master Data')}>

                                    <MaterialCommunityIconsstyle style={styles.IconstyleHome} name="clock-edit-outline" size={50} color="#1c1105" />
                                    <Text style={styles.HomeButton} > Master Data </Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                        <View style={{ paddingTop: h(50), flexDirection: 'row' }}>

                            <View >

                                <TouchableOpacity style={{ alignSelf: 'flex-start', marginHorizontal: w(23) }} onPress={() => showToast()}>
                                    <MaterialCommunityIconsstyle style={styles.IconstyleHomefade} name="format-list-bulleted" size={50} color="#1c1105" />
                                    <Text style={styles.HomeButtonfade} > Other Reports </Text>
                                </TouchableOpacity>


                            </View>
                        </View>

                        {/* </View> */}


                        <View style={{ flex: 1, height: h(20) }}>
                        </View>
                    </ScrollView>

                </View>

            </ImageBackground >
        </View >





    );

}

export { Reports };