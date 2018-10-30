import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab } from 'native-base';

import Category from "../Componentes/Category";
import CardViewer from "../Componentes/CardViewer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class CategoriesView extends Component{
  constructor(props){
    super(props);
    this.state = {
      active: false
    };
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onPressItem=(index)=>{
  //this.props.categorySelected(index);
    this.props.navigation.navigate("CategoryView", {CategorySelected: index});
  }

  onPressNew=()=>{
    this.props.navigation.navigate("AddCategoryView");
  }

  render() {
    return (
        <Container>
          <CardViewer addNewClothes={this.addNewClothes} Data={this.props.Categorias} onPressItem={this.onPressItem}
                  Title="Categorias" onPressButtonBack={this.onPressBack} headerColor='#6432c8'></CardViewer>
          <View style={{ flex: 1 }}>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#6432c8' }}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active })}>
            <Icon type="FontAwesome" name="bars" />

            <Button  style={{ backgroundColor: '#DD5144' }}>
              <Icon type="FontAwesome"  name="trash" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon type="FontAwesome"  name="edit" />
            </Button>
            <Button onPress={this.onPressNew}  style={{ backgroundColor: '#34A34F' }}>
              <Icon  type="FontAwesome" name="plus" />
            </Button>
          </Fab>
          </View>

        </Container>
    );
  }
}


function mapStateToProps(state){
    const {Categorias,Loundry,Missing,CategorySelected} = state;
    return{
      Categorias,
      Loundry,
      Missing,
      CategorySelected,
    };

}

function mapDispatchToProps(dispatch){
  return{
    addCategory: bindActionCreators(Actions.addCategory,dispatch),
    categorySelected: bindActionCreators(Actions.categorySelected,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoriesView);
