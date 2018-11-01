import React, { Component } from 'react';
import { Container, Header, Content,Footer,Fab,Button,FooterTab, Card,Item,Input, CardItem, Body,Icon, Text } from 'native-base';

import {Platform, StyleSheet, View, Image,Alert} from 'react-native';

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



  onEditCategory = () => {
    let currentCategory = this.props.navigation.state.params.CategorySelected;
    this.props.navigation.navigate("AddCategoryView",{ categoryData: currentCategory});
  }

  onDeleteAlert = ()=>{
    Alert.alert(
    'Eliminar Categoria',
    '¿Esta seguro de eliminar esta Cateoria?',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Eliminar', onPress: this.onDeleteAlertPrendas},
    ],
    { cancelable: false }
  )

  }

  onDeleteAlertPrendas = ()=>{
    Alert.alert(
    'Eliminar Categoria',
    '¿Desea conservar sus prendas?',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Conservar', onPress:  this.deleteCategory },
      {text: 'Eliminar TODO', onPress: ()=>{}},
    ],
    { cancelable: false }
  )

  }

  deleteCategory=()=>{
    let currentCategory = this.props.navigation.state.params.CategorySelected;
    loggedUser = firebase.auth().currentUser;
    categoryReference = firebase.database().ref(`Users/${loggedUser.uid}/Categorias/`);
    currentCategoryReference = categoryReference.child(`${currentCategory.id}`);
    currentCategoryReference.remove().then(() => {
      categoryReference.once('value', (dataSnapshot) => {
        this.props.addCategory(dataSnapshot.val());
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
  onSwipeL=(index)=>{
    this.props.sendLoundry(index);
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
    this.props.navigation.navigate("AddPrendaView",{ prendaData: null, categorySelected: this.props.navigation.state.params.CategorySelected});
  }

  render() {
    return (
      <Container>
        <SwipeableListView
        isEditor={true}
        onEdit={this.onEditCategory}
        onDelete={this.onDeleteAlert}
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
    addCategory: bindActionCreators(Actions.addCategory,dispatch),
    addChothes: bindActionCreators(Actions.addChothes,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoryView);
