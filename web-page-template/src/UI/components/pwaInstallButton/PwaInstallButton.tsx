import { useEffect, useState } from 'react';
import { faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAddToHomeScreenPrompt } from './useAddToHomeScreenPrompt';

import './PwaInstallButton.scss';

export default function PwaInstallButton() {
  const [prompt, promptToInstall] = useAddToHomeScreenPrompt();
  const [isVisible, setVisibleState] = useState(false);

  useEffect(() => {
    if (prompt) {
      setVisibleState(true);
    }
  }, [prompt]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pwa-install-wrapper">
      <button
        className="add-button"
        aria-label="pwa-button"
        onClick={promptToInstall}
      >
        Add to <FontAwesomeIcon icon={faHouseLaptop} size={'lg'} />
      </button>
    </div>
  );
}
