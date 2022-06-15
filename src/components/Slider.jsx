import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect, useState } from 'react'

export default function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const listingsSnap = await getDocs(q)

      const listings = []
      listingsSnap.forEach(doc => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      console.log(listings)
      setLoading(false)
    }

    fetchListings()
  }, [])

  return <div>Slider</div>
}
