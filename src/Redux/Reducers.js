import {SET_STATE,ADD_CATEGORY, ADD_CLOTHES,ADD_SET, SEND_LOUNDRY, SEND_MISSING, DELETE_LOUNDRY, DELETE_MISSING, CATEGORY_SELECTED,SET_SELECTED} from './Types';
import firebase from 'firebase';
import ApiKeys from '../Database/ApiKeys';


//Estado Inicial
const initialState = {};
//  ={
//     Categorias:[
//                 ['Camisa', 'Prenda 1','Prenda 2','Prenda 3'],
//                 ['Pantalon', 'Prenda 4','Prenda 8','Prenda 9'],
//                 ['Zapatos', 'Prenda 5','Prenda 6','Prenda 14'],
//                 ['Ropa Interior', 'Prenda 7','Prenda 12','Prenda 13'],
//                 ['Medias', 'Prenda 10','Prenda 11','Prenda 15']
//               ],
//     Loundry:['Prenda 2','Prenda 3','Prenda 9'],
//     Missing:['Prenda 6','Prenda 8'],
//     Sets:[
//           ['Set 1', 'Prenda 1','Prenda 4','Prenda 5','Prenda 7','Prenda 10'],
//           ['Set 2', 'Prenda 2','Prenda 8','Prenda 6','Prenda 12','Prenda 11'],
//           ['Set 4', 'Prenda 2','Prenda 9','Prenda 14','Prenda 13','Prenda 15'],
//           ['Set 5', 'Prenda 1','Prenda 8','Prenda 14','Prenda 12','Prenda 10'],
//         ],
//     CategorySelected:0,
//     SetSelected:0,
// }


//Funciones
function applyAddCategory(state,payload,Categorias){
  return{
    ...state,
    Categorias:{...Categorias,payload},
  };
}


function applySetState(state,payload){
  console.log('Current State')
  console.log(state)
  console.log('Next state')
  console.log(payload);
  return{
    ...payload
  };
}

function applyAddSet(state,payload,Sets){
  return{
    ...state,
    Sets:[...Sets,payload],
  };
}

function applySendLoundry(state,payload,Prendas){
  //let prendas = Prendas;
  //prendas=prendas.Estado = 1;
  return{
    ...state,
    Prendas:[...Prendas]
  };
}

function applyDeleteLoundry(state,payload,Loundry){
  return{
    ...state,
    Loundry: Loundry.filter((Loundry,i)=>i!=payload),
  }
}

function applyAddClothes(state,payload,Categorias,CategorySelected){
  Categorias[CategorySelected].push(payload);
  return{
    ...state,
    Categorias:[...Categorias],
  };
}

function applySendMissing(state,payload,Missing){
  return{
    ...state,
    Missing:[...Missing,payload],
  };
}

function applyDeleteMissing(state,payload,Missing){
  return{
    ...state,
    Missing: Missing.filter((Missing,i)=>i!=payload),
  }
}

function applyCategorySelected(state,payload){
  return{
    ...state,
    CategorySelected:payload,
  };
}

function applySetSelected(state,payload){
  return{
    ...state,
    SetSelected:payload,
  };
}


//reducer funtion
export default Reducer = (state=initialState, action)=>{
  const {Categorias,Prendas,Loundry,Missing, Sets, CategorySelected} = state;
  const {type,payload} = action;

  switch (type) {
    case ADD_CATEGORY:
      return applyAddCategory(state,payload,Categorias);
    break;
    case ADD_CLOTHES:
      return applyAddClothes(state,payload,Categorias,CategorySelected);
    break;
    case ADD_SET:
      return applyAddSet(state,payload,Sets);
    break;
    case SEND_LOUNDRY:
      return applySendLoundry(state,payload,Prendas);
    break;
    case SEND_MISSING:
      return applySendMissing(state,payload,Missing);
    break;
    case DELETE_LOUNDRY:
      return applyDeleteLoundry(state,payload,Loundry);
    break;
    case DELETE_MISSING:
      return applyDeleteMissing(state,payload,Missing);
    break;
    case CATEGORY_SELECTED:
      return applyCategorySelected(state,payload)
    break;
    case SET_SELECTED:
      return applySetSelected(state,payload)
    break;
    case SET_STATE:
      return applySetState(state,payload)
    break;
    default:
      return state;

  }

}
