import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { getData } from '../utils'
import NimbleEmoji from './emoji/nimble-emoji'
import SkinsEmoji from './skins-emoji'
import SkinsDot from './skins-dot'

export default class Preview extends React.PureComponent {
  constructor(props) {
    super(props)

    this.data = props.data
    this.state = { emoji: null }
  }

  render() {
    var { emoji } = this.state,
      {
        emojiProps,
        skinsProps,
        showSkinTones,
        title,
        emoji: idleEmoji,
        i18n,
        showPreview,
        className,
        previewTitleClassName,
        previewShortNameClassName,
        skinToneClassName,
        skinToneContainerClassName,
      } = this.props

    if (emoji && showPreview) {
      var emojiData = getData(emoji, null, null, this.data),
        { emoticons = [] } = emojiData,
        knownEmoticons = [],
        listedEmoticons = []

      emoticons.forEach((emoticon) => {
        if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
          return
        }

        knownEmoticons.push(emoticon.toLowerCase())
        listedEmoticons.push(emoticon)
      })

      return (
        <div className={classNames('emoji-mart-preview', className)}>
          <div className="emoji-mart-preview-emoji">
            {NimbleEmoji({
              key: emoji.id,
              emoji: emoji,
              data: this.data,
              ...emojiProps,
            })}
          </div>

          <div className={'emoji-mart-preview-data'}>
            <div
              className={classNames(
                'emoji-mart-preview-name',
                previewTitleClassName,
              )}
            >
              {emoji.name}
            </div>
            <div className={'emoji-mart-preview-shortnames'}>
              {emojiData.short_names.map((short_name) => (
                <span
                  key={short_name}
                  className={
                    ('emoji-mart-preview-shortname', previewShortNameClassName)
                  }
                >
                  :{short_name}:
                </span>
              ))}
            </div>
            <div className="emoji-mart-preview-emoticons">
              {listedEmoticons.map((emoticon) => (
                <span key={emoticon} className="emoji-mart-preview-emoticon">
                  {emoticon}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="emoji-mart-preview">
          <div className="emoji-mart-preview-emoji">
            {idleEmoji &&
              idleEmoji.length &&
              NimbleEmoji({ emoji: idleEmoji, data: this.data, ...emojiProps })}
          </div>

          <div className="emoji-mart-preview-data">
            <span className="emoji-mart-title-label">{title}</span>
          </div>

          {showSkinTones && (
            <div
              className={`emoji-mart-preview-skins${
                skinsProps.skinEmoji ? ' custom' : ''
              }`}
            >
              {skinsProps.skinEmoji ? (
                <SkinsEmoji
                  skin={skinsProps.skin}
                  emojiProps={emojiProps}
                  data={this.data}
                  skinEmoji={skinsProps.skinEmoji}
                  i18n={i18n}
                  onChange={skinsProps.onChange}
                  skinToneClassName={skinToneClassName}
                  skinToneContainerClassName={skinToneContainerClassName}
                />
              ) : (
                <SkinsDot
                  skin={skinsProps.skin}
                  i18n={i18n}
                  onChange={skinsProps.onChange}
                  skinToneClassName={skinToneClassName}
                  skinToneContainerClassName={skinToneContainerClassName}
                />
              )}
            </div>
          )}
        </div>
      )
    }
  }
}

Preview.propTypes /* remove-proptypes */ = {
  showSkinTones: PropTypes.bool,
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  emojiProps: PropTypes.object.isRequired,
  skinsProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  previewTitleClassName: PropTypes.string,
  previewShortNameClassName: PropTypes.string,
  skinToneClassName: PropTypes.string,
  skinToneContainerClassName: PropTypes.string,
}

Preview.defaultProps = {
  showSkinTones: true,
  onChange: () => {},
  className: '',
  previewTitleClassName: '',
  previewShortNameClassName: '',
  skinToneClassName: '',
  skinToneContainerClassName: '',
}
