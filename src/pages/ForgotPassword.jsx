import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onSubmit = e => {
    e.preventDefault()
  }

  const onChange = e => {
    setEmail(e.target.value)
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            className='emailInput'
            value={email}
            placeholder='Email'
            id='email'
            onChange={onChange}
          />
          <Link className='forgotPasswordLink' to='/sign-in'>
            Sign In Instead
          </Link>

          <div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
