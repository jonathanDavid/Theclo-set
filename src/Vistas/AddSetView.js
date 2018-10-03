import React, { Component } from 'react';
import {StyleSheet,StatusBar,View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab,Form, Button,Picker, Left, Right, Body, Icon, Text } from 'native-base';
import ListViewer from '../Componentes/ListViewer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';

class AddSetView extends Component {
  onPressBack = ()=>{
    this.props.navigation.goBack();
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  renderCategories(){
    let code = [];
    for (var i=0; i < this.props.Categories.length; i++) {
       code.push( <Picker.Item label={this.props.Categories[i][0]} value="key0" />);
     }
      return code;
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#4596ab'}}>
          <StatusBar backgroundColor={'#4596ab'} barStyle="light-content"/>
          <Left>
            <Button onPress={this.onPressBack} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
             <Title>New Set</Title>
          </Body>
        </Header>
        <Content>
            <Form>
              <View style={{flexDirection: 'row'}}>
                <Picker
                  note={false}
                  placeholder="Category"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  mode="dropdown"
                  style={{ width: 150 }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  {this.renderCategories()}
                </Picker>
                <Picker
                  note={false}
                  mode="dropdown"
                  placeholder="Clothes"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: 150 }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >


                </Picker>
              </View>
            </Form>
            <Button style={[styles.buttonLayout,{backgroundColor: '#4596ab'}]} block>
              <Text style={{color: 'white'}}>Add Clothes</Text>
            </Button>

            <ListViewer listViewData={this.props.Sets[this.props.SetSelected].slice(1)} ></ListViewer>
        </Content>
        <Footer>
          <FooterTab style ={{backgroundColor: '#ffffff',height: 100}}>
            <Button style={[styles.buttonLayoutBottom,{backgroundColor: '#37afce'}]}  block>
              <Text style={{color: 'white',fontWeight: 'bold',fontSize: 16}}>Add Set</Text>
            </Button>
          </FooterTab>
        </Footer>
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
    margin: 5,
    padding: 5,
  },

});

function mapStateToProps(state){
    const {Categories,Loundry,Missing,Sets,CategorySelected,SetSelected} = state;
    return{
      Categories,
      Loundry,
      Missing,
      Sets,
      CategorySelected,
      SetSelected
    };

}

function mapDispatchToProps(dispatch){
  return{
    deleteLoundry: bindActionCreators(Actions.deleteLoundry,dispatch),
    sendMissing: bindActionCreators(Actions.sendMissing,dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSetView);
