import React, {createContext, useContext, useState } from "react";

//create a new context
const AppContext = createContext();

//create a provider component to wrap app and provide the context value
function AppProvider({ children }) {
    const [drugInfo, setDrugInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);   //adds modal state
    const [fetchedData, setFetchedData] = useState(null);

    return(
        <AppContext.Provider 
            value={{ 
                drugInfo, 
                setDrugInfo,
                isModalOpen,
                setIsModalOpen,
                fetchedData,
                setFetchedData, 
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

function useAppContext() {
    //create a custom hook to access context values
    return useContext(AppContext);
}

export { AppContext, AppProvider, useAppContext };