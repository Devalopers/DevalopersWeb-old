import React, { Component } from 'react'
import DropdownHelper from './DropDownHelper'

class DropDown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: ''
    }
  }
  render () {
    const defaultOption = this.state.selected
    const placeHolderValue = typeof this.props.placeholder === 'string' ? this.props.placeholder : "Select an option"
    return (
      <section>
        <DropdownHelper options={this.props.options} name={this.props.name} onChange={this.props.onSelect} value={defaultOption} placeholder={placeHolderValue} />
      </section>
    )
  }
}

export default DropDown
