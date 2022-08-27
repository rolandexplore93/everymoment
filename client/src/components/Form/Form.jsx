import './Form.scss';

const Form = () => {
  return (
    <div className='form'>
      <p className='form__title-tag'>Editing "<span>Title</span>"</p>
      <div className='form__creator'>
        <input type="text" className='form__input' placeholder='Creator' />
      </div>
      <div className='form__title'>
        <input type="text" className='form__input' placeholder='Post Title' />
      </div>
      <div className='form__message'>
        <textarea name="message" className='form__input' id="message" cols="30" rows="10" placeholder='Message'></textarea>
      </div>
      <div className='form__tags'>
        <input type="text" className='form__input' placeholder='Tags (separated by comma)' />
      </div>
      <div className='form__file'>
        <input type="file" />
      </div>
      <div className='form__submission'>
        <button type='submit' className='form__input form__submit'>Submit</button>
      </div>
      <div className='form__cancelling'>
        <button className='form__input form__cancel'>Cancel</button>
      </div>
    </div>
  )
}

export default Form