import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,Button, ScrollView} from 'react-native';

import Category from "../Componentes/Category";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class CategoriesView extends Component{
  constructor(props){
    super(props);
  }

  onPressCategory=(index)=>{
    this.props.categorySelected(index)
    this.props.navigation.navigate("CategoryView")
  }


  renderFistCategory(){
    if(this.props.Categories.length > 0){
       return <Category onPress={this.onPressCategory.bind(this,0)} categoryTitle={this.props.Categories[0][0]} imgSource="./shirt.png"/>;
     }else{
     return null;
   }
  }

  renderRestCategory(){
    let code = [];
	  for (var i=1; i < this.props.Categories.length; i=i+2) {
		    code.push(
          <View style={styles.duoCategory}>
              <Category onPress={this.onPressCategory.bind(this,i)} categoryTitle={this.props.Categories[i][0]} imgSource="./shirt.png"/>
              <Category onPress={this.onPressCategory.bind(this,i+1)} categoryTitle={this.props.Categories[i+1][0]} imgSource="./shirt.png"/>
          </View>
		      )
	  }
    return(code)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topTitle}>
          <Text style={styles.title}>Categories</Text>
        </View>
        <View style={styles.scrollView}>
          <ScrollView>
              <View style={styles.duoCategory}>
                <Category  categoryTitle='New' imgSource='./plus.png'/>
                {this.renderFistCategory()}
              </View>

              {this.renderRestCategory()}

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
    const {Categories,Loundry,Missing,CategorySelected} = state;
    return{
      Categories,
      Loundry,
      Missing,
      CategorySelected,
    };

}

function mapDispatchToProps(dispatch){
  return{
    addCategory: bindActionCreators(Actions.addCategory,dispatch),
    sendLoundry: bindActionCreators(Actions.sendLoundry,dispatch),
    deleteLoundry: bindActionCreators(Actions.deleteLoundry,dispatch),
    categorySelected: bindActionCreators(Actions.categorySelected,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CategoriesView);
