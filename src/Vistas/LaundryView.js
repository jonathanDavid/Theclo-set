import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import SwipeableListView from '../Componentes/SwipeableListView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import firebase from 'firebase';
import _ from 'lodash'

const STATUS_CLOSET =  0;
const STATUS_LAUNDRY = 1;
const STATUS_MISSING = 2;

class  LaundryView extends Component{
  constructor(props){
    super(props)
  }

  onPrendaStatusChange = (prendaID,statusID) => {
    const userID = firebase.auth().currentUser.uid;
    const route = `Users/${userID}/Prendas/${prendaID}/Estado`
    const prendasReference = firebase.database().ref(`Users/${userID}/Prendas/`);
    prendaReference = firebase.database().ref(route).set(statusID).then( () => {
      //Aqui llamar al metodo de render (Podria ser spinner por mientras)
      prendasReference.once('value', (dataSnapshot) => {
        this.props.refreshPrendas(dataSnapshot.val());
      })
    });
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onSwipeL=(index)=>{
    let misPrendas = this.loadPrendas()
    item = misPrendas[index];
    this.onPrendaStatusChange(item.id,STATUS_MISSING)
  }

  onSwipeR=(index)=>{
    let misPrendas = this.loadPrendas()
    item = misPrendas[index];
    this.onPrendaStatusChange(item.id,STATUS_CLOSET)
  }

  loadPrendas=()=>{
    let prendas = this.props.Prendas;
    prendas = _.filter(prendas, ['Estado', 1]);
    console.log(prendas)
    return prendas
  }

  render() {
    return (
      <Container>
          <SwipeableListView UrlImageL={require("./images/socks_icon.png")}
          UrlImageR={require("./images/closet_icon.png")}
          onSwipeL={this.onSwipeL} onSwipeR={this.onSwipeR}
          onPressButtonBack={this.onPressBack} listViewData={this.loadPrendas()}
          btnRBkgColor='#6432c8' btnLBkgColor='#be1e2d' headerColor='#0b6623' Title={"Loundry"}></SwipeableListView>
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
  )(LaundryView);
