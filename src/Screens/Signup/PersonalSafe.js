import React, { useEffect, useState, useCallback } from "react";
import styles from "./Styles";
import { Text, View, Image, TextInput, Pressable, ImageBackground, RefreshControl, LogBox, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { w, h, moderateScale } from '../../Dimenstions/Metrices.js';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from "react-native-gesture-handler";
import ListCard from "../../components/ListCard/ListCard";
import { useSelector } from "react-redux";
import { firebase } from "@react-native-firebase/auth";





const PersonalSafe = ({ route, navigation }) => {
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
            <ImageBackground style={styles.Background} source={{ uri: 'https://i.postimg.cc/6qYTQ48D/asdasd.jpg' }}>
                <Image style={styles.Logo} source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }} />
                <View>
                    <ScrollView
                        nestedScrollEnabled={true}
                        style={{
                            width: "100%",
                            height: "80%",
                            // aspectRatio: 1,

                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={getFireSoreData} />
                        }>

                        <Text style={styles.Header} >Personal Safe Status </Text>



                        {loading ? (
                    <ActivityIndicator style={{alignSelf:'center', marginTop:"15%"}} size="large" color="#0000ff" />
                ) : (

                    <Image
                        style={styles.GifSafe}
                        source={{ uri: imageUri }}
                    />)}


                        <View>

                            {/* <ActivityIndicator animating={loading} size="large" color="green" style={{ position: 'absolute', alignSelf: 'center', justifyContent: 'center' }} /> */}

                            <FlatList
                                // horizontal={true}
                                // style={{ flexDirection:'row'}}

                                data={currencyData?._docs}
                                refreshing={true}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={false}
                                        onRefresh={() => { getFireSoreData() }}
                                    />
                                }
                                numColumns={2}
                                // maxToRenderPerBatch={3}
                                // initialNumToRender={3}
                                // windowSize={5}
                                keyExtractor={(item, index) => index.toString()}
                                // ItemSeparatorComponent={ItemSeparatorView}
                                renderItem={({ item: name }) => <ListCard {...name?._data} />}
                                // ListFooterComponent={renderFooter}
                                // onEndReached={getData}
                                // onEndReachedThreshold={0.5}


                                contentContainerStyle={{ paddingBottom: 10 }}
                            />
                        </View>


                        <View style={{ flex: 1, height: h(20) }}>
                        </View>
                    </ScrollView>

                </View>

            </ImageBackground >
        </View >





    );

}

export { PersonalSafe };