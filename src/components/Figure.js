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


    let choosenId;

    const ChooseFigure = (e) => {
        choosenId = e.target.id;
    }

    document.addEventListener("keydown", (e) => {
        if(e.keyCode === 46){
            let del = document.getElementById(choosenId);
            if(del && del.parentNode.id === 'canvasArea'){                
                del.parentNode.removeChild(del);
            }
        }
    });

    return (
        <div
            id={`figure-${props.id}`}
            key={`figure-${props.id}`}
            className={`${props.className}`}
            style={props.style}
            draggable={props.draggable}
            onDragStart={DragStart}
            onDragOver={DragOver}
            onClick={ChooseFigure}
        >
            { props.children }
        </div>
    );
}

export default Figure;
