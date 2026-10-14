import { lazy, Suspense } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import SectionRoute from '@/components/SectionRoute';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { sectionFromPath } from '@/data/site';
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

function SectionPage() {
  const { section = '' } = useParams();
  if (!sectionFromPath(`/${section}`)) return <NotFound />;
  return <Layout />;
}

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-black">
      <SectionRoute />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/:section" element={<SectionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
