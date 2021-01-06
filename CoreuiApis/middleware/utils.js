
exports.handleError = (res, err) => {
    // Prints error in console
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    // Sends error to user
    res.status(200).json({
      success: false,
      statuscode: err.code,
      message: err.message,
      data: {}
      /* errors: {
        msg: err.message
      } */
    })
  }