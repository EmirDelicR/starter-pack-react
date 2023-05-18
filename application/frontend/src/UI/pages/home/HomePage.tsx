import { AiFillCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Card,
  GalleryCard,
  Header,
  Hero,
  Mirror,
  ProductCard,
  Slider,
  Slider3D,
  StatusCard
} from '@/UI/components';
import { Contact, Footer } from '@/UI/elements';
import { createDynamicArray } from '@/utils';

import classes from './HomePage.module.scss';
import {
  CARD_DATA,
  IMAGE_CARD_DATA,
  PRODUCT_CARD_DATA,
  SLIDER_DATA,
  STATUS_CARD_DATA,
  TESTIMONIAL_DATA
} from './data';

function FirstSectionContent() {
  return (
    <div className={classes['first-section-content']}>
      <Hero
        leftSideContent={
          <Header
            headline="Lorem ipsum dolor sit amet!"
            subHeadline="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            dataColor="light"
          >
            <Contact />
          </Header>
        }
        rightSideContent={<GalleryCard data={IMAGE_CARD_DATA} />}
      />
      <Header headline="Lorem ipsum dolor sit amet" dataColor="light" />
      <div className={classes['card-wrapper']}>
        {STATUS_CARD_DATA.map((item) => (
          <StatusCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

function SecondSectionContent() {
  return (
    <div className={classes['second-section-content']}>
      <Header
        headline="Lorem ipsum dolor sit amet"
        subHeadline="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        hasFilter={true}
      />
      <div className={classes['card-wrapper']}>
        {CARD_DATA.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
      <Header
        headline="Lorem ipsum dolor sit amet"
        subHeadline="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      />
      <Mirror />
    </div>
  );
}

function ThirdSectionContent() {
  return (
    <div className={classes['third-section-content']}>
      <Header
        headline="Lorem ipsum dolor sit amet"
        subHeadline="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      />
      <Slider3D items={SLIDER_DATA} />
    </div>
  );
}

function FourthSectionContent() {
  return (
    <div className={classes['fourth-section-content']}>
      <Header
        headline="Lorem ipsum dolor sit amet"
        dataColor="light"
        hasFilter={true}
      />
      <Slider
        items={TESTIMONIAL_DATA}
        isTestimonial={true}
        showArrows={false}
      />
      <Header
        dataColor="light"
        headline="Lorem ipsum dolor sit amet"
        subHeadline="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
      />
      <div className={classes['card-wrapper']}>
        {PRODUCT_CARD_DATA.map((data) => (
          <ProductCard key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
}

function LastSection() {
  const navigateTo = useNavigate();

  const goToAuthPage = () => {
    navigateTo('/auth');
  };

  return (
    <>
      <div className={classes['last-section-content']}>
        <Hero
          leftSideContent={
            <img
              className={classes['last-section-img']}
              src={
                'https://plus.unsplash.com/premium_photo-1661494070030-68df263bda11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80'
              }
              alt="Phone"
              loading="lazy"
            />
          }
          rightSideContent={
            <Header
              headline="Lorem ipsum dolor sit amet!"
              subHeadline="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            >
              <Button size="medium" onClick={goToAuthPage}>
                Create Account
              </Button>
              <ul className={classes['last-section-list']}>
                {createDynamicArray(3).map(() => (
                  <li key={crypto.randomUUID()}>
                    <AiFillCheckCircle />
                    Lorem ipsum dolor
                  </li>
                ))}
              </ul>
            </Header>
          }
        />
      </div>
      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <div className={classes.home}>
      <section className={classes['first-section']}>
        <FirstSectionContent />
      </section>
      <section className={classes['second-section']}>
        <SecondSectionContent />
      </section>
      <section className={classes['third-section']}>
        <ThirdSectionContent />
      </section>
      <section className={classes['fourth-section']}>
        <FourthSectionContent />
      </section>
      <section className={classes['last-section']}>
        <LastSection />
      </section>
    </div>
  );
}
