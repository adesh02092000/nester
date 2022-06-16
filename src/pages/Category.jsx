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

export default function Category() {
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
          where('type', '==', params.categoryName),
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
      // Get the listings (collection) reference
      const listingsRef = collection(db, 'listings')
      // Create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
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

      setListings(prevListings => [...prevListings, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
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
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}
