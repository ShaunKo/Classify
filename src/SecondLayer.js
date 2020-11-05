import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export const {width, height} = Dimensions.get('window');
export default class SecondLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: [],
      lastNumber: '',
    };
  }
  // 判斷是否為整數
  isInteger(number) {
    return number % 1 === 0;
  }
  getApi = (button) => {
    return fetch(
      `https://rapi.beta.ruten.com.tw/api/categories/v1/class/${button}`,
    )
      .then((response) => response.json())
      .then((json) => {
        let resource = json.data.cat.options;
        this.setState({api: resource});
        // 取得高度
        // 用FlatList
        //let layerHeight = resource.length / 2;
        // if (this.isInteger(layerHeight)) {
        //   layerHeight = layerHeight * 29;
        //   //console.log(layerHeight)
        //   this.props.setHeight(layerHeight);
        //   //this.setState({layerHeight: });
        // } else {
        //   layerHeight = (parseInt(layerHeight) + 1) * 29;
        //   //console.log(layerHeight)
        //   this.props.setHeight(layerHeight);
        // }
        //this.props.setHeight(layerHeight);
        return resource;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount() {
    this.getApi(this.props.button);
  }
  render() {
    return (
      <View>
        {/* 上傳高度 */}
        <View style={styles.container}>
          {this.state.api.map((item, index) => {
            return (
              <TouchableOpacity style={styles.touchable} key={index}>
                <Text style={styles.text}>{item.class_name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F0F0F0',
  },
  touchable: {
    width: width / 2,
    alignItems: 'center',
    borderColor: '#D0D0D0',
    borderWidth: 0.5,
    backgroundColor: '#F0F0F0',
  },
  text: {
    fontSize: 15,
    padding: 5,
  },
});
