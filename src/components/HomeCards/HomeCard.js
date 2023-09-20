import React, { useEffect, useState, memo, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { w, h } from "../../Dimenstions/Metrices";
import { UserContext } from "../../screens/Login/Login"
import styles from "./styles";


const ListCard = (props) => {
    const {Title,Count,style} = props;
    return (
        <TouchableOpacity style={[styles.container, style]}>
            <Text style={{ fontSize: 19, color: 'white', marginBottom: h(2.5) }} >{Title}</Text>
            <Text style={{ fontSize: 19, color: 'white', marginBottom: h(2.5) }} >{Count}</Text>
        </TouchableOpacity>
    )
}

export default ListCard