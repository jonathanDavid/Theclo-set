import React, { Component } from 'react';
import { ListView,StyleSheet,StatusBar } from 'react-native';
import { Container, Header,Title,Left, Content,Body, Button, Icon, List, ListItem, Text } from 'native-base';
import ItemList from './ItemList';

export default class ListViewer extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  }


  render() {
    return (
      <Container>
        <Content>
          <List
            leftOpenValue={0}
            rightOpenValue={0}
            dataSource={this.ds.cloneWithRows(this.props.listViewData)}
            renderRow={data =>
              <ListItem style={styles.listView}>
                <ItemList itemCategory={'Clothes Category'} itemTitle={data} imageUrl={'http://nouveauelevator.com/image/black-icon/gallery.gif'}/>
              </ListItem>}
            renderLeftHiddenRow={()=>{}}
            renderRightHiddenRow={()=>{}}
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
});
