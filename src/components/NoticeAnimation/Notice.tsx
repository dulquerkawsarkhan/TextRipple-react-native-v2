import { View, Text } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants'
import { Defs, G, Path, Svg, Use } from 'react-native-svg'

export default function Notice() {
  return (
    <View style={{
      height: 80,
      backgroundColor:'red'
    
    }}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#CCD5E4'

      }}>
        <Text>It's raining neear this location</Text>
        <Text>Our deliver partners may take longer to reach you</Text>
        <Text>Notice</Text>

      </View>

      <Svg
        width='100%'
        height="30"
        fill='#CCD5E4'
        viewBox='0 0 4000 1000'

        preserveAspectRatio='none'

        style={{
          width:'100%',
          transform:[{rotateX:'180deg'}]
        
        }}
      

      >

        <Defs>
          <Path
            id='wavepath'
            d="M 0 2000 0 500 Q 62.5 280 125 500 t 125 0 125 0 125 0 125 0 125 0 125 0 125 0 125 0 125 0 125 0   125 0 125 0 125 0  125 0 125 0 125 0  125 0 125 0 125 0  125 0 125 0 125 0  125 0 125 0 125 0  125 0 125 0 125 0  125 0 125 0 125 0  125 0 125 0 125 0  125 0 125 0 125 0  125 0 125 0 125 0 v1000 z"
          />

        </Defs>

        <G>
          <Use

            href='#wavepath'
            y='324'


          />
        </G>
      </Svg>
    </View>
  )
}