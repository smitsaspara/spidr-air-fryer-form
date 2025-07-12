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
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'phoneNumber':
        return /^\(\d{3}\) \d{3}-\d{4}$/.test(value) ? '' : 'Invalid phone number (e.g., (123) 456-7890)';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
      case 'spidrPin':
        return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value) ? '' : 'Invalid PIN (e.g., 1234-5678-9012-3456)';
      case 'firstName':
      case 'lastName':
        return value.trim() ? '' : 'This field is required';
      case 'priceGuess':
        return value > 0 ? '' : 'Price must be greater than 0';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'spidrPin') {
      formattedValue = value.replace(/[^0-9]/g, '');
      if (formattedValue.length > 4) formattedValue = formattedValue.slice(0, 4) + '-' + formattedValue.slice(4);
      if (formattedValue.length > 9) formattedValue = formattedValue.slice(0, 9) + '-' + formattedValue.slice(9);
      if (formattedValue.length > 14) formattedValue = formattedValue.slice(0, 14) + '-' + formattedValue.slice(14);
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    } else if (name === 'phoneNumber') {
      formattedValue = value.replace(/[^0-9]/g, '');
      if (formattedValue.length > 3) formattedValue = `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3)}`;
      if (formattedValue.length > 9) formattedValue = formattedValue.slice(0, 9) + '-' + formattedValue.slice(9);
      if (formattedValue.length > 14) formattedValue = formattedValue.slice(0, 14);
    }

    setFormData({ ...formData, [name]: formattedValue });
    setErrors({ ...errors, [name]: validateField(name, formattedValue) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      console.log('Form Data:', formData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Calculate progress for the indicator
  const completedFields = Object.values(formData).filter((value) => value.trim() && validateField(Object.keys(formData).find(key => formData[key] === value), value) === '').length;
  const totalFields = 6;
  const progressPercentage = (completedFields / totalFields) * 100;

  return (
    <div className="spidr-form-container">
      <h2 className="spidr-form-title">Spidr Air Fryer Interest Form</h2>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="spidr-form-wrapper">
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
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
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
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
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
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
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
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
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
              className={errors.priceGuess ? 'error' : ''}
            />
            {errors.priceGuess && <span className="error-message">{errors.priceGuess}</span>}
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
              className={errors.spidrPin ? 'error' : ''}
            />
            {errors.spidrPin && <span className="error-message">{errors.spidrPin}</span>}
          </div>
          <button type="submit" className="spidr-submit-button">Submit</button>
        </form>
      </div>
      {showToast && (
        <div className="toast">Form submitted successfully! Check console for details.</div>
      )}
    </div>
  );
};

export default SpidrAirFryerForm;