import type { Guide } from "../../contexts/Database";
import type { FetchStatuses } from "../../types/types";

import { useState, useEffect } from "react";
import { useDatabase } from "../../contexts/Database"

import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";

import GuideComponent from "./components/GuideComponent";

import "./Guides.css"

const Guides = () => {

    const {
        currentUser,
        getAllGuides,
    } = useDatabase();

    const [guides, setGuides] = useState<Guide[]>([])
    const [guidesFetchStatus, setGuidesFetchStatus] = useState<FetchStatuses>("loading");

    const fetchGuides = async () => {
        setGuidesFetchStatus("loading")
        getAllGuides()
            .then((snapshot) => {
                const guides: Guide[] = [];
                // @ts-expect-error: Won't let me import the promise's generics for this function.
                snapshot?.docs?.forEach?.((doc) => {  
                    guides.push({...doc.data(), id: doc.id})
                })
                setGuides(guides)
                setGuidesFetchStatus("success")
            })
            .catch((error) => {
                console.error(error);
                setGuidesFetchStatus("error");
            })
    }

    useEffect(() => {
        fetchGuides()
    }, [])

    if(guidesFetchStatus == "loading")
    return <LoadingPage />

    else if(guidesFetchStatus == "error")
    return <ErrorPage />

    else if(currentUser)
    return <main className="guides-page__main">
        <section className="guides-page__guides">
            {
                guides?.map(({
                    title,
                    content
                }) => {
                    return <GuideComponent 
                        title={title}
                        content={content}
                    />
                })
            }
        </section>
    </main> 
    else
    return <main className="guides-page__main">
        <header className="guides-page__header">
            <h1 className="guides-page__heading">
                Guides will go here.
            </h1>
        </header>
    </main>

}

export default Guides
