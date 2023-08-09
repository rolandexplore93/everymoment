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
import { useLocation } from "react-router-dom";
import Pagination from "../../primaryComponents/pagination/Pagination";

const Posts = ({ setcurrentid }) => {
  const getPosts = useSelector((state) => state.posts);
  console.log(getPosts)
  
  const [ user ] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = getPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(getPosts.length / postsPerPage)) {
       setCurrentPage(currentPage + 1);
    }
 };

//  componet={Link} to={`/posts?page=${1}`}
  useEffect(() => {
    dispatch(getPost());
  }, [location, dispatch])

  if (!user) {
    return <p>No posts available.</p>
  } else {
    return (
      <div className="posts__container">
        <div className="posts">
          {currentPost.map((post) => (
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
            <Pagination postsPerPage={postsPerPage} totalPosts={getPosts.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} />
          </div>
      </div>
    );

  }
};

export default Posts;
