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
} from 'react-native';

import SearchResults from './SearchResults';
// import DayButton from './DayButton';



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
    const query = urlForQueryAndPage('http://localhost:3000/events_today', getDayOfWeek());
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
    this.setState({highlightDay: day});
    this._executeQuery(query);
  };

  _onSearchPressed = () => {
    const query = urlForQueryAndPage('http://localhost:3000/events_today', this.state.searchString);
    console.log(this._executeQuery(query));
  };

  render() {
    const screenWidth = Dimensions.get('window').width;
    const spinner = this.state.isLoading ? <ActivityIndicator size='large'/> : null;
    const days_buttons = daysOfWeek().map((day) => {
      return <Button 
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

        <View style={styles.listings}>
          <Text style={styles.description}>{this.state.message}</Text>

          <SearchResults 
            title={'title'}
            listings={this.state.data}
            navigator={this.props.navigator}
          />
        </View>

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
    marginTop: 65,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F0DBDB'
  },
  listings: {
    backgroundColor: '#F0DBDB'
  },
  buttons: {
    fontSize: 100,
  },
  dayButtons: {
    flexDirection: 'row',
    backgroundColor: '#000000'
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




