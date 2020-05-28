import React from "react";


const Pagination = ({handlePageUpdate, page_number, article_limit}) => {

    return (
      <div>
        <button disabled={page_number < 2} onClick={() => {handlePageUpdate(-1)}}>previous</button>
        <p>page number: {page_number}</p>
        <button disabled={page_number === article_limit} onClick={() => {handlePageUpdate(+1)}}>next</button>
      </div>
    );
}

export default Pagination;
