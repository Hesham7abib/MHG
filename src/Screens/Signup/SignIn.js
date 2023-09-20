import React, { useRef, useState, useEffect } from "react";
import styles from "./Styles";
import {
    Text,
    View,
    Image,
    TextInput,
    Pressable,
    ImageBackground,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { w, h } from "../../Dimenstions/Metrices.js";
import Parse from "../../ParseConfig";
import AlertError from "../../CustomAlerts/AlertError";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/Actions/User";
import { addPlace } from "../../Redux/Actions/Place";
import { RNToasty } from "react-native-toasty";
import firestore from "@react-native-firebase/firestore";
import NetInfo from "@react-native-community/netinfo";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignIn = ({ route, navigation }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validating, setValidating] = useState(false);
    const [securePassword, setSecurePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const password1Ref = useRef();
    const EmailRef = useRef();
    const LoginRef = useRef();

    const dispatch = useDispatch();

    const handleCancel = () => {
        setShowAlert(false);
    };

    const validate = () => {
        return email.length && password.length;
    };

    const EmailUpper = email.toUpperCase();
    const submitLogin = async () => {
        setLoading(true);

        try {
            const user = await Parse.User.logIn(EmailUpper, password);
            showToast();
            setLoading(false);
            navigation.navigate('Tab Navigator');

            // Fetch user's names from Parse
            const userData = await new Parse.Query(Parse.User)
                .equalTo('username', EmailUpper)
                .first();

            if (userData) {
                const firstName = userData.get('FirstName');
                const lastName = userData.get('LastName');
                const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
                const Phone = userData.get('Phone');
                const JobTitle = userData.get('JobTitle');

                // Dispatch actions to add user data to Redux
                dispatch(addUser({ FirstName: capitalizedFirstName, LastName: capitalizedLastName, email: email, JobTitle: JobTitle, Phone: Phone }));
                dispatch(addPlace(email)); // Assuming you want to add the email to Redux as well
                console.log('User data retrieved from Parse!');
            }
        } catch (error) {
            setLoading(false);
            if (error.message.includes('XMLHttpRequest failed')) {
                setAlertMessage('Check Internet Connection');
            } else {
                setAlertMessage(error.message);
            }
            setShowAlert(true);
        }
    };

    const checkInternetConnection = async () => {
        const state = await NetInfo.fetch();
        return state.isConnected;
    };

    useEffect(() => {
        const validating = validate();
        setValidating(validating);
    }, [email, password]);

    const showToast = () => {
        RNToasty.Show({
            title: "Signed in Successfully",
            fontSize: 15,
            textColor: "#f6d626",
            position: "bottom",
            color: "#f6d626",
        });
    };

    return (
        <View style={styles.Background}>
            <ImageBackground
                style={styles.Background}
                source={{
                    uri:
                        "https://i.imgur.com/ibbxFh4.jpg",
                }}
            >
                <ScrollView>
                    <Image
                        style={styles.Logo}
                        source={{
                            uri: "https://i.postimg.cc/hvNbWJqn/MHG-logo.png",
                        }}
                    />
                    {/* <Text style={styles.HeaderAlt}>Kindly enter email and passowrd</Text> */}
                    <View style={{ marginTop: h(50) }}>
                        <TextInput
                            style={styles.TextInput}
                            value={email}
                            ref={EmailRef}
                            onChangeText={(value) => setEmail(value)}
                            placeholder={"Email"}
                            keyboardType={"email-address"}
                            returnKeyType={"next"}
                            onSubmitEditing={() => password1Ref.current?.focus()}
                        />

                        <View style={styles.IconView}>
                            <View style={{ flexDirection: "row" }}>
                                <TextInput
                                    ref={password1Ref}
                                    value={password}
                                    onChangeText={(value) => setPassword(value)}
                                    style={[
                                        styles.TextInput,
                                        styles.inputIcon,
                                        {
                                            width: w(310),
                                            marginTop: h(10),
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 0,
                                        },
                                    ]}
                                    placeholder={"Password"}
                                    keyboardType={"default"}
                                    secureTextEntry={securePassword}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() =>
                                        LoginRef.current?.props?.onPress?.()
                                    }
                                />
                                <ActivityIndicator
                                    animating={loading}
                                    size="large"
                                    color="Green"
                                    style={{
                                        marginLeft: "32%",
                                        paddingLeft: "40%",
                                        position: "absolute",
                                        alignSelf: "center",
                                    }}
                                />
                            </View>

                            {securePassword ? (
                                <Icon
                                    name={"eye"}
                                    size={15}
                                    style={styles.Iconstyle}
                                    onPress={() => setSecurePassword(!securePassword)}
                                />
                            ) : (
                                <Icon
                                    name={"eye-slash"}
                                    size={15}
                                    style={styles.Iconstyle}
                                    onPress={() => setSecurePassword(!securePassword)}
                                />
                            )}
                        </View>
                        </View>
                    <Pressable
                        ref={LoginRef}
                        style={[
                            styles.LoginButtonsText,
                            !validating && { backgroundColor: "gray" },
                        ]}
                        onPress={() => validating && submitLogin()}
                    >
                        <Text style={{ marginTop: h(2), color: "white", fontSize: 18 }}>
                            Login
                        </Text>
                    </Pressable>

                    {showAlert && (
                        <AlertError
                            visible={showAlert}
                            message={alertMessage}
                            onOk={() => setShowAlert(false)}
                        />
                    )}

                    <View style={{ height: h(50), width: w(50) }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Text style={styles.Forgetpasswrod}>Forget Password</Text>
                    </View>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignSelf: "center" }}
                        onPress={() => navigation.navigate("Reset Password")}
                    >
                        <Text style={[styles.LoginResetButtonsText]}>Reset password</Text>
                    </TouchableOpacity>


                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export { SignIn };
