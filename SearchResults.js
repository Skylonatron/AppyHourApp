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
      <View style={styles.container}>{events}</View>
      
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  container: {
    backgroundColor: '#ffffff'
  }
});