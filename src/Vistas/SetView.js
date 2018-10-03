import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import ListViewer from '../Componentes/ListViewer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class  SetView extends Component{
  constructor(props){
    super(props)
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }




  render() {
    return (
      <Container>
          <ListViewer  onPressButtonBack={this.onPressBack} listViewData={this.props.Sets[this.props.SetSelected].slice(1)} btnRBkgColor='#6432c8' btnLBkgColor='#be1e2d' headerColor='#4596ab' Title={this.props.Sets[this.props.SetSelected][0]}></ListViewer>
      </Container>
    );
  }
}

function mapStateToProps(state){
    const {Categories,Loundry,Missing,Sets,CategorySelected,SetSelected} = state;
    return{
      Categories,
      Loundry,
      Missing,
      Sets,
      CategorySelected,
      SetSelected
    };

}

function mapDispatchToProps(dispatch){
  return{
    deleteLoundry: bindActionCreators(Actions.deleteLoundry,dispatch),
    sendMissing: bindActionCreators(Actions.sendMissing,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetView);
