import React, { createContext, useState } from 'react';

const CodeContext = createContext({
    code: '',
    setCode: () => {},
});

function CodeProvider(props: { children: React.ReactNode }) {
    const [code, setCode] = useState<string>("none");

    const changeCode = (newCode: string) => {
        setCode(newCode);
    };

    return (
        <CodeContext.Provider value={{ code, changeCode}}>
            {props.children}
        </CodeContext.Provider>
    );
}

export { CodeContext, CodeProvider };