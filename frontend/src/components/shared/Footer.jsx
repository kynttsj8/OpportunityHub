import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl text-white mb-4">Postgraduate Opportunities</h3>
            <p className="text-gray-300">Email: ITITIU20240@hcmiu.edu.vn</p>
            <p className="text-gray-300">
              Address: International University, VNU HCM City,<br />VietNam
            </p>
            <p className="text-gray-300">Tel: 090 9718665</p>
          </div>

          <div>
            <ul className="space-y-4 text-center">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#ff6f61] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#ff6f61] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-300 hover:text-[#ff6f61] transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#ff6f61] transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-gray-300 hover:text-[#ff6f61] transition">
                  Programs
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <ul className="flex justify-center space-x-6">
              <li>
                <FontAwesomeIcon icon={faFacebook} className="text-gray-300 text-2xl hover:text-[#ff6f61] transition" />
              </li>
              <li>
                <FontAwesomeIcon icon={faTwitter} className="text-gray-300 text-2xl hover:text-[#ff6f61] transition" />
              </li>
              <li>
                <FontAwesomeIcon icon={faInstagram} className="text-gray-300 text-2xl hover:text-[#ff6f61] transition" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#d5e7f5] mt-12 text-center py-4">
        <p className="text-gray-800">&copy; {new Date().getFullYear()} Kyros. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
