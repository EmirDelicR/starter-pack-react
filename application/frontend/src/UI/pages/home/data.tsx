import { ReactNode } from 'react';
import { AiOutlineRise } from 'react-icons/ai';
import { BsCreditCard, BsTriangle } from 'react-icons/bs';
import { FaMoneyBillAlt, FaSalesforce } from 'react-icons/fa';

type SliderData = {
  url: string;
  name: string;
  rating?: number;
};
type CardData = {
  id: string;
  headline: string;
  text: string;
  icon: ReactNode | null;
};
type ProductCardData = {
  id: string;
  url: string;
  name: string;
  rank: number;
};
type StatusCardData = CardData & { subHeadline: string };

const IMAGE_CARD_DATA: string[] = [
  'https://images.unsplash.com/photo-1579389083175-247ef703006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30',
  'https://images.unsplash.com/photo-1615220367990-1940567341f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30',
  'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30'
];

const STATUS_CARD_DATA: StatusCardData[] = [
  {
    id: 'STATUS_CARD_DATA-uuid-1',
    headline: '142%',
    subHeadline: 'Lorem ipsum',
    text: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    icon: <BsTriangle />
  },
  {
    id: 'STATUS_CARD_DATA-uuid-2',
    headline: '435',
    subHeadline: 'Lorem ipsum',
    text: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    icon: null
  },
  {
    id: 'STATUS_CARD_DATA-uuid-3',
    headline: '120 million',
    subHeadline: 'Lorem ipsum',
    text: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    icon: null
  },
  {
    id: 'STATUS_CARD_DATA-uuid-4',
    headline: '25%',
    subHeadline: 'Lorem ipsum',
    text: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    icon: <BsTriangle />
  }
];

const CARD_DATA: CardData[] = [
  {
    id: 'CARD_DATA-uuid-1',
    headline: 'Lorem ipsum',
    text: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    icon: <FaSalesforce />
  },
  {
    id: 'CARD_DATA-uuid-2',
    headline: 'Lorem ipsum',
    text: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    icon: <AiOutlineRise />
  },
  {
    id: 'CARD_DATA-uuid-3',
    headline: 'Lorem ipsum',
    text: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    icon: <FaMoneyBillAlt />
  },
  {
    id: 'CARD_DATA-uuid-4',
    headline: 'Lorem ipsum',
    text: 'Stet clita kasd gubergren, no sea takimata sanctus est.',
    icon: <BsCreditCard />
  }
];

const SLIDER_DATA: SliderData[] = [
  {
    url: 'https://images.unsplash.com/photo-1595995581166-7fffa33907e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30',
    name: 'Nature'
  },
  {
    url: 'https://images.unsplash.com/photo-1617278735792-0ab0caff326a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30',
    name: 'Snow'
  },
  {
    url: 'https://images.unsplash.com/photo-1595995581105-bf317b48c4ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30',
    name: 'Mountains'
  },
  {
    url: 'https://images.unsplash.com/photo-1617278735792-0ab0caff326a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30',
    name: 'Snow-next'
  },
  {
    url: 'https://images.unsplash.com/photo-1595995581105-bf317b48c4ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30',
    name: 'Mountains-next'
  }
];

const TESTIMONIAL_DATA: SliderData[] = [
  { rating: 3.5, name: 'John Doe', url: '' },
  { rating: 1.5, name: 'Doe John', url: '' },
  { rating: 5, name: 'John Doe 3th', url: '' }
];

const PRODUCT_CARD_DATA: ProductCardData[] = [
  {
    id: 'PRODUCT_CARD_DATA-uuid-1',
    name: 'Main product',
    rank: 5,
    url: 'https://images.unsplash.com/photo-1548268520-f9340c2cf07b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30'
  },
  {
    id: 'PRODUCT_CARD_DATA-uuid-2',
    name: 'Secondary product',
    rank: 3,
    url: 'https://images.unsplash.com/photo-1541506618330-7c369fc759b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30'
  },
  {
    id: 'PRODUCT_CARD_DATA-uuid-3',
    name: 'Some product',
    rank: 1,
    url: 'https://images.unsplash.com/photo-1611096002616-763f16ef15f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=30'
  }
];

export {
  IMAGE_CARD_DATA,
  STATUS_CARD_DATA,
  CARD_DATA,
  SLIDER_DATA,
  TESTIMONIAL_DATA,
  PRODUCT_CARD_DATA
};
