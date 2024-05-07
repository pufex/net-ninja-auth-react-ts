import type { FormEvent } from "react"

import { useState } from "react"
import { useInput } from "../../../hooks/useInput/hooks/useInput/useInput"
import { useStorageInput } from "../../../hooks/useInput/hooks/useInput/useStorageInput"
import { useModals } from "../Modals"
import { useDatabase } from "../../Database"

import Input from "../../../components/Input/Input"
import Form from "../../../components/Form/Form"
import Button from "../../../components/Button/Button"
import CloseModal from "../../../components/CloseModal/CloseModal"

import "./Login.css"

const Login = () => {

    const {closeModal} = useModals();
    const {login} = useDatabase();

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean | string>(false)

    const [email, handleEmailChange, setEmailError] = useStorageInput({key: "login-email"})
    const [password, handlePasswordChange, setPasswordError] = useInput({})

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
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
            setLoading(true);
            await login(email.value, password.value)
            closeModal();
        }catch(error){
            console.error(error)
            setError("Failed to log in")
        }
        setLoading(false)
    }

    return <div className="modal__window">
        <div 
            className="modal__shadow"
            onClick={closeModal}
        ></div>
        <div className="login__modal">
            <CloseModal 
                top="1rem"
                right="1rem"
            />
            <Form
                onSubmit={handleLogin}
                title="Log in"
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

export default Login
