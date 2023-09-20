import React, { useEffect, useState, memo, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { w, h } from "../../Dimenstions/Metrices";
import { UserContext } from "../../screens/Login/Login"
import styles from "./styles";


const ListCard = (props) => {
    const { ProjectName, ContractValue, FinalInvoice, style } = props;
    return (
        <TouchableOpacity style={[styles.container, style]}>
            <Text style={{ fontSize: 19, color: 'white', marginBottom: h(2.5) }} >{ProjectName}</Text>
            <Text style={{ fontSize: 19, color: 'white', marginBottom: h(2.5) }} >{ContractValue}</Text>
            <Text style={{ fontSize: 16, color: 'yellow', marginBottom: h(2.5) }} >{FinalInvoice}</Text>
        </TouchableOpacity>
    )
}

export default ListCard