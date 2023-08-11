// import "./Pagination.scss";

// const Pagination = ({ postsPerPage, totalPosts, paginate, prevPage, nextPage }) => {
//     const pageNumbers = [];

//     for (let index = 1; index <= Math.ceil(totalPosts / postsPerPage); index++) {
//         pageNumbers.push(index)
//     }


//   return (
//     <div className="pagination-wrapper">
//         <ul className="pagination-render">
//             <li className="page-number" onClick={prevPage}>
//                Prev
//             </li>
//             {pageNumbers.map((number) => (
//                <li key={number} className="page-number" onClick={() => paginate(number)}>
//                   {number}
//                </li>
//             ))}
//             <li className="page-number" onClick={nextPage}>
//                Next
//             </li>
//          </ul>
//     </div>
//   )
// }

// export default Pagination

//   // const [postsPerPage] = useState(3);
//   // const indexOfLastPost = currentPage * postsPerPage;
//   // const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   // const currentPost = getPosts?.slice(indexOfFirstPost, indexOfLastPost)

// // {/* <Pagination postsPerPage={postsPerPage} totalPosts={getPosts.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} /> */}
