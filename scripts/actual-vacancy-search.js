const form = document.querySelector('.filter');
const error = document.querySelector('.tender__filter-template');
const selects = document.querySelectorAll('.actual-vacancies__select');
const inputSalary = document.querySelector('.actual-vacancies__input');
const pagination = document.querySelector('.pagination');

function initSelectData(searchItems) {
  for (let i = 0; i < selects.length; i++) {
    if (i === 1) {
      searchItems[i] = selects[1].selectedOptions[0].label
    } else {
      searchItems[i] = selects[i].selectedOptions[0].label.toLowerCase()
    }
  }
}

function searchVacancies(evt) {
  evt.preventDefault();
  const allLi = document.querySelectorAll('.tender__li');
  const searchItems = [];
  initSelectData(searchItems);

  const cardsFinded = actualVacanciesInitialCards.filter((element) => {
    if (element.salary >= inputSalary.value) if (element.grafic.includes(searchItems[0]) && element.grafic.includes(searchItems[1]) && element.grafic.includes(searchItems[2]) && element.grafic.includes(searchItems[3])) return element;
  });

  allLi.forEach(function (elem) {
    elem.parentNode.removeChild(elem);
  });

  if (cardsFinded.length > 0) {
    error.firstChild.remove();
    cardsFinded.forEach(renderCard);
    reloadPagination();
  } else {
    if (document.querySelector('.tender__error')) {
    } else {
      pagination.classList.remove('pagination_active')
      const noData = document.createElement("h4");
      noData.classList.add('tender__error');
      noData.textContent = 'По вашему запросу ничего не найдено, выберите другие параметры и попробуйте ещё раз.';
      filterTemplate.prepend(noData)
    }
  }
}

form.addEventListener("submit", () => searchVacancies(event));
