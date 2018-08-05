import React, { Component, Fragment } from "react";
import {
  Container,
  Image,
  Segment,
  Header,
  Modal,
  Icon,
  Button,
  Form
} from "semantic-ui-react";

class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      imageList:[],
      imageSrc:'',
      desc:''
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
    console.log('image src is : %s and desc is : %s',this.state.imageSrc, this.state.desc)

    fetch('/postImage', {
      method: 'POST',
      body: JSON.stringify({
        imageSrc: this.state.imageSrc,
        desc: this.state.desc
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(console.log('JSON sent to server',
      JSON.stringify({
        imageSrc: this.state.imageSrc,
        desc: this.state.desc
      })
    ))
    .then(
      fetch('/getImages')
      .then(res => res.json())
      .then(images => this.setState({ imageList: images }))
    )// Re-render the image list in the view
    .then(this.setState({ openModal: false,}))// Close Modal
  };

  handleUrlChange = (event) => {
    this.setState({
      imageSrc:event.target.value
    })
  }

  handleDescriptionChange = (event) => {
    this.setState({
      desc:event.target.value
    })
  }

  handleDeleteImage = (id) => {
    console.log('Delete image with id = %s',id)
  }

  handleEditImage = (id) => {
    console.log('Edit image with id = %s',id)
  }



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
                <input 
                  placeholder="Entrez l'URL de l'image" 
                  value={this.state.imageSrc}
                  onChange={this.handleUrlChange}
                />
              </Form.Field>
              <Form.Field>
                <label>description</label>
                <input 
                  placeholder="Entrez une description" 
                  value={this.state.desc}
                  onChange={this.handleDescriptionChange}
                />
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
                    trigger={<Image src={image.imageSrc} alt={image.description} size="tiny" />}
                  >
                    <Modal.Header>
                      Identifiant de l'image : {image._id}
                      <Button 
                        circular
                        floated="right" 
                        icon='trash alternate outline'
                        onClick={() => {this.handleDeleteImage(image._id)}}
                     />
                      <Button
                        circular
                        floated="right"
                        icon='edit outline'
                        onClick={() => {this.handleEditImage(image._id)}}
                     />
                    </Modal.Header>
                    <Modal.Content image>
                      <Image wrapped size="medium" src={image.imageSrc} />
                      <Modal.Description>
                        <Header>Récit</Header>
                        <p>{image.description}</p>
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
