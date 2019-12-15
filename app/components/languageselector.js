import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormItem from './formitem';
export default class Language extends React.Component {
  constructor() {
    super();
    this.state = {
      nbOfLanguages: 1,
      languages: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.incrementNbOfLanguages = this.incrementNbOfLanguages.bind(this);
    this.decrementNbOfLanguages = this.decrementNbOfLanguages.bind(this);
  }

  componentDidMount() {
    const counter = this.props.value.length || 1;
    this.setState({
      nbOfLanguages: counter,
      languages: this.props.value,
    });
  }

  handleChange = e => {
    const { languages } = this.state;
    const currentState = languages;
    const { name, value } = e.target;
    const { index } = e.target.dataset;
    if (!currentState[index]) currentState[index] = {};
    currentState[index][name] = value;
    this.props.handleChange(currentState);
    this.setState({ languages: currentState });
  };

  handleDelete = e => {
    const { languages } = this.state;
    const currentState = languages;
    const { index } = e.target.dataset;
    currentState.splice(index, 1);
    this.props.handleChange(currentState);
    this.decrementNbOfLanguages();
    this.setState({ languages: currentState });
  };

  incrementNbOfLanguages() {
    let { nbOfLanguages } = this.state;
    nbOfLanguages += 1;
    this.setState({
      nbOfLanguages,
    });
  }

  decrementNbOfLanguages() {
    let { nbOfLanguages } = this.state;
    if (nbOfLanguages === 1) return;
    nbOfLanguages -= 1;
    this.setState({
      nbOfLanguages,
    });
  }

  render() {
    const languages = [];
    for (let i = 0; i < this.state.nbOfLanguages; i += 1)
      languages.push(
        <React.Fragment key={i}>
          <div className="col-sm-6">
            <FormItem>
              <select
                data-index={i}
                name="name"
                onChange={this.handleChange}
                value={
                  this.state.languages[i] && this.state.languages[i].name
                    ? this.state.languages[i].name
                    : ''
                }
                required
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
            </FormItem>
          </div>
          <div className="col-sm-5">
            <FormItem>
              <select
                name="level"
                data-index={i}
                onChange={this.handleChange}
                required
                value={
                  this.state.languages[i] && this.state.languages[i].level
                    ? this.state.languages[i].level
                    : ''
                }
              >
                <option value="">Select Level</option>
                <option value="Fluent">Fluent</option>
                <option value="Good">Good</option>
                <option value="Bad">Bad</option>
              </select>
            </FormItem>
          </div>
          <div className="col-sm-1">
            <RemoveButtonStyleWrapper
              type="button"
              data-index={i}
              onClick={this.handleDelete}
            >
              &times;
            </RemoveButtonStyleWrapper>
          </div>
        </React.Fragment>,
      );
    return (
      <div className="row">
        {languages}
        <div className="col-12">
          <button
            type="button"
            style={buttonStyle}
            onClick={this.incrementNbOfLanguages}
          >
            Add language
          </button>
        </div>
      </div>
    );
  }
}

const buttonStyle = {
  backgroundColor: 'none',
  width: '100%',
  border: 'none',
  borderRadius: '50px',
  padding: '1rem 2rem',
  margin: '0',
  textDecoration: 'none',
  background: '#1583e9',
  color: '#ffffff',
  fontFamily: 'sans-serif',
  fontSize: '1rem',
  lineHeight: '1',
  outline: 'none',
};

const RemoveButtonStyleWrapper = styled.button`
  min-width: 100%;
  text-align: center;
  margin-top: -3px;
  background-color: inherit;
  border: none;
  color: #f44336;
  border-radius: 50px;
  text-decoration: none;
  font-size: 2.2em;
  cursor: pointer;
  outline: 0;
  :focus {
    outline: 0;
  }
  @media (max-width: 576px) {
    margin-top: -15px;
    margin-bottom: 10px;
  }
`;

Language.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.any,
};
