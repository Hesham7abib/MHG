import React, { useEffect, useRef, useState } from "react";
import styles from "../Signup/Styles";
import { Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Pressable, Alert, ActivityIndicator, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import { w, h, } from '../../Dimenstions/Metrices.js';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { isStrongPassword } from 'validator';
import { SelectList } from "react-native-dropdown-select-list";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Parse from '../../ParseConfig';
import AlertError from "../../CustomAlerts/AlertError";
import { cities } from "./cities";












const SignUp = ({ route, navigation }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [email, setEmail] = useState("")
	const [emailUpper, setEmailUpper] = useState("")
	const [firstname, setfirstname] = useState("")
	const [Phone, setPhone] = useState("")
	const [lastname, setlastname] = useState("")
	const [JobTitle, setJobTitle] = useState("")
	const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")
	const [loading, setLoading] = useState(false)
	const [securePassword, setSecurePassword] = useState(true)
	const [confirmPasswordError, setConfirmPasswordError] = useState(false)
	const [PhoneError, setPhoneError] = useState(false)
	const password1Ref = useRef()
	const password2Ref = useRef()
	const jobTitleRef = useRef()
	const CityRef = useRef()
	const secoundNameRef = useRef()
	const PhonenumnerRef = useRef()
	const EmailRef = useRef()

	const Terms = useRef()
	const [passwordError, setPasswordError] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [toggleCheckBox, setToggleCheckBox] = useState(false)
	const [validating, setValidating] = useState(false)


	const handlePasswordChange = (text) => {
		setPassword(text);
		setPasswordError('');
	};

	const validatePassword = () => {
		if (!isStrongPassword(password, { minLength: 8, minSymbols: 1 })) {
			setPasswordError(
				'Password must Have min length 8 and (A-Z) - (a-z) - (0-9) - (Special Charchter like @ & # ).',
				styles.errorMes,
			);
		} else {
			// Password meets the requirements
			setPasswordError('');
		}
	};




	const uppercaseEmail = email.toUpperCase();

	const validate = () => {
		return uppercaseEmail.length &&
			password.length &&
			firstname.length &&
			lastname.length &&
			Phone.length &&
			JobTitle.length &&
			password2.length &&
			toggleCheckBox &&
			!confirmPasswordError &&
			!passwordError &&
			!PhoneError;
	};



	useEffect(() => {
		const validating = validate();
		setValidating(validating);
	}, [email, password, firstname, lastname,
		Phone, JobTitle, password2, toggleCheckBox,
		confirmPasswordError, passwordError, PhoneError]);




	const handleCityChange = (city) => {
		setSelectedCity(city);
	};




	const checkConfirmPassword = (value) => {

		setPassword2(value)
		if (value !== password) {
			setConfirmPasswordError(true)
		}
		else {
			setConfirmPasswordError(false)
		}
	}


	const formatPhoneNumber = (text) => {
		// Remove all non-digit characters from the input
		const formattedText = text.replace(/\D/g, '');

		// Apply the desired phone number format
		let formattedPhoneNumber = '';
		if (formattedText.length > 11) {
			formattedPhoneNumber = formattedText.slice(0, 11);
		} else {
			formattedPhoneNumber = formattedText;
		}

		setPhone(formattedPhoneNumber);
	};

	const City = selectedCity


	const handlePhoneNumberBlur = () => {
		if (!/^01\d{9}$/.test(Phone)) {
			setPhoneError(true)
		} else {
			setPhoneError(false)
			// Format the phone number for display
			const formattedNumber = Phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
			setPhone(formattedNumber);
		}
	};


	const FirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLocaleLowerCase()
	const LastName = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLocaleLowerCase()



	const submitSignup = async () => {
		const uppercaseEmail = email.toUpperCase();
		const user = new Parse.User();

		setLoading(true);

		user.set('username', uppercaseEmail);
		user.set('email', uppercaseEmail);
		user.set('password', password);
		user.set('FirstName', FirstName);
		user.set('LastName', LastName);
		user.set('Phone', Phone);
		user.set('JobTitle', JobTitle);



		try {
			await user.signUp();
			await Parse.User.requestEmailVerification(uppercaseEmail);
			console.log('Signup successful. Verification email sent.');


			// Add data to Firestore

			const db = firebase.firestore();
			const usersCollection = db.collection('Users');

			// Create a document with the uppercaseEmail as the document ID
			await usersCollection.doc(uppercaseEmail).set({
				FirstName: FirstName,
				LastName: LastName,
				Phone: Phone,
				JobTitle: JobTitle,
				email	: email
				// Add more fields as needed
			});




			setLoading(false);
			Alert.alert(
				'Success',
				'Verification email sent kindly check your email may be on SPAM Or JUNK'
			);
			navigation.navigate('Log In');




		} catch (error) {
			console.log('Error while signing up user', error);
			setLoading(false);
			if (error.message.includes('XMLHttpRequest failed')) {
				setAlertMessage('Check Internet Connection');
			} else {
				setAlertMessage(error.message);
			}
			setShowAlert(true);
		}



	};


	return (
		<View style={styles.Background}>
			<ImageBackground style={styles.Background} source={{ uri: 'https://i.imgur.com/ibbxFh4.jpg' }}>


				<ScrollView style={styles.scrollView}>

					<Image style={styles.Logo} source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }} />

					<Text style={styles.Header}>
						Sign Up
					</Text>
					<View style={{ alignSelf: 'center', }}>
						{!validating && <Text style={styles.errorMes}>* All Fields Required </Text>}

					</View>
					{showAlert && (
						<AlertError
							visible={showAlert}
							message={alertMessage}
							onOk={() => setShowAlert(false)}
						/>
					)}


					<View style={styles.NamesView}	>
						<TextInput
							style={styles.Names}
							value={firstname}
							onChangeText={(value) => { setfirstname(value) }}
							cursorColor={'red'}
							placeholder={'First Name'}
							keyboardType={'default'}
							returnKeyType={'next'}
							onSubmitEditing={() => { secoundNameRef.current?.focus() }}
						/>


						<TextInput
							style={styles.Names}
							value={lastname}
							ref={secoundNameRef}
							onChangeText={(value) => { setlastname(value) }}
							cursorColor={'red'}
							placeholder={'Last Name'}
							keyboardType={'default'}
							returnKeyType={'next'}
							onSubmitEditing={() => { jobTitleRef.current?.focus() }}

						/>
					</View>
					<View style={{ flexDirection: 'row' }}>



					</View>

					<View style={{}}>
						<TextInput
							style={styles.TextInput}
							value={JobTitle}
							ref={jobTitleRef}
							onChangeText={(value) => { setJobTitle(value) }}
							// onBlur={handlePhoneNumberBlur}
							placeholder={'Job Title'}
							keyboardType={'default'}
							// maxLength={13}
							returnKeyType={'next'}
							onSubmitEditing={() => { PhonenumnerRef.current?.focus() }}

						/>
					</View>
					<View style={{}}>
						<TextInput
							style={styles.TextInput}
							value={Phone}
							ref={PhonenumnerRef}
							onChangeText={formatPhoneNumber}
							onBlur={handlePhoneNumberBlur}
							placeholder={'Phone Number'}
							keyboardType={'phone-pad'}
							maxLength={13}
							returnKeyType={'next'}
							onSubmitEditing={() => { EmailRef.current?.focus() }}

						/>
						{PhoneError && <Text style={styles.errorMes}>Enter Correct Phone Number</Text>}


						<ActivityIndicator animating={loading} size="large" color="Green" style={{ position: 'absolute', alignSelf: 'center' }} />
					</View>

					<TextInput
						style={styles.TextInput}
						value={email}
						ref={EmailRef}
						onChangeText={(value) => { setEmail(value) }}
						placeholder={'Email'}
						keyboardType={'email-address'}
						returnKeyType={'next'}
						onSubmitEditing={() => { password1Ref.current?.focus() }}

					/>




					<View style={styles.IconView}>
						<TextInput
							ref={password1Ref}
							value={password}
							onChangeText={handlePasswordChange}
							onBlur={validatePassword}
							style={[styles.TextInput, styles.inputIcon, { width: w(310), marginTop: h(10), borderBottomRightRadius: 0, borderTopRightRadius: 0, }]}


							placeholder={'Password'}
							keyboardType={'default'}
							secureTextEntry={securePassword}
							returnKeyType={'next'}
							onSubmitEditing={() => { password2Ref.current?.focus() }}


						/>

						{securePassword ?
							<Icon name={"eye"} size={15} style={styles.Iconstyle} onPress={() => setSecurePassword(!securePassword)} />
							:
							<Feather name={"eye-off"} size={15} style={styles.Iconstyle} onPress={() => setSecurePassword(!securePassword)} />
						}


					</View>
					{passwordError ? <Text style={styles.errorMes}>{passwordError}</Text> : null}

					<View style={styles.IconView}>
						<TextInput
							ref={password2Ref}
							value={password2}
							onChangeText={checkConfirmPassword}
							style={styles.TextInput}
							placeholder={'Retype Password'}
							keyboardType={'default'}
							secureTextEntry={securePassword}
							returnKeyType={'done'}
						/>



					</View>
					{confirmPasswordError && <Text style={styles.errorMes}>Password don't match</Text>}

					<View style={styles.Check} >
						<CheckBox
							disabled={false}
							tintColors={{ true: 'yellow', false: 'white' }}
							onFillColor={'blue'}
							color="white"
							value={toggleCheckBox}
							style={{ marginTop: 3 }}
							onValueChange={(newValue) => setToggleCheckBox(newValue)}
						/>
						<Text style={{ color: 'white', alignSelf: 'center', fontSize: 16, marginTop: w(5), marginHorizontal: w(5) }}>Agree our terms</Text>
					</View>

					<View style={styles.NamesView}	>
						<Pressable style={[styles.LoginButtonsText, !validating && { backgroundColor: 'gray' }]}
							onPress={() => {
								if (validating) {
									submitSignup();
								}
							}}>
							<Text style={{ marginTop: h(1), color: 'black', fontSize: 18, fontWeight: 'bold' }}>Submit</Text>
						</Pressable>

					</View>


				</ScrollView>
			</ImageBackground>
		</View >
	);
};
export { SignUp };