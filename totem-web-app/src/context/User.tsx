import React, { createContext, useState, useEffect } from 'react';

//create new type for context (is include one int named code and one string named token)
type UserInfo = {
    TotemId: string;
    token: string; 
}

// create a context for UserInfo with default value and one function to set the value
const UserContext = createContext<{ 
    userInfo: UserInfo, 
    setTotemId: (code: string) => void,
    setToken: (token: string) => void}>(
    {
        userInfo: { TotemId: '', token: ''},
        setTotemId: (code: string) => {},
        setToken: (token: string) => {}
});

function UserProvider(props: { children: React.ReactNode }) {
    const [userInfo, setUserInfo] = useState<UserInfo>(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        return savedUserInfo ? JSON.parse(savedUserInfo) : { TotemId: '', token: ''};
    });

    const setTotemId = (code: string) => {
        if(!code)code=''
        console.log("setTotemId to : ", code)
        setUserInfo({ TotemId: code, token: userInfo.token});
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    const setToken = (token: string) => {
        if(!token)token=''
        console.log("setToken to : ", token)
        setUserInfo({ TotemId: userInfo.TotemId, token: token});
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log("setToken userInfo : ", userInfo)
    }

    return (
        <UserContext.Provider value={{userInfo, setTotemId, setToken}}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };