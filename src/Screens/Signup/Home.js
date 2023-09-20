import React, { useEffect, useState, useRef } from "react";
import styles from "./Styles";
import { Text, View, Image, ImageBackground, Alert, TouchableOpacity, BackHandler, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { w, h } from '../../Dimenstions/Metrices.js';
import MaterialCommunityIconsstyle from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Toasty, { RNToasty } from 'react-native-toasty';
import CustomAlert from "../../CustomAlerts/CustomALert";
import useAutoSignOut from './useAutoSignOut';
import Parse from '../../ParseConfig';
import Swiper from 'react-native-swiper';
import ListCard from "../../components/HomeCards/HomeCard";
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from "react-native-gesture-handler";

const Home = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector(state => state?.user?.userData);
    const [currencyData, setCurrencyData] = useState([]);
    const [imageUrls, setimageUrls] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const swiperRef = useRef(null); // Reference to the swiper component

    const getFireSoreData = async () => {
        setLoading(true);
        let formatedData = [];
        await firestore()
            .collection('ProjectsStatus')
            .get()
            .then(collectionSnapshot => {
                formatedData = collectionSnapshot?._docs.map(snapshot => {
                    return snapshot._data;
                });
                setCurrencyData(collectionSnapshot);
                setLoading(false);
            });
    }

    const getImageUrlsFromFirestore = async () => {
        try {
            const imageUrlsRef = firestore().collection('imageUrls').doc('HOMEPIC');
            const doc = await imageUrlsRef.get();
            if (doc.exists) {
                const data = doc.data();
                if (data && typeof data === 'object') {
                    const valuesArray = Object.values(data); // Extract values as an array
                    setimageUrls(valuesArray || []); // Set as an empty array if undefined
                    console.log(valuesArray);
                } else {
                    console.log('Invalid data format in Firestore.');
                }
            } else {
                console.log('No image URLs found in Firestore.');
            }
        } catch (error) {
            console.error('Error fetching image URLs:', error);
            setimageUrls([]); // Set as an empty array in case of an error
        }
    };


    const handleRefresh = () => {
        setRefreshing(true);
        getFireSoreData();
        getImageUrlsFromFirestore();

        // Simulate fetching user's data (names) from an API or any other data source
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Change the duration to the actual time it takes to fetch the data
    };




    useFocusEffect(
        React.useCallback(() => {
            const disableBackButton = () => {
                return true; // Prevent the back button action on this screen
            };

            BackHandler.addEventListener('hardwareBackPress', disableBackButton);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
            };
        }, [])
    );

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

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
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
        });
    };

    useEffect(() => {
        getFireSoreData();
        getImageUrlsFromFirestore();
        setLoading(true);
        // Simulate fetching user's data (names) from an API or any other data source
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Change the duration to the actual time it takes to fetch the data

        // Start the swiper autoplay after the component mounts
        if (swiperRef.current) {
            swiperRef.current.scrollBy(1);
        }
    }, []);

    return (
        <View style={styles.Background}>
            <ImageBackground style={styles.Background} source={{ uri: 'https://i.imgur.com/ibbxFh4.jpg' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.Logo} source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }} />
                    <View style={{
                        paddingTop: h(5),
                        marginTop: h(15),
                        marginBottom: h(15),
                        paddingLeft: w(100),
                        flex: 1,
                    }}>
                        <MaterialCommunityIconsstyle
                            style={{ alignSelf: 'center', color: 'white' }}
                            name="logout" size={32} color="#1c1105"
                            onPress={() => handleShowingAlert()} />
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 16,
                                alignSelf: 'center',
                            }}
                            onPress={() => handleShowingAlert()}>
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

                <Text style={styles.WelcomeText}> Welcome  </Text>
                <Text style={styles.WelcomeName}>{loading ? "Loading..." : `${userData?.FirstName} ${userData?.LastName}`}</Text>


                <View style={{ width: "80%", height: "45%", aspectRatio: 1, borderColor: 'gold', borderWidth: 3, borderRadius: 10, alignSelf: 'center' }}>
                    <Swiper
                        ref={swiperRef}
                        autoplay={true}
                        autoplayTimeout={4} // Adjust the timeout as needed
                        showsPagination={false} // Hide pagination dots
                        loop={true} //
                    >
                        {imageUrls.map((imageUrls, index) => (
                            <Image
                                key={index}
                                source={{ uri: imageUrls }}
                                style={{ width: "100%", height: undefined, aspectRatio: 1, resizeMode: 'cover', borderRadius: 10, borderWidth: 10 }}
                            />
                        ))}
                    </Swiper>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.ProjectsSummary}>--------- Projects Summary --------- </Text>

                    {currencyData.length === 0 ? (
                        <ActivityIndicator animating={loading} size="large" color="green" style={{ position: 'absolute', alignSelf: 'center', justifyContent: 'center' }} />
                    ) : (



                        <FlatList
                            data={currencyData?._docs}
                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={getFireSoreData}
                                />
                            }
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item: name }) => <ListCard {...name?._data} />}
                            ListEmptyComponent={() => (
                                <View style={{ color: 'white', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                                    <Text>No data available.</Text>
                                </View>
                            )}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        />
                    )}

                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor="#f6d626" // Set the color of the loading indicator
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export { Home };
