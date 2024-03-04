import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "./modalSlice";

const CustomModal = ({ title, children }) => {
  const { showModal } = useSelector((state) => state.modalInfo);
  const dispatch = useDispatch();

  return (
    <Modal
      show={showModal}
      onHide={() => dispatch(setShowModal(false))}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
