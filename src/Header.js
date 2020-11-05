import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

export const {width, height} = Dimensions.get('window');
export default class Header extends Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <View>
          <Icon
            name="chevron-left"
            style={styles.icon}
            size={30}
            color="white"
          />
        </View>
        <TouchableOpacity style={styles.fakeSearchButton}>
          <Text>找商品</Text>
        </TouchableOpacity>
        <View>
          <Icon
            name="shopping-cart"
            style={styles.icon}
            size={30}
            color="white"
          />
        </View>
        <View>
          <Icon name="chat" style={styles.icon} size={30} color="white" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    width: width,
    height: 54,
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  fakeSearchButton: {
    backgroundColor: 'white',
    width: width - 150,
    height: 40,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  fakeButtonPlacehold: {
    color: 'grey',
    fontSize: 18,
  },
});
