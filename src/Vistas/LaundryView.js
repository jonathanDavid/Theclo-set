import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import SwipeableListView from '../Componentes/SwipeableListView';

export default class  LaundryView extends Component{
  constructor(props){
    super(props)
  }

  onPressBack = ()=>{
    this.props.navigation.navigate("MenuView")
  }
  render() {
    return (
      <Container>
          <SwipeableListView onPressButtonBack={this.onPressBack} btnRBkgColor='#c6c6bd' btnLBkgColor='#be1e2d' headerColor='#215d9a' Title={"Loundry"}></SwipeableListView>
      </Container>
    );
  }
}
