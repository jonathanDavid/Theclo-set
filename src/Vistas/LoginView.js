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
        <Item style ={styles.inputLayout} floatingLabel>
          <Label style={{fontSize: 13, color: '#809AAD'}}>Correo Electronico</Label>
          <Input  onChangeText={ (email) => {this.setState({email: email})} }/>
        </Item>
        <Item style ={styles.inputLayout} floatingLabel>
          <Label style={{fontSize: 13,color: '#809AAD'}}>Clave</Label>
          <Input  secureTextEntry={true} onChangeText={ (passw) => {this.setState({password: passw})} } />
        </Item>
      </Form>
    );
  }

  render() {
    return (
      <Container style={styles.colorBG}>
      <StatusBar backgroundColor={"#003459"} barStyle="light-content"/>
        {/*<Header style={{backgroundColor: "#03A9F4"}}>
          <StatusBar backgroundColor={"#0288D1"} barStyle="light-content"/>
          <Body>
            <Title>Theclo-set</Title>
          </Body>
        </Header>*/}
        <Content style ={styles.contentStyle}>
          <View style={styles.containerCentered}>
            <Image style={{ height: 100, width: 100 }} source={require("./images/App_Icon.png")} />
            <Text style={{fontSize: 12,fontWeight: 'bold',color: '#003459'}}>Theclo-set</Text>
          </View>
          <Card style ={styles.cardMainLayout}>
            {this.renderFormComponents()}
          </Card>

          <Button  onPress={this.onLoginPress} style ={styles.buttonLayout} block>
            <Text uppercase={false} style={{fontSize: 13}}> Iniciar Sesion </Text>
          </Button>

          <Card  transparent>
            <CardItem style={styles.colorBG} header>
              <Text style={{fontSize: 13,color: '#003459'}}>¿Aun no tienes cuenta?</Text>
              <Button onPress={this.onPressJoinButton}  transparent>
                <Text style={{fontSize: 13,color: '#809AAD'}}>CREA UNA</Text>
              </Button>
            </CardItem>
            <CardItem style={styles.colorBG} footer>
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
    backgroundColor: "#264573"
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
     paddingBottom: 35,
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
