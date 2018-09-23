import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class ItemList extends Component{
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={styles.itemView}>
        <View style={styles.imageView}>
          <Image
          style={{width: 50, height: 50}}
          source={{uri: this.props.imageUrl}}
        />
        </View>
        <View style={styles.itemTextBox}>
          <Text style={styles.itemTextTitle} >{this.props.itemTitle}</Text>
          <Text style={styles.itemTextCategory} >{this.props.itemCategory}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemView:{
    flex:1,
    flexDirection: 'row',
    padding: 5,
  },

  imageView:{
    padding: 5,
  },
  itemTextBox:{
    paddingLeft: 8,
    paddingTop: 8,
  },
  itemTextTitle:{
    fontWeight: 'bold',
    color: '#212121',
    fontSize: 20,
  },
  itemTextCategory:{
    color: '#757575',
    fontSize: 15,
  },
});
