import React from 'react';
import Slider from "./components/Slider/Slider";
import {SliderState} from "./context/SliderState";

function App() {
    return (
        <div className="App">
            <SliderState>
                <Slider/>
            </SliderState>

        </div>
    );
}

export default App;
