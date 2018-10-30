import React, { Component } from 'react';
import {StyleSheet,StatusBar,View, Image } from 'react-native';
import { Container, Header,Label, Title, Content, Footer, Item, Input,FooterTab,Form, Button,Picker, Left, Right, Body, Icon, Text, DeckSwiper, Card, CardItem, Thumbnail } from 'native-base';
import ListViewer from '../Componentes/ListViewer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';



class AddCategoryView extends Component {
  constructor(props) {
    super(props);
    state={Name:'',Description:'',Photo:''};
  }
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }
  addNewCategory=()=>{
    this.props.addSet(this.state.miSet)
    this.props.navigation.goBack();
  }

  OpenCamera=()=>{
    this.props.navigation.navigate("CameraView")
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
            <Title>New Category</Title>
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
                    <Icon name='close-circle' />
                  </Item>
                  <Item style ={styles.inputLayout} floatingLabel require>
                    <Label>Description</Label>
                    <Input value={this.props.Description} onChangeText={(info) => {this.setState({Description:info})}}/>
                    <Icon name='close-circle' />
                  </Item>
                  <View style ={styles.buttonView}>
                    <Button style ={styles.inputLayout} onPress= {this.addNewCategory} style={styles.buttonLayoutBottom} >
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
    marginRight: 35,
    marginLeft: 35,
    paddingLeft: 8,
    paddingRight:8,
    padding: 5,
  },
  buttonLayoutBottom:{
    marginTop: 50,
    padding: 5,
    backgroundColor: '#6432c8',
  },
  buttonView:{
    flex:1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  }

});

function mapStateToProps(state){
    const {Categories,Loundry,Missing,Sets,CategorySelected,SetSelected} = state;
    return{
      Categories,
      Loundry,
      Missing,
      Sets,
      CategorySelected,
      SetSelected,
    };

}

function mapDispatchToProps(dispatch){
  return{
    deleteLoundry: bindActionCreators(Actions.deleteLoundry,dispatch),
    sendMissing: bindActionCreators(Actions.sendMissing,dispatch),
    addSet: bindActionCreators(Actions.addSet,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryView);
