import React, { Component } from "react";


class Pagination extends Component {
  state = {
    pageNumber: 1,
  };

  handleUpdate = (pageDirection) => {
    this.setState(({pageNumber}) => {
        return  {
            pageNumber: pageNumber + pageDirection
        }
    })
    const {pageNumber} = this.state
    this.props.getArticles(pageNumber)
  }

  render() {
    const { pageNumber } = this.state;
    return (
      <div>
        <button onClick={() => {this.handleUpdate(-1)}}>previous</button>
        <p>page number: {pageNumber}</p>
        <button onClick={() => {this.handleUpdate(+1)}}>next</button>
      </div>
    );
  }
}

export default Pagination;
