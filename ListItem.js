import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

import EventShow from './EventShow';


export default class ListItem extends React.PureComponent {
  _onPress = () => {
    console.log(this.props.event.name)
    // this.props.onPressItem(this.props.index);
    this.props.navigator.push({
      title: 'Results',
      component: EventShow,
      passProps: {event: this.props.event}
    });
  }

  render() {
    const event = this.props.event
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.price}>{event.name} @ {event.owner}</Text>
          </View>
          <Text style={styles.descriptionText}>{event.description}</Text>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
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
  descriptionText: {
    fontSize: 10
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    // padding: 10
  },
});