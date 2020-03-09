import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';

import { clearFields } from "../madlibs";

import Prompt from './Prompt';

const App = ({ dispatch, essayText, fieldOrder, allFieldsAnswered }) => {
  const propTypes = {
    dispatch: PropTypes.func.isRequired,
    essayText: PropTypes.string.isRequired,
    fieldOrder: PropTypes.array.isRequired,
    allFieldsAnswered: PropTypes.bool.isRequired,
  };

  const [ isEditing, setIsEditing ] = useState(false);

  const editableEssayText = () => {
    return essayText.replace(/(<([^>]+)>)/ig, '');
  }

  const startOver = () => {
    dispatch(clearFields())
    setIsEditing(!isEditing);
  }

  return (
    <>
      {!isEditing ?
        <>
          <Left>
            <Title>About Me</Title>
            {fieldOrder.map(fieldName => {
              return (
                <Prompt key={fieldName} fieldName={fieldName} />
              );
            })}
          </Left>
          <Right>
            <Title>Your essay text</Title>
            <div>
              <div dangerouslySetInnerHTML={{__html: essayText}}></div>
              {allFieldsAnswered &&
                <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
              }
            </div>
          </Right>
        </>
        :
        <Pane>
          <Title>Your essay text</Title>
          <div>
            <textarea value={editableEssayText()} />
            <button onClick={() => startOver()}>Start Over</button>
          </div>
        </Pane>
      }
      
    </>
  );
}

const Pane = styled.div`
  flex: 1;
  padding: 24px;
`;

const Left = styled(Pane)`
  
`;

const Right = styled(Pane)`
  background-color: #ffffff;
`;

const Title = styled.h2`

`;

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);
