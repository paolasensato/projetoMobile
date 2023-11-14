import React from 'react';
import {Snackbar} from 'react-native-paper';
import useFeedbackStore from '../stores/feedback';

const Feedback = () => {
  const {message, visible, reset} = useFeedbackStore();

  const handleDismiss = () => {
    reset();
  };

  return (
    <Snackbar duration={2000} visible={visible} onDismiss={handleDismiss}>
      {message}
    </Snackbar>
  );
};

export default Feedback;
