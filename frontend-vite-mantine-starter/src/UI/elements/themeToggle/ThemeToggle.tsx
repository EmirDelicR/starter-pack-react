import Moon from '@/assets/icons/moon.svg?react';
import Sun from '@/assets/icons/sun.svg?react';
import { ActionIcon, rem, useMantineColorScheme } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  useHotkeys([['mod+J', toggleColorScheme]]);

  return (
    <ActionIcon
      pos="fixed"
      bottom={0}
      right={0}
      m="md"
      variant="transparent"
      onClick={toggleColorScheme}
      size={30}
      aria-label="Toggle color scheme"
    >
      {colorScheme === 'dark' ? (
        <Sun width={rem(30)} height={rem(30)} />
      ) : (
        <Moon width={rem(30)} height={rem(30)} />
      )}
    </ActionIcon>
  );
}
