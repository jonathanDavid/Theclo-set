import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import CardViewer from "../Componentes/CardViewer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class SetsView extends Component{
  constructor(props){
    super(props);
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onPressItem=(index)=>{
    this.props.setSelected(index);
    this.props.navigation.navigate("SetView");
  }
  
  onPressNew=()=>{
    this.props.navigation.navigate("AddSetView")
  }


  render() {
    return (
      <Container>
        <Content>
            <CardViewer Data={this.props.Sets} onPressNew={this.onPressNew} onPressItem={this.onPressItem} Title="Sets" onPressButtonBack={this.onPressBack} headerColor='#4596ab'></CardViewer>
        </Content>
      </Container>
    );
  }
}



function mapStateToProps(state){
    const {Categories,Loundry,Missing,Sets,CategorySelected} = state;
    return{
      Categories,
      Loundry,
      Missing,
      Sets,
      CategorySelected,
    };

}

function mapDispatchToProps(dispatch){
  return{
    addSet: bindActionCreators(Actions.addSet,dispatch),
    setSelected: bindActionCreators(Actions.setSelected,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(SetsView);
