import React from "react";


const Pagination = (props) => {

    return (
      <div>
        <button disabled={props.page_number < 2} onClick={() => {props.handlePageUpdate(-1)}}>previous</button>
        <p>page number: {props.page_number}</p>
        <button disabled={props.page_number === props.article_limit} onClick={() => {props.handlePageUpdate(+1)}}>next</button>
      </div>
    );
}

export default Pagination;
