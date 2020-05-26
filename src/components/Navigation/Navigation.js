import React from 'react';

const Navigation = ({onRouteChange, isSignedIn, OnSignedIn, routeStatus}) =>{
    return(
        <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
            {
            isSignedIn ?
             <p className="f3 link dim black underline pa3 pointer" onClick={() => {onRouteChange('signin'); OnSignedIn(false)}}>Log Out</p>
             : (routeStatus === 'register')
             ?<p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('signin')}>Sign in</p>
             :<p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('register')}>Register</p>
             
             }
            
        </nav>
    );
};

export default Navigation;