import { Link, useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import shareIcon from '../assets/svg/shareIcon.svg'
import { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

export default function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  // const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

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

  if (loading) {
    return <Spinner />
  }

  return (
    <main>
      <div
        className='shareIconDiv'
        onClick={() => {
          // Copy the link to clipboard
          navigator.clipboard.writeText(window.location.href)
          toast.success('Link Copied!')
        }}
      >
        <img src={shareIcon} alt='share' />
      </div>

      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className='listingDetailsList'>
          <li>
            {listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
          </li>
          <li>
            {listing.bathrooms}{' '}
            {listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>
        <p className='listingLocationTitle'>Location</p>
        {/* MAP */}

        {/* Add contact info if the listing doesn't belong to the user */}
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  )
}
