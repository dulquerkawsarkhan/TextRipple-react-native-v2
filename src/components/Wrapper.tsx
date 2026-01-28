import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants';


const Wrapper = ({children, style}:any) => {
  return (
    <LinearGradient
    style={{
        
     flex:1

    }}

    locations={[0, 1,]}
    colors={[COLORS.lightRed, COLORS.lightBlue,]}
    useAngle={true}
    angle={190}>
    <View style={[styles.container]}>

        {children}
    
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: COLORS.primary
  },

});

export default Wrapper;
