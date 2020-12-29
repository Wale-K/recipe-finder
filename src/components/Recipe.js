import React from "react";
import styled from "styled-components";

const RecipeContainer = styled.div`
  display: ${(props) => props.toggleDisplay};
  height: 100vh;
`;

export const Recipe = (props) => {
  return (
    <RecipeContainer toggleDisplay={props.displayRecipe ? "flex" : "none"}>
      <p onClick={props.skipInstructions}>
        Need a brief refresher? Click here to go back to the instructions.
      </p>
    </RecipeContainer>
  );
};
