import React from "react";
import "./Tasks.css";
import {
  Chip,
  Table,
  Text,
  Button,
  NativeSelectField,
  Flex,
} from "@prismane/core";
import { useLocation } from "react-router-dom";

function Tasks(props) {
  const location = useLocation().pathname;

  const statusMap = {
    CREATED: "К выполнению",
    PROGRESS: "Выполняется",
    COMPLETED: "Выполнена",
    CANCELLED: "Отменена",
  };

  const priorityMap = {
    LOW: "Низкий",
    NORMAL: "Средний",
    HIGH: "Высокий",
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
        {" "}
        <Text as="h2" pb="10px">
          Задачи
        </Text>
        <Button
          variant="primary"
          color="diamond"
          fillOnHover
          onClick={props.openAddTask}
        >
          Новая задача
        </Button>
      </Flex>

      {location === "/mytasks" && (
        <NativeSelectField
          m={"0 0 10px 0"}
          name="select"
          value={props.selectedFilter}
          onChange={handleSelectChange}
          options={[
            { value: "today", label: "На сегодня" },
            { value: "week", label: "На неделю" },
            { value: "future", label: "На будущее" },
          ]}
        />
      )}

      <Table bg={"#fff"} w="100%">
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
              bg={[["#FFF", 600], { hover: "#e7e7e7", active: "#d4d4d4" }]}
              cs="pointer"
              ta="left"
            >
              <Table.Cell>
                <Chip
                  ta="center"
                  // color="ruby"
                  style={{
                    backgroundColor:
                      new Date(task?.completedDate) < new Date() &&
                      task?.status !== "COMPLETED"
                        ? "#f97c7c"
                        : "inherit",
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
          {/* 
          <Table.Row
            bg={[["#FFF", 600], { hover: "#e7e7e7", active: "#d4d4d4" }]}
            cs="pointer"
            // onClick={() => alert("Hello")}
            ta="left"
          >
            <Table.Cell>
              <Chip ta="center" color="ruby">
                Распечатать документы
              </Chip>
            </Table.Cell>
            <Table.Cell>Низкий</Table.Cell>
            <Table.Cell>29.03.2024</Table.Cell>
            <Table.Cell>Иванов</Table.Cell>
            <Table.Cell>Выполняется</Table.Cell>
          </Table.Row>

          <Table.Row
            bg={[["#FFF", 600], { hover: "#e7e7e7", active: "#d4d4d4" }]}
            cs="pointer"
            // onClick={() => alert("Hello")}
            ta="left"
          >
            <Table.Cell>Написать автотесты</Table.Cell>
            <Table.Cell>Средний</Table.Cell>
            <Table.Cell>12.03.2024</Table.Cell>
            <Table.Cell>Николаева</Table.Cell>
            <Table.Cell>Выполнена</Table.Cell>
          </Table.Row>
          <Table.Row
            bg={[["#FFF", 600], { hover: "#e7e7e7", active: "#d4d4d4" }]}
            cs="pointer"
            // onClick={() => alert("Hello")}
            ta="left"
          >
            <Table.Cell>Реализовать фронтенд</Table.Cell>
            <Table.Cell>Высокий</Table.Cell>
            <Table.Cell>8.03.2024</Table.Cell>
            <Table.Cell>Сидоров</Table.Cell>
            <Table.Cell>Выполняется</Table.Cell>
          </Table.Row> */}
        </Table.Body>
      </Table>
    </section>
  );
}

export default Tasks;
