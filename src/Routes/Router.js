import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import CategoryView  from '../Vistas/CategoryView';
import LaundryView from '../Vistas/LaundryView';
import MissingView from '../Vistas/MissingView';
import Home from '../Vistas/Home';
import Sets from '../Vistas/Sets';

export const SignedIn = createStackNavigator({
  Home:{
    screen:Home,
    navigationOptions:{
      header:null,
    },
  },
  Sets:{
    screen:Sets,
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




export const RootNavigator=()=>{
  return createSwitchNavigator({
    SignedIn:{
      screen:SignedIn
    },
  },
  {
    initialRouteName:"SignedIn"
  });

}
