import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';

import { clearFields } from "../madlibs";

import Prompt from './Prompt';

const App = ({ clearAllFields, essayText, fieldOrder, allFieldsAnswered }) => {
  const [ isEditing, setIsEditing ] = useState(false);

  const editableEssayText = () => {
    return essayText.replace(/(<([^>]+)>)/ig, '');
  }

  const startOver = () => {
    clearAllFields();
    setIsEditing(!isEditing);
  }

  return (
    <>
      {!isEditing ?
        <>
          <Pane>
            <Title>About Me</Title>
            {fieldOrder.map(fieldName => {
              return (
                <Prompt key={fieldName} fieldName={fieldName} />
              );
            })}
          </Pane>
          <RightPane>
            <Title>Your essay text</Title>
            <Preview dangerouslySetInnerHTML={{__html: essayText}}></Preview>
            {allFieldsAnswered &&
              <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            }
          </RightPane>
        </>
        :
        <EditPane>
          <EditContainer>
            <EditTitle>Your essay text</EditTitle>
            <TextBox value={editableEssayText()} onChange={e => console.log(e)} />
            <button onClick={() => startOver()}>Start Over</button>
          </EditContainer>
        </EditPane>
      }
      
    </>
  );
}

const Pane = styled.div`
  flex: 1;
  padding: 24px;
  justify-content: center;
`;

const RightPane = styled(Pane)`
  background-color: #fafbfd;
`;

const EditPane = styled(Pane)`
  display: flex;
`;

const Title = styled.h3`
  margin: 0.5em 0 1em;
`;

const EditTitle = styled(Title)`
  text-align: center;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Preview = styled.div`
  margin-bottom: 8em;
`;

const TextBox = styled.textarea`
  resize: none;
  border: 0;
  padding: 12px;
  margin-bottom: 3em;
  font-size: 14px;
  height: 10em;
`;

App.propTypes = {
  clearAllFields: PropTypes.func.isRequired,
  essayText: PropTypes.string.isRequired,
  fieldOrder: PropTypes.array.isRequired,
  allFieldsAnswered: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    clearAllFields: () => dispatch(clearFields())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
