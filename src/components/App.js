import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';

import Prompt from './Prompt';

const App = ({ dispatch, essayText, fieldOrder }) => {
  const propTypes = {
    dispatch: PropTypes.func.isRequired,
    essayText: PropTypes.string.isRequired,
    fieldOrder: PropTypes.array.isRequired,
  };

  const [ isEditing, setIsEditing ] = useState(false);

  return (
    <>
      {!isEditing &&
        <Left>
          <h1>About Me</h1>
          {fieldOrder.map((fieldName, index) => {
            return (
              <Prompt key={fieldName} fieldName={fieldName} />
            );
          })}
        </Left>
      }
      <Right>
        <h1>Your essay text</h1>
        <div>
          {isEditing ? 
            <div>
              <textarea value={essayText} />
              <button onClick={() => setIsEditing(!isEditing)}>Start Over</button>
            </div>
            :
            <div>
              <div dangerouslySetInnerHTML={{__html: essayText}}></div>
              <button tabIndex="5" onClick={() => setIsEditing(!isEditing)}>Edit</button>
            </div>
          }
        </div>
      </Right>
    </>
  );
}

const Pane = styled.div`
  flex: 1;
`;

const Left = styled(Pane)`
  height: 100vh;
`;

const Right = styled(Pane)`
  background-color: #ffffff;
`;

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);
