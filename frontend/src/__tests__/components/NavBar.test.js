import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavBar from "../../Components/NavBar";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import {
  uiReducer,
  titleReducer,
  postReducer,
  commentReducer,
  voteReducer
} from "../../reducers";
import reduceReducers from "reduce-reducers";
import thunk from "redux-thunk";

const INITIAL_STATE = {
  posts: {},
  titles: [],
  loading: true,
  err: ""
};

const microblogReducer = reduceReducers(
  INITIAL_STATE,
  uiReducer,
  titleReducer,
  postReducer,
  commentReducer,
  voteReducer
);

afterEach(cleanup);

function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(microblogReducer, compose(applyMiddleware(thunk)))
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        {ui}
      </Provider>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

describe("Home component", () => {
  it("renders the navigation bar", () => {
    const { getByText } = renderWithRedux(
      <NavBar />
    );
    expect(getByText("MICROBLOG")).toBeInTheDocument();
    expect(getByText("NEW POST")).toBeInTheDocument();
  });
});
