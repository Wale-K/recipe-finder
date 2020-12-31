import React from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { Recipe } from "./components/Recipe";

class App extends React.Component {
  state = {
    displayLandingPage: false,
    displayRecipe: true,
    allIngredients: [
      { ingredientName: "Chocolate" },
      { ingredientName: "Flour" },
      { ingredientName: "Eggs" },
    ],
  };

  handleSkipInstructions = () => {
    this.setState((prevState) => {
      return {
        displayLandingPage: !prevState.displayLandingPage,
        displayRecipe: !prevState.displayRecipe,
      };
    });
  };

  // handleAddIngredient = () => {
  //   this.state.ingredients.push("");
  //   console.log(this.state.ingredients.length);
  // };

  render() {
    return (
      <>
        <LandingPage
          displayLandingPage={this.state.displayLandingPage}
          skipInstructions={this.handleSkipInstructions}
        />
        <Recipe
          displayRecipe={this.state.displayRecipe}
          skipInstructions={this.handleSkipInstructions}
        />
      </>
    );
  }
}

export default App;
