import ThemeToggle from '@/UI/elements/themeToggle/ThemeToggle';
import ThemeProvider from '@/UI/themeProvider/ThemeProvider';
import { Button } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
  return (
    <ThemeProvider>
      <main className="App">
        <Button>Test</Button>
        <ThemeToggle />
      </main>
    </ThemeProvider>
  );
}

export default App;
