import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToHash from '@/components/ScrollToHash';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Footer from '@/layout/Footer';
import Navbar from '@/layout/Navbar';
import Layout from '@/layout/Layout';
import NotFound from '@/views/NotFound';

const ProjectDetail = lazy(() => import('@/views/projects/ProjectDetail'));

const PageFallback = () => (
  <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
    Loading…
  </div>
);

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-black">
      <ScrollToHash />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
