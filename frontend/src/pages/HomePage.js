import React from 'react';
import NavigationBar from '../components/NavigationBar';
import StoreBadge from 'react-store-badge';
import '../components/Background.css';

const HomePage = () => {
    return(
        <>
        <NavigationBar />
<div id="homepageCarousel" class="carousel slide" data-ride="carousel">

<ul class="carousel-indicators">
  <li data-target="#homepageCarousel" data-slide-to="0" class="active"></li>
  <li data-target="#homepageCarousel" data-slide-to="1"></li>
  <li data-target="#homepageCarousel" data-slide-to="2"></li>
</ul>

<div class="carousel-inner">
  <div class="carousel-item active">
    <img src = {require('./homepage1.jpg')} alt="Test1" width="200" height="80" />
  </div>
  <div class="carousel-item">
    <img src={require('./homepage2.jpg')} alt="Test2" width="200" height="80" />
  </div>
  <div class="carousel-item">
    <img src={require('./homepage3.jpg')} alt="Test3" width="200" height="80" />
  </div>
</div>

<a class="carousel-control-prev" href="#homepageCarousel" data-slide="prev">
  <span class="carousel-control-prev-icon"></span>
</a>
<a class="carousel-control-next" href="#homepageCarousel" data-slide="next">
  <span class="carousel-control-next-icon"></span>
</a>
</div>

<StoreBadge name = "Download Trivia Crevice"
            googlePlayUrl = "https://play.google.com/store?hl=en_US" />
</>

    );
};

export default HomePage;