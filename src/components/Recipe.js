import React from "react";
import styled from "styled-components";
import { colourPalette } from "../utilities";

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
    allIngredients: [
      { ingredientName: "Chocolate" },
      { ingredientName: "Flour" },
      { ingredientName: "Eggs" },
    ],
  };

  handleUpdateIngredient(event, index) {
    this.setState((prevState) => {
      return {
        allIngredients: [
          ...prevState.allIngredients,
          (prevState.allIngredients[index].ingredientName = event),
        ],
      };
    });
  }

  render() {
    return (
      <RecipeContainer
        toggleDisplay={this.props.displayRecipe ? "flex" : "none"}
      >
        <span onClick={this.props.skipInstructions}>
          Need a brief refresher? Click here to go back to the instructions.
        </span>
        <div>
          {this.state.allIngredients.map((ingredient, index) => {
            return (
              <input
                key={ingredient.ingredientName}
                value={ingredient.ingredientName}
                onChange={() => this.handleUpdateIngredient.bind(this)}
              />
            );
          })}
          <button>Use these ingredients!</button>
        </div>
      </RecipeContainer>
    );
  }
}
