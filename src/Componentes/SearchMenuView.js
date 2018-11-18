import React, { Component } from 'react';
import {StyleSheet,StatusBar,View, TouchableOpacity } from 'react-native';
import { Container, Header, Item, Separator, ListItem, Title, Content, Footer,Input, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';

 class SearchMenuView extends Component {
   constructor(props){
     super(props)
     this.state ={categoriesState:-1,searchField:"",miSet:[]}
   }

   categoriasNames = () => {
     let data = this.props.Categorias;
     data = _.map(data, 'Nombre');
     return data;
   }

  renderCategorias=()=>{

    let code = [];
    if(this.state.searchField!=""){
      code=this.renderClothesSearch();
    }else{
      let data = this.categoriasNames();
      for (var i=0; i < data.length; i++) {
         code.push(
           <View>
            <TouchableOpacity onPress={this.openCategory.bind(this,i)}>
              <Separator bordered>
                <Text>{data[i]}</Text>
              </Separator>
            </TouchableOpacity>
              {this.renderClothes(i)}
          </View>

          );
       }
    }
    return code;
  }
  renderClothes = (index) => {
    let code = []
    if(this.state.categoriesState==index){
      let data = this.props.Categorias;
      data = _.map(data, 'id');
      let prendas = this.props.Prendas;
      prendas = _.filter(prendas, ['Categoria', data[index]])
        for (var i=0; i < prendas.length; i++) {
          code.push(
            <ListItem>
              <TouchableOpacity onPress={this.selectClothes.bind(this,prendas[i].id)}>
                <Text>{prendas[i].Titulo}</Text>
              </TouchableOpacity>
            </ListItem>
          );
        }
    }
    return code;
  }

  renderClothesSearch = () => {
      let prendas = this.props.Prendas;
      let id = _.map(prendas,'id')
      let titulos = _.map(prendas,'Titulo')
      let rgex= new RegExp(this.state.searchField,"i")
      prendas = id.map( (s, i) => {
        if(titulos[i].match(rgex)){
          return ({id : s, Titulo : titulos[i]})
        }else{
          return null
        }
      });
      let code=[]
      for (var i=0; i < prendas.length; i++) {
        if(prendas[i]){
          code.push(
              <ListItem>
                <TouchableOpacity onPress={this.selectClothes.bind(this,prendas[i].id)}>
                  <Text>{prendas[i].Titulo}</Text>
                </TouchableOpacity>
              </ListItem>
          );
        }
      }
      return code;
  }

  selectClothes=(id)=>{
    this.props.addClothesToList(id)
  }

  openCategory=(index)=>{
    if(this.state.categoriesState != index){
      this.setState({categoriesState: index})
    }else{
      this.setState({categoriesState: -1})
    }

  }

  render() {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#4596ab'}}>
          <StatusBar backgroundColor={'#4596ab'} barStyle="light-content"/>
          <Item>
            <Input style={{fontSize: 15,fontWeight: 'bold',color: '#4596ab'}} placeholder="Buscar" value={this.state.searchField} onChangeText={(text)=>{this.setState({searchField: text})}}/>
            <TouchableOpacity onPress={()=>{this.setState({searchField: ""})}}>
              <Icon type="FontAwesome" name="times" />
            </TouchableOpacity>
          </Item>
        </Header>
        <Content>
          {this.renderCategorias()}

        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state){
    const {Categorias,Prendas} = state;
    return{
      Categorias,
      Prendas,
    };

}

function mapDispatchToProps(dispatch){
  return{

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchMenuView);
