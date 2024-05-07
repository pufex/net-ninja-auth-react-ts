import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Link } from "react-router-dom"

import "./ErrorPage.css"

const ErrorPage = () => {

    const navigate = useNavigate();

    const [seconds, setSeconds] = useState<number>(5)

    // @ts-expect-error: expect error
    const intervalRef = useRef<Interval | number | undefined>(undefined);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSeconds((previous) => {
                if(previous - 1 <= 0)
                    navigate("/")
                return previous - 1
            })
        }, 1000)
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])

    return <main className="error-page__main">
        <header className="error-page__header">
            <h1 className="error-page__heading">
                Error page
            </h1>
        </header>
        <p className='error-page__information'>
            Redirecting in {seconds} seconds. <Link to={"/"} className="link">Go home</Link>
        </p>
    </main>
}

export default ErrorPage
