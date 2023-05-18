import { useEffect, useState } from 'react';

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useAddToHomeScreenPrompt(): [
  IBeforeInstallPromptEvent | null,
  () => void
] {
  const [prompt, setState] = useState<IBeforeInstallPromptEvent | null>(null);

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "before install prompt" event'
      )
    );
  };

  useEffect(() => {
    const ready = (evt: IBeforeInstallPromptEvent) => {
      evt.preventDefault();
      setState(evt);
    };

    window.addEventListener(
      'beforeinstallprompt',
      ready as EventListenerOrEventListenerObject
    );

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        ready as EventListenerOrEventListenerObject
      );
    };
  }, []);

  return [prompt, promptToInstall];
}
