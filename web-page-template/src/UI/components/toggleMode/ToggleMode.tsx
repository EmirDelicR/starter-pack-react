import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ToggleMode.scss';
import { useState } from 'react';
import { classNameHelper } from '@/utils/generalHelpers';

interface Props {
  onClick: () => void;
}

export default function ToggleMode({ onClick }: Props) {
  const [isLightMode, setIsLightMode] = useState(true);

  const onClickHandler = () => {
    setIsLightMode((prev) => !prev);
    onClick();
  };

  return (
    <FontAwesomeIcon
      className={classNameHelper('mode', isLightMode ? 'light' : '')}
      icon={faLightbulb}
      size="2x"
      onClick={onClickHandler}
    />
  );
}
