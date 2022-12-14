import { createContext, useContext, useState } from "react";
const LoginContext = createContext()
const LoginProvider =({children})=>{
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [id,setId] = useState('');
    return <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn,id,setId}}>
        {children}
    </LoginContext.Provider>
}

export const useLogin =()=>useContext(LoginContext)
export default LoginProvider;