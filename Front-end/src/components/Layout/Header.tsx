import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header-sub">
        <div className="header-sub-container container">
          <div className="header-information">
            <a href="#" className="header-options">
              <span className="ti-credit-card"></span>
              Payment Options
            </a>
            <Link to="" className="header-term">
              <span className="ti-check-box"></span>
              Terms Conditions
            </Link>
            <Link to="" className="header-place">
              US
            </Link>
            <Link to="" className="header-place">
              IT
            </Link>
            <Link to="" className="header-place">
              ES
            </Link>
          </div>

          <div className="header-user">
            <div className="header-booking">My Bookings</div>
            <div className="header-mail">
              <span className="header-mail-notice">3</span>
              <FontAwesomeIcon icon={faEnvelope} />
              <div className="header-mail-show">
                <div className="header-show-content">
                  <img
                    src="/src/assets/images/package-newdelhi-150x150.jpg"
                    alt=""
                    className="header-show-img"
                  />
                  <div className="header-show-main">
                    <Link to="" className="header-main-content">
                      Best Travel Plugin
                    </Link>
                    <Link to="" className="header-main-detail">
                      CHECK FEATURES
                    </Link>
                  </div>
                </div>
                <div className="header-show-content">
                  <img
                    src="/src/assets/images/package-london-150x150.jpg"
                    alt=""
                    className="header-show-img"
                  />
                  <div className="header-show-main">
                    <Link to="" className="header-main-content">
                      Multi Purpose
                    </Link>
                    <Link to="" className="header-main-detail">
                      Multi Purpose
                    </Link>
                  </div>
                </div>
                <div className="header-show-content">
                  <img
                    src="/src/assets/images/package-rome-150x150.jpg"
                    alt=""
                    className="header-show-img"
                  />
                  <div className="header-show-main">
                    <Link to="" className="header-main-content">
                      Multi Purpose
                    </Link>
                    <Link to="" className="header-main-detail">
                      VERY EASY TO USE
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <a href="/package/create" className="header-review">
              Add Your Package
            </a>
            <div className="header-account">
              <img
                className="header-account-avatar"
                src="/src/assets/images/anh-gai.jpg"
                alt=""
              />
              <div className="header-account-user">
                <Link to="/Login" className="header-account-name">
                  User Name
                </Link>
                <Link to="" className="header-account-status">
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-solid-color"></div>

      <div className="header-main">
        <div className="header-main-container container">
          <a href="/" className="">
            <img className="header-main-img" src="/src/assets/images/logo.png" alt="" />
          </a>

          <span className="ti-menu header-main-icon js-btn-menu"></span>
          <div className="disable-mob header-main-content-menu js-content-menu">
            <span className="ti-close header-main-close-item js-btn-close"></span>
            <div className="header-content-container">
              <a href="/" className="header-content-main">
                HOME
              </a>
            </div>

            <div className="header-content-container">
              <a href="/packages" className="header-content-main">
                PACKAGES
              </a>
              <div className="header-content-detail">
                <a href="/search" className="header-content-word">
                  SEARCH
                </a>
                <a href="/packages/single" className="header-content-word">
                  SINGLE PACKAGES
                </a>
                <a href="/destination" className="header-content-word">
                  DESTINATION
                </a>
              </div>
            </div>
            <div className="header-content-container">
              <a href="/shop" className="header-content-main">
                SHOP
              </a>
              <div className="header-content-detail">
                <a href="/shop" className="header-content-word">
                  SHOP
                </a>
                <a href="/shop/cart" className="header-content-word">
                  CART
                </a>
                <a href="#" className="header-content-word">
                  CHECKOUT
                </a>
                <a href="/shop/sign-in" className="header-content-word">
                  My ACCOUNT
                </a>
              </div>
            </div>
            <div className="header-content-container">
              <Link to="" className="header-content-main">
                ABOUT US
              </Link>
            </div>
            <div className="header-content-container">
              <Link to="" className="header-content-main">
                PAGES
              </Link>
              <div className="header-content-detail">
                <Link to="" className="header-content-word">
                  BEST DESTINATION
                </Link>
                <Link to="" className="header-content-word">
                  STAFF
                </Link>
                <Link to="" className="header-content-word">
                  SERVICES
                </Link>
                <Link to="" className="header-content-word">
                  PRICES
                </Link>
                <Link to="" className="header-content-word">
                  FQA
                </Link>
                <Link to="" className="header-content-word">
                  CONTACT 1<span className="ti-arrow-circle-right "></span>
                  <span className="header-content-more">
                    <span className="header-more-detail">Contact 1</span>
                    <span className="header-more-detail">Contact 2</span>
                  </span>
                </Link>
                <Link to="" className="header-content-word">
                  COMING SOON
                </Link>
              </div>
            </div>

            <div className="header-content-container">
              <Link to="" className="header-content-main">
                NEWS
              </Link>
              <div className="header-content-detail">
                <Link to="" className="header-content-word">
                  Archive
                </Link>
                <Link to="" className="header-content-word">
                  Single Post
                  <span className="ti-arrow-circle-right "></span>
                  <span className="header-content-more">
                    <span className="header-more-detail">Full Width</span>
                    <span className="header-more-detail">Right Sidebar</span>
                    <span className="header-more-detail">Left Sidebar</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="header-content-container">
              <Link to="" className="header-content-main">
                CONTACT
              </Link>
              <div className="header-content-detail">
                <Link to="" className="header-content-word">
                  Contact 1
                </Link>
                <Link to="" className="header-content-word">
                  Contact 2
                </Link>
              </div>
            </div>

            <div className="header-content-container">
              <span className="header-content-booking">BOOK NOW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
