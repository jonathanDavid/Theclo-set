import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import SwipeableListView from '../Componentes/SwipeableListView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class  LaundryView extends Component{
  constructor(props){
    super(props)
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }
  onSwipeL=(index)=>{
    this.props.deleteLoundry(index);
  }

  onSwipeR=(index)=>{
    //this.props.deleteLoundry(index);
  }

  render() {
    return (
      <Container>
          <SwipeableListView onSwipeL={this.onSwipeL} onSwipeR={this.onSwipeR} onPressButtonBack={this.onPressBack} listViewData={this.props.Loundry} btnRBkgColor='#c6c6bd' btnLBkgColor='#be1e2d' headerColor='#215d9a' Title={"Loundry"}></SwipeableListView>
      </Container>
    );
  }
}

function mapStateToProps(state){
    const {Categories,Loundry,Missing} = state;
    return{
      Categories,
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
  )(LaundryView);
