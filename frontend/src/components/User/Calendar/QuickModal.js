import { Component } from "react";
import moment from "moment";
import {
  Input,
  Label,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback,
} from "reactstrap";

class QuickModal extends Component {
  state = {
    inEditMode: false,
    addEventTitle: "Add to Your Schedule",
    editEventTitle: "Edit Your Saved Event",
    title: "",
    validation: {
      color: true,
      pickedADay: false,
      pleasePickADay: false,
      title: true,
    },
  };

  render() {
    const { modalOpen } = this.props;
    return (
      <Modal
        style={{
          maxWidth: 400,
          minWidth: "25em",
          position: "relative",
          top: "10", // original 25
        }}
        isOpen={modalOpen}
        modalTransition={{ timeout: 10 }}
        backdropTransition={{ timeout: 10 }}
      >
        <ModalHeader
          style={{
            position: "relative",
            paddingTop: "2em",
            width: "100%",
          }}
        >
          {this.state.inEditMode
            ? this.state.editEventTitle
            : this.state.addEventTitle}
        </ModalHeader>
        <ModalBody
          style={{
            position: "relative",
            top: "-0.5em",
            marginBottom: "-0.9em",
          }}
        >
          <ListGroup>
            <Label>Event Name</Label>
            <Input
              type="text"
              name="title"
              value={this.state.title}
              invalid={!this.state.validation.title}
              onChange={(e) => {
                this.setState({ [e.target.name]: [e.target.value] });
              }}
            />
          </ListGroup>
        </ModalBody>
      </Modal>
    );
  }
}

export default QuickModal;
