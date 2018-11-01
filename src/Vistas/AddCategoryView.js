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
    state={Name:'',Description:'',Photo:'', isAccessingDb:false, isAccessingStg:false};
  }

  async uploadImage(uri, imageName, userId){
     //const uploadUri =  Platform.OS === 'ios' ? uri.replace('file://','') : uri;
     this.setState({isAccessingStg:true})
     mime = 'image/jpeg'
     const uploadUri = uri;
     const imageStorage = firebase.storage().ref(`Users/${userId}/Categorias/`).child(imageName);
     await fetch(uploadUri).then((response) => {
       response.blob().then((blobResponse) => {
         imageStorage.put(blobResponse, {contentType: mime}).then(()=>{
           this.setState({isAccessingStg:false})
           this.props.navigation.goBack();
         });
       })
     });
   }

  addNewCategory = (myData) => {
    this.setState({isAccessingDb:true});
    const userId = firebase.auth().currentUser.uid;
    const dbRoute = `Users/${userId}/Categorias/`
    categoryReference = firebase.database().ref(dbRoute);
    let pushID = myData.id;
    if(!pushID){
      pushID = categoryReference.push().key;
    }
    let route = myData.Foto;
    if(route){
      this.uploadImage(route,pushID,userId);
      const photoRoute = dbRoute+pushID;
      let category = {Nombre: myData.Nombre, Descripcion: myData.Descripcion, id: pushID, Foto: photoRoute}
      categoryReference.child(pushID).set(category).then( () => {
        this.setState({isAccessingDb:false})
      });
    }else{
      let category = {Nombre: myData.Nombre, Descripcion: myData.Descripcion, id: pushID, Foto: ''}
      categoryReference.child(pushID).set(category).then( () => {
        this.setState({isAccessingDb:false})
      });
    }

  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  OpenCamera=(event)=>{
    this.props.navigation.navigate("CameraView", {returnData: event} )
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryView);
