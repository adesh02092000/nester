import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

export default function Navbar() {
  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem'>
            <ExploreIcon fill='#2c2c2c' width='36px' heigth='36px' />
            <p>Explore</p>
          </li>
        </ul>
        <ul className='navbarListItems'>
          <li className='navbarListItem'>
            <OfferIcon fill='#2c2c2c' width='36px' heigth='36px' />
            <p>Offers</p>
          </li>
        </ul>
        <ul className='navbarListItems'>
          <li className='navbarListItem'>
            <PersonOutlineIcon fill='#2c2c2c' width='36px' heigth='36px' />
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
