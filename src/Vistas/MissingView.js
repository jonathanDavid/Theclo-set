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
  render() {
    return (
      <Container>
          <SwipeableListView onPressButtonBack={this.onPressBack} listViewData={this.props.Missing} btnRBkgColor='#c6c6bd' btnLBkgColor='#215d9a' headerColor='#be1e2d' Title={"Missing"}></SwipeableListView>
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
  )(MissingView);
