import React from "react";
import "./Navbar.css";
import { Menu } from "@prismane/core";
import { Chat, Fire, Heart, User } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation().pathname;

  const isActive = (path) => {
    return location === path ? ["primary", 300] : {};
  };

  return (
    <nav className="nav">
      <Menu w="100%" bg={"#e7e7e7"} open>
        <Menu.Label fs="100">Меню</Menu.Label>
        <Link to="/mytasks" style={{ textDecoration: "none" }}>
          <Menu.Item
            bg={[
              isActive("/mytasks"),
              { hover: "#7fffd4", active: ["primary", 400] },
            ]}
          >
            <Menu.Icon>
              <Fire br={5} />
            </Menu.Icon>
            Мои задачи
          </Menu.Item>
        </Link>
        <Link to="/subtasks" style={{ textDecoration: "none" }}>
          <Menu.Item
            bg={[
              isActive("/subtasks"),
              { hover: "#7fffd4", active: ["primary", 400] },
            ]}
          >
            <Menu.Icon>
              <User />
            </Menu.Icon>
            Задачи подчиненных
          </Menu.Item>
        </Link>
        <Link to="/alltasks" style={{ textDecoration: "none" }}>
          <Menu.Item
            bg={[
              isActive("/alltasks"),
              { hover: "#7fffd4", active: ["primary", 400] },
            ]}
          >
            <Menu.Icon>
              <Chat />
            </Menu.Icon>
            Все задачи
          </Menu.Item>
        </Link>
      </Menu>
    </nav>
  );
}

export default Navbar;
