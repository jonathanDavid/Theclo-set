import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Title extends Component{
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{this.props.Text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleView:{
    alignItems: 'center',
    padding:20,
    backgroundColor: '#d53824',
  },
  titleText:{
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 30,
  },
});
