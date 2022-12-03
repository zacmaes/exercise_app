// Import Various Stuff
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';

// Import Pages
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';

// Import Components
import Navigation from './components/Navigation';


function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Tracker</h1>
        <p>Use this app to track your exercises. Navigate below to view the various pages. Time for you to get swole!</p>
      </header>
      <main className="App-main">
        <Router>
            {/* PLEASE NOTE: <nav> tags are inside the <Navigation /> componant */}
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
              <Route path="/edit" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
              <Route path="/add" element={ <CreateExercisePage />}></Route>
            </Routes>
          </Router>
      </main>
      <footer className="App-footer">
        <p>© 2022 Zachary Maes</p>
      </footer>
    </div>
  );
}

export default App;
