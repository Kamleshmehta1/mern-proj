import { Suspense } from 'react';
import LoadingScreen from '../utils/LoadingScreen';

export const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};
