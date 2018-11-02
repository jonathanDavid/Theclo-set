/*React*/
import React,   { Component } from 'react';
import { StyleSheet,StatusBar,View,Image } from 'react-native';
/*Components*/
import { Container,Card,Label,Header,Form,Content,Button,Text,CardItem,Item,Body,Title,Input,Icon,Right,Left } from 'native-base';
import { Spinner } from '../Componentes/Spinner';
import AddElement  from '../Componentes/AddElement';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import firebase from 'firebase';

class AddPrendaView extends Component {
  constructor(props){
    super(props);
    state={Name:'',Description:'',Photo:'', id:'', isAccessingDb:false, isAccessingStg:false};
  }

 async uploadImage(uri, imageName, userId, categoryId){
    //const uploadUri =  Platform.OS === 'ios' ? uri.replace('file://','') : uri;
    this.setState({isAccessingStg:true})
    mime = 'image/jpeg'
    const uploadUri = uri;
    const imageStorage = firebase.storage().ref(`Users/${userId}/Prendas/`).child(imageName);
    const prendasReference = firebase.database().ref(`Users/${userId}/Prendas/`);
    await fetch(uploadUri).then((response) => {
      response.blob().then((blobResponse) => {
        imageStorage.put(blobResponse, {contentType: mime}).then(()=>{
          this.setState({isAccessingStg:false})
          prendasReference.once('value', (dataSnapshot) => {
            this.props.refreshPrendas(dataSnapshot.val());
          })
          this.props.navigation.goBack();
        });
      })
    });
  }

  OpenCamera=(event)=>{
    this.props.navigation.navigate("CameraView",{returnData: event})
  }
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  addNewPrenda=(myData)=>{
    //Aqui se agrega el metodo de agregar prenda
    this.setState({isAccessingDb:true});
    const userId = firebase.auth().currentUser.uid;
    const dbRoute = `Users/${userId}/Prendas/`
    let category = this.props.navigation.state.params.categorySelected;
    prendaReference = firebase.database().ref(dbRoute);
    let pushID = myData.id;
    if(!pushID){
      pushID = prendaReference.push().key;
    }
    let route = myData.Foto;
    console.log(route)
    if(route){
      this.uploadImage(route,pushID,userId,category.id);
      const photoRoute = dbRoute+pushID;
      let prenda = {Titulo: myData.Nombre, Descripcion: myData.Descripcion, Estado: 0, Categoria: category.id, Foto: photoRoute, id: pushID}
      prendaReference.child(pushID).set(prenda).then( () => {
        this.setState({isAccessingDb:false})
      });
    }else{
      let prenda = {Titulo: myData.Nombre, Descripcion: myData.Descripcion, Estado: 0, Categoria: category.id, Foto: '',id: pushID}
      prendaReference.child(pushID).set(prenda)
      .then( () => {
        this.setState({isAccessingDb:false})
      });
    }

  }

  render() {
    return (
      <Container>
        <AddElement Title= {'Agregar Prenda'} onPressBack={this.onPressBack} OpenCamera={this.OpenCamera} addNew={this.addNewPrenda} dataEdit={this.props.navigation.state.params.paramData} ></AddElement>
      </Container>
    );
  }
}

function mapStateToProps(state){
    const {Prendas} = state;
    return{
      Prendas
    };

}

function mapDispatchToProps(dispatch){
  return{
    refreshPrendas: bindActionCreators(Actions.refreshPrendas,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(AddPrendaView);
