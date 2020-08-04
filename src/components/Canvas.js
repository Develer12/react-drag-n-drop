import React from 'react';
import ReactDOM from 'react-dom';

import Figure from './Figure'

function Canvas(props) {

    let figOnCanvas = [
        
    ];

    let figureH = 40, figureW = 40;

    let randomId = () => {
        return Math.floor(Math.random() * (10000 - 1)) + 1;
    }

    const drop = (e) => {
            e.preventDefault();
            const fig_id = e.dataTransfer.getData('fig_id');
            
            console.log(fig_id)

            const fig = document.getElementById(fig_id);


            let id = randomId();
            while(document.getElementById(id)){
                id = randomId();
            }

            let inArea = document.getElementById('canvasArea');
            inArea = inArea.querySelector(`[id='${fig.id}']`);

            //let canvasArea = document.getElementById('canvasArea');
            let pageX = e.pageX, pageY = e.pageY;

            let style = {
                left: pageX - figureW/2,
                top: pageY - figureH/2,
                //left: `${ ((pageX - figureW/2) / canvasArea.offsetWidth * 100).toFixed(1)}%`, 
                //top: `${ ((pageY - figureH/2) / canvasArea.offsetHeight * 100).toFixed(1)}%`
            };

            if(fig && id !== fig.id && !inArea){
                figOnCanvas.push({ 
                    id: id, 
                    draggable: fig.draggable, 
                    style: style, 
                    className: fig.className 
                });
                
                const figures = [];
                figOnCanvas.map((item) => (
                    figures.push(React.createElement(
                        Figure, { 
                            id: item.id, 
                            draggable: item.draggable,
                            style: item.style, 
                            className: item.className.indexOf('invisible')? 
                                item.className.replace(/invisible/g, 'visible') : item.className
                        })
                    )
                ));

                ReactDOM.render(figures, e.target);
            }
    }

    const dragOver = (e) => {
        e.preventDefault();
        console.log('can drag')
        if(!e.target.classList.contains('canvas-area')){
            console.log('out')

        }
    }

    return (
        <div 
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
        >
            {
                figOnCanvas.map((item) => (
                    <Figure 
                        key={`fig-${item.id}`} 
                        id={item.id} 
                        draggable={item.draggable} 
                        className={item.className} 
                    />
                ))
            }
        </div>
    );
}

export default Canvas;
