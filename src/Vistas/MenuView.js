import React, { Component,Fragment } from "react";
import { Image, StatusBar,StyleSheet,TouchableOpacity,TouchableWithoutFeedback, Text, View } from "react-native";
import {Icon} from 'native-base';
import { Toast } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionsCreator as Actions} from '../Redux/Actions';
import firebase from 'firebase'

 class MenuView extends Component {
  state = {name: ''};
  static navigationOptions = { title: "Main" };
  constructor(props) {
    super(props);
    currentUser = firebase.auth().currentUser;
    firebase.database().ref(`Users/${currentUser.uid}`).once('value', (dataSnapshot) => {
      this.props.setState(dataSnapshot.val());
    });
  }
  onPressCloset = ()=>{
    this.props.navigation.navigate("CategoriesView")
  }

  onPressLaundry = ()=>{
    this.props.navigation.navigate("LaundryView")
  }

  onPressMissing = ()=>{
    this.props.navigation.navigate("MissingView")
  }

  onPressSets = ()=>{
    this.props.navigation.navigate("SetsView")
  }

  onPressLogOut = ()=>{
    this.props.navigation.navigate("AccManagementView")
  }

  componentDidMount(){
    currentUser = firebase.auth().currentUser;
    firebase.database().ref(`Users/${currentUser.uid}`).once('value', (dataSnapshot) => {
      this.props.setState(dataSnapshot.val());
    });
    this.setState({ name : currentUser.displayName});
  }


  render() {
    return (
          <View style={[styles.s8ab8b2a6]}>
            <StatusBar backgroundColor={"#000000"} barStyle="light-content"/>
            <View style={[styles.sfc13888e, { flexDirection: "row" }]}>
              <View style={styles.s41ccc30f}>
                <TouchableOpacity onPress={this.onPressCloset}>
                  <Image source={require("./images/closet_icon.png")} style={styles.s98059f0a} />
                  <Text style={styles.sda221942}> CLOSET</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sf3785ddd}>
                <TouchableOpacity onPress={this.onPressSets}>
                  <Image source={require("./images/sets_icon.png")} style={styles.s8f443a62} />
                  <Text style={styles.s73b11ae0}>     SETS</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.s4dbff5ed, { flexDirection: "row" }]}>
              <View style={styles.s317ff90f}>
                <TouchableOpacity onPress={this.onPressLaundry}>
                  <Image source={require("./images/laundry_icon.png")} style={styles.sfc68a166} />
                  <Text style={styles.sedb32a67}> LAUNDRY</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.s444f37d1}>
                <TouchableOpacity onPress={this.onPressMissing}>
                  <Image source={require("./images/socks_icon.png")} style={styles.sc36b1c8e} />
                  <Text style={styles.s8c9efc64}> MISSING</Text>
                </TouchableOpacity>
              </View>
            </View>
              <View style={[styles.s923b1cd6, { flexDirection: "row" }]}>
                <View style={styles.s617c1fc1} />
                <View style={styles.s4d5fab9b}>
                  <TouchableWithoutFeedback onPress={this.onPressLogOut}>
                    <Image source={require("./images/Captura.png")} style={styles.sb6e3e2b9} />
                  </TouchableWithoutFeedback>
                  <View style={styles.s97acb6cf}>
                    <Image style={styles.s0d2109e8} />
                  </View>
                </View>
                <View style={styles.sb6315268} />
              </View>
          </View>
    );
  }
}

function mapStateToProps(state){
    const {Categories} = state;
    return{
      Categories
    };

}

function mapDispatchToProps(dispatch){
  return{
    setState: bindActionCreators(Actions.setState,dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MenuView);

const styles = StyleSheet.create({
  s98059f0a: { height: 100, width: 100 },
  sda221942: {
    backgroundColor: `rgba(224, 223, 235, 0)`,
    color: `rgba(255, 255, 255, 1)`,
    fontSize: 20,
    textAlign: 'center' ,
    fontWeight: `bold`
  },
  s41ccc30f: {
    alignItems: `center`,
    backgroundColor: `rgba(95, 82, 165, 1)`,
    borderBottomRightRadius: 35,
    borderLeftWidth: 2,
    borderRightWidth: 5,
    borderTopWidth: 2,
    flex: 1,
    justifyContent: `center`
  },
  s8f443a62: { height: 100, width: 100 },
  s73b11ae0: {
    color: `rgba(255, 255, 255, 1)`,
    fontSize: 20,
    fontWeight: `bold`
  },
  sf3785ddd: {
    alignItems: `center`,
    backgroundColor: `rgba(69, 150, 171, 1)`,
    borderBottomLeftRadius: 35,
    borderLeftWidth: 5,
    borderRightWidth: 2,
    borderTopWidth: 2,
    flex: 1,
    justifyContent: `center`
  },
  sfc13888e: { flex: 1 },
  s552591c4: {
    backgroundColor: `rgba(95, 82, 165, 1)`,
    borderLeftWidth: 2,
    borderRightWidth: 1,
    flex: 1
  },
  s5dc5a3b9: {
    backgroundColor: `rgba(48, 204, 108, 1)`,
    borderLeftWidth: 2,
    borderRightWidth: 1,
    flex: 1
  },
  s5fdf9abe: {
    backgroundColor: `rgba(179, 11, 14, 1)`,
    flex: 1,
    maxHeight: `100%`,
    minHeight: `100%`,
    width: `100%`
  },
  sa8d6afc2: {
    backgroundColor: `rgba(0, 0, 0, 1)`,
    flex: 1,
    maxHeight: `100%`,
    minHeight: `100%`,
    width: `100%`
  },
  s64de01b3: {
    backgroundColor: `rgba(69, 150, 171, 1)`,
    borderLeftWidth: 1,
    borderRightWidth: 2,
    flex: 1
  },
  sacf81b4d: {
    backgroundColor: `rgba(213, 56, 36, 1)`,
    borderLeftWidth: 1,
    borderRightWidth: 2,
    flex: 1
  },
  s37ff9f25: {
    backgroundColor: `rgba(222, 27, 11, 1)`,
    flex: 1,
    maxHeight: `100%`,
    minHeight: `100%`,
    width: `100%`
  },
  s2b91d5ce: {
    alignItems: `center`,
    borderRadius: 10,
    flex: 0.2,
    justifyContent: `space-evenly`,
    opacity: 1
  },
  sfc68a166: { height: 100, width: 100 },
  sedb32a67: {
    color: `rgba(255, 255, 255, 1)`,
    fontSize: 20,
    fontWeight: `bold`
  },
  s317ff90f: {
    alignItems: `center`,
    backgroundColor: `rgba(48, 204, 108, 1)`,
    borderLeftWidth: 2,
    borderRightWidth: 5,
    borderTopRightRadius: 35,
    flex: 1,
    justifyContent: `center`
  },
  sc36b1c8e: { height: 100, width: 100 },
  s8c9efc64: {
    color: `rgba(255, 255, 255, 1)`,
    fontSize: 20,
    fontWeight: `bold`
  },
  s444f37d1: {
    alignItems: `center`,
    backgroundColor: `rgba(213, 56, 36, 1)`,
    borderLeftWidth: 5,
    borderRightWidth: 2,
    borderTopLeftRadius: 35,
    flex: 1,
    justifyContent: `center`
  },
  s4dbff5ed: { flex: 1 },
  s617c1fc1: {
    backgroundColor: `rgba(48, 204, 108, 1)`,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    flex: 1
  },
  sb6e3e2b9: { height: `100%`, width: `100%`,backgroundColor: 'transparent' },
  s0d2109e8: { height: 100, width: 100 },
  s97acb6cf: { flex: 1 },
  s4d5fab9b: {
    backgroundColor: `rgba(33, 33, 33, 0.89)`,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 2
  },
  sb6315268: {
    backgroundColor: `rgba(213, 56, 36, 1)`,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    flex: 1
  },
  s923b1cd6: { backgroundColor: `rgba(255, 255, 255, 1)`, flex: 0.3 },
  s8ab8b2a6: {
    backgroundColor: `rgba(0, 0, 0,1)`,
    borderWidth: 2,
    flex: 1,
    flexWrap: `wrap`
  }
});
