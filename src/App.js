import React from "react";
import "./App.css";
import styled from "styled-components";
import { LandingPage } from "./components/LandingPage";
import { RecipesPage } from "./components/RecipesPage";
import food from "./images/food.jpeg";
import foodie from "./images/foodie.jpeg";

const PictureBanner = styled.div`
  background-image: url(${(props) => props.image});
  height: 15vh;
  background-size: 100% 100%;

  @media only screen and (min-width: 768px) {
    height: 30vh;
    display: ${(props) => props.display};
  }
`;

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
        <PictureBanner image={foodie} />
        <LandingPage
          displayLandingPage={this.state.displayLandingPage}
          skipInstructions={this.handleSkipInstructions}
        />
        <RecipesPage
          displayRecipe={this.state.displayRecipe}
          skipInstructions={this.handleSkipInstructions}
        />
        <PictureBanner image={food} display="none" />
      </>
    );
  }
}

export default App;
