import type { FormEvent } from "react";

import { useState } from "react";
import { useDatabase } from "../../contexts/Database"
import { useInput } from "../../hooks/useInput/hooks/useInput/useInput";

import GuideComponent from "./components/GuideComponent";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { validateEmail } from "../../utils/validations";

import "./Guides.css"

const Guides = () => {

    const {
        guides,
        currentUser,
        makeAnAdmin,
    } = useDatabase();
  
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean | string>(false);

    const [adminEmail, handleAdminChange, setAdminError] = useInput({})

    const handleAddAdmin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false)
        setAdminError();

        if(validateEmail(adminEmail.value))
            return setAdminError(true, "Invalid Email")
        
        try{
            setLoading(true)
            const result = await makeAnAdmin(adminEmail.value)
            console.log(result)
        }catch(error){
            console.error(error)
            setError("Failed to make an admin.")
        }
        
        setLoading(false)
    }

    if(currentUser)
    return <main className="guides-page__main">
        {
            currentUser.isAdmin 
                && <section className="make-admin__form">
                    <Form
                        onSubmit={handleAddAdmin}
                        isError={typeof error == "string"} 
                        errorMessage={typeof error == "string" ? error : undefined}
                    >   
                        <div className="input-container">
                            <Input
                                value={adminEmail.value}
                                isError={adminEmail.isError}
                                errorMessage={adminEmail.errorMessage}
                                onChange={handleAdminChange}
                            >
                                Email
                            </Input>
                        </div>
                        <div className="submit-container-2">
                            <Button
                                role="submit"
                                type="primary"
                                loading={loading}
                                disabled={loading}
                            >
                                Make an admin
                            </Button>
                        </div>
                    </Form>
                </section>
        }
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
