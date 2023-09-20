import { StyleSheet } from "react-native"
import { w , h } from "../../Dimenstions/Metrices"
const styles = StyleSheet.create({


    container: {
        borderColor: 'green',
        flex: 1,
        borderWidth: 2,
        borderRadius: 12,
        // width: w(140),
        marginHorizontal: w(20),
        alignItems: 'center',
        marginVertical: h(5),
        alignSelf: 'center',
        backgroundColor: 'black'

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