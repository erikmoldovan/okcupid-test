import { FIELD_NAMES } from "./constants";
import { getTextTemplates } from './helpers';

// Action types
// ----------------------------------------------------------------------------

export const SUBMIT_FIELD = "MADLIBS.SUBMIT_FIELD";

// Initial state
// ----------------------------------------------------------------------------

export const INITIAL_STATE = {
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.bar,
  ],

  fieldAnswers: {},
  essayText: "",
  allFieldsAnswered: false,
};


// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_FIELD: {
      const fieldName = action.payload.fieldName;
      const answer = action.payload.answer;
      state.fieldAnswers[fieldName] = answer;

      let essayText = state.essayText.split('.');
      let newEssayText = '';

      const fieldAnswers = state.fieldAnswers;
      const fieldOrder = state.fieldOrder;

      for(const key in fieldAnswers) {
        if (key && fieldName === key) {
          const textOptions = getTextTemplates(key);
          const randNum = Math.floor(Math.random() * (textOptions.length - 1));
          const randText = answer.length ? textOptions[randNum].replace('$answer', `<b>${answer}</b>`) : '';
  
          newEssayText = `${newEssayText} ${randText}`
        } else {
          const oldAnswer = essayText[fieldOrder.indexOf(key)];
          newEssayText = oldAnswer ? `${newEssayText} ${oldAnswer}.` : `${newEssayText}`;
        }
      }

      return {
        ...state,
        essayText: newEssayText
      }
    }

    default:
      return state;
  }
}


// Action creators
// ----------------------------------------------------------------------------

export function submitField({ id, answer }) {
  return { type: SUBMIT_FIELD, payload: { fieldName: id, answer } };
}
