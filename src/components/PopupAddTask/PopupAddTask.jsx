import React from "react";
import "./PopupAddTask.css";
import {
  Button,
  Center,
  Modal,
  Text,
  TextField,
  fr,
  NativeSelectField,
  NativeDateField,
} from "@prismane/core";

function PopupAddTask(props) {
  const [formAddTaskData, setFormAddTaskData] = React.useState({});

  // Функция, которая обновляет значения формы при изменении инпутов
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormAddTaskData({
      ...formAddTaskData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("Отправленные данные:", formAddTaskData);

    props.addTaskCreate(formAddTaskData);
    props.onClose();
  }

  function handleClose() {
    props.onClose();
  }

  return (
    <div className="">
      <Modal w={fr(144)} open={props.isOpen} onClose={handleClose} closable>
        <Modal.Header>
          <Text
            fw="bold"
            fs="3xl"
            cl={(theme) =>
              theme.mode === "dark" ? ["base", 300] : ["base", 900]
            }
          >
            Редактирование задачи
          </Text>
        </Modal.Header>

        {props.isOpen && (
          <form onSubmit={handleSubmit} className="signin__form">
            <TextField
              name="title"
              placeholder=""
              label="Заголовок:"
              value={formAddTaskData.title || ""}
              onChange={handleChange}
            />

            <TextField
              name="description"
              placeholder=""
              label="Описание:"
              value={formAddTaskData.description || ""}
              onChange={handleChange}
            />

            <NativeSelectField
              size="base"
              name="priority"
              placeholder=""
              label="Приоритет:"
              options={[
                { value: "LOW", label: "Низкий" },
                { value: "NORMAL", label: "Средний" },
                { value: "HIGH", label: "Высокий" },
              ]}
              defaultValue={formAddTaskData.priority || ""}
              // value={formAddTaskData.priority}
              onChange={handleChange}
            />

            <NativeDateField
              name="completedDate"
              placeholder=""
              label="Дата окончания:"
              defaultValue={formAddTaskData.completedDate || ""}
              // value={formAddTaskData.completedDate || ""}
              onChange={handleChange}
            />

            <TextField
              name="executor"
              placeholder="Введите ID подчиненного"
              label="Ответственный:"
              value={formAddTaskData.executor || ""}
              onChange={handleChange}
            />

            <Center>
              <Button type="submit">Изменить</Button>
            </Center>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default PopupAddTask;
