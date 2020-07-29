import React from 'react';
import NavigationBar from '../components/NavigationBar';
import StoreBadge from 'react-store-badge';
import '../components/Background.css';

const HomePage = () => {
    return(
        <>
        <NavigationBar />
<div id="homepageCarousel" className="carousel slide" data-ride="carousel">

<ul className="carousel-indicators">
  <li data-target="#homepageCarousel" data-slide-to="0" className="active"></li>
  <li data-target="#homepageCarousel" data-slide-to="1"></li>
  <li data-target="#homepageCarousel" data-slide-to="2"></li>
</ul>

<div className="carousel-inner">
  <div className="carousel-item active">
    <img src = {require('./homep3.png')} alt="Test1" width="200" height="80" />
  </div>
  <div className="carousel-item">
    <img src={require('./homep5.png')} alt="Test2" width="200" height="80" />
  </div>
  <div className="carousel-item">
    <img src={require('./homep4.png')} alt="Test3" width="200" height="80" />
  </div>
</div>

<a className="carousel-control-prev" href="#homepageCarousel" data-slide="prev">
  <span className="carousel-control-prev-icon"></span>
</a>
<a className="carousel-control-next" href="#homepageCarousel" data-slide="next">
  <span className="carousel-control-next-icon"></span>
</a>
</div>

<StoreBadge name = "Download Trivia Crevice"
            googlePlayUrl = "https://play.google.com/store?hl=en_US" />
</>

    );
};

export default HomePage;