import React from "react";
import styled from "styled-components";
import { colourPalette } from "../utilities";

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colourPalette.primaryText};
`;

const Left = styled.div`
  img {
    width: 100%;
  }
`;

const Right = styled.div`
  display: none;
`;

const AllRecipesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const RecipeTitleWithImage = styled.div`
  display: flex;
  flex-direction: column;

  width: 80vw;
  margin: 1rem 0;

  p {
    font-size: x-large;
    font-weight: bolder;
    color: ${colourPalette.primaryText};
  }
`;

const CurrentRecipeTitleWithImage = styled.div`
  display: flex;
  flex-direction: column;

  width: 80vw;
  margin: 1rem 0;

  p {
    font-size: x-large;
    font-weight: bolder;
    color: ${colourPalette.primaryText};
  }
`;

const CurrentRecipeContainer = styled.div`
  display: ${(props) => props.display};

  width: 100%;

  img {
    width: 80vw;
    margin: 0 auto;
  }

  @media only screen and (min-width: 768px) {
    ${RecipeTitleWithImage} {
      width: 10vw;
      margin: 1rem;
      img {
        width: 100%;
      }
    }

    ${CurrentRecipeTitleWithImage} {
      width: 30vw;
      img {
        width: 100%;
      }
    }

    ${Left} {
      border: solid 10px black;
      width: 50%;
      margin: 0 1rem;
    }

    ${Right} {
      display: flex;
      flex-wrap: wrap;
      border: solid 10px black;
      width: 50%;
      margin: 0 1rem;
    }
  }
`;

export const CurrentRecipePage = (props) => {
  return (
    <CurrentRecipeContainer
      display={props.displayCurrentRecipe ? "flex" : "none"}
    >
      <Left>
        <button onClick={props.backToRecipes}>Back to recipes</button>
        <CurrentRecipeTitleWithImage width="30vw">
          <p>{props.currentRecipe.title}</p>
          <img
            src={props.currentRecipe.image}
            alt={props.currentRecipe.title}
          />
        </CurrentRecipeTitleWithImage>
        <p>Cooking Time: {props.currentRecipe.readyInMinutes} minutes</p>
        <p>Servings: {props.currentRecipe.servings}</p>
        <Line />
        <p>You'll need:</p>
        {props.currentRecipe.extendedIngredients
          ? props.currentRecipe.extendedIngredients.map((ingredient) => {
              return <p>{ingredient.original}</p>;
            })
          : ""}

        <Line />
        <p>Cooking Method:</p>
        {props.currentRecipe.summary}
      </Left>
      <Right>
        <AllRecipesContainer>
          {props.allRecipes.map((recipe) => {
            if (props.currentRecipe !== 2) {
              return (
                <RecipeTitleWithImage
                  width="10vw"
                  onClick={() => this.handleGetRecipeById(recipe.id)}
                >
                  <img src={recipe.image} alt={recipe.title} />
                  <p>{recipe.title}</p>
                </RecipeTitleWithImage>
              );
            }
          })}
        </AllRecipesContainer>
      </Right>
    </CurrentRecipeContainer>
  );
};

/* {props.currentRecipe.summary &&
        document.write(props.currentRecipe.summary)} */
