import React from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { Recipe } from "./components/Recipe";

class App extends React.Component {
  state = {
    displayLandingPage: true,
    displayRecipe: false,
  };

  handleSkipInstructions = () => {
    this.setState((prevState) => {
      return {
        displayLandingPage: !prevState.displayLandingPage,
        displayRecipe: !prevState.displayRecipe,
      };
    });
  };

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
