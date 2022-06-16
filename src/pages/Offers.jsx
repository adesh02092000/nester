import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase.config'

export default function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        // Get the listings (collection) reference
        const listingsRef = collection(db, 'listings')
        // Create a query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(5)
        )
        // Execute the query
        const querySnap = await getDocs(q)

        const lastVisibleListing = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisibleListing)

        const listings = []

        querySnap.forEach(doc => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [])

  // Pagination
  const onFetchMoreListings = async () => {
    try {
      setLoading(true)
      const listingsRef = collection(db, 'listings')
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(5)
      )
      const querySnap = await getDocs(q)

      const lastVisibleListing = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisibleListing)

      const listings = []

      querySnap.forEach(doc => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      // Add new listings to the previous once
      setListings(prevListings => [...prevListings, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map(listing => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />

          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No offers available currently</p>
      )}
    </div>
  )
}
// Offers page is very similar to the Category page: here we query for all the listings that have offer set to true, (instead of querying based on the category type)
