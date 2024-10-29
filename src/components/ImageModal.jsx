import Modal from 'react-modal'
import css from './ImageModal.module.css'

const ImageModal = ({isOpen, onRequestClose, imageSrc }) => {
    return (
   <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    overlayClassName={css.overlay}
      className={css.modalContent} 
      shouldCloseOnOverlayClick={true} 
      shouldCloseOnEsc={true} 
    >
      <img src={imageSrc} alt="Modal View" className={css.modalImage} />
    </Modal>
    )
}

export default ImageModal