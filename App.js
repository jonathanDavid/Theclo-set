/*-------------------------------------*/
/*-------------Librerias---------------*/
/*-------------------------------------*/
/*Base y depuracion*/
import React, { Component } from 'react';
import { Root,Spinner,View,Text } from "native-base";
import { Font, AppLoading } from "expo";
/*Storage*/
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducer from './src/Redux/Reducers'

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
    if(!firebase.apps.length){
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
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
   if(this.state.checkedSignIn){
     return (
        <Provider store={store}>
          <Layout />
        </Provider>
     );
   }else{
     return (
        <Provider store={store}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',}}>
            <Spinner color='black'/>
            <Text style={{fontSize: 20, textAlign: 'center' , fontWeight: `bold`}}>Espere...</Text>
          </View>
        </Provider>
     );
   }
 }
}
