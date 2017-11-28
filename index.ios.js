/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import SearchPage from './SearchPage';
import MyNavigation from './MyNavigation';

class PropertyFinder extends Component {
  render() {
    const navigation = <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Appy Hr',
            component: SearchPage,
          }}/>
    return (
      <View style={styles.container}>
          {navigation}
          <MyNavigation navigator={navigation}/>
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0DBDB'
  },

});

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
