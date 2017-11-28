// 'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  List,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';


export default class BarIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // data: this._executeQuery(urlForQueryAndPage('http://localhost:3000/events_today', 1))
    };
  }

  // loading data initially
  // componentWillMount() {
  //   const query = urlForQueryAndPage(url(), getDayOfWeek());
  //   this._executeQuery(query);
  // };


  render() {
 
    return (
      <View></View>
     
    );
  }
}





