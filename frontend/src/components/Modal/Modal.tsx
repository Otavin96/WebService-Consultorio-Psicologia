import { Button } from "../Form/Button/Button";
import * as S from "./styled";

interface ModalProps {
  id: string | undefined;
  setModal: (value: boolean) => void;
  title?: string;
  message: string;
  onConfirm: (id: string | undefined) => void;
}

const Modal = ({ setModal, title, message, onConfirm, id }: ModalProps) => {
  const closeModal = () => setModal(false);

  const handleConfirm = (id: string | undefined) => {
    onConfirm(id);
    closeModal();
  };

  return (
    <S.Modal>
      <S.ModalContent>
        {title && <S.Title>{title}</S.Title>}
        <S.Text>{message}</S.Text>
        <S.ModalActions>
          <Button text="Confirmar" onClick={() => handleConfirm(id)}></Button>
          <Button text="Cancelar" onClick={closeModal}></Button>
        </S.ModalActions>
      </S.ModalContent>
    </S.Modal>
  );
};

export default Modal;
