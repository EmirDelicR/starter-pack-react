import {
  MouseEvent,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  buildPageStack,
  endTransitionHandler,
  getStackOfPages,
  toggleClasses,
  updatePageStack
} from '@/utils/menuHelpers';
import { updateOpeningPage } from '@/utils/generalHelpers';
import Navigation from '@elements/navigation/Navigation';
import Menu from '@/UI/components/menuButton/MenuButton';

import './Main.scss';

const Home = lazy(() => import('@pages/home/Home'));
const Portfolio = lazy(() => import('@pages/portfolio/Portfolio'));
const Timeline = lazy(() => import('@pages/timeline/Timeline'));
const Skills = lazy(() => import('@pages/skills/Skills'));
const Certificates = lazy(() => import('@pages/certificates/Certificates'));
const Contact = lazy(() => import('@pages/contact/Contact'));
const Tips = lazy(() => import('@pages/tips/Tips'));

const PAGES_TO_RENDER: { name: string; element: ReactNode }[] = [
  {
    name: 'home',
    element: <Home />
  },
  {
    name: 'timeline',
    element: <Timeline />
  },
  {
    name: 'skill',
    element: <Skills />
  },
  {
    name: 'certificate',
    element: <Certificates />
  },
  {
    name: 'portfolio',
    element: <Portfolio />
  },
  {
    name: 'tips',
    element: <Tips />
  },
  {
    name: 'contact',
    element: <Contact />
  }
];

export default function MainPage() {
  const { t } = useTranslation();
  const stackRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [allPages, setAllPages] = useState<HTMLElement[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const listOfPages = stackRef.current?.children
      ? [...stackRef.current.children]
      : [];
    setAllPages(listOfPages as HTMLElement[]);
    setNumberOfPages(listOfPages.length);
  }, []);

  useEffect(() => {
    if (allPages.length) {
      buildPageStack(currentPageIndex, numberOfPages, allPages);
    }
  }, [allPages]);

  const isCurrentPage = (pageName: string) => {
    return currentPage === pageName;
  };

  const openPage = (name: string | null = null) => {
    const pageToOpen = name
      ? allPages.find((page) => page.id === name)
      : allPages[currentPageIndex];
    const newPageIndex = allPages.indexOf(pageToOpen!);
    const stackPages = getStackOfPages(
      currentPageIndex,
      numberOfPages,
      newPageIndex
    );

    updateOpeningPage(pageToOpen!, stackPages, allPages);

    if (name) {
      setCurrentPageIndex(newPageIndex);
      setCurrentPage(name);
    }

    toggleClasses(menuRef, navRef);
    endTransitionHandler(pageToOpen!, () => {
      stackRef.current!.classList.remove('pages-stack--open');
      buildPageStack(newPageIndex, numberOfPages, allPages);
      setIsMenuOpen(false);
    });
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    toggleClasses(menuRef, navRef);
    stackRef.current!.classList.add('pages-stack--open');
    updatePageStack(currentPageIndex, numberOfPages, allPages);
  };

  const onPageClickHandler = (
    event: MouseEvent<HTMLElement>,
    pageId: string
  ) => {
    if (isCurrentPage(pageId)) {
      return;
    }
    event.preventDefault();
    openPage(pageId);
  };

  const toggleMenu = () => {
    isMenuOpen ? openPage() : openMenu();
  };

  return (
    <>
      <Navigation ref={navRef} onClick={openPage} />
      <Menu ref={menuRef} onClick={toggleMenu} />
      <div className="pages-stack" ref={stackRef}>
        {PAGES_TO_RENDER.map(({ name, element }) => (
          <div
            key={name}
            className="page"
            onClick={(event) => onPageClickHandler(event, name)}
            id={name}
          >
            <span className="page-name">{t(`navBar.${name}`)}</span>
            {isCurrentPage(name) && (
              <Suspense fallback={<span>Loading...</span>}>{element}</Suspense>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
