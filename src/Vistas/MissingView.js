import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import SwipeableListView from '../Componentes/SwipeableListView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class MissingView extends Component{
  constructor(props){
    super(props)
  }
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }
  onSwipeL=(index)=>{
    //Send Loundry
    item = this.props.Missing[index];
    this.props.sendLoundry(item);
    this.props.deleteMissing(index);
  }

  onSwipeR=(index)=>{
    this.props.deleteMissing(index);
  }
  render() {
    return (
      <Container>
          <SwipeableListView UrlImageL={require("./images/laundry_icon.png")}
          UrlImageR={require("./images/closet_icon.png")}
          onSwipeL={this.onSwipeL} onSwipeR={this.onSwipeR}
          onPressButtonBack={this.onPressBack} listViewData={this.props.Missing}
          btnRBkgColor='#6432c8' btnLBkgColor='#0b6623' headerColor='#be1e2d' Title={"Missing"}></SwipeableListView>
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
    sendLoundry: bindActionCreators(Actions.sendLoundry,dispatch),
    deleteMissing: bindActionCreators(Actions.deleteMissing,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(MissingView);
