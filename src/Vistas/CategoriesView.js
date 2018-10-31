import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab } from 'native-base';

import Category from "../Componentes/Category";
import CardViewer from "../Componentes/CardViewer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';

class CategoriesView extends Component{

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onPressItem=(index)=>{
  //this.props.categorySelected(index);
    let obj = _.filter(this.props.Categorias, ['Nombre', index]);
    console.log(obj[0].Nombre);
    this.props.navigation.navigate("CategoryView", {CategorySelected: obj[0]});
  }

  onPressNew=()=>{
    this.props.navigation.navigate("AddCategoryView",{ categoryData: null});
  }

  categoriesNames = () => {
    let data = this.props.Categorias;
    data = _.map(data, 'Nombre');
    return data;
  }

  render() {
    return (
        <Container>
          <CardViewer addNewClothes={this.addNewClothes} Data={this.categoriesNames()} onPressItem={this.onPressItem}
                  Title="Categorias" onPressButtonBack={this.onPressBack} headerColor='#6432c8' onPressNew={this.onPressNew}></CardViewer>
        </Container>
    );
  }
}

function mapStateToProps(state){
    const {Categorias} = state;
    return{
      Categorias
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
