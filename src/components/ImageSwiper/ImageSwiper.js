import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';

const ImageSwiper = ({ images }) => {
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          showsButtons={true} // Add navigation buttons (optional)
          loop={false} // Set to true for infinite loop
          index={0} // Initial index of the swiper
        >
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={{ uri: image }}
                style={styles.image} // Adjust width and height here
              />
            </View>
          ))}
        </Swiper>
      </View>
    );
  };



export default ImageSwiper;
