import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import CardViewerItem from './CardViewerItem';

export default class CardViewer extends Component {

  renderFistCategory(){
    if(this.props.Data.length > 0){
       return <CardViewerItem onPress={this.props.onPressItem.bind(this,0)} Title={this.props.Data[0][0]} imgUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}></CardViewerItem>;
     }else{
     return null;
   }
  }

  renderRestCategory(){
    let code = [];
    for (var i=1; i < this.props.Data.length; i=i+2) {
      if(i+1 < this.props.Data.length){
          code.push(
            <View style={styles.duoCategory}>
              <CardViewerItem onPress={this.props.onPressItem.bind(this,i)} Title={this.props.Data[i][0]} imgUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}></CardViewerItem>
              <CardViewerItem onPress={this.props.onPressItem.bind(this,i+1)} Title={this.props.Data[i+1][0]} imgUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}></CardViewerItem>
            </View>
            )
      }else{
          code.push(
            <View style={styles.oneCategory}>
              <CardViewerItem onPress={this.props.onPressItem.bind(this,i)} Title={this.props.Data[i][0]} imgUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}></CardViewerItem>
            </View>
          )
        }

    }
    return(code)
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: this.props.headerColor}}>
          <StatusBar backgroundColor={this.props.headerColor} barStyle="light-content"/>
          <Left>
            <Button onPress={this.props.onPressButtonBack} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.Title}</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.duoCategory}>
            <CardViewerItem onPress={this.props.onPressNew} Title={'New'} imgUrl={'https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/plus-big-512.png'}></CardViewerItem>
            {this.renderFistCategory()}
          </View>

          {this.renderRestCategory()}

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  duoCategory:{
    flexDirection: 'row',
    justifyContent: 'center',
    height: 180,
    margin: 5,
    padding: 10,
  },
  oneCategory:{
    flexDirection: 'row',
    justifyContent: 'center',
    height: 180,
    width: 185,
    margin: 5,
    padding: 10,
  },

  titleText: {
   fontSize: 20,
   fontWeight: 'bold',
 },

});
