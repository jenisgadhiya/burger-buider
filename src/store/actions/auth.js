import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkauthtime=(expirationtime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationtime*1000)
    }
}

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCq3iw_UYnE9yDR_xTaodw6eleLPi9Fbko'
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCq3iw_UYnE9yDR_xTaodw6eleLPi9Fbko'
        }
        axios.post(url,authData)
        .then(response=>{
            const expirationDate=new Date(new Date().getTime() + response.data.expiresIn*1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkauthtime(response.data.expiresIn))
        }).catch(error=>{
            dispatch(authFail(error.response.data.error.message))
        })
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'))
            if(expirationDate<new Date()){
                dispatch(logout())
            }else{
                const userId=localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkauthtime((expirationDate.getTime()-new Date().getTime())/1000))
            }
        }
    }
}