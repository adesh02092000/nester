import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [loading, isLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    imgUrls: [],
    latitude: 0,
    longitude: 0,
  })

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)
  //   isMounted is used since we only want to set the form data while the createListing component
  // is mounted, Otherwise it may cause memoryLeaks

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, user => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/sign-in')
        }
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return <div>CreateListing</div>
}
