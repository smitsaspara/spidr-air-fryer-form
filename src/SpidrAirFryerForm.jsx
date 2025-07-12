import React, { useState } from 'react';
import './SpidrAirFryerForm.css';

const SpidrAirFryerForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    priceGuess: '',
    spidrPin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'spidrPin') {
      // Format PIN with dashes
      let formattedValue = value.replace(/[^0-9]/g, '');
      if (formattedValue.length > 4) formattedValue = formattedValue.slice(0, 4) + '-' + formattedValue.slice(4);
      if (formattedValue.length > 9) formattedValue = formattedValue.slice(0, 9) + '-' + formattedValue.slice(9);
      if (formattedValue.length > 14) formattedValue = formattedValue.slice(0, 14) + '-' + formattedValue.slice(14);
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === 'phoneNumber') {
      // Format phone number to (XXX) XXX-XXXX
      let formattedPhone = value.replace(/[^0-9]/g, '');
      if (formattedPhone.length > 3) formattedPhone = `(${formattedPhone.slice(0, 3)}) ${formattedPhone.slice(3)}`;
      if (formattedPhone.length > 9) formattedPhone = formattedPhone.slice(0, 9) + '-' + formattedPhone.slice(9);
      if (formattedPhone.length > 14) formattedPhone = formattedPhone.slice(0, 14);
      setFormData({ ...formData, [name]: formattedPhone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="spidr-form-container">
      <h2 className="spidr-form-title">Spidr Air Fryer Interest Form</h2>
      <form onSubmit={handleSubmit} className="spidr-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="(123) 456-7890"
            pattern="^\(\d{3}\) \d{3}-\d{4}$"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="priceGuess">Guess the Air Fryer's Cost ($)</label>
          <input
            type="number"
            id="priceGuess"
            name="priceGuess"
            value={formData.priceGuess}
            onChange={handleChange}
            required
            placeholder="Enter your guess"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="spidrPin">Spidr PIN</label>
          <input
            type="text"
            id="spidrPin"
            name="spidrPin"
            value={formData.spidrPin}
            onChange={handleChange}
            required
            placeholder="####-####-####-####"
            pattern="\d{4}-\d{4}-\d{4}-\d{4}"
          />
        </div>
        <button type="submit" className="spidr-submit-button">Submit</button>
      </form>
    </div>
  );
};

export default SpidrAirFryerForm;