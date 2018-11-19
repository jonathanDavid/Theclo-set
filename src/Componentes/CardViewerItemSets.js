import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Footer,FooterTab, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image,  TouchableOpacity, } from 'react-native';

export default class CardViewerItem extends Component {

  renderImage=()=>{
    let code=[]
    if(this.props.imgUrl){
      for (var i=0; i < this.props.imgUrl.length; i=i+1) {
        code.push(<Image source={{uri:this.props.imgUrl[i]}} style={{margin:5,width: 70, height:70,borderRadius: 5,}}/>);
      }
    }
    return code;
  }

  renderTag=()=>{
    let code=[]
    if(this.props.isTag){
        code.push(<Icon type= "FontAwesome" name="tag"/>);
    }
    return code;
  }

  render() {
    return (
      <Container style={styles.viewMargin}>
        <Content>
          <TouchableOpacity onPress={this.props.onPress}>
            <Card transparent={this.props.isTransparent}>
              <CardItem>
                <Left>
                  <Body>
                    <Text numberOfLines={1} style={{color: '#4596ab',fontWeight: 'bold',fontSize: 15,}}>{this.props.Title}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <View style={styles.columnView}>
                  <View style={styles.itemView}>
                    {this.renderImage()}
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{flex:8}}>
                      <Text numberOfLines={1} style={{color: '#bbbbbb',fontSize: 10,}}>Ultimo uso: {this.props.details}</Text>
                    </View>
                    <View style={{flex:1}}>
                      {this.renderTag()}
                    </View>
                  </View>
                </View>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  itemView:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  columnView:{
    flex:1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  viewMargin:{
    margin: 5,
  },
});
