import React from "react";
import styled from "styled-components";
import { colourPalette } from "../utilities";
import { CurrentRecipePage } from "./CurrentRecipePage";
import axios from "axios";

const AllRecipesContainer = styled.div`
  display: ${(props) => props.display};
  flex-wrap: wrap;
  justify-content: center;
`;

const RecipeTitleWithImage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colourPalette.background};

  width: 60vw;
  margin: 1rem;
  img {
    width: 100%;
  }
  p {
    padding: 1rem;
    font-weight: bolder;
  }
  :hover {
    cursor: pointer;
    p {
      text-decoration: underline;
      color: ${colourPalette.primaryText};
    }
  }
`;

const IngredientsSearchDiv = styled.div`
  display: ${(props) => props.display};
  flex-direction: column;
`;

const RecipesPageContainer = styled.div`
  display: ${(props) => props.toggleDisplay};
  flex-direction: column;
  background-color: ${colourPalette.highlight};
  min-height: 100vh;
  padding: 2rem;

  span {
    color: ${colourPalette.secondaryText};
    margin-bottom: 2rem;
    :hover {
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 768px) {
    ${RecipeTitleWithImage} {
      width: 20vw;
    }
  }
`;

export class RecipesPage extends React.Component {
  state = {
    allIngredients: "",
    allRecipes: [],
    currentRecipe: {},
    displayCurrentRecipe: false,
  };

  handleUpdateIngredients(event) {
    this.setState({
      allIngredients: event.target.value,
    });
  }

  handleGetRecipes = () => {
    if (this.state.allIngredients !== null) {
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=a65ef70f2e914cbe86de0f39212ff030&number=12&ingredients=${this.state.allIngredients}`
        )
        .then((response) => {
          this.setState({
            allRecipes: response.data,
            displayCurrentRecipe: false,
          });
        });
    }
  };

  handleGetRecipeById = (recipeId) => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a65ef70f2e914cbe86de0f39212ff030&includeNutrition=true.`
      )
      .then((response) => {
        this.setState({
          currentRecipe: response.data,
          displayCurrentRecipe: true,
        });
      });
  };

  handleBackToRecipes = () => {
    this.setState({
      displayCurrentRecipe: false,
    });
  };

  render() {
    return (
      <RecipesPageContainer
        toggleDisplay={this.props.displayRecipe ? "flex" : "none"}
      >
        <IngredientsSearchDiv
          display={this.state.displayCurrentRecipe ? "none" : "flex"}
        >
          <span onClick={this.props.skipInstructions}>
            Need a brief refresher? Click here to go back to the instructions.
          </span>
          <div>
            <input
              value={this.state.allIngredients}
              onChange={this.handleUpdateIngredients.bind(this)}
              placeholder="Ham, Cheese"
            />
            <button onClick={this.handleGetRecipes}>
              Use these ingredients!
            </button>
          </div>
        </IngredientsSearchDiv>
        <AllRecipesContainer
          display={this.state.displayCurrentRecipe ? "none" : "flex"}
        >
          {this.state.allRecipes.map((recipe) => {
            return (
              <RecipeTitleWithImage
                onClick={() => this.handleGetRecipeById(recipe.id)}
              >
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.title}</p>
              </RecipeTitleWithImage>
            );
          })}
        </AllRecipesContainer>
        <CurrentRecipePage
          displayCurrentRecipe={this.state.displayCurrentRecipe}
          backToRecipes={this.handleBackToRecipes}
          currentRecipe={this.state.currentRecipe}
          allRecipes={this.state.allRecipes}
          getRecipeById={this.handleGetRecipeById}
        />
      </RecipesPageContainer>
    );
  }
}
