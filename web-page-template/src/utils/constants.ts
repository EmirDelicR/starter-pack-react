import {
  faGithub,
  faLinkedinIn,
  faXing
} from '@fortawesome/free-brands-svg-icons';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

export const PAGES = [
  'home',
  'timeline',
  'skill',
  'certificate',
  'portfolio',
  'tips',
  'contact'
];

export const SOCIAL_PAGES = [
  {
    name: 'git',
    icon: faGithub,
    link: '#test'
  },
  {
    name: 'linkedin',
    icon: faLinkedinIn,
    link: '#'
  },
  {
    name: 'xing',
    icon: faXing,
    link: '#'
  },
  {
    name: 'cv',
    icon: faFileDownload,
    // link: require('@/assets/doc/CV.pdf'),
    link: 'pdf.link',
    download: 'CV.pdf'
  }
];
