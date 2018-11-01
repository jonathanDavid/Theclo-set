import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

import SwipeableListView from '../Componentes/SwipeableListView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash'

const STATUS_CLOSET =  0;
const STATUS_LAUNDRY = 1;
const STATUS_MISSING = 2;

class MissingView extends Component{
  constructor(props){
    super(props)
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onPrendaStatusChange = (prendaID,statusID) => {
    const userID = firebase.auth().currentUser.uid;
    const route = `Users/${userID}/Prendas/${prendaID}/Estado`
    prendaReference = firebase.database().ref(route).set(statusID).then( () => {
      //Aqui llamar al metodo de render (Podria ser spinner por mientras)
    });
  }

  onSwipeL=(index)=>{
    //Send Loundry
    item = this.props.Missing[index];
    this.onPrendaStatusChange(item.id,STATUS_LAUNDRY)
  }

  onSwipeR=(index)=>{
    //this.props.deleteMissing(index);
    item = this.props.Missing[index];
    this.onPrendaStatusChange(item.id,STATUS_CLOSET)
  }

  loadPrendas=()=>{
    let prendas = this.props.Prendas;
        prendas = _.filter(prendas, ['Estado',2]);
    console.log(prendas)
    return prendas
  }

  render() {
    return (
      <Container>
          <SwipeableListView UrlImageL={require("./images/laundry_icon.png")}
          UrlImageR={require("./images/closet_icon.png")}
          onSwipeL={this.onSwipeL} onSwipeR={this.onSwipeR}
          onPressButtonBack={this.onPressBack} listViewData={this.loadPrendas()}
          btnRBkgColor='#6432c8' btnLBkgColor='#0b6623' headerColor='#be1e2d' Title={"Missing"}></SwipeableListView>
      </Container>
    );
  }
}

function mapStateToProps(state){
    const {Categories,Prendas} = state;
    return{
      Categories,
      Prendas
    };

}

function mapDispatchToProps(dispatch){
  return{
    sendLoundry: bindActionCreators(Actions.sendLoundry,dispatch),
    deleteMissing: bindActionCreators(Actions.deleteMissing,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(MissingView);
