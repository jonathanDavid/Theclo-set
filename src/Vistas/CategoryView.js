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

  render() {
    return (
      <Container>
          <SwipeableListView onPressButtonBack={this.onPressBack} listViewData={this.prendasActivas()} btnRBkgColor='#be1e2d' btnLBkgColor='#215d9a' headerColor='#c6c6bd' Title={"Class"}></SwipeableListView>
      </Container>
    );
  }
}

function mapStateToProps(state){
    const {Categories,CategorySelected,Loundry,Missing} = state;
    return{
      Categories,
      CategorySelected,
      Loundry,
      Missing
    };

}

function mapDispatchToProps(dispatch){
  return{
    addCategory: bindActionCreators(Actions.addCategory,dispatch),
    sendLoundry: bindActionCreators(Actions.sendLoundry,dispatch),
    deleteLoundry: bindActionCreators(Actions.deleteLoundry,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoryView);
