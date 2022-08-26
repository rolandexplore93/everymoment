import "./Posts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";

const Posts = () => {
  return (
    <div className="posts">
        <div className="posts__card">
            <div className="posts__card-owner">
                <div className="posts__card-author-cover">
                    <p className="posts__card-author">Roland</p>
                    <FontAwesomeIcon className="posts__card-ellipsis" icon={faEllipsis} />
                </div>
                <p className="posts__card-time">2 months ago</p>
            </div>
            <div className="posts__card-content">
                <div className="posts__card-tags"># <span>tags</span></div>
                <h2 className="posts__card-title">Visited the Cartoon Store</h2>
                <p className="posts__card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quam asperiores fugit ipsa illum cupiditate!</p>
                <div className="posts__card-decision">
                    <button className="posts__card-like">
                        <FontAwesomeIcon className="posts__card-like-post" icon={faThumbsUp} />
                        <span className="posts__card-count">count: 4</span>
                    </button>
                    <button className="posts__card-delete">
                        <FontAwesomeIcon className="posts__card-delete-post" icon={faTrash} />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Posts;
