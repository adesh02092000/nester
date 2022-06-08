import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

export default function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {}

  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/sign-up' ? 'Up' : 'In'} with</p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img src={googleIcon} alt='Google Login' className='socialIconImg' />
      </button>
    </div>
  )
}
