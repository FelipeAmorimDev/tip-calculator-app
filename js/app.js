const tipForm = document.querySelector(".tip__form");

const peaopleAmountInput = document.querySelector("#peopleamount");
const totalBillInput = document.querySelector("#billvalue");
const customTipInput = document.querySelector("#customtip");
const AllTipElements = document.querySelector(".selecttip__options");

const tipAmountHTML = document.querySelector(".tip__amount h2 span");
const totalBillHTML = document.querySelector(".bill-total h2 span");

const tipsBtnList = document.querySelectorAll(".selecttip__options button");
const resetData = document.querySelector(".tip__result button");

const feedbackError = document.querySelector(".feedback-error");

let tip = 0;

const changeFeedbackClass = (element, element2, add, remove) => {
  element.classList.remove(remove);
  element2.classList.add(add);
};

const handleChange = ({ target }) => {
  target.value = Math.abs(target.value);
  changeFeedbackClass(peaopleAmountInput, feedbackError, "hidden", "input-error");

  const isPeopleAmountValid = target.value > 0;
  showElementInDOMIfPossible(isPeopleAmountValid);
};

const handleClick = ({ target }) => {
  const isButtonClicked = target.tagName === "BUTTON";
  const tipPercent = target.textContent;

  removeActiveClasses();

  if (isButtonClicked) {
    target.classList.add("active");
    tip = Number(tipPercent.replace("%", "")) / 100;
    const isValidValues = totalBillInput.value && peaopleAmountInput.value > 0;
    showElementInDOMIfPossible(isValidValues);

    customTipInput.value = "";
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  removeActiveClasses();

  const peopleAmount = event.target.peopleamount.value;
  const isPeopleAmountValid = peopleAmount > 0;

  tip = Number(event.target.customtip.value) / 100;
  showElementInDOMIfPossible(isPeopleAmountValid);
};

const handleReset = ({ target }) => {
  removeActiveClasses();
  resetAppData(target);
};

const setCustomTipValue = (event) => (tip = Number(event.target.value) / 100);

const removeActiveClasses = () => {
  tipsBtnList.forEach((tipBtn) => tipBtn.classList.remove("active"));
};

const resetAppData = (target) => {
  totalBillInput.value = "";
  customTipInput.value = "";
  peaopleAmountInput.value = "";
  tipAmountHTML.textContent = "0.00";
  totalBillHTML.textContent = "0.00";
  target.classList.remove("resetactive");
};

const showElementInDOMIfPossible = (condicional) => {
  if (condicional) {
    const { tipAmountDivided, totalBillDivided } = calculateBill(
      totalBillInput.value,
      peaopleAmountInput.value
    );

    resetData.setAttribute("class", "resetactive");
    showResultInDOM(tipAmountHTML, tipAmountDivided.toFixed(2));
    showResultInDOM(totalBillHTML, totalBillDivided.toFixed(2));
  } else {
    changeFeedbackClass(feedbackError,peaopleAmountInput,"input-error","hidden");
  }
};

const calculateBill = (totalBill, peopleAmount) => {
  const tipAmountDivided = (Number(totalBill) * tip) / Number(peopleAmount);
  const totalBillDivided = Number(totalBill) / peopleAmount + tipAmountDivided;
  return { tipAmountDivided, totalBillDivided };
};

const showResultInDOM = (element, value) => (element.textContent = value);

AllTipElements.addEventListener("click", handleClick);
customTipInput.addEventListener("change", setCustomTipValue);
peaopleAmountInput.addEventListener("input", handleChange);
tipForm.addEventListener("submit", handleSubmit);
resetData.addEventListener("click", handleReset);
