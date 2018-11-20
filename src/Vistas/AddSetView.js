import React, { Component } from 'react';
import {StyleSheet,StatusBar,View,Alert } from 'react-native';
import { Container, Header, Title, Content, Footer, Item, Input,FooterTab,Form,Drawer, Button,Picker,Label, Left, Right, Body, Icon, Text,Fab } from 'native-base';
import ListViewer from '../Componentes/ListViewer';
import SearchMenuView from '../Componentes/SearchMenuView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';
import firebase from 'firebase';

class AddSetView extends Component {

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  constructor(props) {
    super(props);
    this.state = {
      setName:"",
      setPrendas:[],
      isAccessingDB:false,
    };
  }

  addClothesToList=(id)=>{
    let arrayPrendas = this.state.setPrendas;
    arrayPrendas.push(id);
    this.setState({setPrendas:arrayPrendas})
    this.closeDrawer();
  }

  getDataToShow=()=>{
    let prendas = this.props.Prendas;
    let selectedPrendas = this.state.setPrendas;
    prendas = _.filter(prendas, function(el){
        return ~selectedPrendas.indexOf(el.id)
    })
    return prendas;
  }

  onChangeText=(text)=>{
    this.setState({
      setName: text,
    })
  }

  closeDrawer = () => {
  this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  onPressItem =(id)=>{
    Alert.alert('Eliminar prenda del Conjunto','',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Eliminar', onPress: ()=>{
        let arrayPrendas = this.state.setPrendas;
        arrayPrendas.splice(arrayPrendas.indexOf(id), 1);
        this.setState({setPrendas:arrayPrendas})
      }},
    ],
    { cancelable: false }
    )
  }

  addNewSet=()=>{
    this.setState({isAccessingDB:true});
    let setNombre = this.state.setName;
    let setPrendas = this.state.setPrendas;
    let ultimaVezUsado = 'Nunca';
    let currentSet = false;
    let userID = firebase.auth().currentUser.uid;
    setReference = firebase.database().ref(`Users/${userID}/Sets/`);
    pushID = setReference.push().key;
    let setObj = {Nombre: setNombre, LastUsed: ultimaVezUsado, id: pushID, Prendas: setPrendas, EnUso: currentSet};
    setReference.child(pushID).set(setObj).then(()=>{
         setReference.once('value',(dataSnapshot)=>{
          this.props.refreshSets(dataSnapshot.val());
         })
        this.setState({isAccessingDB:false});
        this.props.navigation.goBack();
    })
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SearchMenuView addClothesToList={this.addClothesToList} navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container>
          <Header style={{backgroundColor: '#4596ab'}}>
            <StatusBar backgroundColor={'#4596ab'} barStyle="light-content"/>
            <Left>
              <Button onPress={this.onPressBack} transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Nuevo Conjunto</Title>
            </Body>
            <Right>
              <Button onPress={this.addNewSet} transparent>
                <Icon type="FontAwesome" name="save" />
              </Button>
            </Right>
          </Header>

          <Content  style={styles.colorBGMain}>
            <View style={styles.mainLayout}>
              <Item  style={styles.inputLayout}  inlineLabel>
                <Input style={{fontSize: 15,fontWeight: 'bold',color: '#4596ab'}} onChangeText={this.onChangeText} placeholder="¡Digite el Nombre del Conjunto!"/>
              </Item>
            </View>
            <ListViewer isAdding onPressItem={this.onPressItem} listViewData={this.getDataToShow()} />

          </Content>
          <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor:  '#4596ab'}}
              position="bottomRight"
              onPress={this.openDrawer}>
            <Icon   name="shirt" />
          </Fab>
        </Container>
      </Drawer>

    );
  }
}

const styles = StyleSheet.create({
  buttonLayout:{
    margin: 15,
    marginRight: 35,
    marginLeft: 35,
    paddingLeft: 8,
    paddingRight:8,
    padding: 5,
  },
  mainLayout:{
    paddingBottom:10,
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft:20,
    backgroundColor: "#fff",
  },

  colorBGMain:{
    backgroundColor: "#fafafa"
  },
  buttonLayoutBottom:{
    margin: 5,
    padding: 5,
  },
  inputLayout:{
    padding:5,
    marginRight:15,
    borderColor: 'transparent',
  },
});

function mapStateToProps(state){
    const {Categorias,Prendas} = state;
    return{
      Categorias,
      Prendas,
    };

}

function mapDispatchToProps(dispatch){
  return{
    refreshSets: bindActionCreators(Actions.refreshSets,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSetView);
