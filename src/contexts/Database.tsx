import type { ReactElement } from "react"
import type { User, UserCredential } from "firebase/auth"

import LoadingPage from "../page/LoadingPage/LoadingPage"

import { createContext, useContext, useState, useEffect } from "react"

import { 
    db,
    guides,
    auth,
    functions,
    users
} from "../firebase/firebase"
import { addDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { httpsCallable } from "firebase/functions"

export type Guide = {
    title: string,
    content: string,
}

export type UserDocument = {
    email: string,
    bio: string,
}

export type CreateGuideFunction = (
    title: string,
    content: string,
) => Promise<unknown>

export type RegisterFunction = (
    email: string,
    password: string,
    bio: string,
) => Promise<unknown>
export type LoginFunction = (
    email: string,
    password: string,
) => Promise<UserCredential>

export type MakeAnAdminFunction = (email: string) => Promise<unknown>

export type LogoutFunction = () => Promise<void>

type DatabaseContextType = {
    guides: Guide[],
    currentUser: (User & {isAdmin: boolean}) | undefined,
    currentDocument: UserDocument | undefined,
    createNewGuide: CreateGuideFunction,
    register: RegisterFunction,
    login: LoginFunction,
    logout: LogoutFunction,
    makeAnAdmin: MakeAnAdminFunction,
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

    const [loadingUser, setLoadingUser] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<(User & {isAdmin: boolean}) | undefined>();
    const [currentDocument, setCurrentDocument] = useState<UserDocument | undefined>()
    
    const [loadingGuides, setLoadingGuides] = useState<boolean>(true);
    const [guidesArr, setGuidesArr] = useState<Guide[]>([])

    // Add admin cloud function 

    const addAdminRole = httpsCallable(functions, "addAdminRole")

    const makeAnAdmin: MakeAnAdminFunction = (email) => {
        return addAdminRole({email});
    }

    useEffect(() => {
        const unsub = onSnapshot(guides, (snapshot) => {
            setLoadingGuides(true)
            if(snapshot){
                const arr: Guide[] = []
                snapshot.docs.forEach((doc) => {
                    // @ts-expect-error: bs
                    arr.push(doc.data());
                })
                setGuidesArr(arr);
            }else setGuidesArr([]);
            setLoadingGuides(false);
        }, (err) => {
            console.error(err)
        })
        return unsub
    }, [])

    const createNewGuide: CreateGuideFunction = (title, content) => {
        return addDoc(guides, {
            title,
            content,
        })
    }

    useEffect(() => {
        console.log(currentUser)
    }, [currentUser])

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setLoadingUser(true)
            if(user){
                user.getIdTokenResult()
                    .then((idTokenResult) => {
                        // @ts-expect-error
                        setCurrentUser({...user, isAdmin: idTokenResult.claims.isAdmin})
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                
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
            setLoadingUser(false)
        }, (err) => {
            console.error(err);
        })
        return unsub
    }, [])

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
        guides: guidesArr,
        currentUser,
        currentDocument,
        createNewGuide,
        register,
        login,
        logout,
        makeAnAdmin,
    }

    return <DatabaseContext.Provider
        value={value}
    >
        {loadingUser || loadingGuides ? <LoadingPage /> : children}
    </DatabaseContext.Provider>  
}

export default DatabaseProvider
