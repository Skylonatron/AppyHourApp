import React, { Component } from 'react'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import BarIndex from './BarIndex';
import SearchPage from './SearchPage';
 
export default class MyNavigation extends Component {

  constructor(props) {
    super(props);
    console.log(props.na)
  }

  render() {

    return (
      <BottomNavigation
        labelColor="white"
        rippleColor="white"
        shifting={false}
        style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
        // onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
      >
        <Tab
          barBackgroundColor="#000000"
          label="Home"
          icon={<Icon size={24} color="white" name="home" />}
        />
        <Tab
          barBackgroundColor="#000000"
          label="Bars"
          icon={<Icon size={24} color="white" name="local-bar" />}
        />
      </BottomNavigation>
    )
  }
}