import React from "react";
import "./Header.css";
import { Button } from "@prismane/core";

function Header(props) {
  return (
    <header className="header">
      <h1 className="header_title">Менеджер задач</h1>

      {props.loggedIn && (
        <Button
          variant="tertiary"
          color="red"
          fillOnHover
          onClick={props.logOutUser}
        >
          Выйти
        </Button>
      )}
    </header>
  );
}

export default Header;
