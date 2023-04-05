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
    setToken: (token: string) => void,
    setAllUserInfo: (userInfo: UserInfo) => void
}>(
    {
        userInfo: { TotemId: '', token: ''},
        setTotemId: (code: string) => {},
        setToken: (token: string) => {},
        setAllUserInfo: (userInfo: UserInfo) => {}
});

function UserProvider(props: { children: React.ReactNode }) {
    const [userInfo, setUserInfo] = useState<UserInfo>(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        return savedUserInfo ? JSON.parse(savedUserInfo) : { TotemId: '', token: ''};
    });

    const setTotemId = (code: string) => {
        // console.log("setTotemId: "+code+" token: "+userInfo.token);
        setUserInfo({ TotemId: code, token: userInfo.token});
    }

    const setToken = (token: string) => {
        // console.log("setToken: "+token+" TotemId: "+userInfo.TotemId);
        setUserInfo({ TotemId: userInfo.TotemId, token: token});
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        // console.log("setTokenAfter: ", userInfo);
        return new Promise((resolve, reject) => {
            resolve(token)
        })
    }

    const setAllUserInfo = (userInfo: UserInfo) => {
        // console.log("setUserInfo: ", userInfo);
        setUserInfo(userInfo);
    }

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        // console.log("update userInfo: ", userInfo);
    }, [userInfo]);

    return (
        <UserContext.Provider value={{userInfo, setTotemId, setToken, setAllUserInfo}}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
export type { UserInfo };
