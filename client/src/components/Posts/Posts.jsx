import "./Posts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Posts = () => {
    const posts = useSelector((state) => state.posts)
    console.log(posts)

    
    return (
      posts.map((post) => 
        <div className="posts">
            <div className="posts__card">
                <div className="posts__card-owner">
                    <div className="posts__card-author-cover">
                        <p className="posts__card-author">{post.creator}</p>
                        <FontAwesomeIcon className="posts__card-ellipsis" icon={faEllipsis} />
                    </div>
                    <p className="posts__card-time">2 months ago</p>
                </div>
                <div className="posts__card-content">
                    <div className="posts__card-tags">Tags: <span>{post.tags}</span></div>
                    <h2 className="posts__card-title">{post.title}</h2>
                    <p className="posts__card-text">{post.message}</p>
                    <div className="posts__card-decision">
                        <button className="posts__card-like">
                            <FontAwesomeIcon className="posts__card-like-post" icon={faThumbsUp} />
                            <span className="posts__card-count">{post.count}5</span>
                        </button>
                        <button className="posts__card-delete">
                            <FontAwesomeIcon className="posts__card-delete-post" icon={faTrash} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

      )
  );
};

export default Posts;
