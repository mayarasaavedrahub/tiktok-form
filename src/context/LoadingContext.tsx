import { createContext, useContext, useState } from 'react';

interface LoadingContextProps {
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps>({} as LoadingContextProps);

export const useLoading = () => useContext(LoadingContext);

export const LoadingContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
};
