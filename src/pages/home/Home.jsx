import React from 'react';
import './Home.css'
import glacierJpg from '../../assets/Glacier.jpg';
// import glacierWebp from './assets/Glacier.webp';

function Home() {

    return (
    <div className="Glacier">
      <picture>
        {/* <source srcSet={glacierWebp} type="image/webp" /> */}
        <img 
          src={glacierJpg}
          alt=""
          className="glacier-bg"
                />
            </picture>
            <section className="Home">
                <h3>Welcome on this website</h3>
                <p >Here you can find the most important data for company shares while enjoying beautiful mountain scenery.</p>
                <p className="lineHeight">Please note that you can only perform - approximately 2 searches per minute - for now.</p>
                <p className="lineHeight">We are working on expanding this.</p>                
            </section>
        </div>
    );
}

export default Home;