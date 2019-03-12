import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Anchors extends React.PureComponent {
  constructor(props) {
    super(props)

    let defaultCategory = props.categories.filter(
      (category) => category.first,
    )[0]

    this.state = {
      selected: defaultCategory.name,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    var index = e.currentTarget.getAttribute('data-index')
    var { categories, onAnchorClick } = this.props

    onAnchorClick(categories[index], index)
  }

  render() {
    var {
        categories,
        color,
        i18n,
        icons,
        className,
        anchorClassName,
      } = this.props,
      { selected } = this.state

    return (
      <div className={classNames('emoji-mart-anchors', className)}>
        {categories.map((category, i) => {
          var { id, name, anchor } = category,
            isSelected = name == selected

          if (anchor === false) {
            return null
          }

          return (
            <span
              key={id}
              title={i18n.categories[id]}
              data-index={i}
              onClick={this.handleClick}
              className={classNames(
                `emoji-mart-anchor ${
                  isSelected ? 'emoji-mart-anchor-selected' : ''
                }`,
                anchorClassName,
              )}
              style={{ color: isSelected ? color : null }}
            >
              <div className="emoji-mart-anchor-icon">
                {icons.categories[id]()}
              </div>
              <span
                className="emoji-mart-anchor-bar"
                style={{ backgroundColor: color }}
              />
            </span>
          )
        })}
      </div>
    )
  }
}

Anchors.propTypes /* remove-proptypes */ = {
  categories: PropTypes.array,
  onAnchorClick: PropTypes.func,
  icons: PropTypes.object,
  className: PropTypes.string,
  anchorClassName: PropTypes.string,
}

Anchors.defaultProps = {
  categories: [],
  onAnchorClick: () => {},
  icons: {},
  className: '',
  anchorClassName: '',
}
