import React from 'react';
import Profile from '../components/Profile';
import Projects from '../components/Projects';
import Navbar from '../components/Navbar';
import ScoreBoard from '../components/ScoreBoard';
import Footer from '../components/Footer';
import img from '../images/pexels-fauxels-3183150.jpg';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../images/pexels-karen-laårk-boshoff-8538757.jpg';
import img2 from '../images/pexels-ella-olsson-1640774.jpg';
import img3 from '../images/pexels-roman-odintsov-4871119.jpg';
import img4 from '../images/pexels-leeloo-thefirst-6507004.jpg';
const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full lg:col-span-3">
        <ScoreBoard/>
    
        </div>


        <div className="col-span-full lg:col-span-9">
          {/* Carousel */}
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={img1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img3} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img4} alt="4th slide" />
            </Carousel.Item>
            {/* Add additional Carousel.Items for more images */}
          </Carousel>
        </div>

        

      {/* <div className="grid grid-cols-12">
        <div className="col-span-full">
        
          <img
            src={img}
            alt="img"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              maxWidth: '100%',
              marginBottom: '-5px', // Adjust this value as needed to avoid extra space
            }}
          />
        </div> */}

        <div className="col-span-full">
        <h3><a
                    className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                    href="/Profile"
                  >
               My Profile
                  </a></h3>
        </div>

        {/* Gradient background section */}
        <div className="col-span-full bg-white">
          {/* Projects section */}
          <div className="p-4">
            <div className="w-full md:w-2/3 mx-auto">
              <Projects />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
