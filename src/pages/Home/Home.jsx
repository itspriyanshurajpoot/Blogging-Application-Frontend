

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../Footer/Footer'
import HeroPage from '../HeroPage/HeroPage'
import MainBlog from '../MainBlog.jsx/MainBlog'
import SubscribePart from '../subscribe/SubscribePart'
import './Home.css'

const Home = () => {
  return (
    <div className='home-page'>
      <Navbar />
      <HeroPage />
      <MainBlog />
      {/* <SubscribePart /> */}
      <Footer />
    </div>
  )
}

export default Home