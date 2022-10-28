import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './Auth.scss';
import primaryComponents from '../../../components/primaryComponents';


const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Yeh')
  }

  const switchMode = () => {
    setIsSignUp(prevIsSignUp => !prevIsSignUp);
  }
  
  return (
    <div className='auth'>
      <FontAwesomeIcon icon={faLock} />
      <h3>{isSignUp ? 'Sign Up' : 'Sign In'}</h3>
      <form className='form' onSubmit={handleSubmit}>
        {isSignUp && 
          <div className='form__names'>
            <primaryComponents.Input
              name={'firstname'}
              type={'text'} 
              placeholder={'Firstname'}
              autoFocus={true}
              onChange={(e) => (e.target.value)}
            />
            <primaryComponents.Input
              name={'lastname'}
              type={'text'} 
              placeholder={'Lastname'}
              onChange={(e) => (e.target.value)}
            />
          </div>
        }
        <primaryComponents.Input
          name={'email'}
          type={'email'} 
          placeholder={'email'}
          onChange={(e) => (e.target.value)}
        />
        <primaryComponents.Input
            name={'password'}
            type={'password'} 
            placeholder={'password'}
            onChange={(e) => (e.target.value)}
          />
          {
            isSignUp &&
            <primaryComponents.Input
              name={'password'}
              type={'password'} 
              placeholder={'confirm password'}
              onChange={(e) => (e.target.value)}
            />
          }
          {
            isSignUp ? (
              <primaryComponents.Input
                type={'submit'}
                value='Sign Up'
              />
            ) : (
              <primaryComponents.Input
                type={'submit'}
                value='Sign in'
              />
            )
          }
      </form>
      { isSignUp ? (
        <p>Already have an account? <span onClick={switchMode}>Sign in</span></p>
      ):(
        <p>Don't have an account? <span onClick={switchMode}>Sign Up</span></p>
      )
      }
    </div>
  )
}

export default Auth;