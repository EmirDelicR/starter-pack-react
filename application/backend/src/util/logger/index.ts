export default class Console {
  static info = (text: string) => {
    console.log('\x1b[34m%s\x1b[0m', text);
  };

  static warn = (text: string) => {
    console.log('\x1b[33m%s\x1b[0m', text);
  };

  static success = (text: string) => {
    console.log('\x1b[32m%s\x1b[0m', text);
  };

  static error = (text: string) => {
    console.log('\x1b[31m%s\x1b[0m', text);
  };
}
