import { useNavigate } from 'react-router-dom';

import { Button } from '@/UI/components';

import classes from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  const navigateTo = useNavigate();

  const navigateToHomePage = () => {
    navigateTo('/');
  };
  return (
    <div className={classes.wrapper}>
      <h1>Oops!</h1>
      <h4>404 -page not found</h4>
      <p>
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable.
      </p>
      <Button size="medium" onClick={navigateToHomePage}>
        home page
      </Button>
    </div>
  );
}
