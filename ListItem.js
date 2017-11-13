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
    // this.props.onPressItem(this.props.index);
    this.props.navigator.push({
      title: 'Results',
      component: EventShow,
      passProps: {event: this.props.event}
    });
  }

  render() {
    const event = this.props.event
    // console.log(this.props.navigator)
    return (
      <View>
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Text style={styles.price}>{event.name} @ {event.owner}</Text>
            </View>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 5,
    backgroundColor: '#F0DBDB',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  descriptionText: {
    fontSize: 10,

  },
  title: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
  },
});