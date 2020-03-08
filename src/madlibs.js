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
};


// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_FIELD: {
      const fieldName = action.payload.fieldName;
      state.fieldAnswers[fieldName] = action.payload.answer;

      // Get all fieldAnswers
      let essayText = state.essayText.split('.');
      console.log(essayText);
      const textOptions = getTextTemplates(fieldName);
      const randNum = Math.floor(Math.random() * 6);
      const randText = textOptions[randNum];
      console.log(randText);
      let newEssayText = randText.replace('$answer', action.payload.answer);

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
