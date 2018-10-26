/*React*/
import React, { Component } from 'react';
import { StyleSheet,StatusBar } from 'react-native';
/*Components*/
import { Container,Card,Label,Header,Form,Content,Button,Text,CardItem,Item,Body,Title,Input,Icon,Right } from 'native-base';
import { Spinner } from '../Componentes/Spinner';
/*Database and Auth*/
import firebase from 'firebase';


export default class LoginView extends Component {
  state = {email: '', password: '', error: '', authRequest: false}

  constructor(props){
    super(props);
  }

  onPressJoinButton=()=>{
    this.props.navigation.navigate("CreateAccountView");
  }

  onLoginPress=()=>{
    this.setState({error: '', authRequest: true});
    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( () => {
        this.setState({email: '', password: '', error:'', authRequest: false});
        this.props.navigation.navigate("SignedIn");
      })
      .catch( (error) => {
        this.setState({authRequest: false});
        this.setState({error: error.message});
      });

  }

  goMenu=()=>{
    this.props.navigation.navigate("SignedIn");
  }

  renderFormComponents(){
    //Si esta realizando peticion a la base de datos
    if(this.state.authRequest){
      return(<Spinner size='small'/>);
    }
    //De lo contrario
    return(
      <Form>
        <Item style ={styles.inputLayout} floatingLabel>
          <Label>Correo</Label>
          <Icon active name='person' />
          <Input onChangeText={ (email) => {this.setState({email: email})} }/>
        </Item>
        <Item style ={styles.inputLayout} floatingLabel>
          <Label>Clave</Label>
          <Icon active name='lock' />
          <Input secureTextEntry={true} onChangeText={ (passw) => {this.setState({password: passw})} } />
        </Item>
        <Button  onPress={this.onLoginPress} style ={styles.buttonLayout} block info>
          <Text> Entrar </Text>
        </Button>
      </Form>
    );
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: "#03A9F4"}}>
          <StatusBar backgroundColor={"#0288D1"} barStyle="light-content"/>
          <Body>
            <Title>Theclo-set</Title>
          </Body>
        </Header>
        <Content style ={styles.cardLayout}>
          <Card>
            <CardItem header bordered>
              <Text>Inicio de sesion</Text>
            </CardItem>

            {this.renderFormComponents()}

            <CardItem footer bordered>
              <Text>Aun no tienes cuenta?</Text>
              <Button onPress={this.onPressJoinButton}  transparent>
                <Text>CREA UNA</Text>
              </Button>
            </CardItem>
          </Card>
          <CardItem header bordered>
            <Text style={styles.errorMessage}>{this.state.error}</Text>
          </CardItem>

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
