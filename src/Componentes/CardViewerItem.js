import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Footer,FooterTab, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image,  TouchableOpacity, } from 'react-native';

export default class CardViewerItem extends Component {

  renderImage=()=>{
    let code=[]
      if(this.props.imgUrl==""){
        code.push(
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <Image source={require("../Vistas/images/NoFoto.png")} style={{height: 120, width: 120}}/>
          </View>
        );
      }else{
        code.push(<Image source={{uri:this.props.imgUrl}} style={{height: 120, width: 120, flex: 1}}/>);
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
                    <Text numberOfLines={1} style={{color: '#6432c8',fontWeight: 'bold',fontSize: 15,}}>{this.props.Title}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                {this.renderImage()}
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  viewMargin:{
    margin: 5,
  },
});
