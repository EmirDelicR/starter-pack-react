import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppShell, Burger, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Layout.module.css';

const NAVIGATION = [
  { link: '/', label: 'Home' },
  { link: '/about', label: 'About' },
];

export function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(NAVIGATION[0].label);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {NAVIGATION.map((item) => (
          <Link
            data-active={item.label === active || undefined}
            className={classes.link}
            to={item.link}
          >
            <UnstyledButton
              onClick={() => {
                setActive(item.label);
              }}
            >
              {item.label}
            </UnstyledButton>
          </Link>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
