import Joi from 'joi';

export default Joi.object({
  date_start:
    Joi.date()
      .greater('now')
      .required()
      .messages({ 'any.required': 'Start date is required'}),
  date_end:
    Joi.date()
      .greater(Joi.ref('date_start'))
      .required()
      .messages({ 'any.required': 'End date is required'}),
  mobility:
    Joi.boolean()
      .required()
      .messages({ 'any.required': 'Mobility information is required'}),
  home:
    Joi.boolean()
      .required()
      .messages({ 'any.required': 'Home information is required'}),
  description:
  Joi.string()
    .pattern(new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9- .,!?;:\'"(){}\\[\\]<>\\n]{3,}$'))
    .messages({ 'string.pattern.base': 'Description must contains only letters, hyphens and spaces' }),
  animal:
    Joi.array()
      .items(Joi.string().min(2)),
});
