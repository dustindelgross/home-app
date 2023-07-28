'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import AuthContext from '../utils/authContext';
import SelectedContext from "../utils/selectedContext";
import {
  SiFramer,
  SiReact,
  SiJavascript,
  SiCss3,
} from "react-icons/si";

import { TbDoorExit, TbCalendar } from 'react-icons/tb';

import { BsHouseHeartFill } from 'react-icons/bs';

const IconSideNav = () => {
  return (
    <div className="bg-grey-900 text-grey-100 flex">
      <SideNav />
    </div>
  );
};

const SideNav = () => {

  const { selected } = useContext(SelectedContext);

  return (
    // NOTE: In prod, you'd likely set height to h-screen and fix to the viewport
    <nav className="fixed h-screen w-fit bg-grey-900 p-4 flex flex-col items-center gap-2">

      <NavItem
        active={selected === 0}
        id={0}
      >
        <BsHouseHeartFill />
      </NavItem>
      <NavItem
        active={selected === 1}
        id={1}
      >
        <TbCalendar />
      </NavItem>
      <NavItem
        active={selected === 2}
        id={2}
      >
        <SiJavascript />
      </NavItem>
      <NavItem
        active={selected === 3}
        id={3}
      >
        <SiFramer />
      </NavItem>
      <NavItem
        active={selected === 4}
        id={4}
      >
        <SiCss3 />
      </NavItem>
      <NavItem
        active={false}
        id={-1}
        logOut={true}>
        <TbDoorExit />
      </NavItem>

    </nav>
  );
};

const NavItem = ({
  children,
  active,
  id,
  logOut = false,
}: {
  children: JSX.Element;
  active: boolean;
  id: number;
  logOut?: boolean;
}) => {
  const { setSelected } = useContext(SelectedContext);
  const { setUser } = useContext(AuthContext);

  return (
    <motion.button
      className={`${logOut ? 'self-end' : ''} p-3 text-xl bg-grey-700 hover:bg-grey-600 rounded-md transition-colors relative`}
      onClick={() => {
        if (logOut === true) {
          setUser(null);
          localStorage.removeItem('oh-user');
        } else {
          setSelected(id);
        }
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        {active && (
          <motion.span
            className="absolute inset-0 rounded-md bg-blue-600 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default IconSideNav;