interface EmployeeDetails {
  fname: string;
  lname: string;
  email: string;
  dob: string;
  doj: string;
  designation: string;
  experience: string;
  phoneNumber: string;
}

interface ValidationErrors {
  fname: string;
  lname: string;
  email: string;
  dob: string;
  doj: string;
  designation: string;
  experience: string;
  phoneNumber: string;
}

// Validation
export const validateEmployeeDetails = (
  empDetails: EmployeeDetails
): ValidationErrors => {
  const errors: ValidationErrors = {
    fname: "",
    lname: "",
    email: "",
    dob: "",
    doj: "",
    designation: "",
    experience: "",
    phoneNumber: "",
  };

  if (!empDetails.fname.trim()) {
    errors.fname = "Please enter first name";
  }

  if (!empDetails.lname.trim()) {
    errors.lname = "Please enter last name";
  }

  if (!empDetails.email.trim()) {
    errors.email = "Please enter email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(empDetails.email.trim())) {
    errors.email = "Invalid email address";
  }

  if (!empDetails.dob) {
    errors.dob = "Please enter date of birth";
  }

  if (!empDetails.doj) {
    errors.doj = "Please enter date of join";
  }

  if (!empDetails.designation.trim()) {
    errors.designation = "Please enter designation";
  }

  if (!empDetails.experience.trim()) {
    errors.experience = "Please enter experience in years";
  } else if (!/^\d+$/.test(empDetails.experience.trim())) {
    errors.experience = "Invalid experience";
  }

  if (!empDetails.phoneNumber.trim()) {
    errors.phoneNumber = "Please enter phone number";
  } else if (!/^\d{10}$/.test(empDetails.phoneNumber.trim())) {
    errors.phoneNumber = "Invalid phone number";
  }

  return errors;
};
