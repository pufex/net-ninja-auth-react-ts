import { useState } from "react"

import DropdownWithContent from "../../../components/DropdownWithContent/DropdownWithContent"

import "./GuideComponent.css"

type GuideComponentProps = {
    title: string,
    content: string,
}

const GuideComponent = ({
    title,
    content
}: GuideComponentProps) => {

    const [display, setDisplay] = useState<boolean>(false);
    const switchDisplay = () => {
        setDisplay(previous => !previous);
    }

    return <DropdownWithContent
        title={title}
        display={display} 
        switchDisplay={switchDisplay}     
    >
        <div className="guide-component__content">
            {content}
        </div>
    </DropdownWithContent>
}

export default GuideComponent
