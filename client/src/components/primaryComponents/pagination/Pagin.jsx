import { useEffect } from "react";
import "./Pagination.scss";
import { useDispatch } from "react-redux";
import { getPost } from "../../../services/actions/posts";

const Pagin = ({ page, numberOfPages, paginate, prevPage, nextPage }) => {
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
            <li className="page-number" onClick={prevPage}>
               Prev
            </li>
            {
                pageNumber.map((pageNo) => (
                    <li key={pageNo} className="page-number" onClick={() => paginate(pageNo)}>
                        {pageNo}
                    </li>
                ))
            }
            <li className="page-number" onClick={nextPage}>
               Next
            </li>
         </ul>
    </div>
  )
}

export default Pagin