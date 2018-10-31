import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Fab } from 'native-base';
import { StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import CardViewerItem from './CardViewerItem';

export default class CardViewer extends Component {

  constructor(props){
    super(props);
    this.state = {
      active: false
    };
  }

  renderRestCategory(){
    let code = [];
    if(this.props.Data!=null){
      for (var i=0; i < this.props.Data.length; i=i+2) {
        if(i+1 < this.props.Data.length){
            code.push(
              <View style={styles.duoCategory}>
                <CardViewerItem onPress={this.props.onPressItem.bind(this,this.props.Data[i])} Title={this.props.Data[i]} imgUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}></CardViewerItem>
                <CardViewerItem onPress={this.props.onPressItem.bind(this,this.props.Data[i+1])} Title={this.props.Data[i+1]} imgUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}></CardViewerItem>
              </View>
              )
        }else{
            code.push(
              <View style={styles.oneCategory}>
                <CardViewerItem onPress={this.props.onPressItem.bind(this,this.props.Data[i])} Title={this.props.Data[i]} imgUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}></CardViewerItem>
              </View>
            )
          }
      }
    }
    return(code)
  }

  onPressNew = () => {
    this.setState({ active: !this.state.active });
    this.props.onPressNew();
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

          {this.renderRestCategory()}

        </Content>
        <View>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#6432c8' }}
            position="bottomRight"
            onPress={this.onPressNew /*() => this.setState({ active: !this.state.active })*/}>
          <Icon  type="FontAwesome" name="plus" />

          {/*
          <Button onPress={this.onPressNew}  style={{ backgroundColor: '#34A34F' }}>
            <Icon  type="FontAwesome" name="plus" />
          </Button>*/}
        </Fab>
        </View>
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
  },
  oneCategory:{
    flexDirection: 'row',
    justifyContent: 'center',
    height: 180,
    width: 185,
    margin: 0,
    padding: 5,
  },

  titleText: {
   fontSize: 20,
   fontWeight: 'bold',
 },

});
