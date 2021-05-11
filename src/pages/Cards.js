/** @jsxImportSource @emotion/react */
// import React from 'react';
import { css } from '@emotion/react';

function Cards(props) {
    const imgUrl = `http://openweathermap.org/img/wn/${props.icon}@2x.png`
    const imgStyles = css`
        width: 150px;
        height: auto;
        padding-top: 10px;       
    `;

    const column = css`
        float: left;
        width: 20%;
        padding: 5px 10px;
    `;

    const card = css`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    text-align: center;
    padding: 10px;
    margin: 10px 5px;

    &:hover {
        background-color: lightgray;
        transform: scale(1.05);
    }
    `;

return (
    
        <div className="column" css={column}>
            <div className="card" css={card}>
                <img src={imgUrl} css={imgStyles}></img>
                <div className="container">
                    <h3>{props.date}</h3>
                    <h4>High: {props.temp_max} </h4>
                    <h4>Low: {props.temp_min} </h4>
                    <h4>Description: {props.desc} </h4>
                </div>
             </div>   
        </div>

);
}

export default Cards;