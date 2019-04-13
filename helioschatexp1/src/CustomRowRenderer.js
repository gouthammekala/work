import { Row } from 'react-data-grid'
import React from 'react'

class CustomRow extends Row {
  render(...args) {
      console.log('arge');
    const superElement = Row.prototype.render.apply(this, args)
    const style = {
      height: this.getRowHeight(this.props),
      overflow: 'hidden'
    }
   // clone the element returned by the superclass (Row)
   // and override its style with one without `contain: 'layout'`
    return React.cloneElement(superElement, { style })
  }
}

export default class CustomRowRenderer extends React.Component {
  setScrollLeft = (scrollBy) => {
    this.row.setScrollLeft(scrollBy);
  }

  render() {
    // using my custom row
    return <CustomRow ref={node => this.row = node} {...this.props} />
  }
}