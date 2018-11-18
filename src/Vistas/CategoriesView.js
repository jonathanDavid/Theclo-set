import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab,Spinner } from 'native-base';


import CardViewer from "../Componentes/CardViewer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';
import firebase from 'firebase';

class CategoriesView extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    this.categoriesPhoto()
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onPressItem=(id)=>{
    let obj = _.filter(this.props.Categorias, ['id', id]);
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

  categoriesPhoto = () => {
    let data = this.props.Categorias;
    let dataUrl=[]
    data = _.map(data, 'FotoURL');
    return data
  }

  categoriesID = () => {
    let data = this.props.Categorias;
    data = _.map(data, 'id');
    return data;
  }

  render() {
    return (
        <Container>
          <CardViewer addNewClothes={this.addNewClothes} Data={this.categoriesNames()} DataID={this.categoriesID()} DataFoto={this.categoriesPhoto()} onPressItem={this.onPressItem}
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoriesView);
