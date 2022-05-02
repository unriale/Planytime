import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import ModalLogout from "../ModalLogout";

const Nav = styled.div`
  background: #151711;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const BottomWrap = styled.div`
  color: white;
  position: absolute;
  bottom: 50px;
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const openLogoutModal = () => {
    setShowLogoutModal((prev) => !prev); // toggle
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <ModalLogout showModal={showLogoutModal} setShowModal={setShowLogoutModal}/>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              if (index < SidebarData.length - 1) {
                return <SubMenu item={item} key={index} />;
              } else {
                return (
                  <>
                    <BottomWrap onClick={openLogoutModal}>
                      <SubMenu item={item} key={index} />
                    </BottomWrap>
                  </>
                );
              }
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
