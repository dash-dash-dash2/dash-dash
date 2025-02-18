import { body, param, query, validationResult } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  };
};

export const userValidationRules = {
  register: [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').trim().notEmpty(),
    body('phone').optional().isMobilePhone(),
  ],
  login: [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ]
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim()
    .slice(0, 500); // Limit length
}; 