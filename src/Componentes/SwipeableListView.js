import React, { Component } from 'react';
import { ListView,StyleSheet,StatusBar } from 'react-native';
import { Container, Header,Title,Left, Content,Body, Button, Icon, List, ListItem, Text } from 'native-base';
import ItemList from './ItemList';

const datas = [
  'Prenda 1',
  'Prenda 2',
  'Prenda 3',
  'Prenda 4',
  'Prenda 5',
  'Prenda 6',
  'Prenda 7',
  'Prenda 8',
];
export default class SwipeableListView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas,
    };
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: this.props.headerColor}}>
          <StatusBar backgroundColor={this.props.headerColor} barStyle="light-content"/>
          <Left>
            <Button onPress={this.props.onPressButtonBack} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
             <Title>{this.props.Title}</Title>
          </Body>
        </Header>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem style={styles.listView}>
                <ItemList itemCategory={'Clothes Category'} itemTitle={data} imageUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}/>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full  style={{backgroundColor: this.props.btnLBkgColor}}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full style={{backgroundColor: this.props.btnRBkgColor}}>
                <Icon active name="trash" />
              </Button>}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listView:{
    flex:1,
  },

  btnLBkgColor:{
    backgroundColor: 'red',
  },
  btnRBkgColor:{
    backgroundColor: 'red',
  },
});
