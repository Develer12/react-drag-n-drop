import React from 'react';

import Figure from './Figure'


let figList = [
    { id: "fig-1", className: "figure circle" },
    { id: "fig-2", className: "figure block" }
];

function Figures(props) {


    const dragOver = (e) => {
        e.preventDefault();
    }

    return (
        <div 
            id={props.id}
            className={props.className}
            onDragOver={dragOver}
        >
            { 
                figList.map((item) => (
                    <Figure key={`fig-${item.id}`} id={item.id} draggable="true" className={item.className} />
                ))
            }
            { props.children }
        </div>
    );
}

export default Figures;