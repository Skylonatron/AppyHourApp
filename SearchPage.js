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
} from 'react-native';

import SearchResults from './SearchResults';



function urlForQueryAndPage(url, day) {
  // const data = {
  //     name: 'uk',
  //     description: '1',
  //     relative_time: 'json',
  //     start_time: 'buy',
  //     end_time: 'search_listings',
  //     page: pageNumber,
  // };
  // data[key] = value;

  // const querystring = Object.keys(data)
  //   .map(key => key + '=' + encodeURIComponent(data[key]))
  //   .join('&');

  const query_url = url + '?day=' + day;

  return query_url;
}

function daysOfWeek() {

  var days = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S'];

  var d = new Date();
  const n = d.getDay();

  arr = []

// Order days week into array
  for(var i = n; i < 7; i++) {
    arr.push({number: i, title: days[i]})
  }
  for(var i = 0; i < n; i++) {
    arr.push({number: i, title: days[i]})
  }
  return arr
}


export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     searchString: 'london',
     isLoading: false,
     message: '',
     data: ''
    };
  }

  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
    // console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
  };


  _handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    // if (response.application_response_code.substr(0, 1) === '1') {
      this.setState({ data: response })

      // this.props.navigator.push({
      //   title: 'Results',
      //   component: EventShow,
      // });
      // console.log(response)

    // } else {
    //   this.setState({ message: 'Location not recognized; please try again.'});
    // }
  };

  _executeQuery = (query) => {
    // console.log(query);
    this.setState({ isLoading: true });
    fetch(query, { method: 'GET' })
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error =>
         this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
       }));
  };

  _changeDay = (day) => {
    const query = urlForQueryAndPage('http://localhost:3000/events_today', day);
    this._executeQuery(query);

  };

  _onSearchPressed = () => {
    const query = urlForQueryAndPage('http://localhost:3000/events_today', this.state.searchString);
    this._executeQuery(query);
  };

  render() {
    const spinner = this.state.isLoading ? <ActivityIndicator size='large'/> : null;
    const days_buttons = daysOfWeek().map((day) => {
      return <Button title={day.title} value="legolas" onPress={ () => this._changeDay(day.number)}/>
    })
    return (
      <View style={styles.container}>

        <View style={styles.flowRight}>
          {days_buttons}
        </View>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder='Search via name or postcode'/>
          <Button
            onPress={this._onSearchPressed}
            color='#48BBEC'
            title='Go'
          />
        </View>
        {spinner}

        <Text style={styles.description}>{this.state.message}</Text>

        <SearchResults 
          title={'title'}
          listings={this.state.data}
          navigator={this.props.navigator}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },

  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },

  buttons: {
    fontSize: 100,
  },

  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },

});




