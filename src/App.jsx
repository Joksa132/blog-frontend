import './Styles/App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import ArticleForm from './Components/ArticleForm/ArticleForm';
import ArticlePage from './Pages/ArticlePage/ArticlePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<ArticleForm />} />
        <Route path='/article/:id' element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App