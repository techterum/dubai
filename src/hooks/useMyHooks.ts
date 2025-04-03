import { useState } from 'react';

export const useMyHook = () => {
  const [state, setState] = useState(null);
  return [state, setState];
};
