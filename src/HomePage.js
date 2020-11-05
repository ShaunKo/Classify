import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, SafeAreaView} from 'react-native';

import Header from './Header.js';
//import Classify from './Classify.js';
import Test from './Test.js';

export const {width, height} = Dimensions.get('window');
export default class HomePage extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Header />
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>商品分類</Text>
        </View>
        {/* <Classify /> */}
        <Test />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'orange',
  },
  titlecontainer: {
    backgroundColor: '#D0D0D0',
    width: width,
    height: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    padding: 5,
  },
});
