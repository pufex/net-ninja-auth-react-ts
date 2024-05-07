import { useIcons } from "../../contexts/Icons";

import "./LoadingIcon.css"

const LoadingIcon = () => {

    const {
        AiOutlineLoading3Quarters,
    } = useIcons();

    return <div className="loading-icon__container">
        <AiOutlineLoading3Quarters 
            className="loading-icon-itself"
            size={35}
        />
    </div>
}

export default LoadingIcon;