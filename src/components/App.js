import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';

import Prompt from './Prompt';

const App = ({ dispatch, essayText, fieldOrder, allFieldsAnswered }) => {
  const propTypes = {
    dispatch: PropTypes.func.isRequired,
    essayText: PropTypes.string.isRequired,
    fieldOrder: PropTypes.array.isRequired,
    allFieldsAnswered: PropTypes.bool.isRequired,
  };

  const [ isEditing, setIsEditing ] = useState(false);

  return (
    <>
      {!isEditing &&
        <Left>
          <Title>About Me</Title>
          {fieldOrder.map(fieldName => {
            return (
              <Prompt key={fieldName} fieldName={fieldName} />
            );
          })}
        </Left>
      }
      <Right>
        <Title>Your essay text</Title>
        <div>
          {isEditing ? 
            <div>
              <textarea value={essayText} />
              <button onClick={() => setIsEditing(!isEditing)}>Start Over</button>
            </div>
            :
            <div>
              <div dangerouslySetInnerHTML={{__html: essayText}}></div>
              {allFieldsAnswered &&
                <button tabIndex="5" onClick={() => setIsEditing(!isEditing)}>Edit</button>
              }
            </div>
          }
        </div>
      </Right>
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
