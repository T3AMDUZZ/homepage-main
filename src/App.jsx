import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import Solution from './pages/Solution';
import PortfolioDetail from './pages/PortfolioDetail';
import Process from './pages/Process';
import Contact from './pages/Contact';
import AIQuote from './pages/AIQuote';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-quote" element={<AIQuote />} />
        </Routes>
      </Layout>
      <ChatBot />
    </Router>
  );
}

export default App;
