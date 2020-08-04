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
        
        const fig = document.getElementById(fig_id);

        /*
        setTimeout(() => {
            let invisible = document.getElementById('canvasArea');
            invisible = invisible.getElementsByClassName('invisible');
            if(invisible[0]){
                for (let i = 0; i < invisible.length; i++) {
                    if(invisible.id !== fig_id){
                        invisible[i].parentNode.removeChild(invisible[i])
                    }
                }
            }
        }, 0);
        */

        let id = randomId();
        while(document.getElementById(id)){
            id = randomId();
        }


        let pageX = e.pageX, pageY = e.pageY;

        let style = {
            left: pageX - figureW/2,
            top: pageY - figureH/2
        };

        if(fig && id !== fig.id){

            if(fig.parentNode.id === 'canvasArea'){
                let index = figOnCanvas.findIndex((item) => `figure-${item.id}` === fig.id);
                figOnCanvas[index].style = style;
            }
            else{
                figOnCanvas.push({ 
                    id: id, 
                    draggable: fig.draggable, 
                    style: style, 
                    className: fig.className 
                });
            }

            const figures = [];
            figOnCanvas.map((item) => (
                figures.push(React.createElement(
                    Figure, { 
                        id: item.id, 
                        draggable: item.draggable,
                        style: item.style, 
                        className: item.className
                    })
                )
            ));

            ReactDOM.render(figures, document.getElementById('canvasArea'));

            setTimeout(() => {
                document.getElementById(fig.id).classList.remove('invisible');
                document.getElementById(fig.id).classList.add('visible');

                setTimeout(() => {
                    let invisible = document.getElementById('canvasArea');
                    invisible = invisible.getElementsByClassName('invisible');
                    if(invisible[0]){
                        for (let i = 0; i < invisible.length; i++) {
                            if(invisible.id !== fig_id){
                                invisible[i].parentNode.removeChild(invisible[i])
                            }
                        }
                    }
                }, 10);
            }, 0);
        }
        
    }

    const dragOver = (e) => {
        e.preventDefault();
        console.log('can drag')
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
