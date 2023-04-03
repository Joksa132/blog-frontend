import './Styles/App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import ArticleForm from './Components/ArticleForm/ArticleForm';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<ArticleForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App