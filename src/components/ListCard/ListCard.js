import React, { useEffect, useState, memo, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { w, h } from "../../Dimenstions/Metrices";
import { UserContext } from "../../screens/Login/Login"
import styles from "./styles";


const ListCard = (props) => {
    const { Name, Value, Egyptian, style, onPress, id } = props;
    return (
        <TouchableOpacity style={[styles.container, style]}>
            <Text style={{ fontSize: 19, color: 'white' , marginBottom: h(2.5) }} >{Name}</Text>
            <Text style={{ fontSize: 16, color: 'yellow', marginBottom: h(2.5) }} >{Value}</Text>
            <Text style={{ fontSize: 16, color: 'tomato', marginBottom: h(2.5) }} >{Egyptian}</Text>

        </TouchableOpacity>
    )
}

export default ListCard