import {REFRESH_CATEGORY, REFRESH_PRENDAS, SET_STATE, REFRESH_SETS, REFRESH_LOG} from './Types';
import firebase from 'firebase';
import ApiKeys from '../Database/ApiKeys';
import _ from 'lodash'


const initialState = {};



function applyRefreshCategory(state,payload){
  return{
    ...state,
    Categorias:{...payload},
  };
}

function applyRefreshPrendas(state,payload){
  return{
    ...state,
    Prendas:{...payload},
  };
}

function applyRefreshSets(state,payload){
  return{
    ...state,
    Sets:{...payload},
  };
}

function applyRefreshLog(state,payload){
  return{
    ...state,
    Registro:{...payload},
  };
}

function applySetState(state,payload){
  return{
    ...payload
  };
}




//reducer funtion
export default Reducer = (state=initialState, action)=>{
  const {Categorias,Prendas,Sets} = state;
  const {type,payload} = action;

  switch (type) {
    case REFRESH_CATEGORY:
      return applyRefreshCategory(state,payload);
    break;
    case REFRESH_PRENDAS:
      return applyRefreshPrendas(state,payload)
    break;
    case REFRESH_SETS:
      return applyRefreshSets(state,payload)
    break;
    case REFRESH_LOG:
      return applyRefreshLog(state,payload)
    break;
    case SET_STATE:
      return applySetState(state,payload)
    break;
    default:
      return state;

  }

}
