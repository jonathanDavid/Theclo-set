import React, { Component } from 'react';
import { Container, Header, Content,Footer,Button,FooterTab, Card,Item,Input, CardItem, Body,Icon, Text } from 'native-base';

import {Platform, StyleSheet, View, Image} from 'react-native';

import SwipeableListView from '../Componentes/SwipeableListView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash'

class CategoryView extends Component{
  constructor(props){
    super(props)
    this.state={
      inputText:"",
    }
  }
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  prendasActivas=()=>{
    let prendas = this.props.Prendas;
    let cat= this.props.Categorias[this.props.navigation.state.params.CategorySelected];
    prendas = _.filter(prendas, ['Categoria', cat]);
    prendas = _.filter(prendas, ['Estado', 0]);
    return prendas;
  }

  onSwipeL=(index)=>{
    this.props.sendLoundry(index);
  }

  onSwipeR=(index)=>{
    prendas = this.prendasActivas();
    item = prendas[index];
    item.Estado=2;
    this.props.sendMissing(item);
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

  render() {
    return (
      <Container>
        <SwipeableListView UrlImageL={require("./images/laundry_icon.png")}
        UrlImageR={require("./images/socks_icon.png")}
        onSwipeL={this.onSwipeL} onSwipeR={this.onSwipeR}
        onPressButtonBack={this.onPressBack} listViewData={this.prendasActivas()}
        btnRBkgColor='#be1e2d' btnLBkgColor='#0b6623' headerColor='#6432c8'
        Title={this.props.Categorias[this.props.navigation.state.params.CategorySelected]}></SwipeableListView>

        <Item>
          <Input  onChangeText={this.onChangeText} placeholder='Set Name'/>
        </Item>
        <Footer>
          <FooterTab style ={{backgroundColor: '#ffffff',height: 100}}>
            <Button onPress={this.addNewClothes} style={[styles.buttonLayoutBottom,{backgroundColor: '#6432c8'}]}  block>
              <Text style={{color: 'white',fontWeight: 'bold',fontSize: 16}}>Add Clothes</Text>
            </Button>
          </FooterTab>
        </Footer>
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
    addChothes: bindActionCreators(Actions.addChothes,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoryView);
