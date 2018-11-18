import React, { Component } from 'react';
import { ListView,StyleSheet,StatusBar,Image } from 'react-native';
import { Container, Header,Title,Left, Right, Content,Body, Button, Icon, List, ListItem, Text } from 'native-base';
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

  onEdit = () => {
    this.props.onEdit();
  }
  onDelete = () => {
    this.props.onDelete();
  }

  renderActionButtons(){
    let code = [];
    if( this.props.isEditor ){
      code.push(
        <Right>
          <Button onPress={this.onDelete} transparent>
            <Icon type="FontAwesome" name="trash" />
          </Button>
          <Button onPress={this.onEdit} transparent>
            <Icon type="FontAwesome" name="edit" />
          </Button>
        </Right>);
      return code;
    }else{
      return null;
    }
  }

  renderActionButtonsClothes(id){
    let code = [];
    if( this.props.isEditor ){
      code.push(
        <Button onPress={this.props.onDeleteClothes.bind(this,id)}  transparent>
            <Icon  type="FontAwesome" name="trash"  />
        </Button>);
      return code;
    }else{
      return null;
    }
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

          {this.renderActionButtons()}

        </Header>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.props.listViewData)}
            renderRow={data =>
              <ListItem style={styles.listView}>
                <ItemList itemCategory={data.Descripcion} titleColor={this.props.headerColor} itemTitle={data.Titulo} imageUrl={data.FotoURL}/>
                {this.renderActionButtonsClothes(data.id)}
              </ListItem>}
            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full onPress={() => this.onPressL(secId, rowId, rowMap)}  style={{backgroundColor: this.props.btnLBkgColor}}>
                <Image source={this.props.UrlImageL} style={{ height: 50, width: 50 }} />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full onPress={() => this.onPressR(secId, rowId, rowMap)} style={{backgroundColor: this.props.btnRBkgColor}}>
                <Image source={this.props.UrlImageR} style={{ height: 50, width: 50 }} />
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
    padding:0,
    margin:0,
  },
});
