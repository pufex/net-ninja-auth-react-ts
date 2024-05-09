import type { ReactElement } from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import Register from "./Register/Register"
import Login from "./Login/Login"
import Account from "./Account/Account"
import CreateGuide from "./CreateGuide/CreateGuide"

export type OpenModalFunction = (
    modal: string,
) => void
export type CloseModalFunction = () => void;

type ModalsContextType = {
    closeModal: CloseModalFunction,
    openModal: OpenModalFunction,
}

const ModalsContext = createContext<ModalsContextType | null>(null)

export const useModals = () => {
    const modals = useContext(ModalsContext)
    if(!modals) throw Error("Cannot use outside a provider")
    else return modals;
}

type ModalsProviderProps = {
    children: ReactElement[] | ReactElement,
}

const ModalsProvider = ({
    children,
}:ModalsProviderProps) => {

    const [params, setParams] = useSearchParams();
    const modalParam = params.get("modal");
    
    const [modal, setModal] = useState<ReactElement[] | ReactElement | null>(null)
    
    const determineModal = () => {
        switch(modalParam){
            case "sign-up":
                return <Register />
            case "log-in":
                return <Login />
            case "account":
                return <Account />
            case "create-guide":
                return <CreateGuide />
            default:
                return null
        }
    }

    useEffect(() => {
        setModal(determineModal())
    }, [modalParam])

    const openModal: OpenModalFunction = (modal) => {
        setParams((previous) => {
            previous.set("modal", modal)
            return previous
        })
    }

    const closeModal: CloseModalFunction = () => {
        if(params.has("modal"))
            setParams((previous) => {
                if(previous.has("modal"))
                    previous.delete("modal")
                return previous
            })
    }

    const value: ModalsContextType = {
        openModal,
        closeModal,
    }

    return <ModalsContext.Provider
        value={value}
    >
        {modal}
        {children}
    </ModalsContext.Provider>
}

export default ModalsProvider
