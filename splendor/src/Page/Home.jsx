import React from 'react'
import Banner from '../component/Banner'
import About from '../component/About'
import Experiences from '../component/Experiences'
import Services from '../component/Services'
import Contact from '../component/Contact'

const Home = () => {
  return (
    <div>
      <div id="home">
        <Banner />
      </div>

      <div id="about">
            <About />
      </div>

      <div id='experience'>
              <Experiences />
      </div>
      <div id='services'>
              <Services/>
      </div>

      <div id='contact'>
              <Contact/>
      </div>
    </div>
  )
}

export default Home