import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    ImageBackground,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler,
    ScrollView,
    RefreshControl,
    Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { firebase } from "@react-native-firebase/storage";
import AlertOrig from "../../CustomAlerts/AlertOriginal";
import styles from "./Styles";
import { h, w, moderateScale } from '../../Dimenstions/Metrices.js';
import YoutubePlayer from 'react-native-youtube-iframe';
import Video from 'react-native-video';

// import YouTube from 'react-native-youtube';

const StartUp = ({ route, navigation }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    const handleBeshoPress = () => {
        Linking.openURL('https://linktap.bio/?key=25563106915148245');
    };

    const handleIHeshamPress = () => {
        Linking.openURL('http://tiny.cc/Hesham7abib');
    };
    const fetchData = async () => {
        try {
            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child('Home.gif');

            const url = await imageRef.getDownloadURL();

            setImageUri(url);
            setLoading(false);
            setRefreshing(false);
        } catch (error) {
            console.error('Error fetching image:', error);
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleCancel = () => {
        setShowAlert(false);
    };

    const handleConfirm = () => {
        setShowAlert(false);
        BackHandler.exitApp();
    };

    useEffect(() => {
        const backAction = () => {
            setShowAlert(true);
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    return (
        <View style={styles.Background}>
            <ImageBackground style={styles.Background} source={{ uri: 'https://i.imgur.com/ibbxFh4.jpg' }}>
                <View >
                    <Image style={styles.LogoStartUp} source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }} />

                    <Image style={styles.CompaniesLogos} source={{ uri: 'https://i.postimg.cc/dV9bYsz1/Logos.png' }} />
                </View>
                <View>
                    {/* <YouTube
                            videoId="cvD1IyrCgGA"
                            style={styles.video}
                            controls={1} // Display video controls
                            play={false} // Start the video paused
                            fullscreen={false} // Allow fullscreen
                            loop={false} // Don't loop the video
                        /> */}
                </View>


                <Video
                    source={{ uri: 'https://drive.google.com/uc?export=download&id=1TDWG2o9Gigm_4M0NZ8Nv1AdK7KhlmDmF' }}
                    style={styles.video}
                    controls={true}
                />



                <AlertOrig
                    visible={showAlert}
                    message="Are you sure you want to exit the app?"
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />

                {/* {loading ? (
                        <ActivityIndicator style={{ alignSelf: 'center', marginTop: "15%" }} size="large" color="#0000ff" />
                    ) : (
                        <Image
                            style={styles.Gif}
                            source={{ uri: imageUri }}
                        />
                    )} */}
                <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center', }} onPress={() => navigation.navigate('Sign Up')}>
                    <Icon style={styles.IconstyleBar} name="envelope" size={20} color="#1c1105" />
                    <Text style={styles.StartupButtonsText} > Register with email </Text>
                </TouchableOpacity>


                <View style={{ flexDirection: 'row', paddingTop: 13, justifyContent: 'center' }}>
                    <Text style={{ color: 'gold', paddingTop: h(15), fontSize: 18 }} > Already have an account? </Text>
                    <Text style={{ color: 'white', paddingTop: h(15), fontSize: 18, textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Log In')}>Sign In</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 30, marginTop: 80 }}>
                    <View>
                        <TouchableOpacity onPress={handleBeshoPress}>
                            <Text style={styles.SignatureBesho}>Supervised by</Text>
                            <Text style={styles.SignatureBesho}> Eng.Bishoy Tharwat</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleIHeshamPress}>
                        <Text style={styles.SignatureHesham}>Developed by</Text>
                        <Text style={styles.SignatureHesham}> Eng.Hesham Habib</Text>

                    </TouchableOpacity>

                </View>

            </ImageBackground>
        </View >

    )

};


export { StartUp };
