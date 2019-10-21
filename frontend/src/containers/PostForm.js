import React, { Component } from 'react';
import { Form, Button } from "reactstrap";
import { connect } from "react-redux";
import { addPostFromAPI, editPostFromAPI } from "../actionCreators";
import "./PostForm.css";
import FormInput from "../Components/FormInput";

/**
 * PostForm: A generic form for adding and editing
 */
class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      body: '',
      invalidInputs: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.disable = this.disable.bind(this);
  }

  // update post with initial values
  // in form if postId is found
  componentDidMount() {
    if (this.props.postId) {
      const { title, description, body } = this.props.post;
      this.setState({
        title,
        description,
        body
      })
    }
  }

  // update state
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  // add or update post in redux store
  handleSubmit(evt) {
    evt.preventDefault();
    const { postId } = this.props;
    const { title, description, body } = this.state;
    let postDetails = {
      title,
      description,
      body
    };

    if (!title || !description || !body) {
      this.setState({ invalidInputs: true });
      return;
    }

    if (postId) {
      this.props.editPostFromAPI(postId, postDetails);
    } else {
      this.props.addPostFromAPI(postDetails);
    }
    this.props.history.push("/");
  }

  // redirect to home
  handleCancel(evt) {
    evt.preventDefault();
    this.props.history.push("/");
  }

  // bans submission when fields are not all filled
  disable() {
    const { title, description, body } = this.state;
    return !title || !description || !body;
  }

  render() {
    const { title, description, body } = this.state;
    return (
      <div>
        {this.state.invalidInputs && <p className="post-form-error-msg">Please fill in all fields</p>}
        <Form className="post-form" onSubmit={this.handleSubmit}>
          <FormInput handleChange={this.handleChange} name="title" type="text" value={title} />
          <FormInput handleChange={this.handleChange} name="description" type="text" value={description} />
          <FormInput handleChange={this.handleChange} name="body" type="textarea" rows={15} value={body} />
          <Button className="post-form-button" disabled={this.disable()}>Save</Button>
          <Button className="post-form-button" onClick={this.handleCancel}>Cancel</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addPostFromAPI,
  editPostFromAPI
}

export default connect(null, mapDispatchToProps)(PostForm);
