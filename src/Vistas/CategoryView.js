import React, { Component } from 'react';
import { Container, Header, Content,Footer,Fab,Button,FooterTab, Card,Item,Input, CardItem, Body,Icon, Text } from 'native-base';

import {Platform, StyleSheet, View, Image,Alert} from 'react-native';

import SwipeableListView from '../Componentes/SwipeableListView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash'
import firebase from 'firebase';

const STATUS_CLOSET =  0;
const STATUS_LAUNDRY = 1;
const STATUS_MISSING = 2;

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
    let cat= this.props.navigation.state.params.CategorySelected.id;
    prendas = _.filter(prendas, ['Categoria', cat]);
    prendas = _.filter(prendas, ['Estado', STATUS_CLOSET]);
    return prendas;
  }

  onPrendaStatusChange = (prendaID,statusID) => {
    const userID = firebase.auth().currentUser.uid;
    const route = `Users/${userID}/Prendas/${prendaID}/Estado`
    const prendasReference = firebase.database().ref(`Users/${userID}/Prendas/`);
    prendaReference = firebase.database().ref(route).set(statusID).then( () => {
      //Aqui llamar al metodo de render (Podria ser spinner por mientras)
      prendasReference.once('value', (dataSnapshot) => {
        this.props.refreshPrendas(dataSnapshot.val());
      })
    });
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

  onDeleteClothesAlert = (id)=>{
    Alert.alert(
    'Eliminar Prenda',
    '¿Esta seguro de eliminar esta Prenda?',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Eliminar', onPress: this.onPrendaDelete.bind(this,id)},
    ],
    { cancelable: false }
  )

  }
  onPrendaDelete = (id) => {
    let prendas = this.props.Prendas;
    let currentPrenda =  _.find(prendas, ['id', id]);
    userID = firebase.auth().currentUser.uid;
    prendasReference = firebase.database().ref(`/Users/${userID}/Prendas/`);
    if(currentPrenda.FotoURL){
      prendaStgRef = firebase.storage().ref(`Users/${userID}/Prendas/${currentPrenda.id}`);
      prendaStgRef.delete();
    }
    prendaToRemoveReference = prendasReference.child(currentPrenda.id).remove().then( () => {
      prendasReference.once('value',(dataSnapshot) => {
        this.props.refreshPrendas(dataSnapshot.val());
      });
    });
  }

  findUncategory = () => {
    let sinCat = this.props.Categorias;
    sinCat = _.find(sinCat,["Nombre","Sin clase"]);
    return sinCat
  }

  onDeleteAlertPrendas = ()=>{
    Alert.alert(
    'Eliminar Categoria',
    '¿Desea conservar sus prendas?',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Conservar', onPress:  this.removeAndDelete },
      {text: 'Eliminar TODO', onPress: this.deleteByCategory},
    ],
    { cancelable: false }
  )

  }

  removeAndDelete = () => {
    let currentCatID = this.props.navigation.state.params.CategorySelected.id;
    let userID = firebase.auth().currentUser.uid;
    prendasReference = firebase.database().ref(`Users/${userID}/Prendas`);
    prendasReference.on('child_added',(dataSnapshot) => {
      if(dataSnapshot.val()['Categoria'] == currentCatID){
        unCategoryID = this.findUncategory().id;
        firebase.database().ref(`Users/${userID}/Prendas/${dataSnapshot.key}`).child("Categoria").set(unCategoryID).then(()=>{
          prendasReference.once('value',(dataSnapshot) => {
            this.props.refreshPrendas(dataSnapshot.val());
          });
        });;
      }
    })
    this.deleteCategory();
  }

  deleteByCategory = () => {
    let currentCategory = this.props.navigation.state.params.CategorySelected;
    let catID = currentCategory.id;
    let userID = firebase.auth().currentUser.uid;
    prendasReference = firebase.database().ref(`Users/${userID}/Prendas/`);
    prendasReference.on('child_added',(dataSnapshot) => {
      if(dataSnapshot.val()['Categoria'] == catID){
        if(dataSnapshot.val()['FotoURL']){
          firebase.storage().ref(`Users/${userID}/Prendas/${dataSnapshot.key}`).delete();
        }
        prendasReference.child(dataSnapshot.key).remove().then(()=>{
          prendasReference.once('value',(dataSnapshot) => {
            this.props.refreshPrendas(dataSnapshot.val());
          });
        });
      }
    });

    this.deleteCategory();
  }

  deleteCategory=()=>{
    let currentCategory = this.props.navigation.state.params.CategorySelected;
    loggedUser = firebase.auth().currentUser;
    categoryReference = firebase.database().ref(`Users/${loggedUser.uid}/Categorias/`);
    if(currentCategory.FotoURL){
      categoryStgRef = firebase.storage().ref(`Users/${loggedUser.uid}/Categorias/${currentCategory.id}`);
      categoryStgRef.delete();
    }
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
    this.onPrendaStatusChange(item.id,STATUS_MISSING);
  }
  onSwipeL=(index)=>{
    prendas = this.prendasActivas();
    item = prendas[index];
    this.onPrendaStatusChange(item.id,STATUS_LAUNDRY);
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

  isEditor=()=>{
    let cats = this.props.Categorias;
    let cat = _.find(cats,["Nombre", "Sin clase"])
    if(cat.id == this.props.navigation.state.params.CategorySelected.id){
      return false
    }else{
      return true
    }
  }

  render() {
    return (
      <Container>
        <SwipeableListView
        isEditor={this.isEditor()}
        onEdit={this.onEditCategory}
        onDelete={this.onDeleteAlert}
        onDeleteClothes={this.onDeleteClothesAlert}
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
    addCategory: bindActionCreators(Actions.addCategory,dispatch),
    refreshPrendas: bindActionCreators(Actions.refreshPrendas,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoryView);
