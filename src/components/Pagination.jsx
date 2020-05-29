import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ handlePageUpdate, page_number, article_limit }) => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={"pagination-div"}>
      <button
        className={"pagination-button"}
        disabled={page_number < 2}
        onClick={() => {
          handlePageUpdate(-1);
          scrollTop();
        }}
      >
        <FontAwesomeIcon className={"vote-icon"} icon={faAngleLeft} />
      </button>
      <p className={"pagination-number"}>
        {page_number} / {article_limit}
      </p>
      <button
        className={"pagination-button"}
        disabled={page_number === article_limit}
        onClick={() => {
          handlePageUpdate(+1);
          scrollTop();
        }}
      >
        <FontAwesomeIcon className={"vote-icon"} icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Pagination;
