import {create} from 'zustand';

type FeedbackMessage = {
  type: string;
  message: string;
  visible: boolean;
};

type ActionsFeedbackMessage = {
  showMessage: (state: FeedbackMessage) => void;
  reset: () => void;
};

const initialState: FeedbackMessage = {
  type: '',
  message: '',
  visible: false,
};

const useFeedbackStore = create<FeedbackMessage & ActionsFeedbackMessage>(
  set => ({
    ...initialState,
    showMessage: ({type, message, visible}: FeedbackMessage) =>
      set({type, message, visible}),
    reset: () => set(initialState),
  }),
);

export default useFeedbackStore;
