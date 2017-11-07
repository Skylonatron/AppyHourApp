import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  NavigatorIOS
} from 'react-native';

export default class EventShow extends React.PureComponent {

  render() {
    const event = this.props.event
    return (
      <View style={styles.textContainer}>
        <Text style={styles.title}>show this tsitnrg palea</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#48BBEC'
  },
  title: {
    fontSize: 100,
    color: '#48BBEC'
  }
});