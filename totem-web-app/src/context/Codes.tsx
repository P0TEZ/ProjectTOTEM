import React, { createContext, useState } from 'react';

const CodeContext = createContext({
    code: '',
    setCode: (newCode: string) => {

    },
});

function CodeProvider(props: { children: React.ReactNode }) {
    const [code, setCode] = useState<string>("none");

    return (
        <CodeContext.Provider value={{ code, setCode}}>
            {props.children}
        </CodeContext.Provider>
    );
}

export { CodeContext, CodeProvider };