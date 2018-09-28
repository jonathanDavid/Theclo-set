import {ADD_CATEGORY, ADD_CLOTHES, SEND_LOUNDRY, SEND_MISSING, DELETE_LOUNDRY, DELETE_MISSING} from './Types';

//Estado Inicial
const initialState ={
    Categories:[
                ['Categoria 1', 'Prenda 1','Prenda 2','Prenda 3'],
                ['Categoria 2', 'Prenda 4','Prenda 8','Prenda 9'],
                ['Categoria 3', 'Prenda 5','Prenda 6',,'Prenda 14'],
                ['Categoria 4', 'Prenda 7','Prenda 12','Prenda 13'],
                ['Categoria 5', 'Prenda 10','Prenda 11',,'Prenda 15']
              ],
    Loundry:['Prenda 1','Prenda 2','Prenda 3','Prenda 4','Prenda 5'],
    Missing:['Prenda 6','Prenda 7','Prenda 8','Prenda 9','Prenda 10'],
}


//Funciones
function applyAddCathegory(state,payload,Categories){
  return{
    ...state,
    Categories:[...Categories,payload],
  };
}

function applySendLoundry(state,payload,Loundry){
  return{
    ...state,
    Loundry:[...Loundry,payload],
  };
}

function applyDeleteLoundry(state,payload,Loundry){
  return{
    ...state,
    Loundry: Loundry.filter((todos,i)=>i!=payload),
  }
}


//reducer funtion
export default Reducer = (state=initialState, action)=>{
  const {Categories,Loundry,Missing} = state;
  const {type,payload} = action;

  switch (type) {
    case ADD_CATEGORY:
      return applyAddCathegory(state,payload,Categories);
    break;
    case ADD_CLOTHES:

    break;
    case SEND_LOUNDRY:
      return applySendLoundry(state,payload,Loundry);
    break;
    case SEND_MISSING:

    break;
    case DELETE_LOUNDRY:
      return applyDeleteLoundry(state,payload,Loundry);
    break;
    case DELETE_MISSING:

    break;
    default:

  }

}
