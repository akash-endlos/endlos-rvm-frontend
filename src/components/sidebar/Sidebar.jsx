import React, { ReactNode, useEffect, useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Collapse,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { MdKeyboardArrowRight, MdInventory } from "react-icons/md";
import { GiVendingMachine } from "react-icons/gi";
import {
  AiFillCustomerService,
  AiOutlineUser,
  AiOutlinePullRequest,
  AiOutlineSolution
} from "react-icons/ai";
import { GrVmMaintenance } from "react-icons/gr";
import {MdReportProblem} from 'react-icons/md'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logOut, logout, selectCurrentUser } from "@/redux/feature/authSlice";
import { useRouter } from "next/router";
import Image from "next/image";

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const [MenuLinks, setMenuLinks] = useState([]);

  const [integrations, setIntegrations] = useState({});

  const toggleItem = (index) => {
    setIntegrations((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const navItems = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: FiHome,
    },
    {
      title: "Vendor",
      icon: MdReportProblem,
      link: "/vendor",
    },
    {
      title: "Customer",
      icon: AiFillCustomerService,
      link: "/customer",
      // subItems: [
      //   { title: 'Customer 1' },
      //   { title: 'Customer 2' },
      // ],
    },
    {
      title: "Inventory",
      icon: MdInventory,
      link: "",
      subItems: [
        { title: "Inventory Type", link: "/inventory/inventory-type" },
        { title: "inventory Details", link: "/inventory/inventory-details" },
      ],
    },
    {
      title: "Machine Enrolment",
      icon: GiVendingMachine,
      link: "/machine-enrolment",
      // subItems: [
      //   { title: 'Machine ID',link: '/machine-enrolment/machine-id' },
      //   { title: 'Machine Enrollment',link:"/machine-enrolment", },
      // ],
    },
    {
      title: "User Management",
      icon: AiOutlineUser,
      subItems: [
        { title: "Add Role", link: "/role/add-role" },
        { title: "Add User", link: "/role/add-user" },
      ],
    },
    {
      title: "Problems",
      icon: MdReportProblem,
      link: "/problems",
    },
    {
      title: "Solutions",
      icon: AiOutlineSolution,
      link: "/solutions",
    },
    {
      title: "Maintenance",
      icon: GrVmMaintenance,
      link: "",
      // subItems: [
      //   { title: "Add Parts", link: "" },
      //   { title: "Add Problems", link: "" },
      //   { title: "Add Solutions", link: "" },
      // ],
    },
    {
      title: "Complaints",
      icon: AiOutlinePullRequest,
      link: "",
    },
  ];

  const [user, setuser] = useState("superadmin");
  useEffect(() => {
    if (user === "superadmin") {
      setMenuLinks(navItems);
    }
  }, [user]);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Image width={200} height={40} src='/endlos-rvm.png'/>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <div>
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {/* <Link href={item.link}>
               <NavItem onClick={() => toggleItem(index)} link={item.link} icon={item.icon}>{item.title}</NavItem>
               </Link> */}
              {item.link ? (
                <Link href={item.link}>
                  <NavItem onClick={() => toggleItem(index)} icon={item.icon}>
                    {item.title}
                  </NavItem>
                </Link>
              ) : (
                <NavItem onClick={() => toggleItem(index)} icon={item.icon}>
                  {item.title}
                </NavItem>
              )}
              {item.subItems && (
                <Collapse in={integrations[index]}>
                  {item.subItems.map((subItem, subIndex) => (
                    <Link href={subItem.link} key={subIndex}>
                      <NavItem key={subIndex} pl="12" py="2">
                        {subItem.title}
                      </NavItem>
                    </Link>
                  ))}
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </div>
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, link, children, ...rest }) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "cyan.400",
        color: "white",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout({ user: null, token: null }));
    router.push("/");
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
         <Image width={200} height={40} src='/endlos-rvm.png'/>
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  className="w-10"
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {user?.name}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role}
                  </Text>
                </VStack>
                {/* <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box> */}
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem className="py-2 px-12 rounded-sm border">
                Profile
              </MenuItem>
              <MenuItem
                className="py-2 px-12 rounded-sm border"
                onClick={() => handleLogout()}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
