import { useRef } from 'react';

import MainPage from '@pages/main/Main';
import ActionButtons from '@elements/actionButtons/ActionButtons';

import './App.scss';

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  const onToggleModeClick = () => {
    mainRef.current?.classList.toggle('dark');
  };

  return (
    <div className="app" ref={mainRef}>
      <MainPage />
      <ActionButtons toggleAction={onToggleModeClick} />
    </div>
  );
}
