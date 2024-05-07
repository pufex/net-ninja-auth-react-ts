import type { ReactElement } from "react"
import type { User, UserCredential } from "firebase/auth"

import LoadingPage from "../page/LoadingPage/LoadingPage"

import { createContext, useContext, useState, useEffect } from "react"

import { 
    db,
    guides,
    auth,
    users
} from "../firebase/firebase"
import { doc, getDoc, getDocs, query, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

export type Guide = {
    title: string,
    content: string,
}

export type UserDocument = {
    email: string,
    bio: string,
}

export type GetAllGuidesFunction = () => Promise<unknown>

export type RegisterFunction = (
    email: string,
    password: string,
    bio: string,
) => Promise<unknown>
export type LoginFunction = (
    email: string,
    password: string,
) => Promise<UserCredential>

export type LogoutFunction = () => Promise<void>

type DatabaseContextType = {
    currentUser: User | undefined,
    currentDocument: UserDocument | undefined,
    getAllGuides: GetAllGuidesFunction,
    register: RegisterFunction,
    login: LoginFunction,
    logout: LogoutFunction,
}

const DatabaseContext = createContext<DatabaseContextType | null>(null)

export const useDatabase = () => {
    const database = useContext(DatabaseContext)
    if(!database) throw Error("Cannot use outside a provider.")
    else return database;
}

type DatabaseProviderProps = {
    children: ReactElement[] | ReactElement,
}

const DatabaseProvider = ({
    children,
}: DatabaseProviderProps) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [currentDocument, setCurrentDocument] = useState<UserDocument | undefined>()

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setLoading(true)
            if(user){
                setCurrentUser(user)
                
                const userRef = doc(users, user.uid)
                getDoc(userRef)
                    .then((doc) => {
                        // @ts-expect-error: gonna be valid
                        const data: UserDocument = doc.data();
                        setCurrentDocument(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }else{
                setCurrentUser(undefined);
                setCurrentDocument(undefined)
            }
            setLoading(false)
        })
        return unsub
    }, [])
    
    useEffect(() => {
        console.log(currentUser)
    }, [currentUser])

    const getAllGuides = () => {
        const guidesQuery = query(guides)
        return getDocs(guidesQuery)
    }

    const register: RegisterFunction = async (email, password, bio) => {
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const userDoc = doc(db, "users", userCredential.user.uid)
            setDoc(userDoc, {
                email,
                bio,
            })
        }catch(error){
            console.error(error)
        }
    }

    const login: LoginFunction = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout: LogoutFunction = () => {
        return signOut(auth);
    }

    const value: DatabaseContextType = {
        currentUser,
        currentDocument,
        getAllGuides,
        register,
        login,
        logout,
    }

    return <DatabaseContext.Provider
        value={value}
    >
        {loading ? <LoadingPage /> : children}
    </DatabaseContext.Provider>  
}

export default DatabaseProvider
