import axios from 'axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionType'
import firebase from '../../firebase/Config'
import UserList from '../../conteiners/UserList/UserList'

export function auth(email, password, isLogin, onClose, userName){
    return async dispatch => {
            const authData = {
            email,
            password,
            returnSecureToken: true
        }
        console.log(isLogin) 


        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAOnBMCHfjqhp84EqtzcJ61LUjxCy8zPQ'

        if(isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAOnBMCHfjqhp84EqtzcJ61LUjxCy8zPQ'
            
        }
        const response = await axios.post(url, authData)

        const data = response.data
  


        const expirationDate = new Date(new Date().getTime() + data.expiresIn *1000)


        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        
        console.log(isLogin) 
        

        if(isLogin||response.status=='200'){

            let UserRef = firebase.database().ref('users/' + localStorage.userId)

            let user = {
                email: data.email,
                userName,
                cart: {}
            }     
            console.log(user) 
            UserRef.set(user);

        }
        if(!!localStorage.token){
            onClose()
        }
        dispatch(authSuccess(data.idToken, localStorage.userId))
        dispatch(autoLogout(data.expiresIn))

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
        type: AUTH_LOGOUT,
    }
}

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('token')
        const userId =localStorage.getItem('userId')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                dispatch(authSuccess(token, userId))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token, userId){
    return{
        type: AUTH_SUCCESS,
        token,
        userId
    }
}