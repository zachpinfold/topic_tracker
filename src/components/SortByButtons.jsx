import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faComment, faStar } from '@fortawesome/free-solid-svg-icons'

const SortByButtons = ({sort_by, order, toggleSortBy, article}) => {
    return (
        <div className={'sort-button-div'}>
                    <button className={sort_by === 'created_at' ? "sort-button-selected" : 'sort-button-deselected'} onClick={() => toggleSortBy("created_at")}>
        <FontAwesomeIcon className={sort_by === 'created_at' ? "sort-icon-show" : 'sort-icon-hide '} icon={faStar}/> <p className={order === 'asc' && sort_by === 'created_at'  ? 'icon-hide-text' : 'icon-show-text'}> New</p> <p className={order === 'asc' && sort_by === 'created_at' ? 'icon-show-text' : 'icon-hide-text'}> Old</p> 
        </button>

        {article === 'article' && <button className={sort_by === 'comment_count' ? "sort-button-selected" : 'sort-button-deselected'} onClick={() => toggleSortBy("comment_count")}>
        <FontAwesomeIcon className={sort_by === 'comment_count' ? "sort-icon-show" : 'sort-icon-hide '} icon={faComment}/> <p className={order === 'asc' && sort_by === 'comment_count'  ? 'icon-hide-text' : 'icon-show-text'}> Most Comments</p> <p className={order === 'asc' && sort_by === 'comment_count' ? 'icon-show-text' : 'icon-hide-text'}> Least Comments</p> 
        </button>}

                <button className={sort_by === 'votes' ? "sort-button-selected" : 'sort-button-deselected'} onClick={() => toggleSortBy("votes")}>
        <FontAwesomeIcon className={sort_by === 'votes' ? "sort-icon-show" : 'sort-icon-hide '} icon={faChartLine}/> <p className={order === 'asc' && sort_by === 'votes'  ? 'icon-hide-text' : 'icon-show-text'}> Most Votes</p> <p className={order === 'asc' && sort_by === 'votes' ? 'icon-show-text' : 'icon-hide-text'}> Least Votes</p> 
        </button>
        </div>
    )
};

export default SortByButtons;