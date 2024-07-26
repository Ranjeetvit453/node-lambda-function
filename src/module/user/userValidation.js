const Joi = require('joi');

class UserValidation {
  static validateUser(user) {
     const userSchema = Joi.object({
        name: Joi.string().trim().required().max(15),
        email: Joi.string().email().required()
        .custom((value, helpers) => {
          //console.log('value:', value,'helpers:', helpers)
          if (value.includes('ranjeet@gmail.com')) {
            return helpers.error('any.invalid');
          }
          return value;
        
        }),
        password: Joi.string().required(),
        card:Joi.array().items(
          {
           name: Joi.string().required(),
          url:Joi.string().required().messages({
            'string.url': 'The URL should be a string.',
           
        }).uri().messages({"url":"enter valid url"}),}
        ),
      });
    const vali =  userSchema.validate(user);
    return vali;
  
  }
}


module.exports = UserValidation;