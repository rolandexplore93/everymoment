import { useEffect } from "react";
import "./Pagination.scss";
import { useDispatch } from "react-redux";
import { getPost } from "../../../services/actions/posts";

const Pagin = ({ page, numberOfPages, paginate, prevPage, nextPage, currentPage }) => {
    const dispatch = useDispatch();
    const pageNumber = [];

    for (let index = 1; index <= numberOfPages; index++) {
        pageNumber.push(index)        
    }

    useEffect(() => {
        if (page) dispatch(getPost(page)); 
    }, [page, dispatch])

  return (
    <div className="pagination-wrapper">
        <ul className="pagination-render">
            <button className="page-number" onClick={prevPage} disabled={currentPage === 1}
                style={{ 
                    background: currentPage <= 1 && '#aaa',
                    cursor: currentPage <= 1 && 'default'
                }}
            >
               Prev
            </button>
            {
                pageNumber.map((pageNo) => (
                    <li key={pageNo} className="page-number" onClick={() => paginate(pageNo)}>
                        {pageNo}
                    </li>
                ))
            }
            <button className="page-number" onClick={nextPage} disabled={currentPage === numberOfPages}
                style={{ 
                    background: currentPage === numberOfPages && '#aaa',
                    cursor: currentPage === numberOfPages && 'default'
                }}
            >
               Next
            </button>
         </ul>
    </div>
  )
}

export default Pagin