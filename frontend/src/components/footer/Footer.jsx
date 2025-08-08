import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          {/* <img src={assets.logo} alt="" /> */}
          <a
            href="https://clinton-3cbcc.web.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="logo logo-name">
              Omarish<span>.</span>
            </p>
          </a>
          <p>
            Omarish Food Delivery is a modern web-based application that allows
            users to browse, order, and enjoy meals from local restaurants with
            ease. The app features secure user authentication, a dynamic cart
            system, and seamless order placement and tracking. Customers can
            register, log in, and manage their orders, while admins oversee
            menus, approvals, and user activities. Built with a powerful MERN
            stack and clean UI, Omarish offers a fast and user-friendly
            experience for food lovers.
          </p>
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=100088893566893"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a
              href="https://x.com/ClintonAllan200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.twitter_icon} alt="Twitter / X" />
            </a>
            <a
              href="https://www.linkedin.com/in/clinton-omari-ba9229275/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>ALLAN ENTERPRICE</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+254-791-736-576</li>
            <li>clintonarani@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; omarish.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
