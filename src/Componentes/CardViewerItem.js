import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image,  TouchableOpacity, } from 'react-native';

export default class CardViewerItem extends Component {

  render() {
    return (
      <Container>
        <Content>
          <TouchableOpacity onPress={this.props.onPress}>
              <Card>
                 <CardItem>
                   <Left>
                     <Body>
                       <Text style={{fontWeight: 'bold'}}>{this.props.Title}</Text>
                     </Body>
                   </Left>
                 </CardItem>
                 <CardItem cardBody>
                   <Image source={{uri:this.props.imgUrl}} style={{height: 120, width: 120, flex: 1}}/>
                 </CardItem>
             </Card>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
