import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
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
        <Group h="100%" style={{ border: '1px solid red' }} align="center" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {NAVIGATION.map((item) => (
          <Link
            key={item.label}
            data-active={item.label === active || undefined}
            className={classes.link}
            to={item.link}
            onClick={() => {
              setActive(item.label);
            }}
          >
            <UnstyledButton>{item.label}</UnstyledButton>
          </Link>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
