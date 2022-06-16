import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'

export default function Contact() {
  const [message, setMessage] = useState('')
  const [landlord, setLandlord] = useState(null)
  // gives the listing name (searchParams)
  const [searchParams, setSearchParams] = useSearchParams()

  // gives the landlord Id (params)
  const params = useParams()

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLandlord(docSnap.data())
      } else {
        toast.error('No such landlord in the database')
      }
    }

    getLandlord()
  }, [])

  const onChange = e => setMessage(e.target.value)

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact LandLord</p>
      </header>
      {landlord !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'>Contact : {landlord?.name}</p>
          </div>
          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button className='primaryButton ContactButton' type='button'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}
