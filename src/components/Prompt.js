import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from 'styled-components';

import { submitField } from "../madlibs";
import { FIELDS } from '../constants';

const Prompt = ({ fieldName, submitChangedField }) => (
  <PromptWrapper>
    <Label htmlFor={fieldName}>{FIELDS[fieldName]}</Label>
    <Input
      type="text"
      id={fieldName}
      onBlur={(e) => submitChangedField({ id: fieldName, answer: e.target.value })}
    />
  </PromptWrapper>
)

const PromptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const Label = styled.label`
  padding: 8px 0;
  color: #5e5e6a;
`;

const Input = styled.input`
  padding: 12px;
  border: 0;
`;

Prompt.propTypes = {
  submitChangedField: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    submitChangedField: (id, answer) => dispatch(submitField(id, answer))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prompt);;