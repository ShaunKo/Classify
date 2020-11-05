import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {dataForSectionList} from './Data.js';
import SecondLayer from './SecondLayer.js';

export const {width, height} = Dimensions.get('window');

export default class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: '', //是否點按
      index: '', //第幾行
    };
  }

  sectionComp = (info) => {
    var txt = info.section.index;
    return this.state.index === txt ? (
      <SecondLayer
        button={this.state.isActive}
        // FlatList 用的
        //setHeight={this.setHeight.bind(this)}
      />
    ) : (
      <View />
    );
  };

  sectionComp1 = () => {
    return <View />;
  };

  _renderItem = (info) => {
    var section = info.section.data;
    var infoIndex = info.index;
    return (
      <View style={styles.contentContainer}>
        {infoIndex === 0 ? (
          section.map((item, key) => {
            return (
              <TouchableOpacity key={key} style={styles.touch}
                onPress={() => {
                  if (item.class_no === this.state.isActive) {
                    this.setState({isActive: '', index: ''});
                  } else {
                    this.setState({isActive: '', index: item.rowIndex}, () => {
                      this.setState({isActive: item.class_no});
                    });
                  }
                }}>
                <Image
                  style={styles.images}
                  source={
                    item.class_no === this.state.isActive ? item.img1 : item.img
                  }
                  resizeMode="contain"
                />
                <View style={styles.title}>
                  <Text>{item.class_name}</Text>
                </View>
                {item.class_no === this.state.isActive ? (
                  <View style={styles.arrow} />
                ) : (
                  <View />
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <View />
        )}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <SectionList
          style={styles.container}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          renderSectionFooter={
            this.state.isActive !== '' ? this.sectionComp : this.sectionComp1
          }
          renderItem={this._renderItem}
          sections={dataForSectionList}
          keyExtractor={(item, index) => item + index}
          onScrollToIndexFailed={() => {}}
          onContentSizeChange={() => {
            this.flatListRef.scrollToLocation({
              sectionIndex: this.state.index,
              itemIndex: 0,
              viewPosition: 0,
            });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 130,
  },
  images: {
    width: 36,
    height: 36,
  },
  touch: {
    width: width / 4,
    height: (height - 105) / 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#F0F0F0',
  },
  title: {
    alignItems: 'center',
    width: width / 4,
  },
  contentContainer: {
    width: width,
    flexDirection: 'row',
  },
  arrow: {
    top: 110,
    position: 'absolute',
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
