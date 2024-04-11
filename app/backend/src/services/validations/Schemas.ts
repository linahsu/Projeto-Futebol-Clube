import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string(),
  password: Joi.string().min(6),
});

export default {
  loginSchema,
};
