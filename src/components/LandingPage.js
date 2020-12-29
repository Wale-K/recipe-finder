import React from "react";
import styled from "styled-components";
import { colourPalette, rightArrow } from "../utilities";

const Section = styled.div`
  display: ${(props) => props.toggleDisplay};
  flex-direction: column;

  svg {
    width: 10vw;
    height: 5vh;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  padding-top: 10vh;
  color: ${colourPalette.primary};
`;

const LandingPageContainer = styled.div`
  display: ${(props) => props.toggleDisplay};
  background-color: ${colourPalette.background};
  height: 90vh;
  padding: 2rem;
  span {
    :hover {
      cursor: pointer;
    }
  }
`;

export class LandingPage extends React.Component {
  state = {
    userName: "",
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
        <Section toggleDisplay={this.state.introDisplay ? "flex" : "none"}>
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
            value={this.state.userName}
            onChange={this.handleChangeUserName.bind(this)}
          />
          <button onClick={this.handleToggleDisplay}>That's my name!</button>
          <button onClick={this.revertBackAPage}>Back</button>
        </Section>
        <Section toggleDisplay={this.state.endDisplay ? "flex" : "none"}>
          <p>Your name is "{this.state.userName}"? That's a cool name!</p>
          <button onClick={this.revertBackAPage}>Back</button>
        </Section>
      </LandingPageContainer>
    );
  }
}
