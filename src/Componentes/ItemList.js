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
          style={{width: 70, height:70,borderRadius: 5,}}
          source={{uri: this.props.imageUrl}}
        />
        </View>
        <View style={styles.itemTextBox}>
          <Text numberOfLines={1} style={{color: this.props.titleColor,fontWeight: 'bold',fontSize: 15,}} >{this.props.itemTitle}</Text>
          <Text numberOfLines={2} style={styles.itemTextCategory} >{this.props.itemCategory}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemView:{
    flex:1,
    flexDirection: 'row',
    padding: 0,
  },

  imageView:{
    paddingLeft: 10,
  },
  itemTextBox:{
    paddingLeft: 8,
    paddingTop: 8,
    flex:1,
  },
  itemTextCategory:{
    color: '#757575',
    fontSize: 10,
  },
});
