/*React*/
import React, { Component } from 'react';
import { StyleSheet,StatusBar,Image,View } from 'react-native';
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
        <Item style ={styles.inputLayout}>
          <Input style={{fontSize: 13, color: '#809AAD'}}  placeholder="Correo Electronico" onChangeText={ (email) => {this.setState({email: email})} }/>
        </Item>
        <Item style ={styles.inputLayout}>
          <Input style={{fontSize: 13, color: '#809AAD'}}  secureTextEntry={true} placeholder="Clave"  onChangeText={ (passw) => {this.setState({password: passw})} } />
        </Item>
      </Form>
    );
  }

  render() {
    return (
      <Container style={styles.colorBG}>
      <StatusBar backgroundColor={"#003459"} barStyle="light-content"/>
        <Content style ={styles.contentStyle}>
          <View style={styles.containerCentered}>
            <Image style={{ height: 100, width: 100 }} source={require("./images/App_Icon.png")} />
            <Text style={{fontSize: 12,fontWeight: 'bold',color: '#809AAD'}}>Theclo-set</Text>
          </View>
          <Card style ={styles.cardMainLayout}>
            {this.renderFormComponents()}
          </Card>

          <Button  onPress={this.onLoginPress} style ={styles.buttonLayout} block>
            <Text uppercase={false} style={{fontSize: 15,fontWeight: 'bold',color: '#cffff3'}}> Iniciar Sesion </Text>
          </Button>

          <Card  transparent>
            <CardItem style={styles.colorBG} header>
              <Text style={{fontSize: 13,color: '#809AAD'}}>¿Aun no tienes cuenta?</Text>
              <Button onPress={this.onPressJoinButton}  transparent>
                <Text uppercase={false} style={{fontSize: 13,fontWeight: 'bold',color: '#003459'}}>Crea Una</Text>
              </Button>
            </CardItem>
            <CardItem style={styles.colorBG} header bordered>
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    padding: 5,
    backgroundColor: "#0061a6"
  },

  containerCentered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
  },

  colorBG:{
    backgroundColor: "#fafafa"
  },

  cardMainLayout:{
     borderRadius: 15,
  },

  contentStyle:{
     padding: 25,
  },

  errorMessage:{
    color: '#F44336',
    fontSize: 13,
  },

  inputLayout:{
    marginRight:15,
    borderColor: 'transparent',
  },
});
