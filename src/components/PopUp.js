import React from 'react';
import '../assets/css/popup.css';


const PopUp = (props) => {

     
        return (
            <div className="popupbackground">
                <div className="popupcontainer">
                    <div className="logo-header">
                        <img src={logo} style={{height:'30px',width:'30px'}} className="App-logo" alt="logo" />
                    </div>
                    <div className="message">
                        <p>{props.message}</p>
                    </div>
                </div>
            </div>
        );
    
}
 
export default PopUp ;