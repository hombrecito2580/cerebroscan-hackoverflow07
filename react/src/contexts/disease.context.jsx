import { createContext, useState } from "react";

export const diseaseContext = createContext({
    disease : "Set Data",
    setDisease : () => null 
});

export const DiseaseData = ({children}) => {
    const [disease , setDisease] = useState(null);
    const value =  {disease , setDisease};

    return <diseaseContext.Provider value={value}>{children}</diseaseContext.Provider>
}