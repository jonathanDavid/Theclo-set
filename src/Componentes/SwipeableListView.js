import React, { Component } from 'react';
import { ListView,StyleSheet,StatusBar } from 'react-native';
import { Container, Header,Title,Left, Content,Body, Button, Icon, List, ListItem, Text } from 'native-base';
import ItemList from './ItemList';

export default class SwipeableListView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  }
  onPressL=(secId, rowId, rowMap)=>{
    rowMap[`${secId}${rowId}`].props.closeRow();
    this.props.onSwipeL(rowId);

  }

  onPressR=(secId, rowId, rowMap)=>{
    rowMap[`${secId}${rowId}`].props.closeRow();
    this.props.onSwipeR(rowId);

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
            dataSource={this.ds.cloneWithRows(this.props.listViewData)}
            renderRow={data =>
              <ListItem style={styles.listView}>
                <ItemList itemCategory={'Clothes Category'} itemTitle={data} imageUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}/>
              </ListItem>}
            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full onPress={() => this.onPressL(secId, rowId, rowMap)}  style={{backgroundColor: this.props.btnLBkgColor}}>
                <Icon active type="Feather" name="arrow-left" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full onPress={() => this.onPressR(secId, rowId, rowMap)} style={{backgroundColor: this.props.btnRBkgColor}}>
                <Icon active type="Feather"  name="arrow-right" />
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
