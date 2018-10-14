/*-------------------------------------*/
/*-------------Librerias---------------*/
/*-------------------------------------*/
/*Base y depuracion*/
import React, { Component } from 'react';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
/*Storage*/
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducer from './src/Redux/Reducers'
/*Componentes*/
//import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import Spinner from './src/Componentes/Spinner';
//import {isSignedIn} from './src/Auth/Auth';
/*Navegacion*/
import {RootNavigator} from './src/Routes/Router';
/*Base de datos*/
import ApiKeys from './src/Database/ApiKeys';
import firebase from 'firebase';
/*-------------------------------------*/
/*-----------Funcionalidades-----------*/
/*-------------------------------------*/
console.disableYellowBox = true;
const store= createStore(Reducer);


export default class App extends Component{
  constructor(props){
    super(props);
    this.state = { loading: true };
    //Inicializar conexion con base de datos
    if(!firebase.apps.length){
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }

  componentDidMount(){
    //Inicializar authentication listener
    this.authListener = firebase.auth().onAuthStateChanged( (loggedUser) => {
      if(loggedUser){
        this.setState({signedIn: true, checkedSignIn: true});
      }else{
        this.setState({signedIn: false, checkedSignIn: true});
      }
    });
  }

  /*Stop listening auth changes*/
  componentWillUnmount() {
    this.authListener();
  }

  render() {
   if (this.state.loading) {
     return (
       <Root>
         <AppLoading />
       </Root>
     );
   }
   const Layout = RootNavigator(this.state.signedIn);
   return (
      <Provider store={store}>
        <Layout />
      </Provider>
   );
 }
}
