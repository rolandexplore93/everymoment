import "./Form.scss";
import FileBase from "react-file-base64";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, editPost, getPostsBySearch } from "../../../services/actions/posts";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import ChipInput from 'material-ui-chip-input'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Form = ({ currentId, setcurrentid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const user = JSON.parse(localStorage.getItem('profile'));
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    post && setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(editPost(currentId, { ...postData, name: user.data ? user?.data?.name : user?.user?.name }, navigate));
      toast("Posts updated...");
    } else {
      dispatch(createPost({  ...postData, name: user.data ? user?.data?.name : user?.user?.name }, navigate));
      toast("Posts created successfully!");
    }
    clear();
  };

  const clear = () => {
    setcurrentid(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const searchPost = () => {
    if(search.trim() || tags) {
      // dispatch => fetch search posts or tags
      dispatch(getPostsBySearch({ search, tags: tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.length !== 0 ? tags.join(',') : 'none'}`)
    } else {
      navigate('/')
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      console.log('This is enter key')
      searchPost()
    }
  };

  const handleAddTag = (tag) => setTags([...tags, tag]);

  const handleDeleteTag = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete ));

  if (!user) {
    return (
      <div className="no-form-post"> 
        <Link to={"/auth"} style={{ cursor: 'pointer' }}>
            Sign in to create a post
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="form" style={{ marginBottom: '10px'}}>
        <input
          type="text"
          className="form__input"
          placeholder="Search Memories"
          required
          name="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          // onKeyPress={handleKeyPress}
          onKeyPress={handleKeyPress}
        />
        <div>
          <ChipInput
          style={{ margin: '15px 0'}}
            label="Search Tags"
            value={tags}
            variant="outlined"
            color="primary"
            onAdd={handleAddTag}
            onDelete={handleDeleteTag}
          />
        </div>
        <Button variant="contained" size="small" onClick={searchPost}>Search</Button>
      </div>
      <form className="form" id="form">
        <p className="form__title-tag">
          {currentId ? "Edit" : "Share"} Your <span name="title">Memory</span>
        </p>
        <div className="form__title">
          <input
            type="text"
            className="form__input"
            placeholder="Post Title"
            required
            name="title"
            value={postData.title}
            onChange={(e) => {
              const updatePostData = { ...postData, title: e.target.value };
              setPostData(updatePostData);
            }}
          />
        </div>
        <div className="form__message">
          <textarea
            name="message"
            className="form__input"
            id="message"
            cols="30"
            rows="9"
            maxLength="280"
            placeholder="Message"
            required
            value={postData.message}
            onChange={(e) => {
              const updatePostData = { ...postData, message: e.target.value };
              setPostData(updatePostData);
            }}
            onKeyUp={() => {
              const chars = document.getElementById("message").value.length;
              document.getElementById("character-limit").innerHTML = 280 - chars;
            }}
          ></textarea>
          <div className="character">
            <span id="character-limit">280</span>
          </div>
        </div>
        <div className="form__tags">
          <input
            type="text"
            className="form__input"
            placeholder="Tags (separated by comma)"
            required
            name="tags"
            value={postData.tags}
            onChange={(e) => {
              const updatePostData = { ...postData, tags: e.target.value };
              setPostData(updatePostData);
            }}
          />
        </div>
        <FileBase
          className="form__file"
          type="file"
          name="selectedFile"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
          value={postData.selectedFile}
          onChange={(e) => {
            const updatePostData = { ...postData, selectedFile: e.target.value };
            setPostData(updatePostData);
          }}
        ></FileBase>
        <div className="form__submission">
          <button type="submit" className="form__cancel" onClick={clear}>
            Cancel
          </button>
          <button type="submit" className="form__submit" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
