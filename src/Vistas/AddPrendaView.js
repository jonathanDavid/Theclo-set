/*React*/
import React,   { Component } from 'react';
import { StyleSheet,StatusBar,View } from 'react-native';
/*Components*/
import { Container,Card,Label,Header,Form,Content,Button,Text,CardItem,Item,Body,Title,Input,Icon,Right,Left } from 'native-base';
import { Spinner } from '../Componentes/Spinner';
/*Database and Auth*/
import firebase from 'firebase';


export default class AddPrendaView extends Component {
  constructor(props){
    super(props);
    state={Name:'',Description:'',Photo:''};
  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  takePicture(){
    const options={}
    this.camera.capture({metadata:options}).then((data)=>{
      console.log(data)

    }).catch((error)=>{
      console.log(error)
    })

  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#6432c8'}}>
          <StatusBar backgroundColor={'#6432c8'} barStyle="light-content"/>
          <Left>
            <Button onPress={this.onPressBack} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add Clothes</Title>
          </Body>
        </Header>
          <Content>
            <Form>
              <Card>
                <CardItem cardBody button onPress={this.OpenCamera}>
                  <Body style={{ flex: 1,alignItems: 'center', flexDirection: 'row',justifyContent: 'center', height: 200  }}>
                    <Icon type="FontAwesome" name='camera-retro' />
                  </Body>
                </CardItem>
              </Card>
                <Item style ={styles.inputLayout} floatingLabel require>
                  <Label>Name</Label>
                  <Input value={this.props.Name} onChangeText={(info) => {this.setState({Name:info})}}/>
                </Item>
                <Item style ={styles.inputLayout} floatingLabel require>
                  <Label>Description</Label>
                  <Input value={this.props.Description} onChangeText={(info) => {this.setState({Description:info})}}/>
                </Item>
                <View style ={styles.buttonView}>
                  <Button onPress= {this.addNewCategory} style={styles.buttonLayoutBottom} >
                    <Text style={{color: 'white',fontWeight: 'bold',fontSize: 16}}>Add Category</Text>
                  </Button>
                </View>
            </Form>
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
  buttonLayoutBottom:{
    marginTop: 50,
    padding: 5,
    backgroundColor: '#6432c8',
  },
  errorMessage:{
    color: '#F44336',
  },

  inputLayout:{
    marginRight:15,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonView:{
    flex:1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },

  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
});
