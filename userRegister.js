const user = require('./src/module/user/user')
const UserValidation = require('./src/module/user/userValidation');
const responseCodes = require('./src/module/response/responsecodes');

exports.userRegisterHandler= async(event, context) => {
    try{
      const userData = JSON.parse(event.body)
      const requestId = event.requestContext.requestId
      const {error} = UserValidation.validateUser(userData);
      console.log('error:', error?.details[0].message)
      console.log('error: path', error?.details[0].path)
      if(error){
        if(error?.details[0].path.includes('url')){
          return responseCodes.validationErrorResponse(requestId, "1101","ds",responseCodes.getStatusText('1101'))
        }
        return responseCodes.validationErrorResponse(requestId, "1101","ds",error?.details[0].message)
      //  return responseCodes.validationErrorResponse(requestId, "1101","ds",responseCodes.getStatusText('1101'))
      }
      console.log('userData:', userData)
      //const userRes = await user.createUser(userData)
      return true
    }catch(err){
        throw new Error(err)
    }

}