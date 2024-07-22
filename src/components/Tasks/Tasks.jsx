import React from 'react';
import './Tasks.css';
import { Chip, Table, Text, Button, NativeSelectField, Flex } from '@prismane/core';
import { useLocation } from 'react-router-dom';

function Tasks(props) {
	const location = useLocation().pathname;

	const statusMap = {
		CREATED: 'К выполнению',
		PROGRESS: 'Выполняется',
		COMPLETED: 'Выполнена',
		CANCELLED: 'Отменена',
	};

	const priorityMap = {
		LOW: 'Низкий',
		NORMAL: 'Средний',
		HIGH: 'Высокий',
	};

	React.useEffect(() => {
		props.onSort();
	}, []);

	// Обработчик изменения значения селекта
	const handleSelectChange = (event) => {
		props.setSelectedFilter(event.target.value);
	};

	return (
		<section className="tasks">
			{/* <h2 className="tasks__title">Задачи</h2> */}

			<Flex justify="between">
				{' '}
				<Text as="h2" pb="10px">
					Задачи
				</Text>
				<Button variant="primary" color="diamond" fillOnHover onClick={props.openAddTask}>
					Новая задача
				</Button>
			</Flex>

			{location === '/mytasks' && (
				<NativeSelectField
					m={'0 0 10px 0'}
					name="select"
					value={props.selectedFilter}
					onChange={handleSelectChange}
					options={[
						{ value: 'today', label: 'На сегодня' },
						{ value: 'week', label: 'На неделю' },
						{ value: 'future', label: 'На будущее' },
					]}
				/>
			)}

			<Table bg={'#fff'} w="100%">
				<Table.Head ta="left">
					<Table.Row>
						<Table.Cell>Заголовок</Table.Cell>
						<Table.Cell>Приоритет</Table.Cell>
						<Table.Cell>Дата окончания</Table.Cell>
						<Table.Cell>Ответственный</Table.Cell>
						<Table.Cell>Cтатус</Table.Cell>
					</Table.Row>
				</Table.Head>

				<Table.Body>
					{props?.tasks?.map((task) => (
						<Table.Row
							key={task.id}
							onClick={() => props.openEditTask(task.id)}
							bg={[['#FFF', 600], { hover: '#e7e7e7', active: '#d4d4d4' }]}
							cs="pointer"
							ta="left"
						>
							<Table.Cell>
								<Chip
									ta="center"
									color="black"
									style={{
										backgroundColor:
											new Date(task?.completedDate) < new Date() &&
											task?.status !== 'COMPLETED'
												? '#f97c7c'
												: task?.status === 'COMPLETED'
												? '#7fffd4'
												: '#ededed',
									}}
								>
									{task.title}
								</Chip>
							</Table.Cell>
							<Table.Cell>{priorityMap[task?.priority]}</Table.Cell>
							<Table.Cell>{task?.completedDate}</Table.Cell>
							<Table.Cell>{task?.executor?.lastName}</Table.Cell>
							<Table.Cell>{statusMap[task?.status]}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</section>
	);
}

export default Tasks;
