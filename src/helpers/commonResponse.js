const getMessage = (code) => {
    return code;
};

const commonResponse = {
  success : (res, statusCode = 200, data) => {
    const resData = {
      error: false,    
      statusCode: statusCode,
      messageCode: 'OK',
      data
    };
    return res.status(statusCode).json(resData);
  },

  error : (res, statusCode = 400, code) => {
      const resData = {
        error: true,
        statusCode: statusCode,
        messageCode: 'BAD REQUEST',
        message: getMessage(code)
      };
      return res.status(statusCode).json(resData);
    },

  notFound : (res, statusCode = 404) => {
    const resData = {
      error: true,
      statusCode: statusCode,
      data: {},
      messageCode: 'Invalid request data',
    };
    return res.status(statusCode).send(resData);
  },

  unAuthentication : ( res, statusCode = 401, data) => {
    const resData = {
      error: true,
      statusCode: statusCode,
      data,
      messageCode: 'Unauthorized'
    };
    return res.status(statusCode).send(resData);
  },

  sendUnexpected : async (res, statusCode = 500, error) => { 
    const resData = {
      error: true,
      statusCode: statusCode,
      message:error.message,
      messageCode: 'DEFAULT_INTERNAL_SERVER_ERROR'
    };
    return res.status(statusCode).send(resData);
  },

};
export default commonResponse;