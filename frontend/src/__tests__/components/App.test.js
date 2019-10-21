import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
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
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../../Components/App";

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

// merged renderWithRedux and renderWithRouter functions
// taken from react-testing-library docs
function renderWithReduxAndRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {},
  {
    initialState,
    store = createStore(microblogReducer, compose(applyMiddleware(thunk)))
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

describe("App component", () => {
  it("renders App", () => {
    const { getByText } = renderWithReduxAndRouter(<App />);
    expect(getByText('MICROBLOG')).toBeInTheDocument();
  });
});

test("full app rendering/navigating", () => {
  const { container, getByText } = renderWithReduxAndRouter(<App />);
  
  expect(container.innerHTML).toMatch('<div><ul class="nav-bar nav"><a aria-current="page" class="nav-bar-home active" href="/">MICROBLOG</a><a class="nav-bar-new" href="/posts/new">NEW POST</a></ul><div><h2>Welcome!</h2><div>Loading...</div></div></div>');
  const leftClick = { button: 0 };
  fireEvent.click(getByText('MICROBLOG'), leftClick);
  
  expect(container.innerHTML).toMatch('<div><ul class="nav-bar nav"><a aria-current="page" class="nav-bar-home active" href="/">MICROBLOG</a><a class="nav-bar-new" href="/posts/new">NEW POST</a></ul><div><h2>Welcome!</h2><div>Loading...</div></div></div>');

  fireEvent.click(getByText('NEW POST'), leftClick);
});

test("landing on a bad page", () => {
  const { getByText } = renderWithReduxAndRouter(<App />, {
    route: "/something-that-does-not-match"
  });
  
  expect(getByText("Oops, we didn't find what you were looking for...")).toBeInTheDocument();
});

test("landing on new post page", () => {
  const route = "/posts/new";
  const { getByText } = renderWithReduxAndRouter(<App />, { route });
  expect(getByText("Title")).toBeInTheDocument();
});
