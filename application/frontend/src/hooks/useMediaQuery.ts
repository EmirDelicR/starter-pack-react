import { useEffect, useRef, useState } from 'react';

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;
const MOBILE = '(max-width: 740px)';

/**
 * Older versions of Safari (shipped withCatalina and before) do not support addEventListener on matchMedia
 * https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
 * */
function attachMediaListener(
  query: MediaQueryList,
  callback: MediaQueryCallback
) {
  try {
    query.addEventListener('change', callback);
    return () => query.removeEventListener('change', callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}

function getInitialValue(query: string, initialValue?: boolean) {
  if (typeof initialValue === 'boolean') {
    return initialValue;
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return window.matchMedia(query).matches;
  }

  return false;
}
/**
 * @description - check if current view is matching specific media query
 * @param query - string that represent media query like '(max-width: 740px)'
 * @param initialValue - initial value of matching
 * @param useInitialValue - flag to use initial value, if not set it use value matches from mediaMatch
 * @returns boolean
 */
export default function useMediaQuery(
  query: string = MOBILE,
  initialValue = false,
  useInitialValue = true
) {
  const [matches, setMatches] = useState(
    useInitialValue ? initialValue : getInitialValue(query, initialValue)
  );
  const queryRef = useRef<MediaQueryList>();

  useEffect(() => {
    if ('matchMedia' in window && window.matchMedia !== undefined) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, (event) =>
        setMatches(event.matches)
      );
    }

    return undefined;
  }, [query]);

  return matches;
}
