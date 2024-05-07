import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useModals } from "../../contexts/Modals/Modals"

import Logo from "../Logo/Logo"


import "./Nav.css"
import { useDatabase } from "../../contexts/Database"

const Nav = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false)
    const {
        currentUser, 
        currentDocument,
        logout,
    } = useDatabase();

    useEffect(() => {
        console.error(error)
    }, [error])

    const handleLogout = async () => {
        try{
            setLoading(true)
            await logout()
        }catch(error){
            console.error(error)
            setError(true);
        }
        setLoading(true)
    }

    const {openModal} = useModals()

    const [mobileView, setMobileView] = useState<boolean>(false);

    const setView = () => {
        const viewportWidth = window.innerWidth;
        if(viewportWidth <= 600)
            setMobileView(true)
        else setMobileView(false)
    }

    useEffect(() => {
        setView();
        window.addEventListener("resize", setView)
        return () => window.removeEventListener("resize", setView)
    }, [])

    return <nav className="nav">
        <div className="nav__inner-container">
            <section className="nav--left">
                <div 
                    className="nav__logo-wrapper"
                    onClick={() => navigate("/")}
                >
                    <Logo />
                    {
                        !mobileView 
                            && <h1 className="nav__website-title">
                                GamezGuidez
                            </h1>
                    }
                </div>
            </section>
            <section className="nav--right">
                {
                    !currentUser
                        ? <>
                            <button 
                                className="nav__button"
                                onClick={() => openModal("log-in")}
                            >
                                Log In
                            </button>
                            <button 
                                className="nav__button"
                                onClick={() => openModal("sign-up")}
                            >
                                Register
                            </button>
                        </> 
                        : <>
                        {
                            currentDocument
                                && <button
                                    className="nav__button"
                                    onClick={() => openModal("account")}
                                >
                                    Account
                                </button>
                        }
                            <button
                                className="nav__button"
                                onClick={handleLogout}
                                disabled={loading}
                            >
                                Logout
                            </button>
                        </>
                }
            </section>
        </div>
    </nav>
}

export default Nav
