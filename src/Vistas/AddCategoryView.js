import React, { Component } from 'react';
import {StyleSheet,StatusBar,View, Image } from 'react-native';
import { Container, Header,Label, Title, Content, Footer, Item, Input,FooterTab,Form, Button,Picker, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail } from 'native-base';
import ListViewer from '../Componentes/ListViewer';
import AddElement from '../Componentes/AddElement';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import firebase from 'firebase';

class AddCategoryView extends Component {
  constructor(props) {
    super(props);
    state={Name:'',Description:'',Photo:''};
  }
/*
  componentWillMount(){
    let data = this.props.navigation.state.params.categoryData;
    if(data){
      this.setState({Name: data.Nombre, Description: data.Descripcion});
    }else{
      this.setState({Name:'',Description:'',Photo:''});
    }
  }*/

  addNewCategory = (myData) => {
    let data = this.props.navigation.state.params.categoryData;
    loggedUser = firebase.auth().currentUser;
    userReference = firebase.database().ref(`Users/${loggedUser.uid}/Categorias/`);

    if(data){
      pushID = data.id;
    }else{
      pushID = userReference.push().key;
    }
    console.log(myData.Descripcion)
    let category = {Nombre: myData.Nombre, Descripcion: myData.Description, id: pushID}

    userReference.child(pushID).set(category)
    .then( () => {
      firebase.database().ref(`Users/${loggedUser.uid}`).once('value', (dataSnapshot) => {
        this.props.setState(dataSnapshot.val());
        this.props.navigation.navigate("CategoriesView");
      })
    });
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  OpenCamera=()=>{
    this.props.navigation.navigate("CameraView")
  }

  render() {
    return (
      <Container>
        <AddElement Title= {'Agregar Categoria'} onPressBack={this.onPressBack} OpenCamera={this.OpenCamera} addNew={this.addNewCategory}
         dataEdit={this.props.navigation.state.params.categoryData} ></AddElement>
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
    marginTop: 50,
    padding: 5,
    backgroundColor: '#6432c8',
  },
  buttonView:{
    flex:1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  }

});

function mapStateToProps(state){
    const {Categorias} = state;
    return{
      Categorias
    };

}

function mapDispatchToProps(dispatch){
  return{
    addCategory: bindActionCreators(Actions.addCategory,dispatch),
    editCategory: bindActionCreators(Actions.editCategory,dispatch),
    setState: bindActionCreators(Actions.setState,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryView);
