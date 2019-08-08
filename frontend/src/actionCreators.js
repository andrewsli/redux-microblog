import {
  ADD_POST, EDIT_POST, DELETE_POST,
  ADD_COMMENT, DELETE_COMMENT,
  LOAD_TITLES, LOAD_POST,
  SHOW_ERR
} from "./actionTypes.js";

import { BASE_URL } from "./config";

import axios from "axios";

function showErr(msg) {
  return { type: SHOW_ERR, msg };
}

function gotTitles(titles) {
  return { type: LOAD_TITLES, titles };
}

function gotPost(post) {
  return { type: LOAD_POST, post };
}

function makePost(postDetails) {
  return { type: ADD_POST, postDetails };
}

function updatePost(postDetails) {
  return { type: EDIT_POST, postDetails };
}

function removePost(id) {
  return { type: DELETE_POST, id };
}

function makeComment(postId, commentDetails) {
  const { id, text } = commentDetails;
  return { type: ADD_COMMENT, payload: { commentId: id, text, postId } };
}

export function getTitles() {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${BASE_URL}posts`);

      dispatch(gotTitles(res.data));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}
export function getPost(id) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${BASE_URL}posts/${id}`);

      dispatch(gotPost(res.data));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

// return action with type ADD_OR_EDIT_POST
export function addPost(postDetails) {
  return async function (dispatch) {
    try {
      let res = await axios.post(`${BASE_URL}posts/`, postDetails);

      dispatch(makePost(res.data));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

export function editPost(id, postDetails) {
  return async function (dispatch) {
    try {
      let res = await axios.put(`${BASE_URL}posts/${id}`, postDetails);
      dispatch(updatePost(res.data));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

// return action with type DELETE_POST
export function deletePost(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${BASE_URL}posts/${id}`);
      dispatch(removePost(id));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

// return action with type ADD_COMMENT
export function addComment(postId, comment) {
  return async function (dispatch) {
    try {
      let res = await axios.post(`${BASE_URL}posts/${postId}/comments`, { text: comment });
      dispatch(makeComment(postId, res.data))
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

// return action with type DELETE_COMMENT
export function deleteComment(postId, commentId) {
  return async function (dispatch) {
    try {
      await axios.delete(`${BASE_URL}posts/${postId}/comments/${commentId}`);
      dispatch(removeComment(postId, commentId));
    } catch (err) {
      dispatch(showErr(err.message));
    }
  }
}

function removeComment(postId, commentId) {
  return { type: DELETE_COMMENT, postId, commentId };
}