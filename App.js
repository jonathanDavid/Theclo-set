import React, { Component } from 'react';
//import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";

import {RootNavigator} from './src/Routes/Router';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
   if (this.state.loading) {
     return (
       <Root>
         <AppLoading />
       </Root>
     );
   }
   const Layout = RootNavigator();
   return  <Layout />
 }
}
