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

import SearchResults from './SearchResults';
// import DayButton from './DayButton';

function url() {
  // return 'http://www.appyhr.io/events_today';
  return 'http://192.168.0.10:3000/api/events_today'
}

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

function getDayOfWeek() {
  var d = new Date();
  const n = d.getDay();

  return n
}


export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     searchString: 'london',
     isLoading: true,
     message: '',
     data: '',
     highlightDay: getDayOfWeek() 
     // data: this._executeQuery(urlForQueryAndPage('http://localhost:3000/events_today', 1))
    };
  }

  // loading data initially
  componentWillMount() {
    const query = urlForQueryAndPage(url(), getDayOfWeek());
    this._executeQuery(query);
  };

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
    this.setState({ isLoading: true, data: ''});
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
    const query = urlForQueryAndPage(url(), day);
    this.setState({highlightDay: day});
    this._executeQuery(query);
  };

  _onSearchPressed = () => {
    const query = urlForQueryAndPage(url(), this.state.searchString);
    console.log(this._executeQuery(query));
  };

  render() {    
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const spinner = this.state.isLoading ? <ActivityIndicator style={styles.loading} size='large'/> : null;
    const warningMessage = this.state.message ? <Text style={styles.description}>{this.state.message}</Text> : null
    const days_buttons = daysOfWeek().map((day, index) => {
      return <Button 
        key={index}
        title={day.title} 
        backgroundColor="#000000"
        width={screenWidth / 7}
        color={day.number == this.state.highlightDay ? "#008080" : "#ffffff"}
        onPress={ () => this._changeDay(day.number)}
      />;
    });
    return (
      <View style={styles.container}>

        <View style={styles.dayButtons}>
          {days_buttons}
        </View>

        {spinner}
        {warningMessage}

        <ScrollView contentContainerStyle={styles.listings} automaticallyAdjustContentInsets={false}>

          <SearchResults 
            title={'title'}
            listings={this.state.data}
            navigator={this.props.navigator}
          />
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },

  container: {
    // padding: 30,
    paddingTop: 65,
    // alignItems: 'center',
    flex: 1,
    backgroundColor: '#F0DBDB'
  },
  listings: {
    backgroundColor: '#F0DBDB',
    flex: 1,
    paddingTop: 10
  },
  buttons: {
    fontSize: 100,
  },
  dayButtons: {
    flexDirection: 'row',
    backgroundColor: '#000000',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  loading: {
    marginTop: 30,
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




