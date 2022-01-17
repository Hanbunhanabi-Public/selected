import {useEffect, useRef} from 'react';

const usePrevious = value => {
  const ref = useRef();

  // store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // re-run if value changes

  // return previous value (happens before the update in useEffect)
  return ref.current;
};

export default usePrevious;
