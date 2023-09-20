import React, { useEffect, useState, memo, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { w } from "../../metrices/Metrices";
// import { UserContext } from "../../screens/Login/Login"
import styles from "./styles";



const Button = (props) => {
    const { title, color, buttonStyle, press } = props;
    // const user = useContext(UserContext)
    console.log('====================================');
    console.log("hello");
    console.log('====================================');
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }, buttonStyle]} onPress={press}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const Button2 = (props) => {
    const { title, color, buttonStyle, press } = props;
    // const user = useContext(UserContext)
    console.log('====================================');
    console.log("hello");
    console.log('====================================');
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }, buttonStyle]} onPress={press}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}


export default memo(Button, Button2);