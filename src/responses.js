module.exports = {
  fail404: (h, message) => {
    return h.response({
      status: 'fail',
      message: message
    }).code(404);
  },

  fail400: (h, message) => {
    return h.response({
      status: 'fail',
      message: message
    }).code(400);
  },

  error500: (h, message) => {
    return h.response({
      status: 'error',
      message: message
    }).code(500);
  },

  success200: (h, message, data) => {
    if (data) {
      return h.response({
        status: 'success',
        message: message,
        data: data
      }).code(200);
    } else {
      return h.response({
        status: 'success',
        message: message
      }).code(200);
    }
  },

  success201: (h, message, data) => {
    if (data) {
      return h.response({
        status: 'success',
        message: message,
        data: data
      }).code(201);
    } else {
      return h.response({
        status: 'success',
        message: message
      }).code(201);
    }
  }

};
