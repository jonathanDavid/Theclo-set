import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Fab } from 'native-base';

import Category from "../Componentes/Category";
import CardViewer from "../Componentes/CardViewer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';

class SetsView extends Component{

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onPressItem=(index)=>{
    let obj = _.filter(this.props.Sets, ['Nombre', index]);
    console.log(obj[0].Nombre);
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

  render() {
    return (
        <Container>
          <CardViewer addNewClothes={this.addNewClothes} Data={this.setsNames()} onPressItem={this.onPressItem}
                  Title="Sets" onPressButtonBack={this.onPressBack} headerColor='#4596ab' onPressNew={this.onPressNew}></CardViewer>
        </Container>
    );
  }
}

function mapStateToProps(state){
    const {Sets} = state;
    return{
      Sets
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
)(SetsView);


/*import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import CardViewer from "../Componentes/CardViewer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class SetsView extends Component{
  constructor(props){
    super(props);
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onPressItem=(index)=>{
    this.props.setSelected(index);
    this.props.navigation.navigate("SetView");
  }

  onPressNew=()=>{
    this.props.navigation.navigate("AddSetView")
  }


  render() {
    return (
            <CardViewer Data={this.props.Sets} onPressNew={this.onPressNew} onPressItem={this.onPressItem}
              Title="Sets" onPressButtonBack={this.onPressBack} headerColor='#4596ab'></CardViewer>
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
    addSet: bindActionCreators(Actions.addSet,dispatch),
    setSelected: bindActionCreators(Actions.setSelected,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetsView);*/
