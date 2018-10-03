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
    categorySelected: bindActionCreators(Actions.categorySelected,dispatch),
    addChothes: bindActionCreators(Actions.addChothes,dispatch),
    sendMissing: bindActionCreators(Actions.sendMissing,dispatch),
    deleteMissing: bindActionCreators(Actions.categorySelected,dispatch), 
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Timer);
