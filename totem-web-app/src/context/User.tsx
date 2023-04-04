import React, { createContext, useState } from 'react';

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
    const [userInfo, setUserInfo] = useState<UserInfo>({ TotemId: '', token: ''});

    const setTotemId = (code: string) => {
        setUserInfo({ TotemId: code, token: userInfo.token});
    }

    const setToken = (token: string) => {
        setUserInfo({ TotemId: userInfo.TotemId, token: token});
    }

    return (
        <UserContext.Provider value={{userInfo, setTotemId, setToken}}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };