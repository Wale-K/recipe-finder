import React from "react";
import styled from "styled-components";
import { colourPalette } from "../utilities";
import { CurrentRecipePage } from "./CurrentRecipePage";
import axios from "axios";
import food from "../images/food.jpeg";
import foodie from "../images/foodie.jpeg";

const AllRecipesContainer = styled.div`
  display: ${(props) => props.display};
  flex-wrap: wrap;
  justify-content: center;
`;

const PictureBanner = styled.div`
  background-image: url(${(props) => props.image});
  height: 25vh;
  background-size: 100% 100%;
`;

const InputAndSubmit = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    height: 2rem;
    width: 4rem;
    align-self: flex-start;
    margin: 0.5rem;
  }
`;

const CreateRemoveInputs = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin: 0.5rem;
  }
`;

const RecipeTitleWithImage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: ${colourPalette.darkBlue};
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
      color: ${colourPalette.darkOrange};
    }
  }
`;

const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  input {
    margin: 0.5rem;
  }
`;

const IngredientsSearchDiv = styled.div`
  display: ${(props) => props.display};
  flex-direction: column;
`;

const RecipesPageContainer = styled.div`
  display: ${(props) => props.toggleDisplay};
  flex-direction: column;
  background-color: ${colourPalette.lightBlue};
  height: calc(70vh - 4rem);
  overflow: scroll;
  padding: 2rem;

  span {
    color: ${colourPalette.bluey};
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
    allIngredients: [""],
    allRecipes: [],
    currentRecipe: {},
    displayCurrentRecipe: false,
  };

  handleUpdateIngredients = (event, index) => {
    this.setState((prevState) => {
      prevState.allIngredients[index] = event.target.value;
      return {
        allIngredients: prevState.allIngredients,
      };
    });
  };

  handleGetRecipes = () => {
    let noEmptyIngredients = true;
    for (let i = 0; i < this.state.allIngredients.length; i++) {
      if (this.state.allIngredients[i] === "") {
        noEmptyIngredients = false;
      }
    }

    if (this.state.allIngredients !== null && noEmptyIngredients) {
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=a65ef70f2e914cbe86de0f39212ff030&number=12&ingredients=${this.state.allIngredients.join(
            ","
          )}`
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

  handleCreateNewInput = () => {
    this.setState((prevState) => {
      if (
        prevState.allIngredients[prevState.allIngredients.length - 1] !== ""
      ) {
        return {
          allIngredients: [...prevState.allIngredients, ""],
        };
      }
    });
  };

  handleRemoveInput = () => {
    if (this.state.allIngredients.length > 1) {
      this.setState((prevState) => {
        prevState.allIngredients.pop();
        return { allIngredients: [...prevState.allIngredients] };
      });
    }
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
          <InputAndSubmit>
            <InputsDiv>
              {this.state.allIngredients.map((ingredient, index) => {
                return (
                  <input
                    value={ingredient}
                    onChange={(event) => {
                      this.handleUpdateIngredients(event, index);
                    }}
                    placeholder={`Ingredient ${index + 1}`}
                  />
                );
              })}
            </InputsDiv>
            <button onClick={this.handleGetRecipes}>GO!</button>
          </InputAndSubmit>
          <CreateRemoveInputs>
            <button onClick={this.handleRemoveInput}>-</button>
            <button onClick={this.handleCreateNewInput}>+</button>
          </CreateRemoveInputs>
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
