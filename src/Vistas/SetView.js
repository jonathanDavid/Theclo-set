import React, { Component } from 'react';
import { Container, Header, Left,Title, Content,Footer,Button,FooterTab, Card,Item,Input,Right, CardItem, Body,Icon, Text } from 'native-base';

import {Platform, StyleSheet,StatusBar, View, Image,Alert} from 'react-native';

import ListViewer from '../Componentes/ListViewer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';
import firebase from 'firebase'



class SetView extends Component{
  constructor(props){
    super(props)
    this.state={
      inputText:"",
      update:false,
    }
  }
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  addNewClothes=()=>{
    alert(this.state.inputText);
    this.props.addChothes(this.state.inputText);
  }
  onChangeText=(input)=>{
    this.setState({
      inputText:input,
    })
  }

  getDataToShow=()=>{
    let prendas = this.props.Prendas;
    let selectedPrendas =this.props.navigation.state.params.setSelected.Prendas;
    if(selectedPrendas){
      prendas = _.filter(prendas, function(el){
          return ~selectedPrendas.indexOf(el.id)
      })
      return prendas;
    }else{
      return []
    }

  }

  updatePrendasArray = (prendas) => {
    let userID = firebase.auth().currentUser.uid;
    let setID = this.props.navigation.state.params.setSelected.id;
    setsReference = firebase.database().ref(`Users/${userID}/Sets/${setID}`);
    setsReference.child("Prendas").set(prendas).then(()=>{
      firebase.database().ref(`Users/${userID}/Sets/`).once('value',(dataSnapshot)=>{
        this.setState({update:true})
        this.props.refreshSets(dataSnapshot.val());
      })
    });
  }

  onDeleteItem =(id)=>{
    Alert.alert('Eliminar prenda del Conjunto','',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Eliminar', onPress: ()=>{
        let arrayPrendas = this.props.navigation.state.params.setSelected.Prendas;
        arrayPrendas.splice(arrayPrendas.indexOf(id), 1);
        this.updatePrendasArray(arrayPrendas);
      }},
    ],
    { cancelable: false }
    )
  }

  deleteCurrentSet = (setID) => {
    let userID = firebase.auth().currentUser.uid;
    let setsReference = firebase.database().ref(`Users/${userID}/Sets/${setID}`);
    setsReference.remove().then(()=>{
       firebase.database().ref(`Users/${userID}/Sets/`).once('value',(dataSnapshot)=>{
       this.props.refreshSets(dataSnapshot.val());
      })
      this.props.navigation.goBack();
    });
  }

  onDeleteSET =()=>{
    Alert.alert('Eliminar el Conjunto','',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Eliminar', onPress: ()=>{
        let setID = this.props.navigation.state.params.setSelected.id;
        this.deleteCurrentSet(setID);
      }},
    ],
    { cancelable: false }
    )
  }


  updateLastUsedSet = (setID,lastUsed) => {
    const STATUS_LAUNDRY = 1;
    let userID = firebase.auth().currentUser.uid;
    let setsReference = firebase.database().ref(`Users/${userID}/Sets/${setID}`);
    let prendaReference = firebase.database().ref(`Users/${userID}/Prendas`);
    setsReference.child("LastUsed").set(lastUsed);
    setsReference.child("EnUso").set(true);

    setsReference.on('value',(dataSnapshot) => {
      let currentSet = dataSnapshot.val();
      _.forEach(currentSet.Prendas, (prendaID) => {
        prendaReference.child(`${prendaID}/Estado`).set(STATUS_LAUNDRY);
      })
      firebase.database().ref(`Users/${userID}/Prendas/`).once('value',(dataSnapshot)=>{
          this.props.refreshPrendas(dataSnapshot.val());
      })
    })

    let sets = Object.values(this.props.Sets)
    for(var i=0; i < sets.length; i=i+1){
      if(sets[i].id!= setID){
        let setsReferencetemp = firebase.database().ref(`Users/${userID}/Sets/${sets[i].id}`);
        setsReferencetemp.child("EnUso").set(false)
      }
    }

    firebase.database().ref(`Users/${userID}/Sets/`).once('value',(dataSnapshot)=>{
      this.props.refreshSets(dataSnapshot.val());
    })
  }

  onPressTagSET =()=>{
    Alert.alert('Desea usar este Conjunto?','',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Aceptar', onPress: ()=>{
        let setID = this.props.navigation.state.params.setSelected.id;
        let date = new Date();
        let lastUsed = date.toString();
        this.updateLastUsedSet(setID,lastUsed);
        //Poner el estado de la ropa del set e Loumdry
      }},
    ],
    { cancelable: false }
    )
  }


  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'#4596ab'}}>
          <StatusBar backgroundColor={"#4596ab"} barStyle="light-content"/>
          <Left>
            <Button onPress={this.onPressBack} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
             <Title>{this.props.navigation.state.params.setSelected.Nombre}</Title>
          </Body>
          <Right>
            <Button onPress={this.onPressTagSET} transparent>
              <Icon type="FontAwesome" name='tag' />
            </Button>
            <Button onPress={this.onDeleteSET} transparent>
              <Icon type="FontAwesome" name='trash' />
            </Button>
          </Right>
        </Header>
        <Content>
          <ListViewer isAdding onPressItem={this.onDeleteItem} listViewData={this.getDataToShow()}></ListViewer>
        </Content>
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
    const {Categorias,Prendas,Sets} = state;
    return{
      Categorias,
      Prendas,
      Sets
    };
}

function mapDispatchToProps(dispatch){
  return{
      refreshSets: bindActionCreators(Actions.refreshSets,dispatch),
      refreshPrendas: bindActionCreators(Actions.refreshPrendas,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetView);
