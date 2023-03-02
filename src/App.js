import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import audio from './assets/audio/StarWarsTheme.mp3'


import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home'
import Characters from './pages/Characters/Characters'
import Planets from './pages/Planets/Planets'
import Films from './pages/Films/Films'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer/Footer';

import Person from './pages/Person/Person';
import Planet from './pages/Planet/Planet';
import Film from './pages/Film/Film'

import { useGetDataUrl } from './utils/useGetDataUrl'
import Spinner from './components/Spinner/Spinner';


function App() {
  const [lang, setLang] = useState('en-EN')

  const [characters, setCharacters] = useState([])
  const [planets, setPlanets] = useState([])
  const [films, setFilms] = useState([])

  // USTALENIE STANU JĘZYK
  useEffect(() => {
    const browserLanguage = navigator.language
    const appLanguage = browserLanguage === 'pl' ? 'pl-PL' : 'en-EN'
    setLang(appLanguage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <BrowserRouter>
      <Nav lang={lang} setLang={setLang} />
      <audio className="audio"
        // autoPlay='autoplay'
        controls={true} loop>
        <source src={audio} />
      </audio>
      <Routes>
        <Route path='/home' element={<Home lang={lang} />} />

        <Route path='/people' element={<Characters lang={lang} characters={characters} setCharacters={setCharacters} />} />
        <Route path='/planets' element={<Planets lang={lang} planets={planets} setPlanets={setPlanets} />} />
        <Route path='/films' element={<Films lang={lang} films={films} setFilms={setFilms} />} />

        <Route path='/contact' element={<Contact lang={lang} />} />
        <Route path='*' element={<Home lang={lang} />} />

        <Route path='people/:id' element={<Person lang={lang} />} />
        <Route path='planets/:id' element={<Planet lang={lang} />} />
        <Route path='films/:id' element={<Film lang={lang} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
