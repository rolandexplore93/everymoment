import './Form.scss';

const Form = () => {
  return (
    <div className='form'>
      <p className='form__title'>Editing "<span>Title</span>"</p>
      <div className='form__creator'>
        <input type="text" placeholder='Creator' />
      </div>
      <div className='form__title'>
        <input type="text" placeholder='Post Title' />
      </div>
      <div className='form__message'>
        <textarea name="message" id="message" cols="30" rows="10" placeholder='Message'></textarea>
      </div>
      <div className='form__tags'>
        <input type="text" placeholder='Tags (separated by comma)' />
      </div>
      <div className='form__file'>
        <input type="file" />
      </div>
      <div className='form__submit'>
        <button type='submit'>Submit</button>
      </div>
      <div className='form__cancel'>
        <button>Cancel</button>
      </div>
    </div>
  )
}

export default Form