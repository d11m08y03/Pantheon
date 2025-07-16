// Validation functions for form inputs
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@umail\.uom\.ac\.mu$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

export const getValidationError = (field: string, value: string): string => {
  if (!value.trim()) return '';
  
  switch (field) {
    case 'name':
      return validateName(value) ? '' : 'Name must be at least 2 characters and contain only letters and spaces';
    case 'umail':
      return validateEmail(value) ? '' : 'Please enter a valid umail address';
    case 'contact':
      return validatePhone(value) ? '' : 'Please enter a valid phone number';
    default:
      return '';
  }
}; 