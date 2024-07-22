import React from 'react';
import './App.css';
import '../Main/Main.css';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Tasks from '../Tasks/Tasks';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SignIn from '../SignIn/SignIn';
import { addTask, getAllTasks, getByTask, login, putTask } from '../../utils/api';
import { getLocalStorage } from '../../utils/utils';
import { Spinner } from '@prismane/core';
import PopupError from '../PopupError/PopupError';
import PopupEditTask from '../PopupEditTask/PopupEditTask';
import PopupAddTask from '../PopupAddTask/PopupAddTask';

function App() {
	//State
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [user, setUser] = React.useState({});
	const [userid, setUserid] = React.useState(() => {
		return getLocalStorage('userid') || null;
	});
	const [tasks, setTasks] = React.useState([]);
	const [oneTask, setOneTask] = React.useState({});
	const [tasksId, setTasksId] = React.useState(null);
	const [tasksAll, setTasksAll] = React.useState([]);
	const [tasksExecutor, setTasksExecutor] = React.useState([]);
	const [tasksUser, setTasksUser] = React.useState([]);
	// Выбранный фильтр задач пользователя
	const [selectedFilter, setSelectedFilter] = React.useState('today');
	// Состояние отфильтрованных задач
	const [filteredUserTasks, setFilteredUserTasks] = React.useState([]);
	const [token, setToken] = React.useState(() => {
		return getLocalStorage('token') || null;
	});
	const [loading, setLoading] = React.useState(false);
	const [openPopupEditTask, setOpenPopupEditTask] = React.useState(false);
	const [openPopupAddTask, setOpenPopupAddTask] = React.useState(false);
	const [openPopupError, setOpenPopupError] = React.useState(false);
	const [errorInfo, setErrorInfo] = React.useState(null);
	// const navigate = useNavigate();

	React.useEffect(() => {
		if (token) {
			getAllTasks()
				.then((tasks) => {
					console.log(tasks);
					setTasks(tasks);
					setLoggedIn(true);
					console.log('Авторизация пройдена');
				})
				.catch((err) => {
					setLoggedIn(false);
					console.log(err);
					setErrorInfo(err);
				});
		} else {
			setLoggedIn(false);
		}
	}, [token]);

	// Эффект вызова попапа ошибки
	React.useEffect(() => {
		if (errorInfo) {
			setOpenPopupError(true);
		}

		// if (errorInfo?.statusCode === 401) {
		//   // navigate("/signin", { replace: true });
		//   setOpenPopupError(true);
		//   setLoggedIn(false);
		//   localStorage.removeItem("token");
		// }
	}, [errorInfo]);

	// Вызов функции filteredTasks при изменении selectedFilter
	React.useEffect(() => {
		const filtered = sortTasksByCompletedDate(filterTasks());
		setFilteredUserTasks(filtered);
		console.log('Отфильтрованные задачи', filtered);
	}, [selectedFilter, tasks]);

	React.useEffect(() => {
		if (tasksId) {
			getTaskById(tasksId);
		}
	}, [tasksId]);

	// При обновлении массива задач обновляются списки сортировки задач
	React.useEffect(() => {
		sortedUserTasks();
		sortedExecutorTasks();
		sortedAllTasks();
	}, [tasks]);

	function closePopupError() {
		setOpenPopupError(false);
		setErrorInfo(null);
	}

	function handleLogin(data) {
		setLoading(true);
		login(data.login, data.password)
			.then((token) => {
				// console.log("token равен", token.id);
				localStorage.setItem('token', token.access_token);
				localStorage.setItem('userid', token.id);
				setUser(token);
				setLoggedIn(true);
				setToken(token.access_token);
			})
			.catch((err) => {
				console.log(err);
				setErrorInfo(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function logOutUser() {
		localStorage.clear();
		setUserid(null);
		setUser(null);
		setLoggedIn(false);
		setToken(null);
	}

	function allTasks() {
		getAllTasks()
			.then((tasks) => {
				console.log(tasks);
				setTasks(() => tasks);
			})
			.catch((err) => {
				console.log(err);
				setErrorInfo(err);
			});
	}

	function getTaskById(id) {
		getByTask(id)
			.then((task) => {
				console.log(`Задача по id получена ${task}`);
				setOneTask(task);
				setOpenPopupEditTask(true);
			})
			.catch((err) => {
				console.log(err);
				setErrorInfo(err);
			});
	}

	function putTaskUpdate(task, id) {
		putTask(task, id)
			.then((task) => {
				console.log(`Задача обновлена ${task}`);
				allTasks();
				setOneTask(task);
			})
			.catch((err) => {
				console.log(err);
				setErrorInfo(err);
			});
	}

	function addTaskCreate(task) {
		addTask(task)
			.then((task) => {
				console.log(`Задача создана ${task}`);
				allTasks();
			})
			.catch((err) => {
				console.log(err);
				setErrorInfo(err);
			});
	}

	function openEditTask(id) {
		setTasksId(id);
		setOpenPopupEditTask(true);
	}

	function closeEditTask() {
		setOpenPopupEditTask(false);
		setTasksId(null);
	}

	function openAddTask() {
		setOpenPopupAddTask(true);
	}

	function closeAddTask() {
		setOpenPopupAddTask(false);
	}

	// Сортировка всех задач по времени обновления
	const sortedAllTasks = () => {
		console.log('сортировка');
		const sortedTasks = [...tasks].sort(
			(a, b) => new Date(b.updatedDate) - new Date(a.updatedDate),
		);
		setTasksAll(sortedTasks);
	};

	// Сортировка задач по executor.id
	const sortedExecutorTasks = () => {
		console.log('сортировка 2');
		const sortedTasks = [...tasks].sort((a, b) => {
			const executorA = a.executor ? a.executor.id : 0;
			const executorB = b.executor ? b.executor.id : 0;
			return executorA - executorB;
		});
		const reversedTasks = sortedTasks.reverse();
		console.log('Отсортированные все задачи по исполнителям', reversedTasks);
		setTasksExecutor(reversedTasks);
	};

	const sortedUserTasks = () => {
		console.log('Сортировка задач для пользователя с id:', userid);

		// Фильтруем задачи, где пользователь userId является исполнителем
		const userTasks = tasks.filter((task) => task?.executor?.id === Number(userid));
		// Сортируем отфильтрованные задачи по дате обновления
		const sortedTasks = userTasks.sort(
			(a, b) => new Date(b.updatedDate) - new Date(a.updatedDate),
		);
		console.log('Отсортированные задачи для пользователя', sortedTasks);
		// Возвращаем отсортированные задачи для пользователя
		setTasksUser(sortedTasks);
	};

	// Функция для фильтрации задач в соответствии с выбранным фильтром
	const filterTasks = () => {
		const today = new Date();
		const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
		// const oneMonthLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

		if (selectedFilter === 'today') {
			return tasksUser.filter((task) => {
				const completedDate = new Date(task.completedDate);
				// Округляем даты до начала и конца текущего дня
				const startOfDay = new Date(
					today.getFullYear(),
					today.getMonth(),
					today.getDate(),
				);
				const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 - 1);
				return completedDate >= startOfDay && completedDate <= endOfDay;
			});
		} else if (selectedFilter === 'week') {
			return tasksUser.filter((task) => {
				const completedDate = new Date(task.completedDate);
				return completedDate >= today && completedDate <= oneWeekLater;
			});
		} else if (selectedFilter === 'future') {
			return tasksUser;
		}
	};

	// Сортировка отфильтрованных задач по completedDate
	function sortTasksByCompletedDate(tasks) {
		return tasks.sort((a, b) => {
			const dateA = new Date(a.completedDate);
			const dateB = new Date(b.completedDate);
			return dateA - dateB;
		});
	}

	return (
		<div className="app-container">
			<Header logOutUser={logOutUser} loggedIn={loggedIn}></Header>

			<main className="main">
				{token && loggedIn && <Navbar />}

				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute
								element={Tasks}
								setTasks={setTasks}
								tasks={tasksExecutor}
								loggedIn={loggedIn}
								redirectPath="/signin"
								openEditTask={openEditTask}
								onSort={sortedExecutorTasks}
								openAddTask={openAddTask}
							/>
						}
					/>

					<Route
						path="/signin"
						element={
							<ProtectedRoute
								element={SignIn}
								loggedIn={!loggedIn}
								redirectPath="/alltasks"
								onLogin={handleLogin}
								isError={errorInfo}
								setErrorInfo={setErrorInfo}
								loading={loading}
							/>
						}
					/>

					<Route
						path="/mytasks"
						element={
							<ProtectedRoute
								element={Tasks}
								tasks={filteredUserTasks}
								setTasks={setTasks}
								loggedIn={loggedIn}
								redirectPath="/signin"
								openEditTask={openEditTask}
								setSelectedFilter={setSelectedFilter}
								selectedFilter={selectedFilter}
								onSort={sortedUserTasks}
								openAddTask={openAddTask}
							/>
						}
					/>

					<Route
						path="/subtasks"
						element={
							<ProtectedRoute
								element={Tasks}
								setTasks={setTasks}
								tasks={tasksExecutor}
								loggedIn={loggedIn}
								redirectPath="/signin"
								openEditTask={openEditTask}
								onSort={sortedExecutorTasks}
								openAddTask={openAddTask}
							/>
						}
					/>

					<Route
						path="/alltasks"
						element={
							<ProtectedRoute
								element={Tasks}
								setTasks={setTasks}
								tasks={tasksAll}
								loggedIn={loggedIn}
								redirectPath="/signin"
								openEditTask={openEditTask}
								onSort={sortedAllTasks}
								openAddTask={openAddTask}
							/>
						}
					/>
				</Routes>
			</main>

			<PopupAddTask
				isOpen={openPopupAddTask}
				onClose={closeAddTask}
				oneTask={oneTask}
				addTaskCreate={addTaskCreate}
			/>

			<PopupEditTask
				isOpen={openPopupEditTask}
				onClose={closeEditTask}
				oneTask={oneTask}
				putTaskUpdate={putTaskUpdate}
			/>

			<PopupError
				errorInfo={errorInfo}
				isOpen={openPopupError}
				onClose={closePopupError}
				setErrorInfo={setErrorInfo}
			/>

			{loading && (
				<Spinner
					size="lg"
					cl={'primary'}
					style={{
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				/>
			)}
		</div>
	);
}

export default App;
