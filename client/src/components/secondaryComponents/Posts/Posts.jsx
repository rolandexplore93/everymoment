import "./Posts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deletePost, likePost } from "../../../services/actions/posts";
import { toast } from "react-toastify";
import images from "../../../assets/images";

const Posts = ({ setcurrentid }) => {
  const getPosts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  console.log(getPosts)

  return (
    <div className="posts">
      {getPosts.posts.map((post) => (
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
                <p className="posts__card-author">{post.creator}</p>
                <FontAwesomeIcon
                  className="posts__card-ellipsis"
                  icon={faEllipsis}
                  onClick={() => setcurrentid(post._id)}
                />
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
              <button
                className="posts__card-like"
                onClick={() => dispatch(likePost(post._id))}
              >
                <FontAwesomeIcon
                  className="posts__card-like-post"
                  icon={faThumbsUp}
                />{" "}
                &nbsp;
                <span className="posts__card-count">{post.likeCount}</span>
              </button>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
