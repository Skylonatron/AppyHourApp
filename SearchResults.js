// 'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

import ListItem from './ListItem';

export default class SearchResults extends Component {
 
  _keyExtractor = (item, index) => index;

  _renderItem = ({item}) => {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'>
        <View>
          <Text>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
    
  };

  render() {
    const events = this.props.listings.length > 0 ? this.props.listings.map((event) => {
      return <ListItem
        event={event}
        navigator={this.props.navigator}
      />
    }) : <Text></Text>;

    return (
      // <FlatList
      //   data={this.props.listings}
      //   keyExtractor={this._keyExtractor}
      //   renderItem={this._renderItem}
      // />
      <View>{events}</View>
      
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});