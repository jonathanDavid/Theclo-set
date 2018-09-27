import React, { Component } from 'react';
import {StyleSheet,StatusBar } from 'react-native';
import { Container,Card,Label, Header,Form, Content,Button,Text,CardItem , Item,Body,Title, Input, Icon } from 'native-base';

export default class CreateAccountView extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: "#cccc00"}}>
          <StatusBar backgroundColor={"#cccc00"} barStyle="light-content"/>
          <Body>
             <Title>Create Account</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem header bordered>
              <Text>New Account</Text>
            </CardItem>
            <Form>
                <Item style ={styles.inputLayout} floatingLabel>
                  <Label>User Name</Label>
                  <Icon active name='person' />
                  <Input/>
                </Item>

                <Item style ={styles.inputLayout} floatingLabel>
                  <Label>Email</Label>
                  <Icon active name='mail' />
                  <Input/>
                </Item>

                <Item style ={styles.inputLayout} floatingLabel>
                  <Label>Password</Label>
                  <Icon active name='lock' />
                  <Input/>
                </Item>

                <Item style ={styles.inputLayout} floatingLabel>
                  <Label>Confirm Password</Label>
                  <Icon active name='lock' />
                  <Input/>
                </Item>
                <Button style ={styles.buttonLayout} block warning><Text> Go </Text></Button>
            </Form>
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
