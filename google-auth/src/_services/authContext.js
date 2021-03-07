import React from 'react'
const AuthContext=React.createContext({ //context for keeping track on user's logedin status in various components.
    isLogedIn:0,
    login:()=>{}, //there functions will be passed to child component without using props.
    logout:()=>{}
})
const AuthContextProvider = AuthContext.Provider
const AuthContextConsumer = AuthContext.Consumer
export {AuthContextProvider,AuthContextConsumer}
export default AuthContext;
