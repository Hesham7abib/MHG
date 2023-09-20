import { StyleSheet } from "react-native"
import { w, h } from "../../Dimenstions/Metrices"
const styles = StyleSheet.create({


    container: {
        borderColor: 'rgb(240,230,140)', // Replace this with your desired background color
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        // width: w(140),
        marginHorizontal: w(20),
        alignItems: 'center',
        marginVertical: h(5),
        alignSelf: 'center',
        backgroundColor: '#101111'

    },


    text: {
        color: 'white',
        alignSelf: 'center',
    },


    button: {
        backgroundColor: 'red',
        width: w(50),
        paddingVertical: 10
    }

})

export default styles