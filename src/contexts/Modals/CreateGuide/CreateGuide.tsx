import type { FormEvent } from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useModals } from "../Modals"
import { useDatabase } from "../../Database"
import { useInput } from "../../../hooks/useInput/hooks/useInput/useInput"


import Form from "../../../components/Form/Form"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import CloseModal from "../../../components/CloseModal/CloseModal"

import "./CreateGuide.css"

const CreateGuide = () => {

    const navigate = useNavigate();

    const {closeModal} = useModals();
    const {createNewGuide} = useDatabase();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean | string>(false);

    const [title, handleTitleChange, setTitleError] = useInput({})
    const [content, handleContentChange, setContentError] = useInput({})

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setTitleError()
        setContentError()

        let shouldReturn = false;

        if(!title.value.length){
            shouldReturn = true;
            setTitleError(true, "Can't be empty");
        }

        if(!content.value.length){
            shouldReturn = true;
            setContentError(true, "Can't be empty");
        }

        if(shouldReturn) return;
    
        
        try{
            setLoading(true)
            await createNewGuide(title.value, content.value)
            closeModal();
            navigate("/")
        }catch(error){
            console.error(error)
            setError("Failed to create a guide.")
        }

        setLoading(false)

    
    }


    return <div className="modal__window">
        <div className="modal__shadow"></div>
        <div className="create-guide__modal">
            <CloseModal top="1rem" right="1rem"/>
            <Form
                title="Create Guide"
                onSubmit={handleSubmit}
                isError={typeof error == "string"}
                errorMessage={typeof error == "string" ? error : undefined}
            >
                <div className="input-container">
                    <Input
                        value={title.value}
                        isError={title.isError}
                        errorMessage={title.errorMessage}
                        onChange={handleTitleChange}
                    >
                        Title
                    </Input>
                </div>
                <div className="input-container">
                    <Input
                        value={content.value}
                        isError={content.isError}
                        errorMessage={content.errorMessage}
                        onChange={handleContentChange}
                    >
                        Content
                    </Input>
                </div>
                <div className="submit-container">
                    <Button
                        type="primary"
                        role="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        Create Guide
                    </Button>
                </div>
            </Form>
        </div>
    </div>
}

export default CreateGuide
