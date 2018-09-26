import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,Button, ScrollView} from 'react-native';

import Category from "../Componentes/Category";

export default class Sets extends Component{
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
                <Category onPress={this.onPressCategory} categoryTitle='Categoria 2' imgSource="./shirt.png"/>
                <Category onPress={this.onPressCategory} categoryTitle='Categoria 3' imgSource="./shirt.png"/>
              </View>

              <View style={styles.duoCategory}>
                <Category categoryTitle='Categoria 4' imgSource="./shirt.png"/>
                <Category categoryTitle='Categoria 5' imgSource="./shirt.png"/>
              </View>

              <View style={styles.duoCategory}>
                <Category categoryTitle='Categoria 6' imgSource="./shirt.png"/>
                <Category categoryTitle='Categoria 7' imgSource="./shirt.png"/>
              </View>

              <View style={styles.duoCategory}>
                <Category categoryTitle='Categoria 8' imgSource="./shirt.png"/>
                <Category categoryTitle='Categoria 9' imgSource="./shirt.png"/>
              </View>

              <View style={styles.duoCategory}>
                <Category categoryTitle='Categoria 10' imgSource="./shirt.png"/>
                <Category categoryTitle='Categoria 11' imgSource="./shirt.png"/>
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
