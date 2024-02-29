import React from 'react';
import "./contactcards.css";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function ContactCards() {
    const navigate = useNavigate();

    const handleContactClick = () => {
        navigate("/contactpage"); 
    };

    const handleJoinUsClick = () => {
        navigate("/joinus"); 
    };

    const handleFaqsClick = () => {
        navigate("/faqspage"); 
    };

    return (
        <div className="home_featured d-flex justify-content-center">
            <div className="row justify-content-between">
                <div className="col-lg-4 col-md-12">
                    <div className="contact_card h-100 card-hover">
                        <motion.img className="contact_card-img-top"
                            src={process.env.PUBLIC_URL + '/images/rented.jpeg'}
                            alt="Contact"
                            whileHover={{ scale: 1.1 }}
                            onClick={handleContactClick}
                        />
                        <div className="contact_card-body">
                            <h2 className="contact_card-title">Contact Us</h2>
                            <p className="contact_card-text">Your satisfaction is our priority. Feel free to contact us through the form with any questions, suggestions, or complaints.</p>
                        </div>
                        <div className="contact_card-footer">
                            <motion.a className="contact_card-btn btn btn-brand btn-success"
                                whileHover={{ scale: 1.1 }}
                                onClick={handleContactClick}
                            ><span><strong>CONTACT US</strong></span></motion.a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-12">
                    <div className="contact_card h-100 card-hover">
                        <motion.img className="contact_card-img-top"
                            src={process.env.PUBLIC_URL + '/images/browse.jpeg'}
                            alt="Join Us"
                            whileHover={{ scale: 1.1 }}
                            onClick={handleJoinUsClick}
                            
                        />
                        <div className="contact_card-body">
                            <h2 className="contact_card-title">Join Us</h2>
                            <p className="contact_card-text">Roboride is committed to recruiting qualified individuals to create an effective and productive workforce, fostering a happy work environment.</p>
                        </div>
                        <div className="contact_card-footer">
                            <motion.a className="contact_card-btn btn btn-brand btn-success"
                                whileHover={{ scale: 1.1 }}
                                onClick={handleJoinUsClick}

                            ><span><strong>JOIN US</strong></span></motion.a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-12">
                    <div className="contact_card h-100 card-hover">
                        <motion.img className="contact_card-img-top"
                            src={process.env.PUBLIC_URL + '/images/welcome2.jpeg'}
                            alt="Frequently Asked Questions"
                            whileHover={{ scale: 1.1 }}
                            onClick={handleFaqsClick}
                        />
                        <div className="contact_card-body">
                            <h2 className="contact_card-title">Frequently Asked Questions</h2>
                            <p className="contact_card-text">Renting a car with Enterprise is easy, but if you have any questions, you can find answers in this section.</p>
                        </div>
                        <div className="contact_card-footer">
                            <motion.a className="contact_card-btn btn btn-brand btn-success"
                                whileHover={{ scale: 1.1 }}
                                onClick={handleFaqsClick}
                            ><span><strong>FAQs</strong></span></motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactCards;