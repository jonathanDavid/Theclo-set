/*React*/
import React, { Component } from 'react';
import { StatusBar,Image } from 'react-native';
/*components*/
import { Container, Header, Title, Content, Button, Left, Body, Icon, Card, Label, Item, Input, CardItem, Text } from 'native-base';
/*Firebase*/
import firebase from 'firebase';
/*Redux*/

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
              <Item /*style ={styles.inputModifyLayout}*/ floatingLabel>
               <Label>Email</Label>
               <Icon active name='mail' />
               <Input value={this.state.email} onChangeText={(email) => {this.setState({email: email})}}/>
              </Item>
            </CardItem>
            <CardItem>
              <Item /*style ={styles.inputModifyLayout}*/ floatingLabel>
                <Label>Password</Label>
                <Icon active name='lock' />
                <Input value={this.state.password} onChangeText={(password) => {this.setState({password: password})}}/>
              </Item>
            </CardItem>
          </Card>
          <Card>

            <CardItem header>
              <Text>Session</Text>
            </CardItem>
            <CardItem style={{justifyContent: 'center',}}>
              <Button block danger onPress={this.onSignOutPress} /*style={styles.buttonLayout}*/ block>
                <Text> Sign Out </Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
