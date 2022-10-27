import './Form.scss';
import FileBase from 'react-file-base64';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, editPost } from '../../services/actions/posts';
import { toast } from 'react-toastify';

const Form = ({currentId, setcurrentid}) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null );
  // console.log(post)
  console.log(postData.tags)

  useEffect(() => {
    post && setPostData(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(currentId){
      dispatch(editPost(currentId, postData))
      toast('Posts updated...')
    } else {
      dispatch(createPost(postData))
      toast('Posts created successfully!')
    }
    clear()
  };

  const clear = () => {
    setcurrentid(null)
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
  };

  return (
    <form className='form' id='form'>
      <p className='form__title-tag'>{currentId ? 'Edit' : 'Share'} Your <span name="title">Memory</span></p>
      <div className='form__creator'> 
        <input type="text" className='form__input'
         placeholder='Creator' required
         name="creator"
         value={postData.creator}
         onChange={e => {
          const updatePostData = {...postData, creator: e.target.value};
          setPostData(updatePostData)
        }}
        />
      </div>
      <div className='form__title'>
        <input type="text" className='form__input'
         placeholder='Post Title' required
         name="title" 
         value={postData.title}
         onChange={e => {
          const updatePostData = {...postData, title: e.target.value};
          setPostData(updatePostData)
        }}
        />
      </div>
      <div className='form__message'>
        <textarea name="message" className='form__input' id="message" 
          cols="30" rows="9" maxLength="280"
          placeholder='Message' required
          value={postData.message}
          onChange={e => {
           const updatePostData = {...postData, message: e.target.value};
           setPostData(updatePostData)
         }}
          onKeyUp={() => {
            const chars = document.getElementById('message').value.length;
            document.getElementById('character-limit').innerHTML = 280-chars;
          }}
        ></textarea>
        <div className='character'>
          <span id='character-limit'>280</span>
        </div>
      </div>
      <div className='form__tags'>
        <input type="text" className='form__input'
          placeholder='Tags (separated by comma)' required
          name="tags" 
          value={postData.tags}
          onChange={e => {
            const updatePostData = {...postData, tags: e.target.value};
            setPostData(updatePostData)
          }}
        />
      </div>
      <FileBase 
          className='form__file'
          type="file" 
          name="selectedFile"
          multiple={false} 
          onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64})}
          value={postData.selectedFile}
          onChange={e => {
           const updatePostData = {...postData, selectedFile: e.target.value};
           setPostData(updatePostData)
         }}
          >
      </FileBase>
      <div className='form__submission'>
        <button type='submit' className='form__input form__submit' onClick={handleSubmit}>Submit</button>
      </div>
      <div className='form__cancelling'>
        <button className='form__input form__cancel' onClick={clear}>Cancel</button>
      </div>
    </form>
  )
}

export default Form