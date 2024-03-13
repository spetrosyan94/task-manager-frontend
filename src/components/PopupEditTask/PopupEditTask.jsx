import React from "react";
import "./PopupEditTask.css";
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

function PopupEditTask(props) {
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    if (props.oneTask?.id) {
      setFormData(props.oneTask);
    }
  }, [props.oneTask, props.isOpen]);

  // Функция, которая обновляет значения формы при изменении инпутов
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.putTaskUpdate(formData, props.oneTask?.id);
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

        {props.oneTask?.id && (
          <form onSubmit={handleSubmit} className="signin__form">
            <TextField
              name="title"
              placeholder=""
              label="Заголовок:"
              value={formData.title || ""}
              onChange={handleChange}
            />

            <TextField
              name="description"
              placeholder=""
              label="Описание:"
              value={formData.description || ""}
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
              defaultValue={formData.priority || ""}
              // value={formData.priority}
              onChange={handleChange}
            />

            <NativeDateField
              name="completedDate"
              placeholder=""
              label="Дата окончания:"
              defaultValue={formData.completedDate || ""}
              // value={formData.completedDate || ""}
              onChange={handleChange}
            />

            <TextField
              name="executor"
              placeholder="Введите ID подчиненного"
              label="Ответственный:"
              value={formData.executor || ""}
              onChange={handleChange}
            />

            <NativeSelectField
              name="status"
              size="base"
              placeholder=""
              label="Статус:"
              options={[
                { value: "CREATED", label: "К выполнению" },
                { value: "PROGRESS", label: "Выполняется" },
                { value: "COMPLETED", label: "Выполнена" },
                { value: "CANCELLED", label: "Отменена" },
              ]}
              defaultValue={formData.status || ""}
              // value={formData.status}
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

export default PopupEditTask;
