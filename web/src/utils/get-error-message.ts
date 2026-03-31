import axios from 'axios';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Network error. Please check your connection.';
    }

    const data = error.response?.data;

    if (data && typeof data === 'object') {
      const firstKey = Object.keys(data)[0];
      const message = data[firstKey];

      if (Array.isArray(message)) {
        return message[0];
      }

      if (typeof message === 'string') {
        return message;
      }
    }

    return 'Request failed. Please try again.';
  }

  return 'Unexpected error occurred.';
};
export default getErrorMessage;
