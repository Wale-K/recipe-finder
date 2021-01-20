import React from "react";
import styled from "styled-components";
import { colourPalette } from "../utilities";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const Line = styled.div`
  width: 95%;
  height: 2px;
  background-color: ${colourPalette.darkOrange};
  margin: 0 auto;
`;

const Left = styled.div`
  width: 100%;
`;

const Right = styled.div`
  display: none;
`;

const AllRecipesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  transition: 0.5s;
`;

const RecipeTitleWithImage = styled.div`
  display: flex;
  flex-direction: column;

  width: 80vw;
  margin: 1rem 0;
  transition: 0.5s;

  p {
    /* font-size: x-large;
    font-weight: bolder; */
  }

  :hover {
    cursor: pointer;
    color: ${colourPalette.primaryText};
    text-decoration: underline;
  }
`;

const CurrentRecipeTitleWithImage = styled.div`
  display: flex;
  flex-direction: column;
  transition: 0.5s;
  width: 80vw;
  margin: 1rem 0;

  img {
    margin: 0 auto;
  }

  p {
    font-size: x-large;
    font-weight: bolder;
    color: ${colourPalette.darkOrange};
  }
`;

const CookingMethodDiv = styled.div`
  line-height: 2rem;
`;

const CurrentRecipeContainer = styled.div`
  display: ${(props) => props.display};
  word-wrap: break-word;
  width: 100%;
  color: ${colourPalette.darkBlue};
  img {
    width: calc(100vw - 4rem);
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
      width: 50%;
      margin: 0 1rem;
    }

    ${Right} {
      display: flex;
      flex-wrap: wrap;

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
        <button onClick={props.backToRecipes}>Back to search</button>
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
              return <p key={ingredient.title}>{ingredient.original}</p>;
            })
          : ""}

        <Line />
        <p>Cooking Method:</p>
        <CookingMethodDiv>
          {ReactHtmlParser(props.currentRecipe.summary)}
        </CookingMethodDiv>
      </Left>
      <Right>
        <AllRecipesContainer>
          {props.allRecipes.map((recipe) => {
            if (recipe.id !== props.currentRecipe.id) {
              return (
                <RecipeTitleWithImage
                  width="10vw"
                  onClick={() => props.getRecipeById(recipe.id)}
                  key={recipe.title}
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

// props.currentRecipe.summary &&
//     document.write(props.currentRecipe.summary)

// use regex to strip the html tags and then render the strings as <p> tags instead?
