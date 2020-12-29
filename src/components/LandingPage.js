import React from "react";
import styled from "styled-components";
import { colourPalette, rightArrow, leftArrow } from "../utilities";

const Section = styled.div`
  display: ${(props) => props.toggleDisplay};
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  svg {
    width: 10vw;
    height: 5vh;
    align-self: ${(props) => props.align};
  }

  input {
    width: 80vw;
    margin-bottom: 2rem;
  }

  button {
  }
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;

  color: ${colourPalette.primary};
`;

const Arrows = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LandingPageContainer = styled.div`
  display: ${(props) => props.toggleDisplay};
  flex-direction: column;
  background-color: ${colourPalette.background};
  height: 90vh;
  padding: 2rem;
  span {
    color: blue;
    :hover {
      cursor: pointer;
    }
  }
  > div:first-child {
    margin-top: 10vh;
    background-color: pink;
  }
`;

export class LandingPage extends React.Component {
  state = {
    userName: "Wale",
    introDisplay: true,
    middleDisplay: false,
    endDisplay: false,
  };

  handleToggleDisplay = () => {
    this.setState((prevState) => {
      if (prevState.introDisplay === true) {
        return {
          introDisplay: false,
          middleDisplay: true,
        };
      } else if (
        prevState.middleDisplay === true &&
        this.state.userName !== ""
      ) {
        return {
          middleDisplay: false,
          endDisplay: true,
        };
      }
    });
  };

  revertBackAPage = () => {
    this.setState((prevState) => {
      if (prevState.middleDisplay === true) {
        return {
          introDisplay: true,
          middleDisplay: false,
          endDisplay: false,
        };
      } else if (prevState.endDisplay === true) {
        return {
          introDisplay: false,
          middleDisplay: true,
          endDisplay: false,
        };
      }
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
        <div />
        <Section
          toggleDisplay={this.state.introDisplay ? "flex" : "none"}
          align="flex-end"
        >
          <Title>Recipe Finder</Title>
          <p>Hello friend.</p>
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
          <svg onClick={this.handleToggleDisplay}>{rightArrow}</svg>
        </Section>
        <Section toggleDisplay={this.state.middleDisplay ? "flex" : "none"}>
          <input
            placeholder="What's your name?"
            value={this.state.userName}
            onChange={this.handleChangeUserName.bind(this)}
          />
          <Arrows>
            <svg onClick={this.revertBackAPage}>{leftArrow}</svg>
            <svg onClick={this.handleToggleDisplay}>{rightArrow}</svg>
          </Arrows>
        </Section>
        <Section toggleDisplay={this.state.endDisplay ? "flex" : "none"}>
          <p>Your name is "{this.state.userName}"? That's a cool name!</p>
          <p>
            Well {this.state.userName}, to use this site all you need to do is
            enter your ingredients in the input fields on the next page.
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
