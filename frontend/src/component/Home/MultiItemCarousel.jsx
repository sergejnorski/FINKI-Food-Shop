import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';
const MultiItemCarousel = ({foods}) =>{
  console.log("foods: ", foods)
  const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:2000,
        arrows:false // da moze avtomatski da se menuva se brisat strelkite
      };
    return(
        <div>
            <Slider {...settings}>
                {foods.map((item)=><CarouselItem key={item}
                 image={item.images} title={item.title} price={item?.price} restaurant={item?.restaurant}/>)}
            </Slider>
        </div>
    )
}

export default MultiItemCarousel