import { StyleSheet } from "react-native"
import { w, h } from "../../Dimenstions/Metrices"



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
  },
});

export default styles