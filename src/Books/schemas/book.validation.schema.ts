import * as Joi from 'joi';

export const validationSchema = Joi.object().keys({
  id: Joi.string().hex().length(24).optional(),
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).optional(),
  authors: Joi.string().min(1).optional(),
  favorite: Joi.boolean().optional(),
});
