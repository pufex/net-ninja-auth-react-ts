import type { ReactElement } from "react"

import { useEffect, forwardRef } from "react"
import { useIcons } from "../../contexts/Icons"

import "./DropdownWithContent.css"

type DropdownWithContentProps = {
    height?: string,
    children: ReactElement | ReactElement[]
    title: string,
    display: boolean,
    switchDisplay: () => void,
}

const DropdownWithContent = forwardRef<HTMLDivElement, DropdownWithContentProps>(({
    height,
    children,
    title,
    display,
    switchDisplay,
}, ref) => {

    const { 
        IoIosArrowDown, 
        IoIosArrowUp, 
    } = useIcons();

    useEffect(() => {

    })

    return <div 
        className="dwc-container"
        ref={ref}
    >
        <header 
            className="dwc__header"
            onClick={switchDisplay}
            style={{
                height: height
                ? `${parseFloat(height.toString())}rem`
                : "4.5rem",
            }}
        >
            <h1 className="dwc__title">
                {title}
            </h1>
            <div
                className="btn btn--dwc"
            >
                {
                    !display
                        ? <IoIosArrowDown 
                            className="btn--dwc-icon"
                            size={35}
                        />
                        : <IoIosArrowUp 
                            className="btn--dwc-icon"
                            size={35}
                        /> 
                }
            </div>
        </header>
        <div 
            className="dwc__content"
            style={{
                display: display
                    ? "block"
                    : "none"
            }}
        >
            {children}
        </div>
    </div>
})

export default DropdownWithContent
