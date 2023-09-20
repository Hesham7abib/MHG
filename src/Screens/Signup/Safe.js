import React, { useEffect, useState, useCallback } from "react";
import styles from "./Styles";
import { Text, View, Image, TextInput, Pressable, ImageBackground, RefreshControl, LogBox, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { w, h, moderateScale } from '../../Dimenstions/Metrices.js';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from "react-native-gesture-handler";
import MaterialCommunityIconsstyle from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import { firebase } from "@react-native-firebase/auth";





const Safe = ({ route, navigation }) => {
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


    //

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
            <ImageBackground style={styles.Background} source={{ uri: 'https://i.postimg.cc/GmqFWpgq/wp10034044-gold-gradient-wallpapers.jpg' }}>
                <Image style={styles.Logo} source={{ uri: 'https://i.postimg.cc/PfB8NYs9/MHG-copy.png' }} />
                <View>
                    <ScrollView
                        nestedScrollEnabled={true}
                        style={{
                            width: "100%",
                            height: w(650),
                            // aspectRatio: 1,

                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={getFireSoreData} />
                        }>
                        {/* <View style={{ flex: 1, height: h(20) }}> */}
                        <View style={{ alignSelf: 'center', paddingTop: h(50), flexDirection: 'row' }}>

                            <View >

                                <TouchableOpacity style={{ alignSelf: 'center', marginHorizontal: w(15) }} onPress={() => navigation.navigate("Personal Safe")}>
                                    <MaterialCommunityIconsstyle style={styles.IconstyleHome} name="safe" size={50} color="#1c1105" />
                                    <Text style={styles.HomeButton} > Personal Safe </Text>
                                </TouchableOpacity>


                            </View>
                            <View >

                                <TouchableOpacity style={{ alignSelf: 'center', marginHorizontal: w(15) }} onPress={() => navigation.navigate("Safe Status")}>
                                    <MaterialCommunityIconsstyle style={styles.IconstyleHome} name="safe" size={50} color="#1c1105" />
                                    <Text style={styles.HomeButton} > ECD Safe </Text>
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

export { Safe };