import "./Posts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deletePost, getPost, likePost } from "../../../services/actions/posts";
import { toast } from "react-toastify";
import images from "../../../assets/images";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagin from "../../primaryComponents/pagination/Pagin";
// import { CircularProgress } from '@mui/material';

function useQuery () {
  return new URLSearchParams(useLocation().search);
}

const Posts = ({ setcurrentid }) => {
  const { posts } = useSelector((state) => state.posts);
  const [ user ] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  // const location = useLocation();
  const query = useQuery();
  const page = query.get('page') || 1;
  const navigate = useNavigate();
  
  // Pagination
  const { numberOfPages } = useSelector(state => state.posts);
  const [currentPage, setCurrentPage] = useState(page);

  const paginate = (pageNo) => {
    setCurrentPage(pageNo)
    navigate(`/posts?page=${pageNo}`);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`/posts?page=${newPage}`);
    }
  };

  const nextPage = () => {
    if (currentPage < numberOfPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`/posts?page=${newPage}`)
    }
 };

  useEffect(() => {
    dispatch(getPost(page));
  }, [dispatch, page])

  // if (!posts.length && !isLoading) return "No Posts"

  return (
    !user ? <p>No posts available.</p> : (
      // isLoading ? <CircularProgress /> : (
        <div className="posts__container">
          <div className="posts">
            {posts?.map((post) => (
              <div className="posts__card" key={post._id}>
                <div className="posts__card-owner">
                  {post.selectedFile ? (
                    <img
                      className="posts__card-picture"
                      src={post.selectedFile}
                      alt="uploaded-pics"
                    />
                  ) : (
                    <img
                      className="posts__card-picture"
                      src={images.heart}
                      alt="uploaded-pics"
                    />
                  )}
                  <div className="posts__card-about">
                    <div className="posts__card-author-cover">
                      <p className="posts__card-author">{post.name}</p>
                      {(user?.data?.sub === post?.creator || user?.user?._id === post?.creator) && (
                        <FontAwesomeIcon
                          className="posts__card-ellipsis"
                          icon={faEllipsis}
                          onClick={() => setcurrentid(post._id)}
                        />
                      )}
                    </div>
                    <p className="posts__card-time">
                      {moment(post.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
                <div className="posts__card-content">
                  <div className="posts__card-tags">
                    Tags: <span>{post.tags.map((tag) => `#${tag} `)}</span>
                  </div>
                  <h2 className="posts__card-title">{post.title}</h2>
                  <p className="posts__card-text">{post.message}</p>
                  <div className="posts__card-decision">
                    <div className="posts__card-like">
                      <button
                        onClick={() => dispatch(likePost(post._id))}
                        disabled={!user}
                      >
                        {
                          post.likes.length > 0 ? (
                            post.likes.find((like) => like === (user?.data?.googleId || user?.user?._id))
                            ? 
                            <>
                              <FontAwesomeIcon className="posts__card-like-post" icon={faThumbsUp} color='red' />
                              <span className="posts__card-count">&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length -1} others`: `${post.likes.length} like${post.likes.length > 1 ? 's':''}`} </span>
                            </>
                            :
                            <>
                              <FontAwesomeIcon className="posts__card-like-post" icon={faThumbsUp} color='none' />
                              <span className="posts__card-count">&nbsp;{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'} </span>
                            </>
                          ) 
                          : 
                          <>
                            <FontAwesomeIcon className="posts__card-like-post" icon={faThumbsUp} color='none' />
                            <span className="posts__card-count">&nbsp; {post.likes.length} </span>
                          </>
                        }
                        &nbsp;
                      </button>
                    </div>
                    {(user?.data?.sub === post?.creator || user?.user?._id === post?.creator) && (
                      <button className="posts__card-delete">
                        <FontAwesomeIcon
                          className="posts__card-delete-post"
                          icon={faTrash}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this post?"
                              )
                            ) {
                              dispatch(deletePost(post._id));
                              toast("Post deleted successfully");
                            }
                          }}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
              <Pagin page={page} numberOfPages={numberOfPages} paginate={paginate} prevPage={prevPage} nextPage={nextPage}/>
            </div>
        </div>
      // )
    )
  )
};

export default Posts;
