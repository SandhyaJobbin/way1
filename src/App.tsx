import { HashRouter } from 'react-router';
import { MotionConfig } from 'framer-motion';
import { BrandProvider } from './shell/BrandProvider';
import { StartGate } from './shell/StartGate';
import { TopNav } from './shell/TopNav';
import { RoutePath } from './shell/RoutePath';
import { AnimatedRoutes } from './routes';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrandProvider>
        <HashRouter>
          <StartGate>
            <TopNav />
            <AnimatedRoutes />
            <RoutePath />
          </StartGate>
        </HashRouter>
      </BrandProvider>
    </MotionConfig>
  );
}
