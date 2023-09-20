import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { View, Image, ImageBackground, FlatList, RefreshControl, Text, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import MasterDataCard from "../../components/MasterDataCard/MasterDataCard"
import firestore from '@react-native-firebase/firestore';
import { w } from "../../Dimenstions/Metrices";

const MasterData = ({ route, navigation }) => {
    const [masterData, setMasterData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFirestoreData = async () => {
        setLoading(true);
        let formatedData = [];
        await firestore()
            .collection('MasterData')
            .get()
            .then(collectionSnapshot => {
                formatedData = collectionSnapshot?._docs.map(snapshot => {
                    return snapshot._data;
                });
                setMasterData(collectionSnapshot);
                setLoading(false);
            });
    }

    useEffect(() => {
        getFirestoreData();
    }, []);


    return (


        <View style={styles.Background}>
            <ImageBackground style={styles.Background} source={{ uri: 'https://i.imgur.com/ibbxFh4.jpg' }}>
                <Image style={styles.Logo} source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }} />

                <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center',marginBottom:30 }} onPress={() => Linking.openURL('http://tiny.cc/MasterData')}>
                    <Text style={styles.MasterDataButton} >Open Master Data Report</Text>
                </TouchableOpacity>

                <FlatList
                    data={masterData?._docs}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefress={getFirestoreData}
                        />
                    }
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: name }) => <MasterDataCard {...name?._data} />}
                    ListEmptyComponent={() => (
                        <View style={{ color: 'white', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            
                        <ActivityIndicator style={{ alignSelf: 'center', marginTop: "15%" }} size="large" color="#0000ff" />

                        </View>
                    )}
                    // contentContainerStyle={{ paddingBottom: 5 }}
                />
                

            </ImageBackground >
        </View >





    );

}

export { MasterData };