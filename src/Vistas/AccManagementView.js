/*React*/
import React, { Component } from 'react';
import { StatusBar,Image } from 'react-native';
/*components*/
import { Container, Header, Title, Content, Button, Left, Body, Icon, Card, Label, Item, Input, CardItem, Text,Accordion  } from 'native-base';
/*Firebase*/
import firebase from 'firebase';
/*Redux*/
const infoArray = [
  { title: "Que es Theclo-set?", content: "Una pequeña aplicacion desarrollada para facilitar la organizacion de TU ropa" },
  { title: "Quienes Somos?", content: "Somos estudiantes de la Universidad del Norte, en busqueda de conocimeinto y renombre" },
  { title: "Github link", content: "https://github.com/Schurches/Theclo-set" }
];

export default class AccManagementView extends Component {
  state = {user: '', email: '', password: '', error: '', dbRequest: false}

  constructor(props){
    super(props)
  }

  onButtonBackPress = () => {
    this.props.navigation.goBack();
  }

  onSignOutPress = () => {
    this.setState({error: '', dbRequest: true});
    firebase.auth().signOut()
    .then( () => {
      this.props.navigation.navigate("LoginView");
    })
    .catch( (error) => {
      this.setState({error: error.message, dbRequest: false});
    });
  }


  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={this.onButtonBackPress} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Management</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem header>
              <Text>Information</Text>
            </CardItem>
            <CardItem>
              <Item>
               <Icon active name='mail' />
               <Input value={this.state.email} placeholder="Email" onChangeText={(email) => {this.setState({email: email})}}/>
              </Item>
            </CardItem>
            <CardItem>
              <Item>
                <Icon active name='lock' />
                <Input value={this.state.password} placeholder="Password" onChangeText={(password) => {this.setState({password: password})}}/>
              </Item>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>FAQ's</Text>
            </CardItem>
            <CardItem style={{justifyContent: 'center',}}>
               <Accordion style={{borderRadius: 0,borderWidth: 0}} headerStyle={{backgroundColor: 'transparent'}} contentStyle={{backgroundColor: 'transparent'}} dataArray={infoArray} />
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Session</Text>
            </CardItem>
            <CardItem style={{justifyContent: 'center',}}>
              <Button block danger onPress={this.onSignOutPress}  block>
                <Text> Sign Out </Text>
              </Button>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
}
