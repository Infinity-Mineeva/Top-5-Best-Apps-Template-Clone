// DOM REFERENCES

const ctaBtn = document.getElementsByClassName("btn");
const ctaBtnArray = Array.from(ctaBtn);
const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");
const modContainer = document.querySelector(".modal-container");
const email = document.getElementById("email");
const errorMsg = document.getElementById("error");
const submit = document.getElementById("submit");

// Funtion to open modal
const openModal = () => {
  modal.classList.add("open-modal");
  document.querySelector("body").style.overflow = "hidden";
};

// Funtion to close modal
const closeModal = (e) => {
  modContainer.classList.add("fadeOut");
  document.querySelector("body").style.overflow = "visible";
};

// listen for when animation for closing the animation on Modal Container ends.
modContainer.addEventListener("animationend", function () {
  // if the Modal Container still contains fadeOut animation class, we want to remove it from the Modal Container
  if (this.classList.contains("fadeOut")) {
    this.classList.remove("fadeOut");
    // also remove open-modal Class from the parent Modal class
    modal.classList.remove("open-modal");
  }
});


// function for email valiadtion
const emailValidation = (input) => {
  const regExp =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.value.match(regExp)) {
    input.value = "";
    email.style.border = "var(--default-border)";
  email.style.boxShadow = "unset";
  errorMsg.style.display = "none";
    closeModal();
  } else {
    applyError();
  }
};

// function to apply Error message styles to Email Input box
const applyError = () => {
  email.style.border = "var(--error-border)";
  email.style.boxShadow = "var(--error-shadow)";
  errorMsg.style.display = "block";
};


//  when button on Modal Dialog is pressed, check to see input box is empty. If so, show error message. If not, take 

submit.addEventListener("click", () => {
  if (email.value === "") {
    applyError();
  } else {
    emailValidation(email);
  }
});

// listen for clicks on CTA buttons (open the modal)
ctaBtnArray.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

// listen for click on Exit button on modal
closeBtn.addEventListener("click", closeModal);

// exit modal if user clicks anywhere outside of modal
document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.open-modal")) {
    closeModal();
  }
});
