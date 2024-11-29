import { Suspense, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  AppShell,
  Box,
  Burger,
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAppSelector } from '@/store';
import { ColorSchemeToggle } from '@/UI/components/colorSchemeToggle/ColorSchemeToggle';
import ErrorBoundary from '../error/ErrorBoundary';
import classes from './Layout.module.css';

const NAVIGATION = [
  { link: '/', label: 'Home' },
  { link: '/work', label: 'Work' },
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
            <Divider mb="md" />
            @ED - {appVersion}
          </Box>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <ErrorBoundary>
          <Suspense
            fallback={
              <Box pos="relative" h="90vh">
                <LoadingOverlay
                  visible={true}
                  zIndex={1000}
                  overlayProps={{ radius: 'sm', blur: 2 }}
                />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </AppShell.Main>
    </AppShell>
  );
}
