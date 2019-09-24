import { CLEAR_ERR } from "./actionTypes";

import {
  showSpinner, showErr,
  getTitles, getPost,
  addPost, editPost,
  deletePost, addComment,
  deleteComment, makeVote
} from "./actionCreatorHelpers";

import { BASE_URL } from "./config";

import axios from "axios";

export function clearErr() {
  return { type: CLEAR_ERR };
}

/**
 * Action creator wrappers
 */

 // wrapper to include dispatch to loading
function wrapWithSpinner(fn) {
  return function (dispatch) {
    dispatch(showSpinner());
    return fn(dispatch);
  }
}

 // wrapper to include try catch block
function wrapTryCatch(fn) {
  return async function (dispatch) {
    try {
      return await fn(dispatch);
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

/**
 * Title action creators
 */

// gets titles from API and 
// dispatches action type to add
// titles to redux state
export function getTitlesFromAPI() {
  return wrapWithSpinner(wrapTryCatch(async function (dispatch) {
    let res = await axios.get(`${BASE_URL}/posts`);

    dispatch(getTitles(res.data));
  }));
}

/**
 * Post action creators
 */

// get a post from API and
// dispatches action type to add post
// to redux state
export function getPostFromAPI(id) {
  return wrapWithSpinner(wrapTryCatch(async function (dispatch) {
    let res = await axios.get(`${BASE_URL}/posts/${id}`);

    if (!res.data) {
      throw new Error("Post not found");
    }

    dispatch(getPost(res.data));
  }));
}

// makes a new post with API and
// dispatches action type to add post
// to redux state
export function addPostFromAPI(postDetails) {
  return wrapWithSpinner(wrapTryCatch(async function (dispatch) {
    let res = await axios.post(`${BASE_URL}/posts/`, postDetails);

    dispatch(addPost(res.data));
  }));
}

// updates post with API and
// dispatches action type to update post
// tinredux state
export function editPostFromAPI(id, postDetails) {
  return wrapWithSpinner(wrapTryCatch(async function (dispatch) {
    let res = await axios.put(`${BASE_URL}/posts/${id}`, postDetails);

    dispatch(editPost(res.data));
  }));
}

// deletes a post using API and
// dispatches action type to delete post
// from redux state
export function deletePostFromAPI(id) {
  return wrapWithSpinner(wrapTryCatch(async function (dispatch) {
    await axios.delete(`${BASE_URL}/posts/${id}`);

    dispatch(deletePost(id));
  }));
}


/**
 * Comment action creators
 */

// adds a comment with API and
// dispatches action type to add comment
// to redux state
export function addCommentFromAPI(postId, comment) {
  return wrapTryCatch(async function (dispatch) {
    let res = await axios.post(`${BASE_URL}/posts/${postId}/comments`, { text: comment });

    dispatch(addComment(postId, res.data))
  });
}

// deletes a comment from API and
// dispatches action type to delete post
// from redux state
export function deleteCommentFromAPI(postId, commentId) {
  return wrapTryCatch(async function (dispatch) {
    await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}`);

    dispatch(deleteComment(postId, commentId));
  });
}

// upvote or downvote with API and
// dispatches action type to update votes
// in redux state
export function makeVoteFromAPI(id, vote) {
  return wrapTryCatch(async function (dispatch) {
    let res = await axios.post(`${BASE_URL}/posts/${id}/vote/${vote}`);

    dispatch(makeVote(id, res.data.votes));
  })
}