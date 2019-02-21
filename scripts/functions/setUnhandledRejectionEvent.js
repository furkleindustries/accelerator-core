import {
  error,
} from 'colorful-logging';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
export function setUnhandledRejectionEvent() {
  process.on('unhandledRejection', (err) => {
    error(err);
    process.exit(1);
  });
}
