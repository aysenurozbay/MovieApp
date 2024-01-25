import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef} from 'react';

const {width, height} = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const HomePage = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0], // index eşit olduğunda göstermesini saglar
          });
          return (
            <Animated.Image
              source={{uri: image}}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              key={`image- ${index}`}
              blurRadius={40}
            />
          );
        })}
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled // sayfanın ortasına yerleştirme
        renderItem={({item}) => {
          return (
            <View style={styles.flatlist}>
              <Image source={{uri: item}} style={styles.headImage} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headImage: {
    resizeMode: 'cover',
    height: imageH,
    width: imageW,
    borderRadius: 20,
  },
  flatlist: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
});
