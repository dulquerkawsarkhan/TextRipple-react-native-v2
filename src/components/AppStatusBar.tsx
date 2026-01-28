import React from 'react';
import { StatusBar, View } from 'react-native';

const AppStatusBar = () => {
  return (
    <View style={{marginTop: StatusBar.currentHeight+5}}>
      <StatusBar
        animated={true}
        // backgroundColor="#61dafb"
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />
    </View>
  );
};

export default AppStatusBar;
