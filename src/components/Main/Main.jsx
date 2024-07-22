import React from 'react';
import './Main.css';
import Tasks from '../Tasks/Tasks';
import Navbar from '../Navbar/Navbar';
import { Outlet, Route, Routes } from 'react-router-dom';

function Main(props) {
	return (
		<main className="main">
			{/* <section className="main-container"> */}
			{/* </section> */}
			<Navbar></Navbar>

			<Tasks tasks={props.tasks} openEditTask={props.openEditTask}></Tasks>

			<Routes>
				<Route path="allTasks" element={<Tasks tasks={props.tasks} />} />
				<Route path="myTasks" element={<Tasks tasks={props.tasks} />} />
				<Route path="subTasks" element={<Tasks tasks={props.tasks} />} />
			</Routes>

			<Outlet />
		</main>
	);
}

export default Main;
