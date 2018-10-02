import React, { Component } from 'react';
//import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {RootNavigator} from './src/Routes/Router';
import {isSignedIn} from './src/Auth/Auth';
console.disableYellowBox = true;

import Reducer from './src/Redux/Reducers'
const store= createStore(Reducer);

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }
  componentDidMount(){
    isSignedIn("USER")
    .then(theValue => {
      if(theValue=='empty'){
        this.setState({signedIn: false, checkedSignIn:true})
      }else{
        this.setState({signedIn: true, checkedSignIn:true})
      }
    }).catch(err=>alert("Problem"));
  }

  render() {
   if (this.state.loading) {
     return (
       <Root>
         <AppLoading />
       </Root>
     );
   }
   const Layout = RootNavigator();
   return (
      <Provider store={store}>
        <Layout />
      </Provider>
   );
 }
}
