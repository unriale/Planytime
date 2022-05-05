import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";

const GenericModal = (props) => {
  const { modalOpen, title, toggle, size } = props;
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggle}
      size={size || "md"}
      centered={true}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        {props.children}
        <div style={{ textAlign: "center" }}>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default GenericModal;
