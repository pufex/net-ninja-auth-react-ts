import type { ReactElement } from "react"
import type { IconType } from "react-icons";
import { createContext, useContext} from "react"

import { RiGuideFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosLock } from "react-icons/io";
import { IoIosUnlock } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

type IconsContextTypes = {
    RiGuideFill: IconType,
    IoIosArrowDown: IconType,
    IoIosArrowUp: IconType,
    AiOutlineLoading3Quarters: IconType,
    IoIosLock: IconType,
    IoIosUnlock: IconType,
    IoMdClose: IconType,
}

const IconsContext = createContext<IconsContextTypes | null>(null)

export const useIcons = () => {
    const icons = useContext(IconsContext)
    if(!icons) throw Error("Cannot use outside a provider.")
    else return icons;
}

type IconsProviderProps = {
    children: ReactElement[] | ReactElement,
}

const IconsProvider = ({
    children,
}:IconsProviderProps) => {
    
    const value: IconsContextTypes = {
        RiGuideFill,
        IoIosArrowUp,
        IoIosArrowDown,
        AiOutlineLoading3Quarters,
        IoIosLock,
        IoIosUnlock,
        IoMdClose,
    }
    
    return <IconsContext.Provider
        value={value}
    >
        {children}
    </IconsContext.Provider>
}

export default IconsProvider
