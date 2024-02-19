import React, { useState } from 'react';
import "./faq.css";

interface FAQItemProps {
  title: string;
  content: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-title" onClick={() => setIsOpen(!isOpen)}>
        <h6>{title}</h6>
        <i className={`icon ${isOpen ? 'icon-minus' : 'icon-plus'}`}></i>
      </div>
      {isOpen && <div className="faq-content">{content}</div>}
    </div>
  );
};

const FAQs: React.FC = () => {
  const faqData: FAQItemProps[] = [
    {
      title: 'How can I make a car reservation?',
      content: 'You can make your car reservation from the Book Now page.'
    },
    {
      title: 'What is the shortest rental period, can I rent hourly?',
      content: 'The shortest car rental period is 24 hours. For rentals shorter than 1 day (24 hours), the daily rental fee is charged.'
    },
    {
      title: 'What should I pay attention to when receiving the rented car?',
      content: 'Before signing the delivery report indicating that the car has been delivered to you; check the mileage of the car, make sure that any faults and damages are noted on the report together with our authorized personnel. Also, you can get information from our authorized staff about the safety equipment and accessories of the rented car.'
    },
    {
      title: 'How can I return the rented car?',
      content: 'To return the car to the office you selected for return during the reservation process is sufficient.'
    },
    {
      title: 'Will I be charged for expenses if the rented car breaks down?',
      content: 'Expenses for the days the car spends in repair are not charged to our guests. However, any damages, material and moral losses arising from our guests, failure to comply with the current traffic laws and regulations are covered by our guests.'
    },
    {
      title: 'Do your cars have winter tires?',
      content: 'Our cars do not come standard with winter tires. Winter tire-equipped vehicles can be allocated to our guests if available in the date range and vehicle group requested by our guests. Winter tire provision is a paid service.'
    },
    {
      title: 'Do your cars have traffic insurance, comprehensive insurance?',
      content: 'All vehicles in our fleet have traffic insurance and comprehensive insurance.'
    },
    {
      title: 'Do your cars have a mileage limit?',
      content: 'We have mileage limit practices that vary according to daily and monthly rentals. You can find information about our mileage limit practices by reviewing the Enterprise rental agreement details.'
    },
    {
      title: 'What is your policy when I exceed the daily mileage limit?',
      content: 'For guests who exceed the daily mileage limit, additional mileage excess fees may apply to the daily rental fee. The distance traveled by the vehicles is determined by reading the mileage meter installed by the manufacturers on the vehicles. In case of tampering with the mileage meter installed on the vehicle, the mileage fee is determined based on the distance of the journey on the map.'
    },
    {
      title: 'Can I travel abroad with the car I rented?',
      content: 'It is not possible to travel abroad with the car you rented.'
    },
  ];

  return (
    <div className="faq-container">
      {faqData.map((item, index) => (
        <FAQItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default FAQs;