import React from 'react';

import './App.css';

import Canvas from './components/Canvas'
import Figures from './components/Figures'

function App() {
    return (
        <div className="App">
            <main>
                <Figures id="canvasFigures" className="canvas canvas-figures" />
                <Canvas id="canvasArea" className="canvas canvas-area" />
            </main>
        </div>
    );
}

export default App;
