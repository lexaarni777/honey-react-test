import axios from 'axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionType'
import firebase from '../../firebase/Config'
import UserList from '../../conteiners/UserList/UserList'

export function auth(email, password, isLogin, onClose){
    return async dispatch => {
            const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4Q5_de3gsjL9Y9cQPOArEqm-n7v7hcN8'

        if(isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4Q5_de3gsjL9Y9cQPOArEqm-n7v7hcN8'
            
        }
        const response = await axios.post(url, authData)

        const data = response.data

        console.log('инфа пользователя response', response)
        


        const expirationDate = new Date(new Date().getTime() + data.expiresIn *1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))

        

        if(isLogin||response.status=='200'){

            var UserRef = firebase.database().ref('users').push();
            let key = UserRef.key

            let user = {
                email: data.email,
                userKey: key
            }
           
            UserRef.set(user);
            console.log(key)

        }
        if(!!localStorage.token){
            onClose()
        }

    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token){
    return{
        type: AUTH_SUCCESS,
        token
    }
}