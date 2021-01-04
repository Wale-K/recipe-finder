import React from "react";
import styled from "styled-components";
import { colourPalette } from "../utilities";

const CurrentRecipeContainer = styled.div`
  display: ${(props) => props.display};
  flex-direction: column;

  img {
    width: 80vw;
    margin: 0 auto;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colourPalette.primaryText};
`;

const RecipeTitleWithImage = styled.div`
  display: flex;
  flex-direction: column;

  width: 80vw;
  margin: 1rem 0;
  img {
    width: 100%;
  }
  p {
    font-size: x-large;
    font-weight: bolder;
    color: ${colourPalette.primaryText};
  }
`;

export const CurrentRecipePage = (props) => {
  return (
    <CurrentRecipeContainer
      display={props.displayCurrentRecipe ? "flex" : "none"}
    >
      <button onClick={props.backToRecipes}>Back to recipes</button>
      <RecipeTitleWithImage>
        <p>{props.currentRecipe.title}</p>
        <img src={props.currentRecipe.image} alt={props.currentRecipe.title} />
      </RecipeTitleWithImage>
      <p>Cooking Time: {props.currentRecipe.readyInMinutes} minutes</p>
      <p>Servings: {props.currentRecipe.servings}</p>
      <Line />
      <p>You'll need:</p>
      {props.currentRecipe.extendedIngredients
        ? props.currentRecipe.extendedIngredients.map((ingredient) => {
            return <p>{ingredient.original}</p>;
          })
        : ""}
      {/* {props.currentRecipe.summary &&
        document.write(props.currentRecipe.summary)} */}
      <Line />
      <p>Cooking Method:</p>
      {props.currentRecipe.summary}
    </CurrentRecipeContainer>
  );
};
