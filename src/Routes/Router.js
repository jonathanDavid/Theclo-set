import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import MenuView from '../Vistas/MenuView';
import SetsView from '../Vistas/SetsView';
import SetView from '../Vistas/SetView';
import AddSetView from '../Vistas/AddSetView';
import CategoriesView from '../Vistas/CategoriesView';
import CategoryView  from '../Vistas/CategoryView';
import LaundryView from '../Vistas/LaundryView';
import MissingView from '../Vistas/MissingView';

import LoginView from '../Vistas/LoginView';
import CreateAccountView from '../Vistas/CreateAccountView';
import CardViewer from '../Componentes/CardViewer';


export const SignedIn = createStackNavigator({
  MenuView:{
    screen:MenuView,
    navigationOptions:{
      header:null,
    },
  },
  AddSetView:{
    screen:AddSetView,
    navigationOptions:{
      header:null,
    },
  },
  SetsView:{
    screen:SetsView,
    navigationOptions:{
      header:null,
    },
  },
  SetView:{
    screen:SetView,
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
