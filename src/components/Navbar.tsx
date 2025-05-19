import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "./styles/Navbar.css";

let locoScroll: any = null;

const Navbar = () => {
  useEffect(() => {
    if (!locoScroll) {
      locoScroll = new LocomotiveScroll({
        el: document.querySelector("#smooth-content") as HTMLElement,
        smooth: true,
        multiplier: 1.7,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
    }

    // Scroll to section on nav link click
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && locoScroll) {
            const target = document.querySelector(section);
            if (target) {
              locoScroll.scrollTo(target, { offset: 0, duration: 800 });
            }
          }
        }
      });
    });

    // Update Locomotive Scroll on resize
    const handleResize = () => {
      locoScroll && locoScroll.update();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      locoScroll && locoScroll.destroy();
      locoScroll = null;
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Logo
        </a>
        <a
          href="mailto:amarjit111sharma@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          amarjit111sharma@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
