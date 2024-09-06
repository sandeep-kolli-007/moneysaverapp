import {useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import {Dimensions, ImageBackground, Text, View} from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

function Swiper({data}: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width} = Dimensions.get('window');
  const {theme} = useTheme();
  return (
    // <SideSwipe
    //   index={currentIndex}
    //   itemWidth={width - 60}
    //   data={data}
    //   contentOffset={0}
    //   onIndexChange={index => setCurrentIndex(index)}
    //   renderItem={({itemIndex, currentIndex, item, animatedValue}) => (
    //     <View style={{width: width - 60 , marginVertical: 16}}>
    //       <ImageBackground source={item.image} resizeMode="cover"  >
    //         <View
    //           style={{
    //             borderRadius: 8,
    //             height: 200,
    //             padding: 8,
    //             margin: 8,
    //             justifyContent: 'center',
    //           }}>
    //           <Text
    //             style={{
    //               fontSize: 30,
    //               lineHeight: 50,
    //               textAlign: 'center',
    //               fontWeight: 'bold',
    //               color: theme.colors.white,
    //               textShadowColor: theme.colors.primary,
    //               textShadowOffset: {width: 1, height: 1},
    //               textShadowRadius: 8,
    //               elevation: 1,
    //             }}>
    //             {item.title}
    //           </Text>
    //         </View>
    //       </ImageBackground>
    //     </View>
    //   )}
    // />
    <View
      style={{
        backgroundColor: 'white',
        marginTop: 16,
        width: width,
        marginHorizontal: -30,
      }}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={2}
        showPagination
        windowSize={width}
        data={data}
        renderItem={({item}) => (
          <View
            style={{
              width: width,
              height: 150,
              justifyContent: 'center',
              backgroundColor: item,
            }}>
            <ImageBackground
              source={item.image}
              style={{backgroundColor:'black'}}
              imageStyle={{ opacity: 0.6}}
              >
              <View
                style={{
                  borderRadius: 8,
                  height: 150,
                  padding: 8,
                  margin: 8,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    lineHeight: 50,
                    fontFamily: 'Wendy One',
                    textAlign: 'center',
                    // fontWeight: '400',
                    color: theme.colors.white,
                    textShadowColor: theme.colors.primary,
                    textShadowOffset: {width: 1, height: 1},
                    textShadowRadius: 8,
                    elevation: 1,
                  }}>
                  "{item.title}"
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
}

export default Swiper;
