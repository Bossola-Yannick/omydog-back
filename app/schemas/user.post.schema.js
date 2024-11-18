import Joi from 'joi';

export default Joi.object({
  firstname:
    Joi.string()
      .min(3)
      .max(30)
      .pattern(new RegExp('^[a-zA-ZÀ-ÿ-]{3,}$'))
      .required()
      .messages({
        'string.pattern.base': 'Firstname must contain only letters and hyphen',
        'any.required': 'Firstname is required',
      }),
  lastname:
    Joi.string()
      .min(3)
      .max(30)
      .pattern(new RegExp('^[a-zA-ZÀ-ÿ-]{3,}$'))
      .message('Firstname and lastname must contain only letters and hyphen')
      .optional(),
  email:
    Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .required()
      .messages({ 'any.required': 'Email is required' }),
  password:
    Joi.string()
      .min(8)
      .max(64)
      .pattern(new RegExp('^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\\d.*\\d)(?=.*[@$!%*?&].*[@$!%*?&]).{8,}$'))
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least two lowercase letters, two uppercase letters, two numbers and two special characters',
        'any.required': 'Password is required',
      }),
  repeatPassword:
    Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({ 'any.only': 'Passwords must be the same' }),
  city:
    Joi.string().min(2)
      .message('City must be a string'),
  department_label:
    Joi.string().min(3)
      .required()
      .messages({ 'any.required': 'Department_label is required' }),
  phone_number:
    Joi.string().max(13)
      .pattern(new RegExp('^(0|\\+33|0033)[1-9][0-9]{8}$'))
      .message('Incorrect phone number')
      .optional(),

});
