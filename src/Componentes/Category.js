import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native';

export default class Category extends Component{
  constructor(props) {
    super(props);
    this.state={
      //imgCategory: this.props.imgSource,
      pressCategory: false,
    }
  }

  render() {
    return (

      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.category}>
          <View style={styles.containerHeader}>
            <Text style={styles.titleCategory}>{this.props.categoryTitle}</Text>
          </View>
          <View style={styles.containerBody}>
            <Image source={require('./shirt.png')} style={styles.imgCategory} />
          </View>
          {/*<View style={styles.containerFooter}>
          </View>*/}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  category: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: 'white',
    height: '90%',
    width: '40%',
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bbbbbb',
  },
  containerHeader:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCategory: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerBody:{
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCategory: {
    height: '80%',
    width: 100,
  },


  //Por si se necesita
  containerFooter:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
