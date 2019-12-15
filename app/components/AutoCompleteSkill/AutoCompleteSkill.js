import React from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import styled from 'styled-components';
import axios from 'axios';
import { BASE_URL } from '../../config/config.js';

export default class SkillSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsData: [],
      filteredSkillsMultiple: null,
      skills: [],
    };
    axios.get(`${BASE_URL}/admin/ViewSkill`).then(resp => {
      resp.data.data.forEach(skill => {
        this.state.skillsData.push({ name: skill.SkillName });
      });
    });

    this.filterSkillMultiple = this.filterSkillMultiple.bind(this);
  }

  filterSkillMultiple(event) {
    setTimeout(() => {
      const results = this.state.skillsData.filter(skill =>
        skill.name.toLowerCase().startsWith(event.query.toLowerCase()),
      );
      this.setState({ filteredSkillsMultiple: results });
    }, 250);
  }

  render() {
    return (
      <div>
        <PrimereactStyle />
        <SelectStyleWrapper values={this.state.skills.length}>
          <AutoComplete
            value={this.state.skills}
            suggestions={this.state.filteredSkillsMultiple}
            completeMethod={this.filterSkillMultiple}
            minLength={1}
            placeholder={this.state.skills.length == 0 ? 'Skills' : null}
            field="name"
            multiple
            onChange={e => this.setState({ skills: e.value })}
            onSelect={this.props.onSelect}
            onUnselect={this.props.onUnSelect}
          />
        </SelectStyleWrapper>
      </div>
    );
  }
}

const SelectStyleWrapper = styled.div`
  .p-autocomplete.p-autocomplete-multiple
    .p-autocomplete-multiple-container:not(.p-disabled) {
    border-color: #a6a6a6;
    width: 100%;
    min-height: 50px;
    padding: 10px 0 0 0;
    border-style: solid;
    border-width: 1px;
    outline: none;
    border-radius: 30px;
    margin-bottom: 30px;
  }
  .p-autocomplete.p-component.p-autocomplete-multiple.p-inputwrapper-filled {
    width: 100%;
  }
  .p-autocomplete.p-autocomplete-multiple
    .p-autocomplete-multiple-container
    .p-autocomplete-input-token {
    ${'' /* padding:${props => (props.values?`15px 0px`:`15px 25px`)};  */}
    padding:0px 25px;
  }
  .p-autocomplete.p-autocomplete-multiple
    .p-autocomplete-multiple-container
    .p-autocomplete-token {
    margin: 5px 0.286em 0px 15px;
    font-size: 15px;
    border-radius: 10px;
  }
  .p-autocomplete-items .p-autocomplete-list .p-component .p-reset {
    ${'' /* background-color: red; */}
  }
  .p-autocomplete .p-autocomplete-panel {
    min-width: 45%;
    border-radius: 20px;
  }
`;
