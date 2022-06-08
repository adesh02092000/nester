import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

export const PrivateRoute = () => {
  const { loggedIn, loading } = useAuthStatus()

  if (loading) {
    return <Spinner />
  }
  // Outlet is used to render child components, so if the user is loggedIn we render the child
  // components otherwise we navigate to the sign-in page
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}
