import React from "react";
import styled from "styled-components";
import { colourPalette } from "../utilities";
import axios from "axios";

const AllRecipesContainer = styled.div`
  display: ${(props) => props.display};
`;

const CurrentRecipeContainer = styled.div`
  display: ${(props) => props.display};
  flex-direction: column;
`;

const RecipeContainer = styled.div`
  display: ${(props) => props.toggleDisplay};
  flex-direction: column;
  background-color: ${colourPalette.primary};
  min-height: 100vh;
  padding: 2rem;

  span {
    color: blue;
    :hover {
      cursor: pointer;
    }
  }
`;

export class Recipe extends React.Component {
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
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=a65ef70f2e914cbe86de0f39212ff030&ingredients=${this.state.allIngredients}`
        )
        .then((response) => {
          this.setState({
            allRecipes: response.data,
            displayCurrentRecipe: false,
          });
        });
    }
  };

  handleRenderRecipe = (index) => {
    this.setState({
      currentRecipe: this.state.allRecipes[index],
      displayCurrentRecipe: true,
    });
    console.log(this.state.allRecipes);
  };

  handleBackToRecipes = () => {
    this.setState({
      displayCurrentRecipe: false,
    });
  };

  render() {
    return (
      <RecipeContainer
        toggleDisplay={this.props.displayRecipe ? "flex" : "none"}
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
        {this.state.allRecipes.map((recipe, index) => {
          return (
            <AllRecipesContainer
              display={this.state.displayCurrentRecipe ? "none" : "flex"}
              onClick={() => this.handleRenderRecipe(index)}
            >
              <p>{recipe.title}</p>
              {/* <img src={recipe.image} alt={recipe.title} /> */}
            </AllRecipesContainer>
          );
        })}
        <CurrentRecipeContainer
          display={this.state.displayCurrentRecipe ? "flex" : "none"}
        >
          {this.state.currentRecipe.title}
          <button onClick={this.handleBackToRecipes}>Back to recipes</button>
          <p>You'll need:</p>
          {this.state.currentRecipe.missedIngredients
            ? this.state.currentRecipe.missedIngredients.map((ingredient) => {
                return <p>{ingredient.original}</p>;
              })
            : ""}
          {this.state.currentRecipe.usedIngredients
            ? this.state.currentRecipe.usedIngredients.map((ingredient) => {
                return <p>{ingredient.original}</p>;
              })
            : ""}
        </CurrentRecipeContainer>
      </RecipeContainer>
    );
  }
}
