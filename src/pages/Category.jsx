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
import { db } from '../firebase.config'

export default function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(false)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
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

        querySnap.forEach(doc => {
          // doc.data() give all the data for a document, except for the id
          console.log(doc.data())
        })
      } catch (error) {}
    }

    fetchListings()
  }, [])

  return <div>Category</div>
}
