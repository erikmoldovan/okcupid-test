import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from 'styled-components';

import { submitField } from "../madlibs";
import { FIELDS } from '../constants';

const Prompt = ({ dispatch, fieldName }) => {
  const propTypes = {
    dispatch: PropTypes.func.isRequired,
    fieldName: PropTypes.string.isRequired,
  };

  return (
    <PromptWrapper>
      <Label htmlFor={fieldName}>{FIELDS[fieldName]}</Label>
      <Input
        type="text"
        id={fieldName}
        tabIndex="4"
        onBlur={(e) => dispatch(submitField({ id: fieldName, answer: e.target.value }))}
      />
    </PromptWrapper>
  )
}

const PromptWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  padding: 8px 0;
`;

const Input = styled.input`
  padding: 12px;
`;

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Prompt);;