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
import { db } from '../firebase.config'

export default function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(false)

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
          limit(10)
        )
        // Execute the query
        const querySnap = await getDocs(q)

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

  return <div>Category</div>
}
