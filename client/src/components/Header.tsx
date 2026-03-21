import React, { useState, useEffect, useRef } from "react";
import Navbar from "../ui/burger-menu/Navbar";
import logoIcon from "../assets/img/logo.svg";
import { navLinks } from "./DATES/navigation";
import "../assets/styles/header.css";

const Header: React.FC = () => {
  const [burgerMenuState, setBurgerMenuState] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleMenu = () => setBurgerMenuState((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        burgerMenuState &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setBurgerMenuState(false);
      }
    };

    if (burgerMenuState) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [burgerMenuState]);

  return (
      <header className="header">
        <Navbar
          isOpen={burgerMenuState}
          toggleMenu={toggleMenu}
          body={navLinks}
          menuRef={menuRef}
          logo={
            <div className="header__logo">
              <img
                src={logoIcon}
                alt="website logo"
                className="header__logo-img"
              />
              <h1 className="header__logo-title">Web Site</h1>
            </div>
          }
        />
      </header>
  );
};

export default Header;
