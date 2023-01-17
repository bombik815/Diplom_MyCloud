import slide01 from '../assets/images/slide01.jpg'
import slide02 from '../assets/images/slide02.jpg'
import slide03 from '../assets/images/slide03.jpg'

import Carousel from 'react-bootstrap/Carousel';

const HomeScreen = () => {
  return (
    <div>
      <Carousel pause='hover'>
        <Carousel.Item>
          <img className="d-block w-auto" src={slide01} alt="First slide" />
          <Carousel.Caption><h5>Облочное хранилище</h5></Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-auto" src={slide03} alt="Second slide" />
          <Carousel.Caption><h5>Простой и безопасный доступ к файлам</h5></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-auto" src={slide02} alt="Third slide" />
          <Carousel.Caption><h5>Создано для конфиденциальности</h5></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeScreen;
