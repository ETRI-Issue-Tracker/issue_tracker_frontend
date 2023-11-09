import Swal from 'sweetalert2';
import color from './color';

export const styledAlert = (message, callback = () => {}) => {
  Swal.fire({
    text: message,
    icon: 'success',
    iconColor: color.navy,
    confirmButtonColor: color.blue,
  }).then((res) => {
    if (res.isConfirmed) {
      callback();
    }
  });
};

export const styledWarning = (message, callback = () => {}) => {
  Swal.fire({
    text: message,
    icon: 'error',
    confirmButtonColor: color.blue,
  }).then((res) => {
    if (res.isConfirmed) {
      callback();
    }
  });
};

export const styledConfirm = (message, confirmCallback = () => {}, cancelCallback = () => {}) => {
  Swal.fire({
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: color.blue,
    cancelButtonColor: color.blueLight,
  }).then((res) => {
    if (res.isConfirmed) {
      confirmCallback();
    } else {
      cancelCallback();
    }
  });
};
