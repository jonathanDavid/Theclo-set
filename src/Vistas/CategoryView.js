import React, { Component } from 'react';
import { Container, Header, Content,Footer,Fab,Button,FooterTab, Card,Item,Input, CardItem, Body,Icon, Text } from 'native-base';

import {Platform, StyleSheet, View, Image} from 'react-native';

import SwipeableListView from '../Componentes/SwipeableListView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash'
import firebase from 'firebase';



class CategoryView extends Component{
  constructor(props){
    super(props)
    this.state={
      inputText:"",
      active: false
    }
  }
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  prendasActivas=()=>{
    let prendas = this.props.Prendas;
    let cat= this.props.navigation.state.params.CategorySelected.Nombre;
    prendas = _.filter(prendas, ['Categoria', cat]);
    prendas = _.filter(prendas, ['Estado', 0]);
    return prendas;
  }

  onSwipeL=(index)=>{
    this.props.sendLoundry(index);
  }

  onEditCategory = () => {
    let currentCategory = this.props.navigation.state.params.CategorySelected;
    this.props.navigation.navigate("AddCategoryView",{ categoryData: currentCategory});
  }

  onDeleteCategory = ()=>{
    let currentCategory = this.props.navigation.state.params.CategorySelected;
    loggedUser = firebase.auth().currentUser;
    this.props.editCategory(currentCategory.id)
    userReference = firebase.database().ref(`Users/${loggedUser.uid}/Categorias/${currentCategory.id}`);
    userReference.remove().then(() => {
      firebase.database().ref(`Users/${loggedUser.uid}`).once('value', (dataSnapshot) => {
        this.props.setState(dataSnapshot.val());
        this.props.navigation.navigate("CategoriesView");
      })
    });

  }

  onSwipeR=(index)=>{
    prendas = this.prendasActivas();
    item = prendas[index];
    item.Estado=2;
    this.props.sendMissing(item);
  }

  addNewClothes=()=>{
    this.props.addChothes(this.state.inputText);
  }
  onChangeText=(input)=>{
    this.setState({
      inputText:input,
    })
  }

  onPressNew = () => {
    this.setState({ active: !this.state.active });
    this.props.navigation.navigate("AddPrendaView",{ prendaData: null,CategorySelected: this.props.navigation.state.params.CategorySelected});
  }

  render() {
    return (
      <Container>
        <SwipeableListView
        isEditor={true}
        onEdit={this.onEditCategory}
        onDelete={this.onDeleteCategory}
        UrlImageL={require("./images/laundry_icon.png")}
        UrlImageR={require("./images/socks_icon.png")}
        onSwipeL={this.onSwipeL} onSwipeR={this.onSwipeR}
        onPressButtonBack={this.onPressBack} listViewData={this.prendasActivas()}
        btnRBkgColor='#be1e2d' btnLBkgColor='#0b6623' headerColor='#6432c8'
        Title={this.props.navigation.state.params.CategorySelected.Nombre}></SwipeableListView>

        <View>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#6432c8' }}
            position="bottomRight"
            onPress={this.onPressNew}>
          <Icon  type="FontAwesome" name="plus" />

        </Fab>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonLayout:{
    margin: 15,
    marginRight: 35,
    marginLeft: 35,
    paddingLeft: 8,
    paddingRight:8,
    padding: 5,
  },
  buttonLayoutBottom:{
    margin: 5,
    padding: 5,
  },

});

function mapStateToProps(state){
    const {Categorias,Prendas} = state;
    return{
      Categorias,
      Prendas
    };

}

function mapDispatchToProps(dispatch){
  return{
    sendLoundry: bindActionCreators(Actions.sendLoundry,dispatch),
    sendMissing: bindActionCreators(Actions.sendMissing,dispatch),
    setState: bindActionCreators(Actions.setState,dispatch),
    editCategory: bindActionCreators(Actions.editCategory,dispatch),
    addChothes: bindActionCreators(Actions.addChothes,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoryView);
