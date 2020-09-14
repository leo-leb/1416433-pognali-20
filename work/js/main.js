// ---- BUSINESS-POPUP ---- //

var business = document.querySelector(".business");
var business__open = document.querySelector(".advertising__btn");
var business__close = document.querySelector(".business__btn");

if (business__open) {
  business__open.addEventListener("click", function (evt) {
    evt.preventDefault();
    business.classList.add("business--show");
  });
}

if (business__close) {
  business__close.addEventListener("click", function (evt) {
    evt.preventDefault();
    business.classList.remove("business--show");
  });
}

// --- MAP --- //

function initMap() {
  var pos = { lat: 59.938829, lng: 30.323069 };
  var opt = {
    center: pos,
    zoom: 17,
    disableDefaultUI: true,
  };

  var myMap = new google.maps.Map(document.getElementById("map"), opt);

  var image = {
    url: "../img/map-marker.svg",
    scaledSize: new google.maps.Size(41, 41)
  };

  var marker = new google.maps.Marker({
    position: pos,
    map: myMap,
    icon: image,
  });
}

// --- MENU-POPUP --- //

var header = document.querySelector(".header");
var popupMenu = header.querySelector(".menu-popup");
var popupMenu__open = header.querySelector(".header__btn-menu");
var popupMenu__close = popupMenu.querySelector(".menu-popup__btn-cross");

popupMenu.classList.remove("menu-popup--no-js");
popupMenu__open.classList.remove("header__btn-menu--no-js");

popupMenu__open.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMenu.classList.add("menu-popup--show");
  popupMenu__close.classList.add("menu-popup__btn-cross--show");
});

popupMenu__close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMenu.classList.remove("menu-popup--show");
  popupMenu__close.classList.remove("menu-popup__btn-cross--show");
});

// --- ALPHABET-POPUP --- //

var alphabet = document.querySelector(".plans-create__filter");
var alphabet__open = document.querySelector(".plans-create__btn-arrow-alt");
var alphabet__close = document.querySelector(".plans-create__btn-cross-alt");
var alphabet__cross = document.querySelector(".plans-create__btn-cross-second");

if (alphabet__open) {
  alphabet__open.addEventListener("click", function (evt) {
    evt.preventDefault();
    alphabet.classList.add("plans-create__filter--show");
    alphabet__cross.classList.add("plans-create__btn-cross-second--hide");
  });
}

if (alphabet__close) {
  alphabet__close.addEventListener("click", function (evt) {
    evt.preventDefault();
    alphabet.classList.remove("plans-create__filter--show");
    alphabet__cross.classList.remove("plans-create__btn-cross-second--hide");
  });
}


// --- FILTER-POPUP --- //

var filter = document.querySelector(".filter-countries");
var formParts = document.querySelector(".filter-countries__form-parts");
var formCountries = document.querySelector(".filter-countries__form-countries");
var formAlphabet = document.querySelector(".filter-countries__alphabet-short");
var form__open = document.querySelector(".filter-countries__btn-dots");
var form__closeCross = document.querySelector(".filter-countries__btn-hide");
var form__closeButton = document.querySelector(".filter-countries__btn");

if (formParts) {
  formParts.classList.remove("filter-countries__form-parts--no-js");
}

if (formCountries) {
  formCountries.classList.remove("filter-countries__form-countries--no-js");
}

if (formAlphabet) {
  formAlphabet.classList.remove("filter-countries__alphabet-short--no-js");
}

if (form__open) {
  form__open.classList.remove("filter-countries__btn-dots--no-js");
  form__open.addEventListener("click", function (evt) {
    evt.preventDefault();
    form__open.classList.add("filter-countries__btn-dots--hide");
    formParts.classList.add("filter-countries__form-parts--show");
    formCountries.classList.add("filter-countries__form-countries--show");
    form__closeCross.classList.add("filter-countries__btn-hide--show");
    form__closeButton.classList.add("filter-countries__btn--show");
  });
}

if (form__closeCross) {
  form__closeCross.classList.remove("filter-countries__btn-hide--no-js");
  form__closeCross.addEventListener("click", function (evt) {
    evt.preventDefault();
    form__open.classList.remove("filter-countries__btn-dots--hide");
    formParts.classList.remove("filter-countries__form-parts--show");
    formCountries.classList.remove("filter-countries__form-countries--show");
    form__closeCross.classList.remove("filter-countries__btn-hide--show");
    form__closeButton.classList.remove("filter-countries__btn--show");
  });
}

if (form__closeButton) {
  form__closeButton.classList.remove("filter-countries__btn--no-js");
  form__closeButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    form__open.classList.remove("filter-countries__btn-dots--hide");
    formParts.classList.remove("filter-countries__form-parts--show");
    formCountries.classList.remove("filter-countries__form-countries--show");
    form__closeCross.classList.remove("filter-countries__btn-hide--show");
    form__closeButton.classList.remove("filter-countries__btn--show");
  });
}
