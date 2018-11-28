import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {Platform, StyleSheet, StatusBar, View, Image, Dimensions, Arrow} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import _ from 'lodash';

const deviceHeight = Dimensions.get('window').height;

class CalendarView extends Component {

  constructor(props){
    super(props);

  }

  onPressBack = ()=>{
    this.props.navigation.goBack();
  }

  getCurrentDate=()=>{
      let dates = _.map(this.props.Registro,'Date')
      for(var i=0; i < dates.length; i=i+1){
        dates[i]=new Date(dates[i]);
      }
      let minDate = Math.min.apply(null,dates);
      return minDate;
  }

  getMinDate=()=>{
      let dates = _.map(this.props.Registro,'Date')
      for(var i=0; i < dates.length; i=i+1){
        dates[i]=new Date(dates[i]);
      }
      let minDate = Math.min.apply(null,dates);
      minDate = new Date(minDate)
      return minDate.getFullYear()+"-"+(minDate.getMonth()+1)+"-01";
  }

  getMaxDate=()=>{
    let dates = _.map(this.props.Registro,'Date')
      for(var i=0; i < dates.length; i=i+1){
        dates[i]=new Date(dates[i]);
      }
    let maxDate = Math.max.apply(null,dates);
    maxDate = new Date(maxDate)
    return maxDate.getFullYear()+"-"+(maxDate.getMonth()+1)+"-"+this.getLastDayOfMonth(maxDate.getFullYear(), maxDate.getMonth());
  }

  getLastDayOfMonth=(year, month)=> {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
  }


  getMarketDates=()=>{
      let dates = _.map(this.props.Registro,'Date')
      var markedDates ={}
      for(var i in dates) {
          var item = dates[i]
          markedDates[item] =  {selected: true, marked: true}
      }
      return markedDates
  }

  renderEmptyDate=()=> {
    return (
      <View style={styles.emptyDate}></View>
    );
  }

  renderEmptyData=()=> {
    return (
      <View style={styles.emptyData}><Text>Nada paso en este dia.</Text></View>
    );
  }

  renderItem=(item)=>{
    return(
      <View style={styles.item}>
        <Text style={{color: '#4596ab',fontWeight: 'bold',fontSize: 15,}} >{item.Title}</Text>
        <Text style={{color: '#757575',fontSize: 10,}} >Usaste un conjunto: {item.Description}</Text>
      </View>
    );
  }

  loadItems=()=> {
    let dates = _.map(this.props.Registro,'Date')
    let setids = _.map(this.props.Registro,'SetID')
    var itemstemp ={}
    for(let i=0; i < dates.length; i=i+1){
      let item = dates[i]
      itemstemp[item]=[]
    }
    for (let i=0; i < dates.length; i=i+1){
      let item = dates[i]
      itemstemp[item].push({Title: 'Conjunto', Description: this.props.Sets[setids[i]].Nombre})
    }
    return itemstemp
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
            <Title>Calendar Register</Title>
          </Body>
        </Header>

        <Content>
          <Agenda
              items={this.loadItems()}
              monthFormat={'MMMM yyyy'}
              renderItem={this.renderItem.bind(this)}
              renderEmptyDate={this.renderEmptyDate.bind(this)}
              renderEmptyData = {this.renderEmptyData.bind(this)}
              rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
              markedDates={this.getMarketDates()}
              selected={this.getCurrentDate()}
              minDate={this.getMinDate()}
              maxDate={this.getMaxDate()}
              pastScrollRange={1}
              futureScrollRange={1}
              theme={{
                  todayTextColor:  '#4596ab',
                  selectedDayTextColor:  '#4596ab',
                  monthTextColor:  '#4596ab',
                  selectedDayBackgroundColor: '#535175',
                  'stylesheet.calendar.header': {
                    week: {
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }
                  }
                }}
              style={styles.calendar}
            />
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: deviceHeight-90,
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  emptyData: {
    flex:1,
    justifyContent: 'center',
   alignItems: 'center'
  },
});

function mapStateToProps(state){
    const {Registro,Sets} = state;
    return{
      Sets,
      Registro,
    };
}

function mapDispatchToProps(dispatch){
  return{
      refreshLog: bindActionCreators(Actions.refreshLog, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarView);
