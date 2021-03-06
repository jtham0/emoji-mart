import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import NimbleEmoji from './emoji/nimble-emoji'

export default class NotFound extends React.PureComponent {
  render() {
    const {
      data,
      emojiProps,
      i18n,
      notFound,
      notFoundEmoji,
      className,
      labelClassName,
    } = this.props

    const component = (notFound && notFound()) || (
      <div className={classNames('emoji-mart-no-results', className)}>
        {NimbleEmoji({
          data: data,
          ...emojiProps,
          size: 38,
          emoji: notFoundEmoji,
          onOver: null,
          onLeave: null,
          onClick: null,
        })}
        <div
          className={classNames('emoji-mart-no-results-label', labelClassName)}
        >
          {i18n.notfound}
        </div>
      </div>
    )

    return component
  }
}

NotFound.propTypes /* remove-proptypes */ = {
  notFound: PropTypes.func.isRequired,
  emojiProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
}

NotFound.defaultProps = {
  className: '',
  labelClassName: '',
}
