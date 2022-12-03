import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav  className="Nav">
       <Link to="/">Home</Link>
       <Link to="/add">Add</Link>
    </nav>
  );
}

export default Navigation;