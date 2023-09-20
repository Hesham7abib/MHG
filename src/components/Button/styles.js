import { StyleSheet } from "react-native"
import { w } from "../../Dimenstions/Metrices"
const styles= StyleSheet.create({

    text: {
        color:'white',
        alignSelf:'center',
    },



    button:{
        backgroundColor:'red',
        width:w(250),
        height:w(40),
        alignSelf:'center',
        borderRadius:10,
        paddingVertical:10
    }

})

export default styles