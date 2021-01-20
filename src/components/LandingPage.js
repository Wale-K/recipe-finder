import React from "react";
import styled from "styled-components";
import { colourPalette, rightArrow, leftArrow } from "../utilities";

const Section = styled.div`
  display: ${(props) => props.toggleDisplay};
  flex-direction: column;
  justify-content: space-between;
  margin: ${(props) => props.margin};
  padding: 2rem;
  height: calc(70vh - 4rem);

  svg {
    width: 10vw;
    height: 5vh;
    align-self: ${(props) => props.align};
    color: ${colourPalette.darkOrange};
  }

  input {
    width: 80vw;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  color: ${colourPalette.darkOrange};
`;

const Arrows = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LandingPageContainer = styled.div`
  display: ${(props) => props.toggleDisplay};
  color: ${colourPalette.darkBlue};

  input {
    color: ${colourPalette.darkBlue};
    background-color: white;
  }

  flex-direction: column;
  background-color: ${colourPalette.lightBlue};

  span {
    color: ${colourPalette.bluey};
    :hover {
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 768px) {
    ${Section} {
      padding: 4rem;
      height: calc(70vh - 8rem);
      width: 50vw;
    }

    input {
      width: 40vw;
    }
  }
`;

export class LandingPage extends React.Component {
  state = {
    userName: "",
    introDisplay: true,
  };

  handleToggleDisplay = () => {
    this.setState((prevState) => {
      return {
        introDisplay: !prevState.introDisplay,
      };
    });
  };

  revertBackAPage = () => {
    this.setState((prevState) => {
      return {
        introDisplay: !prevState.introDisplay,
      };
    });
  };

  handleChangeUserName(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  render() {
    return (
      <LandingPageContainer
        toggleDisplay={this.props.displayLandingPage ? "flex" : "none"}
      >
        <Section
          toggleDisplay={this.state.introDisplay ? "flex" : "none"}
          align="flex-end"
          background="linear-gradient(30deg, #465e4f, #384b3f)"
        >
          <Title>Recipe Finder</Title>
          <p>Hello Chef!</p>
          <p>
            If you're looking for some inspiration for your next meal then
            you've come to the right place.
          </p>
          <p>
            Visted this page before?{" "}
            <span onClick={this.props.skipInstructions}>
              Click here to skip the instructions.
            </span>
          </p>
          <p>Otherwise, lets start by finding out your name.</p>
          <input
            placeholder="What's your name?"
            value={this.state.userName}
            onChange={this.handleChangeUserName.bind(this)}
          />
          <svg onClick={this.handleToggleDisplay}>{rightArrow}</svg>
        </Section>

        <Section toggleDisplay={this.state.introDisplay ? "none" : "flex"}>
          {this.state.userName && (
            <p>Your name is "{this.state.userName}"? That's a cool name!</p>
          )}
          <p>
            Well {this.state.userName ? this.state.userName : "Chef"}, to use
            this site all you need to do is enter your ingredients in the input
            fields on the next page. Please seperate your ingredients with
            commas. There's an exmple you can see on the next page.
          </p>
          <p>
            Once you do that click search and you'll be shown some recipes if
            there are any matches.
          </p>
          <p>
            If that all makes sense and you're ready to search, you can go to
            the next page!
          </p>
          <Arrows>
            <svg onClick={this.revertBackAPage}>{leftArrow}</svg>
            <svg onClick={this.props.skipInstructions}>{rightArrow}</svg>
          </Arrows>
        </Section>
      </LandingPageContainer>
    );
  }
}

// Add a banner of pictures of food to the pages?
