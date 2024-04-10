// utils/validation.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6; // Passwords must be at least 6 characters long
};

export const validateName = (name) => {
  return name.trim().length > 0; // Names must not be empty or consist only of whitespace
};