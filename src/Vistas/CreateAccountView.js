/*React*/
import React, { Component } from 'react';
import {StyleSheet,StatusBar } from 'react-native';
/*Components*/
import { Container,Card,Label, Header,Form, Content,Left,Button,Text,CardItem , Item,Body,Title, Input, Icon } from 'native-base';
import { Spinner } from '../Componentes/Spinner';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
/*Database and Auth*/
import firebase from 'firebase';

class CreateAccountView extends Component {

  state = {user: '', email: '', password1: '', password2: '', error: '', dbRequest: false}

  constructor(props){
    super(props);
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }


  onRegisterPress = () => {
    const {user, email, password1, password2} = this.state;
    const uncatIMG = 'https://firebasestorage.googleapis.com/v0/b/theclosetapp-4962f.appspot.com/o/uncategorized.png?alt=media&token=0512ffab-a7fc-4e68-8995-7d0b23292679';
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
            userReference = firebase.database().ref('Users/');
            pushID = userReference.push().key;
            userReference.child(loggedUser.uid).set({ id:loggedUser.uid, Categorias: {[pushID]: {Nombre: 'Sin clase', Descripcion: 'Categorias sin clase', id: pushID, Foto:'uncategorized', FotoURL:uncatIMG} }}).then(()=>{
              firebase.database().ref(`Users/${loggedUser.uid}`).once('value', (dataSnapshot) => {
                this.props.setState(dataSnapshot.val());
                this.props.navigation.navigate("LoginView");
              });
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
          <Item style ={styles.inputLayout}>
            <Input style={{fontSize: 13, color: '#809AAD'}}  placeholder="Usuario" value={this.state.user} onChangeText={(user) => {this.setState({user: user})}}/>
          </Item>
          <Item style ={styles.inputLayout}>
            <Input style={{fontSize: 13, color: '#809AAD'}}  placeholder="Correo Electronico" value={this.state.email} onChangeText={(email) => {this.setState({email: email})}}/>
          </Item>
          <Item style ={styles.inputLayout}>
            <Input style={{fontSize: 13, color: '#809AAD'}}  placeholder="Contraseña" secureTextEntry={true} value={this.state.password1} onChangeText={(password1) => {this.setState({password1: password1})}}/>
          </Item>
          <Item style ={styles.inputLayout}>
            <Input style={{fontSize: 13, color: '#809AAD'}}  placeholder="Confirmar Contraseña" secureTextEntry={true} value={this.state.password2} onChangeText={(password2) => {this.setState({password2: password2})}}/>
          </Item>
      </Form>
    );
  }

  render() {
    return (
      <Container style={styles.colorBG}>
        <StatusBar backgroundColor={"#003459"} barStyle="light-content"/>
        <Content style ={styles.contentStyle}>
          <Card  style ={styles.cardMainLayout}>
            {this.renderRegister()}

          </Card>

          <Button onPress={this.onRegisterPress} style={styles.buttonLayout} block info>
            <Text uppercase={false} style={{fontSize: 15,fontWeight: 'bold',color: '#cffff3'}}> Registrarse </Text>
          </Button>

          <Card  transparent>
            <CardItem style={styles.colorBG} header>
              <Text style={{fontSize: 13,color: '#809AAD'}}>¿Ya tienes una cuenta?</Text>
              <Button onPress={this.onPressBack}  transparent>
                <Text uppercase={false} style={{fontSize: 13,fontWeight: 'bold',color: '#003459'}}>Inicia</Text>
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

function mapStateToProps(state){
    const {Categories} = state;
    return{
      Categories
    };

}

function mapDispatchToProps(dispatch){
  return{
    setState: bindActionCreators(Actions.setState,dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateAccountView);

const styles = StyleSheet.create({
  buttonLayout:{
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    padding: 5,
    backgroundColor: "#0061a6"
  },

  contentStyle:{
     padding: 25,
  },

  cardMainLayout:{
     borderRadius: 15,
  },

  colorBG:{
    backgroundColor: "#fafafa"
  },

  errorMessage:{
    color: '#F44336',
  },

  inputLayout:{
    marginRight:15,
    borderColor: 'transparent',
  },
});
