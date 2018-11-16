import React, { Component } from 'react';
import {StyleSheet,StatusBar,View } from 'react-native';
import { Container, Header, Title, Content, Footer, Item, Input,FooterTab,Form, Button,Picker, Left, Right, Body, Icon, Text } from 'native-base';
import ListViewer from '../Componentes/ListViewer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';

class AddSetView extends Component {
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }
  constructor(props) {
    super(props);
    this.state = {
      setName:"",
      selectedCategoria: 0,
      selectedPrenda: 0,
      miSet:["NewSet"]
    };
  }

  onValueChangeCat(value) {
    this.setState({
      selectedCategoria: value
    });
  }

  onValueChangeClo(value) {
    this.setState({
      selectedPrenda: value
    });
  }

  categoriasNames = () => {
    let data = this.props.Categorias;
    data = _.map(data, 'Nombre');
    return data;
  }

  prendasValue = () => {
    let data = this.props.Prendas;
    data = _.map(data, 'Titulo');
    return data;
  }

  renderCategorias=()=>{
    let data = this.categoriasNames();
    let code = [];
    for (var i=0; i < data.length; i++) {
       code.push( <Picker.Item label={data[i]} value={i} />);
     }
    return code;
  }

  renderClothes=()=>{
    let data = this.prendasValue();
    let code=[];
    //prendas = this.props.Categorias[this.state.selectedCategorie].slice(1);
    prendas = data[this.state.selectedCategoria].slice(1);
    //prendas = prendas.filter(f => !this.state.miSet.includes(f));
    for(var i=0; i < prendas.length; i++){
      code.push(<Picker.Item label={prendas[i]} value={i} />)
    }
    return code;
  }

  addClothesToSet=()=>{
    let data = this.prendasValue();
    prendas = data[this.state.selectedCategoria].slice(1);
    prendas = prendas.filter(f => !this.state.miSet.includes(f));
    item=prendas[this.state.selectedPrenda];
    this.setState({
      miSet: [...this.state.miSet,item],
    })

  }
  addNewSet=()=>{
    this.props.addSet(this.state.miSet)
    this.props.navigation.goBack();
  }


  onChangeText=(Text)=>{
    this.setState({
      setName: Text,
    })
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#4596ab'}}>
          <StatusBar backgroundColor={'#4596ab'} barStyle="light-content"/>
          <Left>
            <Button onPress={this.onPressBack} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>New Set</Title>
          </Body>
        </Header>
        <Content>
          <Item >
            <Input  onChangeText={this.onChangeText} placeholder='Set Name'/>
            <Icon name='close-circle' />
          </Item>
          <Form>
            <View style={{flexDirection: 'row'}}>
              <Picker
                note={false}
                placeholder="Category"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                mode="dropdown"
                style={{ width: 150 }}
                selectedValue={this.state.selectedCategorie}
                onValueChange={this.onValueChangeCat.bind(this)}
              >
                {this.renderCategorias()}
              </Picker>
              <Picker
                note={false}
                mode="dropdown"
                placeholder="Clothes"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: 150 }}
                selectedValue={this.state.selectedPrenda}
                onValueChange={this.onValueChangeClo.bind(this)}
              >
                {this.renderClothes()}

              </Picker>
            </View>
          </Form>
          <Button onPress= {this.addClothesToSet} style={[styles.buttonLayout,{backgroundColor: '#4596ab'}]} block>
            <Text style={{color: 'white'}}>Add Clothes</Text>
          </Button>

          <ListViewer listViewData={this.state.miSet.slice(1)} ></ListViewer>
        </Content>
        <Footer>
          <FooterTab style ={{backgroundColor: '#ffffff',height: 100}}>
            <Button onPress= {this.addNewSet} style={[styles.buttonLayoutBottom,{backgroundColor: '#37afce'}]}  block>
              <Text style={{color: 'white',fontWeight: 'bold',fontSize: 16}}>Add Set</Text>
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
)(AddSetView);
