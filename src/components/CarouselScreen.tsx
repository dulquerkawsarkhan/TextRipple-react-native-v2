/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Dimensions, View } from 'react-native';
const { width, height } = Dimensions.get('window');
// import {FlatListSlider} from 'react-native-flatlist-slider';
import { COLORS, SIZES } from '../constants';
import { FlatListSlider } from './Carousel';
// import {endpointdajngobackend} from '../../profileconstants';
// import {endpointdajngobackend} from '../../riderapiconstants';

import banner_1 from './Carousel/banner_1.png';
import banner_2 from './Carousel/banner_2.png';
import banner_3 from './Carousel/banner_3.png';
import banner_4 from './Carousel/banner_4.png';
import banner_5 from './Carousel/banner_5.png';
import banner_6 from './Carousel/banner_6.png';
import banner_7 from './Carousel/banner_7.png';
import banner_8 from './Carousel/banner_8.png';


const data2 = [
  {
    image: banner_1,
    desc: '',
    local: true
  },

  {
    image: banner_3,
    desc: '',
    local: true
  },


  {
    image: banner_2,
    desc: '',
    local: true
  },
  {
    image: banner_4,
    desc: '',
    local: true
  },
  {
    image: banner_5,
    desc: '',
    local: true
  },

  {
    image: banner_6,
    desc: '',
    local: true
  },
  {
    image: banner_7,
    desc: '',
    local: true
  },
  {
    image: banner_8,
    desc: '',
    local: true
  },
];
function CarouselScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState<any>(data2);




  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{
      marginTop: 10,



    }}>
      {data ? (
        <FlatListSlider
          data={data}
          timer={5000}
          height={SIZES.width * 0.35}
          width={SIZES.width * 0.85}
          local={true}
          separatorWidth={6}
          // eslint-disable-next-line no-alert
          onPress={(item: any) => Alert.alert(JSON.stringify(item))}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            paddingHorizontal: 16,
            borderRadius: 10,
            marginLeft: '4%'

          }}
          indicatorContainerStyle={{
            position: 'absolute',
            bottom: 5
          }}
          indicatorActiveColor={COLORS.white}
          indicatorInActiveColor={COLORS.primary}
          // indicatorActiveWidth={10}
          animation
        />
      ) : null}
    </View>
  );
}

export default CarouselScreen;
