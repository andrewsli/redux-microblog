import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTitlesFromAPI, clearErr } from "../actionCreators";
import "./TitleList.css";
import Title from "../Components/Title";

/**
 * TitleList: renders list of titles from redux state
 */
class TitleList extends Component {
  componentDidMount() {
    if (this.props.titles.length === 0) {
      this.props.getTitlesFromAPI();
    }
  }

  componentWillUnmount() {
    this.props.clearErr();
  }

  render() {
    const { titles, loading, err } = this.props;
    if (loading) {
      return <div>Loading...</div>
    }
    if (err) {
      return <div>{err}</div>
    }
    let titlesCopy = [...titles]
    titlesCopy.sort((title1, title2) => title2.votes - title1.votes);

    return (
      <ul className="title-list">
        {titlesCopy.map(
          title =>
            <Title key={title.id} title={title}/>
        )
        }
      </ul>
    );
  }
}

function mapStateToProps({titles, loading, err}) {
  return {
    titles,
    loading,
    err
  }
}

export default connect(mapStateToProps, { getTitlesFromAPI, clearErr })(TitleList);
