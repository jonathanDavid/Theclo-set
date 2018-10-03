import React, { Component } from 'react';
import {StyleSheet,StatusBar } from 'react-native';
import { Container,Card,Label, Header,Form, Content,Button,Text,CardItem , Item,Body,Title, Input, Icon,Right } from 'native-base';

export default class LoginView extends Component {
  constructor(props){
    super(props);
  }
  onPressJoinButton=()=>{
    this.props.navigation.navigate("CreateAccountView");
  }
  goMenu=()=>{
    this.props.navigation.navigate("SignedIn");
  }
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: "#cccc00"}}>
          <StatusBar backgroundColor={"#cccc00"} barStyle="light-content"/>
          <Body>
            <Title>Log In</Title>
          </Body>
          <Right >
            <Button onPress={this.goMenu} transparent>
              <Icon active name='home' />
            </Button>

          </Right>
        </Header>
        <Content style ={styles.cardLayout}>
          <Card>
            <CardItem header bordered>
              <Text>Welcome</Text>
            </CardItem>
            <Form>
              <Item style ={styles.inputLayout} floatingLabel>
                <Label>User Name</Label>
                <Icon active name='person' />
                <Input/>
              </Item>

              <Item style ={styles.inputLayout} floatingLabel>
                <Label>Password</Label>
                <Icon active name='lock' />
                <Input/>
              </Item>
              <Button style ={styles.buttonLayout} block warning><Text> Go </Text></Button>
            </Form>

            <CardItem footer bordered>
              <Text>You dont have an account?</Text>
              <Button onPress={this.onPressJoinButton}  transparent info>
                <Text>Join Us</Text>
              </Button>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  buttonLayout:{
    margin: 15,
    marginTop: 55,
    paddingLeft: 10,
    paddingRight:10,
    padding: 5,
  },

  inputLayout:{
    marginRight:15,
  },
});
