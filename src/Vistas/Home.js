import React, { Component } from 'react';
import {StyleSheet,StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Body, Title,Text } from 'native-base';

import SwipeableListView from '../Componentes/SwipeableListView';

export default class Home extends Component{
  constructor(props){
    super(props)
  }
  onPressCategory = ()=>{
    this.props.navigation.navigate("Sets")
  }

  onPressLaundry = ()=>{
    this.props.navigation.navigate("LaundryView")
  }

  onPressMissing = ()=>{
    this.props.navigation.navigate("MissingView")
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'#484848'}}>
          <StatusBar backgroundColor="#484848" barStyle="light-content"/>
          <Body>
             <Title>Home</Title>
          </Body>
        </Header>
        <Content>
          <Button onPress={this.onPressCategory} large full light><Text> Class </Text></Button>
          <Button onPress={this.onPressLaundry} large full info><Text> Laundry </Text></Button>
          <Button onPress={this.onPressMissing} large full danger><Text>  Missing  </Text></Button>
        </Content>
      </Container>
    );
  }
}
