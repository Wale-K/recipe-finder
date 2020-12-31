import React from "react";
import styled from "styled-components";
import { colourPalette } from "../utilities";
import axios from "axios";

const RecipeContainer = styled.div`
  display: ${(props) => props.toggleDisplay};
  flex-direction: column;
  height: 100vh;
  background-color: ${colourPalette.primary};
  height: 100vh;
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
    allIngredients: "ham",
    allRecipes: [],
  };

  handleUpdateIngredients(event) {
    this.setState({
      allIngredients: event.target.value,
    });
  }

  test = () => {
    if (this.state.allIngredients !== null) {
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=a65ef70f2e914cbe86de0f39212ff030&ingredients=${this.state.allIngredients}`
        )
        .then((response) => {
          this.setState({
            allRecipes: response.data,
          });
        });
    }
  };

  render() {
    console.log(this.state.allRecipes);
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
          />

          <button onClick={this.test}>Use these ingredients!</button>
        </div>
        {this.state.allRecipes.map((recipe) => {
          return <p>{recipe.title}</p>;
        })}
      </RecipeContainer>
    );
  }
}
