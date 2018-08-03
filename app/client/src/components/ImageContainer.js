import React, { Component, Fragment } from "react";
import {
  Container,
  Image,
  Segment,
  Header,
  Modal,
  Icon,
  Button,
  Message,
  Form
} from "semantic-ui-react";

class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      imageList:[]
    };
  }

  componentDidMount() {
    fetch('/getImages')
      .then(res => res.json())
      .then(images => this.setState({ imageList: images }))
  }

  handleOpenModal = () => {
    console.log("Modal opened");
    this.setState({
      openModal: true
    });
  };

  handleCloseModal = () => {
    console.log("Modal closed");
    this.setState({
      openModal: false
    });
  };

  handleImageSubmit = () => {
    console.log("form has been submitted");
  };

  render() {
    const { imageList } = this.state;

    console.log("images are", imageList);

    const imageModal = (
      <Modal open={this.state.openModal} onClose={this.handleCloseModal}>
        <Modal.Header>Selectionnez une Image</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form onSubmit={this.handleImageSubmit} error>
              <Form.Field>
                <label>URL</label>
                <input placeholder="URL de l'image" />
              </Form.Field>
              <Message
                error
                header="Action Forbidden"
                content="You can only sign up for an account once with a given e-mail address."
              />
              <Form.Field>
                <label>description</label>
                <input placeholder="Entrez une description" />
              </Form.Field>
              <Button type="submit" floated="right">
                Valider
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );

    return (
      <Fragment>
        <Container fluid>
          <Segment padded>
            <Image.Group size="small">
              {imageList.map((image, i) => {
                return (
                  <Modal
                    key={i}
                    trigger={<Image src={image.src} alt="image" size="tiny" />}
                  >
                    <Modal.Header>
                      This image id is : {image.imageId}
                    </Modal.Header>
                    <Modal.Content image>
                      <Image wrapped size="medium" src={image.src} />
                      <Modal.Description>
                        <Header>This is a header/title</Header>
                        <p>{image.desc}</p>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                );
              })}
            </Image.Group>
            <Button
              onClick={this.handleOpenModal}
              icon
              circular
              floated="right"
              size="large"
              color="green"
            >
              <Icon name="plus" size="large" color="white" />
            </Button>
            {imageModal}
          </Segment>
        </Container>
      </Fragment>
    );
  }
}

export default ImageContainer;
