import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppShell, Box, Burger, Divider, Group, Stack, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { useAppSelector } from '@/store';
import classes from './Layout.module.css';

const NAVIGATION = [
  { link: '/', label: 'Home' },
  { link: '/about', label: 'About' },
];

export function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(NAVIGATION[0].label);
  const appName = useAppSelector((state) => state.app_data.name);
  const appVersion = useAppSelector((state) => state.app_data.version);

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
        <Group h="100%" px="md" align="center" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            {appName}
          </Group>
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack justify="space-between" h="100%">
          <Box>
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
          </Box>
          <Box>
            <Divider />
            @ED - {appVersion}
          </Box>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
