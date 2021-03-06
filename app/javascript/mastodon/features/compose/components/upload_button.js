import React from 'react';
import IconButton from '../../../components/icon_button';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

const messages = defineMessages({
  upload: { id: 'upload_button.label', defaultMessage: 'Add media' }
});

const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => ({
    acceptContentTypes: state.getIn(['media_attachments', 'accept_content_types']).toArray(),
  });

  return mapStateToProps;
}

const iconStyle = {
  height: null,
  lineHeight: '27px'
}

class UploadButton extends React.PureComponent {

  constructor (props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  handleChange (e) {
    if (e.target.files.length > 0) {
      this.props.onSelectFile(e.target.files);
    }
  }

  handleClick () {
    this.fileElement.click();
  }

  setRef (c) {
    this.fileElement = c;
  }

  render () {

    const { intl, resetFileKey, disabled, acceptContentTypes } = this.props;

    return (
      <div className='compose-form__upload-button'>
        <IconButton icon='camera' title={intl.formatMessage(messages.upload)} disabled={disabled} onClick={this.handleClick} className='compose-form__upload-button-icon' size={18} inverted style={iconStyle}/>
        <input
          key={resetFileKey}
          ref={this.setRef}
          type='file'
          multiple={false}
          accept={ acceptContentTypes.join(',')}
          onChange={this.handleChange}
          disabled={disabled}
          style={{ display: 'none' }}
        />
      </div>
    );
  }

}

UploadButton.propTypes = {
  disabled: PropTypes.bool,
  onSelectFile: PropTypes.func.isRequired,
  style: PropTypes.object,
  resetFileKey: PropTypes.number,
  acceptContentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  intl: PropTypes.object.isRequired
};

export default connect(makeMapStateToProps)(injectIntl(UploadButton));
