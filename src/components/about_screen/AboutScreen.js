import { useNavigate } from 'react-router';
import '../../css/style.css'
import React from 'react';
import { Link } from 'react-router-dom';

const AboutScreen = () => {
    const navigate = useNavigate();
    const handleLinkClick = () => {
        navigate('/')
    };
    return (
        <div className='about-container'>
            <h1 className='header'>About</h1>
            <Link className='no-underline-hyperlink' onClick={handleLinkClick}><div className='back-arrow'>{"< Back"}</div></Link>
            <div>
                <p className='about-parahraph-1'>
                This React application was created as a job application task for the Junior Mobile Developer position at b2match.
                </p>
                <p className='about-parahraph-2'>
                Data was pulled from <a href="https://pokeapi.co/">PokéApi</a>
                </p>
            </div>
            <a href='https://github.com/SpiceBureau/b2match'><img src="/github-mark.svg" alt="GitHub" className='git-img'/></a>
            <a href='/Dominik_Sebesic_CV.pdf'><img src="/cv.png" alt="CV"  className='cv-img'/></a>
        </div>
      );
}

export default AboutScreen