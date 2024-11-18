import Joi from 'joi';

export default Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } }),
  password: Joi.string().min(8).max(64),
});
