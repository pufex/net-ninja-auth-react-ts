import { useIcons } from "../../contexts/Icons"
import "./Logo.css"

const Logo = () => {
    
    const { RiGuideFill } = useIcons()

    return <div className="logo__container">
        <RiGuideFill
            className="logo__logo-itself"
            size={60}
        />
    </div>
}

export default Logo
