import { useContext, createContext, useEffect, useState } from "react";
import {auth} from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
 
const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user,setUser]=useState({});
    // const [password,setPassword]=useState({});

    function signUp(user,password){
        return createUserWithEmailAndPassword(auth, user, password);
    }

    function loginIn(user,password){
        return signInWithEmailAndPassword(auth, user, password);
    }

    function logOut(){
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return unsubscribe();
    })

    return (
        <AuthContext.Provider value={{signUp, loginIn, logOut, user}}>
            {children}
        </AuthContext.Provider>

    )
}

export function UserAuth(){
    return useContext(AuthContext); 
}