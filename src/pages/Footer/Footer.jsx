import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-content'>
            <div className='footer-upper-left'>
                <img src={assets.logo} alt="" />
                <p>
                    Your go-to platform for sharing stories, ideas, and insights. Join our community of passionate bloggers today!
                </p>
            </div>
            <div className='footer-upper-right'>
                <div className='footer-links'>
                    <h3 className='footer-link-heading'>Quick Links</h3>
                    <p className='footer-link-content'>Home</p>
                    <p className='footer-link-content'>Best Seller</p>
                    <p className='footer-link-content'>Offers & Deals</p>
                    <p className='footer-link-content'>Contact Us</p>
                    <p className='footer-link-content'>FAQs</p>
                </div>
                <div className='footer-links'>
                    <h3 className='footer-link-heading'>Need Help</h3>
                    <p className='footer-link-content'>Delivery Information</p>
                    <p className='footer-link-content'>Return & Refund Policy</p>
                    <p className='footer-link-content'>Payment Methods</p>
                    <p className='footer-link-content'>Track your Order</p>
                    <p className='footer-link-content'>Contact Us</p>
                </div>
                <div className='footer-links'>
                    <h3 className='footer-link-heading'>Follow us</h3>
                    <p className='footer-link-content'>Instagram</p>
                    <p className='footer-link-content'>Twitter</p>
                    <p className='footer-link-content'>Linked In</p>
                    <p className='footer-link-content'>Facebook</p>
                </div>
            </div>
        </div>
        <div className='footer-copyright'>
            <p>© 2025 Blogging Application. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer