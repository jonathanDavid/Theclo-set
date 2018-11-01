import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Footer,FooterTab, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image,  TouchableOpacity, } from 'react-native';

export default class CardViewerItem extends Component {

  render() {
    return (
      <Container style={styles.viewMargin}>
        <Content>
          <TouchableOpacity onPress={this.props.onPress}>
            <Card transparent={this.props.isTransparent}>
              <CardItem>
                <Left>
                  <Body>
                    <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{this.props.Title}</Text>
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

const styles = StyleSheet.create({

  viewMargin:{
    margin: 5,
  },
});
