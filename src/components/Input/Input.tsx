import type { ChangeEvent } from "react"

import { useState } from "react"
import { useIcons  } from "../../contexts/Icons" 

import { mergeClasses } from "../../utils/mergeClasses"

import "./Input.css"

type InputProps = {
    children?: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    isError?: boolean,
    errorMessage?: string,
    isPassword?: boolean,
}

const Input = ({
    children,
    value,
    onChange,
    isError, 
    errorMessage,
    isPassword,
}:InputProps) => {

    const {
        IoIosLock,
        IoIosUnlock,
    } = useIcons();

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const switchShowPassword = () => {
        setShowPassword(previous => !previous)
    }

    return <div 
        className={mergeClasses(
            "input__container",
            value != "" ? "filled" : ""
        )}
    >
        <div className="input__labels">
            <label className={mergeClasses(
                "input__label",
                isError ? "input__label--error" : ""
            )}>
                {children}
            </label>
            {
                isError 
                    ? <label
                        className="input__label input__label--error"
                    >
                        {
                            errorMessage ?? "Invalid value"
                        }
                    </label>
                    : null
            }
        </div>
        <div className={mergeClasses(
            "input__input",
            isError ? "input__input--error" : ""
        )}>
            <input 
                className="input__input-itself"
                type={!isPassword ? "text" : !showPassword ? "password" : "text"} 
                value={value}
                onChange={onChange}
            />
            {
                isPassword
                    ? <button
                        className="btn input--lock"
                        onClick={switchShowPassword}
                        type="button"
                        tabIndex={-1}
                    >
                        {
                            !showPassword 
                                ? <IoIosLock 
                                    className="input--lock-icon"
                                    size={25}
                                />
                                : <IoIosUnlock 
                                    className="input--lock-icon"
                                    size={25}
                                />
                        }
                    </button>
                    : null
            }
        </div>
  </div>
}

export default Input
