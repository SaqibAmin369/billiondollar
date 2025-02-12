import React, { useState } from 'react';
import './header.css';
import logo from '../../assets/logo.png';
import Modal from '../modal';
import { BuyPixels, Faqs, WhyNow, ContactMe } from '../pages-menus';
import ContractAddress from '../contractAdress';
import IconImage from '../../assets/icon.jpeg';
import BackgroundMusic from '../backgroundMusic';
const Header = ({ remainingPixels, usedPixels }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleLinkClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <header>
      <div className="top-header-container">
        <div className="logo">
          <a href="index.html">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="menu">
          <div className="menu-items-header">
            <p>1,000,000,000 pixels</p>
            <p
              style={{
                fontWeight: 'bolder',
                color: '#cfa21d',
                fontSize: '40px',
              }}
            >
              ·
            </p>
            <p>$1 per pixel</p>
            <p
              style={{
                fontWeight: 'bolder',
                color: '#cfa21d',
                fontSize: '40px',
              }}
            >
              ·
            </p>
            <p style={{ fontWeight: 'bold' }}>
              Decide how AI remembers humanity!
            </p>
          </div>
          <ContractAddress />
        </div>
        <p className="info">
          Sold:{' '}
          <span className="total-amount">{usedPixels.toLocaleString()}</span>
          <br /> Available:{' '}
          <span className="total-amount">
            {remainingPixels.toLocaleString()}
          </span>
        </p>
      </div>
      <nav>
              <div style={{display: "flex" , alignItems: "center" , gap: "5px"}}>
             
              <div className="twitter-container">
     

     <a
       href="https://x.com/tewyAI"
       target="_blank"
       className="twittwr-link"
     >
       <i
         className="fa-brands fa-x-twitter"
         style={{ fontSize: '10pt' }}
       ></i>
       Follow @tewyAI
     </a>
     
   </div>
   <div >   <BackgroundMusic /></div>

              </div>
   
        <ul>
          <a className="homepage " href="#">
            Home
          </a>
          |
          <li>
            <a
              className="menu-items why-now"
              onClick={() => handleLinkClick(<WhyNow />)}
            >
              Why Now?
            </a>
          </li>
          |
          <li>
            <a
              className="menu-items buypixels"
              onClick={() => handleLinkClick(<BuyPixels />)}
            >
              Buy Pixels
            </a>
          </li>
          |
          <li>
            <a
              className="menu-items faqs"
              onClick={() => handleLinkClick(<Faqs />)}
            >
              FAQ
            </a>
          </li>
          |
          <li>
            <a
              className="menu-items contact"
              onClick={() => handleLinkClick(<ContactMe />)}
            >
              Contact Me
            </a>
          </li>
        </ul>
        <div className="twitter-container">
          <img
            src={IconImage}
            width={'20px'}
            style={{ borderRadius: '5px' }}
            alt=""
          />
          <a
            className="BTH"
            href="https://solscan.io/token/9nDB9jbg3tvMXXuYryhEvqsfQjVFp6UR1zUwtVS2DVLz"
            target="_blank"
          >
            Get 0.5 BDH per pixel
          </a>
        </div>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
    </header>
  );
};

export default Header;
