import type { FormEvent } from "react"

import { useState } from "react"
import { useInput } from "../../../hooks/useInput/hooks/useInput/useInput"
import { useModals } from "../Modals"
import { useDatabase } from "../../Database"

import Input from "../../../components/Input/Input"
import Form from "../../../components/Form/Form"
import Button from "../../../components/Button/Button"
import CloseModal from "../../../components/CloseModal/CloseModal"

import "./Register.css"

const Register = () => {

    const {register} = useDatabase();
    const {closeModal} = useModals();

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean | string>(false)

    const [email, handleEmailChange, setEmailError] = useInput({})
    const [password, handlePasswordChange, setPasswordError] = useInput({})
    const [bio, handleBioChange] = useInput({})

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError()
        setPasswordError()
        setError(false)

        let shouldReturn = false;
        if(!email.value.length){
            shouldReturn = true;
            setEmailError(true, "Can't be empty")
        }
        if(!password.value.length){
            shouldReturn = true;
            setPasswordError(true, "Can't be empty")
        }

        if(shouldReturn) return;

        try{
            setLoading(true)
            await register(email.value, password.value, bio.value)
            closeModal();
        }catch(error){
            console.error(error)
            setError("Failed to register.")
        }
        setLoading(false)

    }

    return <div className="modal__window">
        <div 
            className="modal__shadow"
            onClick={closeModal}
        ></div>
        <div className="register__modal">
            <CloseModal 
                top="1rem"
                right="1rem"
            />
            <Form
                onSubmit={handleRegister}
                title="Register"
                isError={typeof error == "string"}
                errorMessage={typeof error == "string" ? error : undefined}
            >
                <div className="input-container">
                    <Input
                        value={email.value}
                        onChange={handleEmailChange}
                        isError={email.isError}
                        errorMessage={email.errorMessage}
                    >
                        Email
                    </Input>
                </div>
                <div className="input-container">
                    <Input
                        value={password.value}
                        onChange={handlePasswordChange}
                        isError={password.isError}
                        errorMessage={password.errorMessage}
                        isPassword={true}
                    >
                        Password
                    </Input>
                </div>
                <div className="input-container">
                    <Input
                        value={bio.value}
                        onChange={handleBioChange}
                        isError={bio.isError}
                        errorMessage={bio.errorMessage}
                    >
                        Bio
                    </Input>
                </div>
                <div className="submit-container">
                    <Button
                        type="primary"
                        role="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        SIGN UP
                    </Button>
                </div>
            </Form>
        </div>
    </div>
}

export default Register
