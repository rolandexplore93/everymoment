import './Form.scss';
import FileBase from 'react-file-base64'
import { useState } from 'react';

const Form = () => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })
  console.log(postData)

  const handleSubmit = () => {
    console.log('submit')

  };
  const clear = () => {
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  };

  return (
    <div className='form'>
      <p className='form__title-tag'>Editing "<span name="title">Title</span>"</p>
      <div className='form__creator'>
        <input type="text" className='form__input'
         placeholder='Creator'
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
         placeholder='Post Title'
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
          cols="30" rows="10"
          placeholder='Message'
          value={postData.message}
          onChange={e => {
           const updatePostData = {...postData, message: e.target.value};
           setPostData(updatePostData)
         }}
        ></textarea>
      </div>
      <div className='form__tags'>
        <input type="text" className='form__input'
         placeholder='Tags (separated by comma)' 
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
    </div>
  )
}

export default Form