import {AsyncStorage} from 'react-native';

export const onSignIn = (KEY,VALUE) => AsyncStorage.setItem(KEY,JSON.stringify(VALUE));

export const onSignOut  = (KEY) => AsyncStorage.removeItem(KEY);

export const isSignedIn = (KEY) => {
  return new Promise((resolve,reject) =>{
    AsyncStorage.getItem(KEY).
    then(res =>{
      if(res != null){
        resolve(JSON.parse(res));
      }else{
        resolve('empty');
      }
    })
    .catch(err => reject(err))
  });
};
