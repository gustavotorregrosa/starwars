import React from 'react'
import letters from '../assets/letters.png'

const myStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5em',
    width: '30em'
}

const SplashScreen = () => (
    <div>
        <img src={letters} style={myStyle} />
    </div>
)


export default SplashScreen