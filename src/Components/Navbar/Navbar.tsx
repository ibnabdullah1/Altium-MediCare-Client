import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import logo from "../../assets/logo.png";
import CategoriesDropdown from "./CategoriesDropdown";
import "./Navbar.css";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeMenuSubMenu, setaActiveMenuSubMenu] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const mediaSize = 991;

  const toggleNav = () => {
    setIsMenuOpen((prev) => !prev);
    document.body.classList.toggle("hidden-scrolling");
  };

  const handleSubMenuToggle = (event: any) => {
    if (
      event.target.hasAttribute("data-toggle") &&
      window.innerWidth <= mediaSize
    ) {
      event.preventDefault();

      const menuItemHasChildren = event.target.parentElement;
      console.log(menuItemHasChildren);
      const menuItemId = menuItemHasChildren.getAttribute("data-id");
      const menuItemSubItemId = menuItemHasChildren.getAttribute("data-id");
      console.log(activeMenuSubMenu);
      if (activeMenuSubMenu && activeMenuSubMenu !== menuItemSubItemId) {
        setaActiveMenuSubMenu(null);
      }

      if (activeSubMenu && activeSubMenu !== menuItemId) {
        setActiveSubMenu(null);
      }

      setActiveSubMenu((prev) => (prev === menuItemId ? null : menuItemId));

      setaActiveMenuSubMenu((prev) =>
        prev === menuItemSubItemId ? null : menuItemSubItemId
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > mediaSize) {
        if (isMenuOpen) toggleNav();
        if (activeSubMenu) setActiveSubMenu(null);
        if (activeMenuSubMenu) setaActiveMenuSubMenu(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, activeSubMenu, activeMenuSubMenu]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`header font-questrial py-1 px-4 transition-all duration-500 ease-in-out ${
        isSticky ? "isSticky" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center">
        <CategoriesDropdown />
        <div className="header-main w-full  pr-6 py-4 lg:py-1 border lg:border-none px-3 mb-4 lg:mb-0">
          <p className="uppercase font-medium lg:hidden">Menu</p>
          <button onClick={toggleNav} className="">
            <FaBars className="text-xl lg:hidden flex text-primary" />
          </button>
          <div
            onClick={toggleNav}
            className={`menu-overlay ${isMenuOpen ? "active" : ""}`}
          ></div>

          <nav
            className={`nav-menu scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary ${
              isMenuOpen ? "open" : ""
            }`}
          >
            <div className="flex lg:hidden justify-between mb-5 pb-5 mt-6 border-b border-secondary/20 mx-3">
              <div
                onClick={toggleNav}
                className=" hover:text-primary duration-200"
              >
                <IoCloseOutline className="text-3xl" />
              </div>
              <div className="flex  items-center gap-1 ">
                <img src={logo} alt="" className="w-[35px]" />
                <h2 className="text-2xl text-secondary font-bold">
                  Altium <span className="text-primary">MediCare</span>
                </h2>
              </div>
            </div>

            <div className="lg:hidden flex items-center justify-between bg-transparent border border-secondary/20 gap-2 px-4 py-2 mx-3 mb-4">
              <input
                type="text"
                name=""
                id=""
                className="placeholder:text-sm w-[400px] bg-transparent placeholder:text-secondary border-none outline-none focus:ring-0"
                placeholder="Search our store"
              />{" "}
              <LuSearch className="text-secondary text-3xl" />
            </div>

            <ul className="menu" onClick={handleSubMenuToggle}>
              <li className="menu-item">
                <a href="/">Home</a>
              </li>
              <li className="menu-item">
                <a href="/about-us">About</a>
              </li>
              <li
                className={`menu-item menu-item-has-children ${
                  activeSubMenu === "shop" ? "active" : ""
                }`}
                data-id="shop"
              >
                <a href="#" data-toggle="sub-menu">
                  Shop <i className="plus"></i>
                </a>
                <ul
                  style={{
                    maxHeight: `${
                      activeSubMenu === "shop"
                        ? "196px"
                        : activeMenuSubMenu === "shop-submenu-diagnostic"
                        ? "396px"
                        : activeMenuSubMenu === "shop-submenu-laboratory"
                        ? "396px"
                        : activeMenuSubMenu === "shop-submenu-surgical"
                        ? "396px"
                        : ""
                    }`,
                  }}
                  className="sub-menu transition duration-500"
                >
                  <li
                    className={`menu-item menu-item-has-children ${
                      activeMenuSubMenu === "shop-submenu-diagnostic"
                        ? "active"
                        : ""
                    }`}
                    data-id="shop-submenu-diagnostic"
                  >
                    <a href="#" data-toggle="sub-menu">
                      Diagnostic Product <i className="plus"></i>
                    </a>

                    <ul
                      style={{
                        maxHeight: `${
                          activeMenuSubMenu === "shop-submenu-diagnostic"
                            ? "196px"
                            : ""
                        }`,
                      }}
                      className="sub-menu"
                    >
                      <li className="menu-item">
                        <a href="#"> Diagnostic Sets</a>
                      </li>
                      <li className="menu-item">
                        <a href="#">Otoscopes</a>
                      </li>

                      <li className="menu-item">
                        <a href="#">Pulse Oximeters</a>
                      </li>
                      <li className="menu-item">
                        <a href="#">Fetal Doppler</a>
                      </li>
                      <li className="menu-item">
                        <a href="#">ECG Machine </a>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`menu-item menu-item-has-children ${
                      activeMenuSubMenu === "shop-submenu-laboratory"
                        ? "active"
                        : ""
                    }`}
                    data-id="shop-submenu-laboratory"
                  >
                    <a href="#" data-toggle="sub-menu">
                      Laboratory Product <i className="plus"></i>
                    </a>

                    <ul
                      style={{
                        maxHeight: `${
                          activeMenuSubMenu === "shop-submenu-laboratory"
                            ? "196px"
                            : ""
                        }`,
                      }}
                      className="sub-menu"
                    >
                      <li className="menu-item">
                        <a href="#"> Diagnostic Sets</a>
                      </li>
                      <li className="menu-item">
                        <a href="#">Otoscopes</a>
                      </li>
                    </ul>
                  </li>

                  <li
                    className={`menu-item menu-item-has-children ${
                      activeMenuSubMenu === "shop-submenu-surgical"
                        ? "active"
                        : ""
                    }`}
                    data-id="shop-submenu-surgical"
                  >
                    <a href="#" data-toggle="sub-menu">
                      Surgical Product <i className="plus"></i>
                    </a>

                    <ul
                      style={{
                        maxHeight: `${
                          activeMenuSubMenu === "shop-submenu-surgical"
                            ? "196px"
                            : ""
                        }`,
                      }}
                      className="sub-menu"
                    >
                      <li className="menu-item">
                        <a href="#">Pulse Oximeters</a>
                      </li>
                      <li className="menu-item">
                        <a href="#">Fetal Doppler</a>
                      </li>
                      <li className="menu-item">
                        <a href="#">ECG Machine </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <a href="/blogs">Blog</a>
              </li>
              <li
                className={`menu-item menu-item-has-children ${
                  activeMenuSubMenu === "product" ? "active" : ""
                }`}
                data-id="product"
              >
                <a href="#" data-toggle="sub-menu">
                  Products <i className="plus"></i>
                </a>
                <ul
                  style={{
                    maxHeight: `${
                      activeMenuSubMenu === "product" ? "196px" : ""
                    }`,
                  }}
                  className="sub-menu"
                >
                  <li className="menu-item">
                    <a href="/all-collections">All collections</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Product Media</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Product Variants</a>
                  </li>
                  <li className="menu-item">
                    <a href="#">Product Countdown </a>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item menu-item-has-children ${
                  activeSubMenu === "pages" ? "active" : ""
                }`}
                data-id="pages"
              >
                <a href="#" data-toggle="sub-menu">
                  Pages <i className="plus"></i>
                </a>
                <ul
                  style={{
                    maxHeight: `${activeSubMenu === "pages" ? "196px" : ""}`,
                  }}
                  className="sub-menu"
                >
                  <li className="menu-item">
                    <a href="/privacy-policy">Privacy Policy</a>
                  </li>
                  <li className="menu-item">
                    <a href="/refund-policy"> Refund Policy</a>
                  </li>
                  <li className="menu-item">
                    <a href="/terms-of-service">Terms of Service</a>
                  </li>
                  <li className="menu-item">
                    <a href="/faqs">FAQ</a>
                  </li>
                </ul>
              </li>

              <li className="menu-item">
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
          <p className="lg:flex items-center gap-2 hidden font-semibold text-secondary">
            <IoMdCall className="text-primary" />
            +123-456-789-10
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
