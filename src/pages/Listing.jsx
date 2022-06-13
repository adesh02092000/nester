import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import shareIcon from '../assets/svg/shareIcon.svg'
import { useEffect, useState } from 'react'
import { db } from '../firebase.config'

export default function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [shareLinkCopied, setShareLinkCopied] = useState(false)

  // const navigate = useNavigate()
  const params = useParams()
  // const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap.data())
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [])

  return <div>Listing</div>
}
