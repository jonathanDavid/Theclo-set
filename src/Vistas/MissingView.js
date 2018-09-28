import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import SwipeableListView from '../Componentes/SwipeableListView';

export default class MissingView extends Component{
  constructor(props){
    super(props)
  }
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }
  render() {
    return (
      <Container>
          <SwipeableListView onPressButtonBack={this.onPressBack} btnRBkgColor='#c6c6bd' btnLBkgColor='#215d9a' headerColor='#be1e2d' Title={"Missing"}></SwipeableListView>
      </Container>
    );
  }
}
