import React from 'react';
import {StyleSheet,Text,View,StatusBar,Aler} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators as Actions} from './Actions';


function mapStateToProps(state){
    const {Categories,Loundry,Missing} = state;
    return{
      Categories,
      Loundry,
      Missing
    };

}

function mapDispatchToProps(dispatch){
  return{
    addCategory: bindActionCreators(Actions.addCategory,dispatch),
    sendLoundry: bindActionCreators(Actions.sendLoundry,dispatch),
    deleteLoundry: bindActionCreators(Actions.deleteLoundry,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Timer);
