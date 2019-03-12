import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Skins from './skins'

export default class SkinsDot extends Skins {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    const {
      skin,
      i18n,
      skinToneClassName,
      skinToneContainerClassName,
    } = this.props
    const { opened } = this.state
    const skinToneNodes = []

    for (let skinTone = 1; skinTone <= 6; skinTone++) {
      const selected = skinTone === skin
      skinToneNodes.push(
        <span
          key={`skin-tone-${skinTone}`}
          className={classNames(
            `emoji-mart-skin-swatch${selected ? ' selected' : ''}`,
            skinToneClassName,
          )}
        >
          <span
            onClick={this.handleClick}
            data-skin={skinTone}
            className={`emoji-mart-skin emoji-mart-skin-tone-${skinTone}`}
          />
        </span>,
      )
    }

    return (
      <div
        className={classNames(
          `emoji-mart-skin-swatches${opened ? ' opened' : ''}`,
          skinToneContainerClassName,
        )}
      >
        {skinToneNodes}
      </div>
    )
  }
}

SkinsDot.propTypes /* remove-proptypes */ = {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  i18n: PropTypes.object,
  skinToneClassName: PropTypes.string,
  skinToneContainerClassName: PropTypes.string,
}

SkinsDot.defaultProps = {
  onChange: () => {},
  skinToneClassName: '',
  skinToneContainerClassName: '',
}
