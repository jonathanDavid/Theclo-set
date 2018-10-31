/*React*/
import React,   { Component } from 'react';
import { StyleSheet,StatusBar,View,Image } from 'react-native';
/*Components*/
import { Container,Card,Label,Header,Form,Content,Button,Text,CardItem,Item,Body,Title,Input,Icon,Right,Left } from 'native-base';
import { Spinner } from '../Componentes/Spinner';
import AddElement  from '../Componentes/AddElement';
/*Database and Auth*/
import firebase from 'firebase';


export default class AddPrendaView extends Component {
  constructor(props){
    super(props);
    state={Name:'',Description:'',Photo:''};
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  OpenCamera=(event)=>{
    this.props.navigation.navigate("CameraView",{returnData: event})
  }
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }


  addNewPrenda=(myData)=>{
    //Aqui se agrega el metodo de agregar prenda
    alert(myData.Nombre)
  }


  render() {
    return (
      <Container>
        <AddElement Title= {'Agregar Prenda'} onPressBack={this.onPressBack} OpenCamera={this.OpenCamera} addNew={this.addNewPrenda} dataEdit={this.props.navigation.state.params.paramData} ></AddElement>
      </Container>
    );
  }
}
