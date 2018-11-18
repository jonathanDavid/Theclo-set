import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab } from 'native-base';

import CardViewer from "../Componentes/CardViewer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';

class SetsView extends Component{

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onPressItem=(id)=>{
    let obj = _.filter(this.props.Sets, ['id', id]);
    this.props.navigation.navigate("SetView", {setSelected: obj[0]});
  }

  onPressNew=()=>{
    this.props.navigation.navigate("AddSetView",{ setData: null});
  }

  setsNames = () => {
    let data = this.props.Sets;
    data = _.map(data, 'Nombre');
    return data;
  }

  setsID = () => {
    let data = this.props.Sets;
    data = _.map(data, 'id');
    return data;
  }

  render() {
    return (
        <Container>
          <CardViewer addNewClothes={this.addNewClothes} Data={this.setsNames()} DataID={this.setsID()} onPressItem={this.onPressItem}
                  Title="Conjuntos" onPressButtonBack={this.onPressBack} headerColor='#4596ab' onPressNew={this.onPressNew}></CardViewer>
        </Container>
    );
  }
}

function mapStateToProps(state){
    const {Sets} = state;
    return{
      Sets
    };

}

function mapDispatchToProps(dispatch){
  return{
  //  addCategory: bindActionCreators(Actions.addCategory,dispatch),
    //categorySelected: bindActionCreators(Actions.categorySelected,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetsView);
