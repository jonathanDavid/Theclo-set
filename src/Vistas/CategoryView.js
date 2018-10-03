import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import SwipeableListView from '../Componentes/SwipeableListView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class CategoryView extends Component{
  constructor(props){
    super(props)
  }
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  prendasActivas=()=>{
    let prendas = this.props.Categories[this.props.CategorySelected].slice(1);
    prendas = prendas.filter(f => !this.props.Loundry.includes(f));
    prendas = prendas.filter(f => !this.props.Missing.includes(f));
    return prendas;
  }

  onSwipeL=(index)=>{

    prendas = this.prendasActivas();
    item = prendas[index];
    this.props.sendLoundry(item);

  }

  onSwipeR=(index)=>{
    prendas = this.prendasActivas();
    item = prendas[index];
    this.props.sendMissing(item);
  }

  render() {
    return (
      <Container>
          <SwipeableListView onSwipeL={this.onSwipeL} onSwipeR={this.onSwipeR} onPressButtonBack={this.onPressBack} listViewData={this.prendasActivas()} btnRBkgColor='#be1e2d' btnLBkgColor='#0b6623' headerColor='#6432c8' Title={this.props.Categories[this.props.CategorySelected][0]}></SwipeableListView>
      </Container>
    );
  }
}

function mapStateToProps(state){
    const {Categories,Loundry,Missing,CategorySelected} = state;
    return{
      Categories,
      Loundry,
      Missing,
      CategorySelected,
    };

}

function mapDispatchToProps(dispatch){
  return{
    sendLoundry: bindActionCreators(Actions.sendLoundry,dispatch),
    sendMissing: bindActionCreators(Actions.sendMissing,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoryView);
