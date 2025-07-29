validateName = () => {
  const nameInput = document.getElementById("name").value.trim();
  if (nameInput.length <= 2) {
    showError("Name must be longer than 2 characters");
    return false;
  }

  return true;
};

validateSalary = () => {
  const salaryInput = document.getElementById("salary").value.trim();
  if (salaryInput < 10000 || salaryInput > 16000) {
    showError("Salary must be between 10,000 and 16,000");
    return false;
  }

  return true;
};

validateBirthday = () => {
  const dateInput = document.getElementById("birthday").value.trim();
  if (!dateInput) {
    showError("Birthday is required");
    return false;
  }

  return true;
};

validatePhone = () => {
  const phoneInput = document.getElementById("phone").value.trim();
  if (phoneInput.length !== 10 || isNaN(phoneInput)) {
    showError("Phone must be exactly 10 digits");
    return false;
  }

  return true;
};

const showError = (message) => {
  const error = document.createElement("p");
  error.innerText = message;
  error.style.color = "red";
  error.classList.add("error-message");
  document.getElementById("container").appendChild(error);
};

const clearErrors = () => {
  const messages = document.querySelectorAll(
    ".error-message, .success-message"
  );
  messages.forEach((msg) => msg.remove());
};

const createForm = (e) => {
  e.preventDefault();
  clearErrors();

  const isNameValid = validateName();
  const isSalaryValid = validateSalary();
  const isBirthdayValid = validateBirthday();
  const isPhoneValid = validatePhone();

  if (isNameValid && isSalaryValid && isBirthdayValid && isPhoneValid) {
    const form = document.getElementById("container");
    form.style.display = "none";

    const name = document.getElementById("name").value.trim();

    const welcomeMessage = document.createElement("h2");
    welcomeMessage.innerText = `Welcome, ${name}!`;
    welcomeMessage.style.color = "#1abc9c";
    welcomeMessage.style.textAlign = "center";
    welcomeMessage.style.marginTop = "50px";

    document.body.appendChild(welcomeMessage);
  }
};

document.getElementById("container").addEventListener("submit", createForm);
