import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';

import Prompt from './Prompt';

const App = ({ essayText, fieldOrder, allFieldsAnswered }) => {
  const propTypes = {
    essayText: PropTypes.string.isRequired,
    fieldOrder: PropTypes.array.isRequired,
    allFieldsAnswered: PropTypes.bool.isRequired,
  };

  const [ isEditing, setIsEditing ] = useState(false);

  const editableEssayText = () => {
    console.log(essayText);
    console.log(essayText.replace('<b>', ''))
    console.log(essayText.replace('</b>', ''))
    console.log(essayText.replace('<b>', '').replace('</b>', ''))
    return essayText.replace('<b>', '').replace('</b>', '')
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
        <div>
          <Title>Your essay text</Title>
          <div>
            <textarea value={editableEssayText()} />
            <button onClick={() => setIsEditing(!isEditing)}>Start Over</button>
          </div>
        </div>
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
