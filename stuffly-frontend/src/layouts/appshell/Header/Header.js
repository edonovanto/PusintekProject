import React from "react";
import "./Header.css";
import {
  AiFillHome,
  AiFillGithub,
  AiFillMeh,
  AiOutlineClose,
} from "react-icons/ai";

function Header() {
  const openDrawer = (e) => {
    e.preventDefault();
    const drawerElement = document.querySelector("#drawer");
    drawerElement.classList.toggle("open");
  };

  const closeDrawer = (e) => {
    e.preventDefault();
    const drawerElement = document.querySelector("#drawer");
    drawerElement.classList.remove("open");
  };

  return (
    <header>
      <a id="hamburger" href="#" onClick={(e) => openDrawer(e)}>
        ☰
      </a>
      <h1 class="logo">WMS</h1>
      <nav id="drawer" class="nav">
        <ul class="nav__list">
          <AiOutlineClose
            size="1.5em"
            className="nav__close"
            onClick={(e) => closeDrawer(e)}
          />
          <li class="nav__item">
            <a href="/">
              <AiFillHome size="1em" className="nav__icon" />
              Home
            </a>
          </li>
          <li class="nav__item">
            <a href="https://github.com/edonovanto/Stuffly" target="_blank">
              <AiFillGithub size="1em" className="nav__icon" />
              Code
            </a>
          </li>
          <li class="nav__item">
            <a href="https://www.edonovanto.tech/" target="_blank">
              <AiFillMeh size="1em" className="nav__icon" />
              About Me
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
