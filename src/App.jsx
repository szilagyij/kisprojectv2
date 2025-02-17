import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const HalakEsTavuk = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('https://localhost:7044/halak');
        setData(response.data);
      } catch (error) {
        console.error('API hiba:', error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="content">
      <h2>Halak és Tavuk</h2>
      {data ? (
        <div>
          {data.map((item, index) => (
            <div key={index} className="data-item">
              <p><strong>Név:</strong> {item.nev}</p>
              <p><strong>Tó neve:</strong> {item.tonev}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Betöltés...</p>
      )}
    </div>
  );
};

const HalByHorgasz = () => {
  const [nev, setNev] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setNev(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nev) {
      setData(null);
      setIsLoading(true);
      try {
        const response = await axios.get(`https://localhost:7044/horgasz/${nev}`);
        setData(response.data);
      } catch (error) {
        console.error('API hiba:', error);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="content">
      <h2>Halak Horgász alapján</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Horgász neve:
          <input
            type="text"
            value={nev}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Keresés</button>
      </form>
      {isLoading && <p>Betöltés...</p>}
      {data && !isLoading && (
        <div>
          {data.map((item, index) => (
            <div key={index} className="data-item">
              <p><strong>Horgász neve:</strong> {item.horgaszNev}</p>
              <p><strong>Hal neve:</strong> {item.halNev}</p>
              <p><strong>Fogás dátuma:</strong> {item.datum}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Top3Hal = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('https://localhost:7044/Halak/harom-legnagyobb');
        setData(response.data);
      } catch (error) {
        console.error('API hiba:', error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="content">
      <h2>Top 3 Hal</h2>
      {data ? (
        <div>
          {data.map((item, index) => (
            <div key={index} className="data-item">
              <p><strong>id:</strong> {item.id}</p>
              <p><strong>Hal neve:</strong> {item.name}</p>
              <p><strong>Méret cm:</strong> {item.meretCm} cm</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Betöltés...</p>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Kis project v2</h1>
        </header>

        <nav className="navbar">
          <ul>
            <li><Link to="/halak-estavuk">Halak és Tavuk</Link></li>
            <li><Link to="/halbyhorgasz/:nev">Halak Horgász alapján</Link></li>
            <li><Link to="/top3hal">Top3Hal</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/halak-estavuk" element={<HalakEsTavuk />} />
            <Route path="/halbyhorgasz/:nev" element={<HalByHorgasz />} />
            <Route path="/top3hal" element={<Top3Hal />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
