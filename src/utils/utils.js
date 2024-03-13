import React from "react";
import {} from "./constants";

// Метод получения данныъ из локального хранилища браузера
export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

// Метод для сохранения данных в локальном хранилище браузера
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Функция отключения/включения горизонтального скролла
export function noScrollToggle(openPopup) {
  openPopup
    ? document.body.classList.add("no-scroll")
    : document.body.classList.remove("no-scroll");
}

// Функция закрытия попапа по Esc или вне области попапа
export function usePopupClose(isOpen, closePopup) {
  React.useEffect(() => {
    // Проверяем, дейсвительно ли попап открыт. Если нет, прекращаем дальнейшие действия
    if (!isOpen) return;

    // Закрытие на клик по оверлею
    function handleOverlayClose(evt) {
      // Проверяем, если имеется такой класс, значит, кликнули на оверлей
      if (evt.target.classList.contains("popup")) {
        closePopup();
      }
    }

    // Закрытие попапа на клавишу Esc
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);

    // Очищаем обработчики после размонтирования компонента
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
    // Эффект проверяет, открыт ли попап при изменении его стейта состояния
  }, [isOpen, closePopup]);
}

// Метод для форматирования полей объекта с фильмами для отправки на сервер
// export function correctMovies(movies) {
//   return movies.map((movie) => {
//     return {
//       nameRU: movie.nameRU,
//       nameEN: movie.nameEN,
//       movieId: movie.id,
//       country: movie.country,
//       director: movie.director,
//       duration: movie.duration,
//       year: movie.year,
//       description: movie.description,
//       image: `${BASE_URL_MOVIES}${movie.image.url}`,
//       thumbnail: `${BASE_URL_MOVIES}${movie.image.formats.thumbnail.url}`,
//       trailerLink: movie.trailerLink,
//     };
//   });
// }
