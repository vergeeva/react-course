import React from 'react';
import {getPagesArray} from "../../../utils/pages";

const Pagination = (props) => {
    let pagesArray = getPagesArray(props.totalPages);
    return (
        <div style={{marginTop: 30}} className='pageButton__wrapper'>
            {
                pagesArray.map(p=>
                    <span key={p} className=
                        {props.page===p
                            ? 'pageButton pageButton__current'
                            : 'pageButton'}
                          onClick={() => props.changePage(p)}
                    > {p}


                        </span>)
            }
        </div>

    );
};

export default Pagination;