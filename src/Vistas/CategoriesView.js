import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import Category from "../Componentes/Category";
import CardViewer from "../Componentes/CardViewer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class CategoriesView extends Component{
  constructor(props){
    super(props);
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onPressItem=(index)=>{
  //this.props.categorySelected(index);
    this.props.navigation.navigate("CategoryView", {CategorySelected: index});
  }


  render() {
    return (
    <CardViewer addNewClothes={this.addNewClothes} Data={this.props.Categorias} onPressItem={this.onPressItem}
            Title="Categorias" onPressButtonBack={this.onPressBack} headerColor='#6432c8'></CardViewer>
    );
  }
}


function mapStateToProps(state){
    const {Categorias,Loundry,Missing,CategorySelected} = state;
    return{
      Categorias,
      Loundry,
      Missing,
      CategorySelected,
    };

}

function mapDispatchToProps(dispatch){
  return{
    addCategory: bindActionCreators(Actions.addCategory,dispatch),
    categorySelected: bindActionCreators(Actions.categorySelected,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoriesView);
