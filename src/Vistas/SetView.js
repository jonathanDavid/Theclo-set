import React, { Component } from 'react';
import { Container, Header, Left,Title, Content,Footer,Button,FooterTab, Card,Item,Input,Right, CardItem, Body,Icon, Text } from 'native-base';

import {Platform, StyleSheet,StatusBar, View, Image,Alert} from 'react-native';

import ListViewer from '../Componentes/ListViewer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';



class SetView extends Component{
  constructor(props){
    super(props)
    this.state={
      inputText:"",
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
    prendas = _.filter(prendas, function(el){
        return ~selectedPrendas.indexOf(el.id)
    })
    return prendas;
  }

  onDeleteItem =(id)=>{
    Alert.alert('Eliminar prenda del Conjunto','',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Eliminar', onPress: ()=>{
        let arrayPrendas = this.state.sets.Prendas;
        arrayPrendas.splice(arrayPrendas.indexOf(id), 1);

        //arrayPrendas tiene el nuevo arreglo de Prendas hay que agregarlo a ba BD

      }},
    ],
    { cancelable: false }
    )
  }

  onDeleteSET =()=>{
    Alert.alert('Eliminar el Conjunto','',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Eliminar', onPress: ()=>{
        let setId = this.props.navigation.state.params.setSelected.id;

        //eliminar el set con el setId

      }},
    ],
    { cancelable: false }
    )
  }

  onPressTagSET =()=>{
    Alert.alert('Desea usar este Conjunto?','',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Aceptar', onPress: ()=>{
        let setId = this.props.navigation.state.params.setSelected.id;
        let date = new Date();
        let last_used = date.toString()

        //establecer EnUso como true, y la fecha de Last_used como la fecha de hoy
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
    const {Categorias,Prendas} = state;
    return{
      Categorias,
      Prendas
    };
}

function mapDispatchToProps(dispatch){
  return{

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetView);
