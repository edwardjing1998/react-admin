import PropTypes from 'prop-types'
import React from 'react'

import ComponentsImg from 'src/assets/images/components.webp'

const DocsComponents = (props) => (
  <div className="bg-primary bg-opacity-10 border border-2 border-primary rounded mb-4">
    <div className="row d-flex align-items-center p-3 px-xl-4 flex-xl-nowrap">
      <div className="col-md col-12 px-lg-4">
        Our Admin Panel isn’t just a mix of third-party components. It’s{' '}
        <strong>
          the only open-source React dashboard built on a professional, enterprise-grade UI
          Components Library
        </strong>
        . This component is part of this library, and we present only the basic usage of it here. To
        explore extended examples, detailed API documentation, and customization...
        . This component is part of this library, and we present only the basic usage of it here. To
        explore extended examples, detailed API documentation, and customization options...
        . This component is part of this library, and we present only the basic usage of it here. To
        explore extended examples, detailed API documentation, and customization options...
      </div>
    </div>
  </div>
)

DocsComponents.propTypes = {
  href: PropTypes.string,
}

export default DocsComponents
