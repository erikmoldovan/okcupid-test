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
      // Define constants
      const fieldAnswers = state.fieldAnswers;
      const fieldName = action.payload.fieldName;
      const answer = action.payload.answer;

      const isDifferentAnswer = !fieldAnswers[fieldName] ? answer !== "" : answer !== fieldAnswers[fieldName].answer;

      // Short circuit on unchanged answer
      if (!isDifferentAnswer) {
        return {
          ...state
        };
      }
      
      const retrieveTemplateNum = (newFieldName, field) => {
        const textOptions = getTextTemplates(newFieldName);
        const newTemplateNum = Math.floor(Math.random() * (textOptions.length - 1));

        return field && field.templateNum ? field.templateNum : newTemplateNum
      }

      // Set new field answer
      fieldAnswers[fieldName] = {
        answer,
        templateNum: retrieveTemplateNum(fieldName, fieldAnswers[fieldName])
      };

      // console.log(fieldAnswers)
      
      // Input/Output Data
      let newEssayText = [];

      // Generate essay text with changes
      for (const key in fieldAnswers) {
        // console.log(key, key.length)
        if (key && key.length) {
          const newAnswer = fieldName === key ? answer : fieldAnswers[key].answer;
          // console.log(newAnswer)
          if (newAnswer) {
            const newText = getTextTemplates(key)[fieldAnswers[key].templateNum].replace('$answer', `<b>${newAnswer}</b>`);
            newEssayText.push(newText)
          } 
        }
      }

      return {
        ...state,
        // allFieldsAnswered: Object.values(state.fieldAnswers).length === state.fieldOrder.length,
        essayText: newEssayText.join(' ')
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
