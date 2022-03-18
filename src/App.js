import {Routes, Route} from "react-router-dom";
import NewsPage from './pages/NewsPages';

function App() {
  return (
  <Routes>
    <Route path="/" element={<NewsPage/>}/>
    <Route path="/:category" element={<NewsPage/>} />
  </Routes>
  );
};

export default App;
