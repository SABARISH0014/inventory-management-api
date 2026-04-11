const validateMiddleware = (validator) => {

  return (req, res, next) => {

    try {

      validator(req.body);

      next();

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message
      });

    }

  };

};

module.exports = validateMiddleware;