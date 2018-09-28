import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import MenuView from '../Vistas/MenuView';
import Home from '../Vistas/Home';
import CategoriesView from '../Vistas/CategoriesView';
import CategoryView  from '../Vistas/CategoryView';
import LaundryView from '../Vistas/LaundryView';
import MissingView from '../Vistas/MissingView';

import LoginView from '../Vistas/LoginView';
import CreateAccountView from '../Vistas/CreateAccountView';



export const SignedIn = createStackNavigator({
  MenuView:{
    screen:MenuView,
    navigationOptions:{
      header:null,
    },
  },
  Home:{
    screen:Home,
    navigationOptions:{
      header:null,
    },
  },
  CategoriesView:{
    screen:CategoriesView,
    navigationOptions:{
      header:null,
    },
  },
  CategoryView:{
    screen:CategoryView,
    navigationOptions:{
      header:null,
    },
  },
  LaundryView:{
    screen:LaundryView,
    navigationOptions:{
      header:null,
    },
  },
  MissingView:{
    screen:MissingView,
    navigationOptions:{
      header:null,
    },
  }
});

export const SignedOut = createStackNavigator({
  LoginView:{
    screen:LoginView,
    navigationOptions:{
      header:null,
    },
  },
   CreateAccountView:{
    screen: CreateAccountView,
    navigationOptions:{
      header:null,
    },
  }

});

export const RootNavigator=(value=false)=>{
  return createSwitchNavigator({
    SignedIn:{
      screen:SignedIn
    },
    SignedOut:{
      screen:SignedOut
    },
  },
  {
    initialRouteName: value ? "SignedIn":"SignedIn"
  });

}
