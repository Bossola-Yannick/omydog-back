import Joi from 'joi';

export default Joi.object({
  firstname: Joi.string()
    .min(3)
    .max(30)
    .optional(),
  lastname: Joi.string()
    .min(3)
    .max(30)
    .optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .optional(),
  password: Joi.string().min(8).max(64)
    .pattern(new RegExp('^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\\d.*\\d)(?=.*[@$!%*?&].*[@$!%*?&]).{8,}$'))
    .message('Password must contain at least two lowercase letters, two uppercase letters, two numbers and two special characters')
    .optional(),
  repeatPassword: Joi.string()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': 'Passwords must be the same' })
    .optional(),
  city: Joi.string().min(2)
    .optional(),
  department_label : Joi.string().min(3).optional(),
  phone_number: Joi.string().max(13)
    .pattern(new RegExp('^[0-9+]+$'))
    .message('Incorrect phone number')
    .optional(),
  url_img: Joi.string()
    .pattern(new RegExp('^http://res.cloudinary.com/dfniqh3lp/image/upload/.*.jpg$'))
    .optional(),
});
