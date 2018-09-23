import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import SwipeableListView from '../Componentes/SwipeableListView';

export default class CategoryView extends Component{
  constructor(props){
    super(props)
  }
  onPressBack = ()=>{
    this.props.navigation.navigate("Home")
  }
  render() {
    return (
      <Container>
          <SwipeableListView onPressButtonBack={this.onPressBack} btnRBkgColor='#be1e2d' btnLBkgColor='#215d9a' headerColor='#c6c6bd' Title={"Class"}></SwipeableListView>
      </Container>
    );
  }
}
