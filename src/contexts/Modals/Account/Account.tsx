import { useEffect } from "react";
import { useDatabase } from "../../Database"
import { useModals } from "../Modals";

import CloseModal from "../../../components/CloseModal/CloseModal";

import "./Account.css"

const Account = () => {

    const {closeModal} = useModals();
    const {currentUser, currentDocument} = useDatabase();

    useEffect(() => {
        if(!currentDocument)
            closeModal();
    }, [currentDocument])

    return <div className="modal__window">
        <div className="modal__shadow"></div>
        <article className="account-modal">
            <CloseModal top="1rem" right="1rem" />
            <header className="account__header">
                <h1 className="account__heading">
                    Account Details
                </h1>
            </header>
            <section className="account-details">
                <p className="account-details__paragraph">
                    Logged in as {currentDocument?.email}
                </p>
                <p className="account-details__paragraph">
                    {currentDocument?.bio}
                </p>
                {
                    // @ts-expect-error: ?????
                    currentUser.isAdmin 
                        && <p className="account-details__paragraph--role">
                            Admin Acount
                        </p>
                }
            </section>
        </article>
    </div>
}

export default Account
