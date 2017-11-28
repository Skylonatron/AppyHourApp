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

function get_hours_formatted(dateTime) {
  const d = new Date(dateTime);
  const hour = d.getHours();

  if (hour > 12){
    formatted_hour = (hour - 12) + "pm";
  }
  else{
    formatted_hour = hour + "am";
  }

  return formatted_hour
}


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
    const description = event.description ? <Text style={styles.descriptionText}>{event.description}</Text> : null
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this._onPress}
          style={styles.highlight}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{event.name} @ {event.owner}</Text>
            <Text style={styles.time}>
              {get_hours_formatted(event.start_time)} - {get_hours_formatted(event.end_time)}
            </Text>
            {description}
          </View>
        </TouchableHighlight>
        <View style={styles.divider}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0DBDB',
  },
  rowContainer: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  textContainer: {
    flex: 1
  },
  divider: {
    height: 7
  },
  highlight: {
  },
  separator: {
    height: 5,
    backgroundColor: '#F0DBDB',
  },
  time: {
    fontSize: 15,
    textAlign: 'center'
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
    // color: '#48BBEC',
  },
  descriptionText: {
    fontSize: 10,

  },
});