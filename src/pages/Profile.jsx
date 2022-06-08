import { getAuth, updateProfile } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

export default function Profile() {
  const auth = getAuth()

  const [enableEdit, setEnableEdit] = useState(false)

  // we are setting the values in the state initially since, we won't be able to access the profile page if we are not logged in. So the useState will run only when we have a valid user
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onChange = e => {
    setFormData(prevState => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    })
  }

  const onSubmit = () => {
    console.log('Form Submitted')
  }

  return (
    <>
      <div className='profile'>
        <header className='profileHeader'>
          <p className='pageHeader'>My Profile</p>
          <button className='logOut' onClick={onLogout}>
            Logout
          </button>
        </header>
        <main>
          <div className='profileDetailsHeader'>
            <p className='profileDetailsText'>Personal Details</p>
            <p
              className='changePersonalDetails'
              onClick={() => {
                enableEdit && onSubmit()
                setEnableEdit(prevState => !prevState)
              }}
            >
              {enableEdit ? 'Done' : 'Edit'}
            </p>
          </div>

          <div className='profileCard'>
            <form>
              <input
                type='text'
                id='name'
                className={enableEdit ? 'profileNameActive' : 'profileName'}
                disabled={!enableEdit}
                value={name}
                onChange={onChange}
              />
              <input
                type='text'
                id='email'
                className={enableEdit ? 'profileEmailActive' : 'profileEmail'}
                disabled={!enableEdit}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
