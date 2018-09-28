import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,Button, ScrollView} from 'react-native';

import Category from "../Componentes/Category";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators as Actions} from '../Redux/Actions';

class CategoriesView extends Component{
  constructor(props){
    super(props);
  }

  onPressCategory=()=>{
    this.props.navigation.navigate("CategoryView")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topTitle}>
          <Text style={styles.title}>Preference Sets</Text>
        </View>
        <View style={styles.scrollView}>
          <ScrollView>
              <View style={styles.duoCategory}>
                <Category  categoryTitle='' imgSource='./plus.png'/>
                <Category onPress={this.onPressCategory} categoryTitle='Categoria 1' imgSource="./shirt.png"/>
              </View>

              <View style={styles.duoCategory}>
                <Category onPress={this.onPressCategory} categoryTitle={this.props.Categories[2]} imgSource="./shirt.png"/>
                <Category onPress={this.onPressCategory} categoryTitle={this.props.Categories[3]} imgSource="./shirt.png"/>
              </View>


            </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  topTitle:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'rgba(0, 197, 236, 1)',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scrollView:{
    flex: 9,
    backgroundColor: '#f0f0f0',
  },
  duoCategory:{
    flexDirection: 'row',
    justifyContent: 'center',
    height: 200,
    margin: 5,
    padding: 10,
  },

});

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
  )(CategoriesView);
