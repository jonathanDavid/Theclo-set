import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import {RootNavigator} from './src/Routes/Router';

export default class App extends Component{
  constructor(props){
    super(props)
  }
  render() {
      const Layout = RootNavigator();
      return  <Layout />
  }
}
