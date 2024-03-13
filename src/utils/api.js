import { BASE_URL_MAIN } from "./constants";

// Получение ответа от сервера в виде объекта, вернется либо успешный ответ от сервера,
// либо обработанный объект с ошибкой, который перейдет в блок catch
function onResponse(res) {
  return res.ok
    ? res.json()
    : res
        .json()
        .then((err) =>
          Promise.reject(`Что-то пошло не так: ${res.status}. ${err.message}`)
        );
}

// Запрос получения от сервера промиса сохраненных фильмов и данных пользователя
export function getAllInfo() {
  return Promise.all([getUserMe(), getAllSavedMovies()]);
}

export function getAllTasks() {
  return fetch(`${BASE_URL_MAIN}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(onResponse);
}

// Запрос на сервер получения задачи по id
export function getByTask(id) {
  return fetch(`${BASE_URL_MAIN}/tasks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(onResponse);
}

// Аутентификация
export function login(login, password) {
  return fetch(`${BASE_URL_MAIN}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  }).then(onResponse);
}

export function putTask(task, id) {
  const number = Number(id);
  return fetch(`${BASE_URL_MAIN}/tasks/${number}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      executor: task.executor || null,
      completedDate: task.completedDate || null,
    }),
  }).then(onResponse);
}

export function addTask(task) {
  return fetch(`${BASE_URL_MAIN}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      priority: task.priority,
      executor: task.executor || null,
      completedDate: task.completedDate || null,
    }),
  }).then(onResponse);
}

// Запрос на сервер обновления данных о пользователе
export function patchUser(name, email) {
  return fetch(`${BASE_URL_MAIN}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  }).then(onResponse);
}

// Запрос на сервер получения данных о всех сохранненых фильмах пользователя
export function getAllSavedMovies() {
  return fetch(`${BASE_URL_MAIN}/movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(onResponse);
}

// Запрос на сервер добавления нового фильма
export function addMovie(movie) {
  return fetch(`${BASE_URL_MAIN}/movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  }).then(onResponse);
}

// Запрос на сервер для удаления фильма
export function deleteMovie(id) {
  return fetch(`${BASE_URL_MAIN}/movies/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
