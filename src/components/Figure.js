import React from 'react';

function Figure(props) {

    const DragStart = (e) => {
        const target = e.target;
        e.dataTransfer.setData('fig_id', target.id);
        console.log('st')

        setTimeout(() => {
            if(target.parentElement.id === 'canvasArea'){
                target.classList.add('invisible');
            }
        }, 0);
    }

    const DragOver = (e) => {
        e.stopPropagation();
        console.log('sp')
    }

    return (
        <div
            id={`figure-${props.id}`}
            key={`figure-${props.id}`}
            className={`${props.className}`}
            draggable={props.draggable}
            onDragStart={DragStart}
            onDragOver={DragOver}
            style={props.style}
        >
            { props.children }
        </div>
    );
}

export default Figure;
