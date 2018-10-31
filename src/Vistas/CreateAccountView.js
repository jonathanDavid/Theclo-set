/*React*/
import React, { Component } from 'react';
import {StyleSheet,StatusBar } from 'react-native';
/*Components*/
import { Container,Card,Label, Header,Form, Content,Left,Button,Text,CardItem , Item,Body,Title, Input, Icon } from 'native-base';
import { Spinner } from '../Componentes/Spinner';
/*Database and Auth*/
import firebase from 'firebase';

export default class CreateAccountView extends Component {

  state = {user: '', email: '', password1: '', password2: '', error: '', dbRequest: false}

  constructor(props){
    super(props);
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  onReturnPress = () => {
    this.props.navigation.navigate("LoginView");
  }

  onRegisterPress = () => {
    const {user, email, password1, password2} = this.state;
    this.setState({dbRequest: true});
    if(password1 === password2){
      if(password1 == ""){
        this.setState({error: 'Las claves no pueden estar vacias', dbRequest:false});
      }else{
        firebase.auth().createUserWithEmailAndPassword(email,password1)
        .then( () => {
          loggedUser = firebase.auth().currentUser;
          loggedUser.updateProfile({ displayName: user})
          .then(() => {
            this.setState({error: '', dbRequest: false});
            //console.log(`Display name: ${loggedUser.displayName}`);
            console.log(loggedUser);
            firebase.database().ref('Users/').child(loggedUser.uid).set({id:loggedUser.uid}).then(()=>{
              this.props.navigation.navigate("LoginView");
            });
          })
          .catch((error) => {
            this.setState({error: error.message, dbRequest: false});
          });
        })
        .catch( (error) => {
          this.setState({error: error.message, dbRequest: false});
        });
      }
    }else{
      this.setState({error: 'Las claves no son las mismas', dbRequest:false});
    }
  }

  renderRegister(){
    if(this.state.dbRequest){
      return(<Spinner size='small'/>);
    }
    return(
      <Form>
          <Item style ={styles.inputLayout} floatingLabel require>
            <Label>Usuario</Label>
            <Icon active name='person' />
            <Input value={this.state.user} onChangeText={(user) => {this.setState({user: user})}}/>
          </Item>
          <Item style ={styles.inputLayout} floatingLabel>
            <Label>Correo</Label>
            <Icon active name='mail' />
            <Input value={this.state.email} onChangeText={(email) => {this.setState({email: email})}}/>
          </Item>
          <Item style ={styles.inputLayout} floatingLabel>
            <Label>Clave</Label>
            <Icon active name='lock' />
            <Input secureTextEntry={true} value={this.state.password1} onChangeText={(password1) => {this.setState({password1: password1})}}/>
          </Item>
          <Item style ={styles.inputLayout} floatingLabel>
            <Label>Confirmar clave</Label>
            <Icon active name='lock' />
            <Input secureTextEntry={true} value={this.state.password2} onChangeText={(password2) => {this.setState({password2: password2})}}/>
          </Item>
          <Button onPress={this.onRegisterPress} style={styles.buttonLayout} block info>
            <Text> Registrarse </Text>
          </Button>
      </Form>
    );
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: "#03A9F4"}}>
          <StatusBar backgroundColor={"#0288D1"} barStyle="light-content"/>
          <Left>
            <Button onPress={this.onPressBack} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
             <Title>Create Account</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem header bordered>
              <Text>Registro</Text>
            </CardItem>

            {this.renderRegister()}

            <CardItem header bordered>
              <Text style={styles.errorMessage}>{this.state.error}</Text>
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

  errorMessage:{
    color: '#F44336',
  },

  inputLayout:{
    marginRight:15,
  },
});
