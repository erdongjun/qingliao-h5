import React from 'react'
import classNames from 'classnames'

import './index.scss'

const Modal = ({ cls = '', visible, onClick, children }) => (
  <div
    className={classNames({
      modal: true,
      [cls]: true,
      'is-show': visible,
    })}
    onClick={onClick}
  >
    {children}
  </div>
)

Modal.propTypes = {
  // visible: PropTypes.bool.isRequired,
}

Modal.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  visible: false,
}

export default Modal
