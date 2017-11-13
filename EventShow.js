import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  NavigatorIOS,
  ScrollView
} from 'react-native';

export default class EventShow extends React.PureComponent {

  render() {
    const event = this.props.event
    return (
      <ScrollView style={styles.textContainer}>
        <Text style={styles.title}>{event.name} @ {event.owner}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
  },
  description: {
    fontSize: 20
  }
});