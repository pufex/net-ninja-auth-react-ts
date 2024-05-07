import { useIcons } from "../../contexts/Icons";
import { useModals } from "../../contexts/Modals/Modals"

import "./CloseModal.css"

type CloseModalProps = Partial<{
    top: string,
    left: string,
    bottom: string,
    right: string,
}>

const CloseModal = ({
    top,
    left,
    bottom,
    right
}:CloseModalProps) => {
    
    const { IoMdClose } = useIcons();
    const { closeModal } = useModals();

    return <button 
        className="close-modal__container"
        onClick={closeModal}
        style={{
            top: top ? top : undefined,
            left: left ? left : undefined,
            bottom: bottom ? bottom : undefined,
            right: right ? right : undefined,
        }}
    >
        <IoMdClose 
            size={50}
            className="close-modal__icon"
        />
    </button>
}

export default CloseModal
