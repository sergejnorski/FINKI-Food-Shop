import React, {useMemo} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';
const MultiItemCarousel = ({foods}) =>{
  console.log("foods: ", foods)
  const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:2000,
        arrows:false // da moze avtomatski da se menuva se brisat strelkite
      };

    const randomFoods = useMemo(() => {
      const shuffled = [...foods].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 20);
    }, [foods]);

    return(
        <div>
            <Slider {...settings}>
                {randomFoods.map((item)=><CarouselItem key={item}
                 image={item.images} title={item.title} price={item?.price} restaurant={item?.restaurant} category={item.foodCategory.name}/>)}
            </Slider>
        </div>
    )
}

export default MultiItemCarousel