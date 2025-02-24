import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import SharedCode from './pages/SharedCode';
import Pastebin from './pages/Pastebin';
import Drawing from './pages/Drawing';
import Academy from './pages/Academy';
import LiveSessions from './pages/LiveSessions';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/shared/:code" element={<SharedCode />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/academy/drawing" element={<Drawing />} />
            <Route path="/academy/live-sessions" element={<LiveSessions />} />
            <Route path="/academy/live-sessions/:roomId" element={<LiveSessions />} />
            <Route path="/academy/pastebin" element={<Pastebin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
