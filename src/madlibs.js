import { FIELD_NAMES } from "./constants";
import { getTextTemplates, retrieveTemplateNum, areAllFieldsAnswered } from './helpers';

// Action types
// ----------------------------------------------------------------------------

export const SUBMIT_FIELD = "MADLIBS.SUBMIT_FIELD";
export const CLEAR_FIELDS = "MADLIBS.CLEAR_FIELDS";

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
    case CLEAR_FIELDS: {
      return {
        ...state,
        fieldAnswers: {},
        essayText: "",
        allFieldsAnswered: false,
      };
    }

    case SUBMIT_FIELD: {
      // Define constants
      const fieldAnswers = state.fieldAnswers;
      const fieldName = action.payload.fieldName;
      const idx = action.payload.idx;
      const answer = action.payload.answer;

      const isDifferentAnswer = !fieldAnswers[fieldName] ?
        answer !== "" :
        answer !== fieldAnswers[fieldName].answer;

      // Short circuit on unchanged answer
      if (!isDifferentAnswer) {
        return {
          ...state
        };
      }

      // Set new field answer
      const answerTemplateNum = fieldAnswers[fieldName] ?
        fieldAnswers[fieldName].templateNum :
        undefined;
      fieldAnswers[fieldName] = {
        answer,
        templateNum: fieldAnswers[fieldName] && answerTemplateNum ?
          answerTemplateNum :
          retrieveTemplateNum(fieldName, fieldAnswers[fieldName])
      };
      
      // Generate essay text with changes
      let newEssayText = [];

      for (const key in fieldAnswers) {
        if (key && key.length) {
          const newAnswer = fieldName === key ?
            answer :
            fieldAnswers[key].answer;

          if (newAnswer) {
            const keyTemplateNum = fieldAnswers[key].templateNum;
            const newText = getTextTemplates(key)[keyTemplateNum].replace('$answer', `<b>${newAnswer}</b>`);
            newEssayText[state.fieldOrder.indexOf(key)] = newText;
          } 
        }
      }

      return {
        ...state,
        allFieldsAnswered: areAllFieldsAnswered(state.fieldAnswers, state.fieldOrder),
        essayText: newEssayText.join(' ')
      }
    }

    default:
      return state;
  }
}


// Action creators
// ----------------------------------------------------------------------------

export function submitField({ id, idx, answer }) {
  return { type: SUBMIT_FIELD, payload: { fieldName: id, idx, answer } };
}

export function clearFields() {
  return { type: CLEAR_FIELDS };
}
