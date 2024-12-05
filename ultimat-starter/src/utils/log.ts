/* eslint-disable no-console*/

const DEFAULT_STYLES = 'border-radius: 0.15rem; padding: 0.15rem; color: black;';

const COLORS = {
  info: '#20d8f5',
  error: '#f52020',
  warning: '#f5a720',
};

export function log(
  message: string,
  type: 'info' | 'error' | 'warning' = 'info',
  stack: string | null | undefined = null
) {
  console.log(`%c${message}`, `${DEFAULT_STYLES} background: ${COLORS[type]};`);

  if (stack) {
    console.dir(stack);
  }
}

export function logDir(name: string, item: unknown) {
  console.log(`-------${name}--------`);
  console.dir(item);
  console.log(`-------END--------`);
}
