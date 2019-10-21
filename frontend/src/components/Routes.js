import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import PostForm from "../Containers/PostForm";
import PostDetails from "../Containers/PostDetails";
import NotFound from "./NotFound";


/**
 * Routes for routing in Microblog
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/posts/new" render={(rtProps) => <PostForm {...rtProps}/>} />
        <Route exact path="/posts/:postid" render={(rtProps) => <PostDetails {...rtProps} />} />
        <Route render={() => <NotFound />} />
      </Switch>
    )
  }
}

export default Routes;
