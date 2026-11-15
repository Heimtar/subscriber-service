const hourButtons = document.querySelectorAll(".calc__btn");
const monthSlider = document.querySelector(".calc__slider");
const monthDisplay = document.querySelector(".calc__range-value");
const hourPriceElem = document.querySelector(".calc__price-value-hour");
const monthPriceElem = document.querySelector(".calc__price-value-month");
const totalPriceElem = document.querySelector(".calc__total-sum");

// 1. Словарь тарифов (ключ — количество часов, значение — цена за час)
const tariffRates = {
  1: 4400,
  2: 4300,
  3: 4200,
  5: 4000,
  10: 3800,
};

// 2. Начальное состояние калькулятора
let currentHours = 1;
let currentMonths = 3;

hourButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1. Сначала убираем активный класс со всех кнопок
    hourButtons.forEach((item) => item.classList.remove("calc__btn-active"));

    // 2. Добавляем активный класс только той кнопке, по которой кликнули
    btn.classList.add("calc__btn-active");
    currentHours = Number(btn.dataset.hours);
    updateCalculator();
  });
});

if (monthSlider) {
  monthSlider.addEventListener("input", () => {
    currentMonths = Number(monthSlider.value);
    if (monthDisplay) {
      monthDisplay.textContent = `${currentMonths} мес.`;
    }

    // ВАЖНО: запускаем пересчет цен!
    updateCalculator();
  });
}

function updateCalculator() {
  // 1. Достаем цену за час из словаря по текущему количеству часов
  const hourPrice = tariffRates[currentHours];

  // 2. Вычисляем цену за месяц и итоговую сумму за весь срок
  const monthPrice = hourPrice * currentHours;
  const totalPrice = monthPrice * currentMonths;

  // 3. Обновляем текст в элементах с форматированием чисел
  hourPriceElem.textContent = `${hourPrice.toLocaleString("ru-RU")} руб.`;
  monthPriceElem.textContent = `${monthPrice.toLocaleString("ru-RU")} руб.`;
  totalPriceElem.textContent = `${totalPrice.toLocaleString("ru-RU")} руб.`;
}

updateCalculator();
