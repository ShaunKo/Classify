import React, {Component} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {topClassData} from './Data';
import SecondLayer from './SecondLayer.js';
export const {width, height} = Dimensions.get('window');

export default class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [topClassData],
      press: false,
      no: '',
      layerHeight: 0, //secondlayer 的高度
      index: '',
    };
  }
  // 增加的高度
  setHeight(layerHeight) {
    this.setState({
      layerHeight: layerHeight,
    });
  }
  modifyData(data) {
    const numColumns = 4;
    const arr = [];
    var tmp = [];
    data.forEach((val, index) => {
      if (index % numColumns === 0 && index !== 0) {
        arr.push(tmp);
        tmp = [];
      }
      tmp.push(val);
    });
    arr.push(tmp);
    return arr;
  }

  scrollToIndex = (index) => {
    let scrollHeight = index * 132;
    this.flatListRef.scrollToOffset({animated: false, offset: scrollHeight});
  };
  renderItem(item, index) {
    if (item[0].type === 'banner') {
      return (
        <View
          key={index}
          style={[
            styles.secondLayerContainer,
            {height: this.state.layerHeight},
          ]}>
          <SecondLayer
            button={this.state.no}
            setHeight={this.setHeight.bind(this)}
          />
        </View>
      );
    }

    const columns = item.map((val, idx) => {
      return (
        <TouchableOpacity
          key={idx}
          style={styles.touchable}
          onPress={() => {
            console.log(val.index1);
            const numColumns = 4;
            const arr = [];
            var tmp = [];
            topClassData.forEach((v, i) => {
              if (i % numColumns === 0 && i !== 0) {
                arr.push(tmp);
                tmp = [];
              }
              tmp.push(v);
            });
            arr.push(tmp);
            if (val.index1 === 0) {
              arr.splice(1, 0, [{type: 'banner'}]);
            } else if (val.index1 === 1) {
              arr.splice(2, 0, [{type: 'banner'}]);
            } else if (val.index1 === 2) {
              arr.splice(3, 0, [{type: 'banner'}]);
            } else if (val.index1 === 3) {
              arr.splice(4, 0, [{type: 'banner'}]);
            } else if (val.index1 === 4) {
              arr.splice(5, 0, [{type: 'banner'}]);
            } else if (val.index1 === 5) {
              arr.splice(6, 0, [{type: 'banner'}]);
            }
            if (this.state.isActive === val.class_no) {
              this.setState({
                data: arr,
                press: !this.state.press,
                isActive: '',
              });
            } else {
              this.setState(
                {
                  data: arr,
                  press: false,
                  isActive: val.class_no,
                  no: val.class_no,
                  index: val.index1,
                },
                () => {
                  this.setState({press: true});
                },
              );
            }
            return arr;
          }}>
          <Image
            style={styles.images}
            source={this.state.isActive === val.class_no ? val.img1 : val.img}
            resizeMode="contain"
          />
          <Text> {val.class_name} </Text>
          {val.class_no === this.state.isActive ? (
            <View style={styles.arrow} />
          ) : (
            <View />
          )}
        </TouchableOpacity>
      );
    });
    return (
      <View key={index} style={styles.columns}>
        {columns}
      </View>
    );
  }
  render() {
    return (
      <FlatList
        style={styles.container}
        ref={(ref) => {
          this.flatListRef = ref;
        }}
        initialScrollIndex={0}
        initialNumToRender={2}
        data={
          this.state.press ? this.state.data : this.modifyData(topClassData)
        }
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => this.renderItem(item, index)}
        onContentSizeChange={() => {
          this.flatListRef.scrollToOffset({offset: 132 * this.state.index});
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 50,
  },
  touchable: {
    width: width / 4,
    height: (height - 105) / 6,
    alignItems: 'center',
    borderColor: '#F0F0F0',
    borderWidth: 1,
  },
  images: {
    width: 36,
    height: 36,
    margin: 15,
  },
  columns: {
    width: width,
    flexDirection: 'row',
  },
  secondLayerContainer: {
    backgroundColor: '#F0F0F0',
  },
  arrow: {
    paddingTop: 20,
    width: 0,
    height: 0,
    borderBottomWidth: 20,
    borderBottomColor: '#F0F0F0',
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderRightWidth: 20,
    borderRightColor: 'transparent',
    borderLeftWidth: 20,
    borderLeftColor: 'transparent',
  },
});
