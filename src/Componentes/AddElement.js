/*React*/
import React,   { Component } from 'react';
import { StyleSheet,StatusBar,View,Image } from 'react-native';
/*Components*/
import { Container,Card,Label,Header,Form,Content,Button,Text,CardItem,Item,Body,Title,Input,Icon,Right,Left, Spinner, Textarea  } from 'native-base';



export default class AddElement extends Component {
  constructor(props){
    super(props);
    state={Nombre:'',Descripcion:'',Foto:null,loading:false};
  }

  onPressBack = ()=>{
    this.props.onPressBack();
  }

  componentWillMount(){
    let data = this.props.dataEdit;
    if(data){
      this.setState({Nombre: data.Nombre, Descripcion: data.Descripcion, Foto:data.Foto});
    }else{
      this.setState({Nombre:'',Descripcion:'',Foto:null});
    }
  }

  returnData=(uri)=>{
    this.setState({Foto: uri});
  }

  OpenCamera=()=>{
    if(!this.state.loading){
      this.props.OpenCamera(this.returnData /*.bind(this)*/)
    }
  }

  renderImageCamera=()=>{
    let code= [];

    if(this.state.Foto !== null){
      code.push(
        <Body style={{ flex: 1,alignItems: 'center', flexDirection: 'row',justifyContent: 'center', height: 200  }}>
          <Image source={{uri: this.state.Foto}} style={{height: 200, width: null, flex: 1}}/>
        </Body>
      )
    }else{
      code.push(
        <Body style={{ flex: 1,alignItems: 'center', flexDirection: 'row',justifyContent: 'center', height: 200}}>
          <Icon type="FontAwesome" name='camera-retro'/>
        </Body>
      )
    }
    return code
  }

  addNew=()=>{
      this.setState({loading:true})
      let data ={Nombre: this.state.Nombre, Descripcion: this.state.Descripcion, Foto: this.state.Foto}
      this.props.addNew(data);
  }

  renderButton=()=>{
    if(this.state.loading){
      return(
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',}}>
          <Spinner color='blue'/>
        </View>
      )
    }else{
      return(
        <Button onPress= {this.addNew} style={styles.buttonLayoutBottom} >
          <Text style={{color: 'white',fontWeight: 'bold',fontSize: 16}}>Guardar</Text>
        </Button>
      )
    }
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
            <Title>{this.props.Title}</Title>
          </Body>
        </Header>
          <Content>
            <Form>
              <Card>
                <CardItem cardBody button onPress={this.OpenCamera}>
                  {this.renderImageCamera()}
                </CardItem>
              </Card>
                <Item style ={styles.inputLayout}>
                  <Input value={this.state.Nombre} placeholder="Nombre" onChangeText={(info) => {this.setState({Nombre:info})}}/>
                </Item>
                <Textarea style={styles.textareaLayout} rowSpan={5} placeholder="Descripcion" value={this.state.Descripcion} onChangeText={(info) => {this.setState({Descripcion:info})}} />
                <View style ={styles.buttonView}>
                  {this.renderButton()}
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
    marginTop: 20,
    padding: 5,
    backgroundColor: '#6432c8',
  },
  errorMessage:{
    color: '#F44336',
  },

  inputLayout:{
    marginRight:15,
    borderColor: 'transparent',
  },
  textareaLayout:{
    flex: 1,
    marginTop:10,
    marginRight:15,
    marginLeft:5,
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.5,
    borderTopColor: '#bbb',
    borderTopWidth: 0.5,
    paddingTop:5
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
