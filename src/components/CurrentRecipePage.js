import React from "react";
import styled from "styled-components";

const CurrentRecipeContainer = styled.div`
  display: ${(props) => props.display};
  flex-direction: column;
`;

export const CurrentRecipePage = (props) => {
  return (
    <CurrentRecipeContainer
      display={props.displayCurrentRecipe ? "flex" : "none"}
    >
      {props.currentRecipe.title}
      <button onClick={props.backToRecipes}>Back to recipes</button>
      <p>You'll need:</p>
      {props.currentRecipe.extendedIngredients
        ? props.currentRecipe.extendedIngredients.map((ingredient) => {
            return <p>{ingredient.original}</p>;
          })
        : ""}
    </CurrentRecipeContainer>
  );
};
