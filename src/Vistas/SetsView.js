import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab } from 'native-base';

import CardViewerSets from "../Componentes/CardViewerSets";
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

    setsDetails = () => {
      let data = this.props.Sets;
      data = _.map(data, 'LastUsed');
      for (var i=0; i < data.length; i=i+1) {
        let date = new Date(data[i])
        if(data[i]!="Nunca"){
          data[i] = date.toLocaleDateString("es-CO")
        }

      }
      return data;
    }

    setsCurrent= () => {
      let data = this.props.Sets;
      data = _.map(data, 'EnUso');
      return data;
    }

  setsPhoto = () => {
    let images = [];
    if(this.props.Sets){
      let sets = Object.values(this.props.Sets);
      for (var i=0; i < sets.length; i=i+1) {
        let selectedPrendas =  sets[i].Prendas
        let prendas = this.props.Prendas;
        if(selectedPrendas){
          prendas =  _.filter(prendas, function(el){
              return  ~selectedPrendas.indexOf(el.id)
          })
          images[i] = _.map(prendas,'FotoURL')
        }else{
          images[i]=[]
        }
      }
    }
    return images
  }

  render() {
    return (
        <Container>
          <CardViewerSets addNewClothes={this.addNewClothes} Data={this.setsNames()} DataID={this.setsID()} DataFoto={this.setsPhoto()} DataDetails={this.setsDetails()} DataUsed={this.setsCurrent()} onPressItem={this.onPressItem}
                  Title="Conjuntos" onPressButtonBack={this.onPressBack} headerColor='#4596ab' onPressNew={this.onPressNew}></CardViewerSets>
        </Container>
    );
  }
}

function mapStateToProps(state){
    const {Sets,Prendas} = state;
    return{
      Prendas,
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
