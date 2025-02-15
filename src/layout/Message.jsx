import React from 'react'
import ReduxToastr from 'react-redux-toastr'

export default props => (
    <ReduxToastr timeOut={6000} newestOnTop={false}
        preventDuplicates={true} position='top-right'
        transitionIn='fadeIn' transitionOut='fadeOut'
        progressBar />
)