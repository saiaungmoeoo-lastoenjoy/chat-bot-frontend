import { useEffect, useState } from "react";
import { createStyles, Avatar, UnstyledButton, Group, Text, Menu, Burger, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconSettings, IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  header: {
    width: "100vw",
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]}`,
  },

  mainSection: {
    padding: theme.spacing.sm,
    paddingBottom: 0,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2],
    },
  },
}));

interface HeaderTabsProps {
  user: { image: string };
  tabs: string[];
}

export default function Navbar({ user }: HeaderTabsProps) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        setUsername(res?.data.name);
      }
    };
    fetchData();
  }, []);
  // logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  //   css styles
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Group position="apart" className={classes.mainSection}>
        <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
          <Text size={24} sx={{ cursor: "pointer" }}>
            CHAT BOT
          </Text>
        </Link>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Menu width={260} position="bottom-end" transitionProps={{ transition: "pop-top-right" }} onClose={() => setUserMenuOpened(false)} onOpen={() => setUserMenuOpened(true)} withinPortal>
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group spacing={7}>
                <Avatar src={user.image} alt="avatar" radius="xl" size={40} />
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  {username}
                </Text>
                <IconChevronDown size={rem(12)} stroke={1.5} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>Account settings</Menu.Item>
            <Menu.Item onClick={logout} icon={<IconLogout size="0.9rem" stroke={1.5} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  );
}
