import "./Posts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { editPost } from "../../api";

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    console.log(posts)

    const handlePostEdit = () => {
        // dispatch(editPost())
        setCurrentId(posts._id)

    }
    
    return (
        <div className="posts" >
            {posts.map((post) => (
                <div className="posts__card" key={post._id} setCurrentId={setCurrentId}>
                    <div className="posts__card-owner">
                        <img className="posts__card-picture" src={post.selectedFile} alt="uploaded-pics" />
                        <div className="posts__card-position">
                            <div className="posts__card-author-cover">
                                <p className="posts__card-author">{post.creator}</p>
                                <FontAwesomeIcon className="posts__card-ellipsis" icon={faEllipsis} 
                                    onClick={handlePostEdit}
                                />
                            </div>
                            <p className="posts__card-time">{moment(post.createdAt).fromNow()}</p>
                        </div>
                    </div>
                    <div className="posts__card-content">
                        <div className="posts__card-tags">Tags: <span>{post.tags.map((tag) => `#${tag} `)}</span></div>
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

            ))}
        </div>

      )
};

export default Posts;
