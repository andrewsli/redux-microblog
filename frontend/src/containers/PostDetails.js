import React, { Component } from 'react';
import PostForm from "./PostForm";
import { connect } from "react-redux";
import CommentList from "./CommentList";
import { getPostFromAPI, deletePostFromAPI, makeVoteFromAPI, clearErr } from "../actionCreators";
import NotFound from "../Components/NotFound";
import "./PostDetails.css";

/**
 * PostDetails: renders post
 */
class PostDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.postid;

    if (!this.props.post) {
      this.props.getPostFromAPI(id);
    }
  }

  componentWillUnmount() {
    this.props.clearErr();
  }

  // delete from redux store
  handleDelete() {
    let id = this.props.match.params.postid;
    this.props.deletePostFromAPI(id);
    this.props.history.push("/");
  }

  handleUpvote(evt) {
    const id = evt.target.name;
    this.props.makeVoteFromAPI(id, "up");
  }

  handleDownvote(evt) {
    const id = evt.target.name;
    this.props.makeVoteFromAPI(id, "down");
  }

  // set edit flag to true to render
  // form component
  showEditForm() {
    this.setState({
      edit: true
    });
  }

  // renders post when not in edit mode
  renderPost() {
    let postId = this.props.match.params.postid;
    let post = this.props.post;
    return (
      <div>
        <div>
          <div className="post-detail-vote-button-container">
            <button className="vote-button" name={postId} onClick={this.handleUpvote}>▲</button>
            <p className="vote-count">{post.votes}</p>
            <button className="vote-button" name={postId} onClick={this.handleDownvote}>▼</button>
          </div>
          <div>
            <h3 className="post-detail-title">{post.title}</h3>
            <i>{post.description}</i>
          </div>
        </div>
        <p>{post.body}</p>
        <div className="post-detail-button-container">
          <button className="post-detail-button" onClick={this.showEditForm}>Edit</button>
          <button className="post-detail-button" onClick={this.handleDelete}>Delete</button>
        </div>
        <div className="post-comments">
          <CommentList postId={postId} />
        </div>
      </div>
    );
  }

  // renders edit form when in edit mode
  renderForm() {
    let id = this.props.match.params.postid;
    let post = this.props.post;

    return <PostForm history={this.props.history} post={post} postId={id} />;
  }

  render() {
    const { post, err } = this.props;
    if (err) {
      return <NotFound />
    }

    if (!post) {
      return <div>Loading...</div>
    }

    return this.state.edit ? this.renderForm() : this.renderPost()
  }
}

function mapStateToProps(state, ownProps) {
  let id = ownProps.match.params.postid;
  return {
    post: state.posts[id],
    err: state.err
  }
}

const mapDispatchToProps = {
  getPostFromAPI,
  deletePostFromAPI,
  makeVoteFromAPI,
  clearErr
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
