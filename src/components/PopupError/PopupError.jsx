import React from "react";
import "./PopupError.css";
import { Button, Center, Modal, Text, fr } from "@prismane/core";

function PopupError({ errorInfo, isOpen, onClose, setErrorInfo }) {
  return (
    <div className="popup-error">
      <Modal w={fr(144)} open={isOpen} onClose={onClose} closable>
        <Modal.Header>
          <Text
            fw="bold"
            fs="3xl"
            cl={(theme) =>
              theme.mode === "dark" ? ["base", 300] : ["base", 900]
            }
          >
            Произошла ошибка
          </Text>
        </Modal.Header>
        <Text
          fs="sm"
          cl={(theme) =>
            theme.mode === "dark" ? ["base", 300] : ["base", 900]
          }
        >
          {errorInfo}
        </Text>
        <Modal.Footer>
          <Center>
            <Button onClick={onClose}>Окей</Button>
          </Center>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PopupError;
