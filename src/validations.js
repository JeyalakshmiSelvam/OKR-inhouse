// import {OAuth2Client} from 'google-auth-library';
const {OAuth2Client} = require('google-auth-library');
const errors =require('@feathersjs/errors');
const constants = require('./constants');
const logger = require('./logger');

/**
   * @name tokenValidations
   * @description
   *  - Used to Validate the incoming token.
   * @memberof module:function of validation file ,used as hooks
   * @param {object} params - context
   * @return {object} formMeta - returns error or moves to next middleware.
   * @author Jeyalakshmi
   */
const tokenValidations = async function(context) {
  try{
    console.log('Enter into token validations');
    let headers = context.params.headers; 
    if(headers.authorization){
      let CLIENT_ID = context.app.get('google_client_id');
      const client = new OAuth2Client(CLIENT_ID);
      const tokenInfo = await client.verifyIdToken({
        idToken: headers.authorization, // id_token field
        audience: CLIENT_ID, // Google APP id
      });
      const payload = tokenInfo.getPayload();
      if(payload?.email){
        let currentTime = Math.floor(Date.now()/1000);
        if(currentTime>=payload.exp){
          throw new errors.BadRequest('Token was expired');
        } else context.params.user = payload;
      }else{
        throw new errors.BadRequest('Token doesn\'t have mail id');
      }
    }else{
      throw new errors.NotAuthenticated('Token was missing');
    }
  }catch(error){
    logger.error('Error in Token Validation Function :',error);
    throw new errors.BadRequest(error);
  }
};



/**
   * @name userValidation
   * @description
   *  - Used to Validate the User
   * @memberof module:function of validation file ,used as hooks
   * @param {object} params - context
   * @return {object} formMeta - returns error or moves to next middleware.
   * @author Jeyalakshmi
   */
const userValidation = async function(context){
  try{
    const data  = {email:context.params.user.email};
    const userInfo = await context.app.service('users').find({query:data});
        
    if(userInfo.total > 0 ){
      context.params.user = userInfo.data[0];
      if(userInfo.data[0].role_id !== constants['SUPER_ADMIN']){
        const domain  = (context.params.user.email).split('@');
        const org_info =  await context.app.service('organization').get(userInfo.data[0].organization_id);
        if(domain[1] == org_info.domainName){
          if(!userInfo.data[0].is_invited){
            throw new errors.BadRequest('LoggedIn user not have been invited');
          }
        }else{
          throw new errors.BadRequest('LoggedIn user not belongs to this Organization');
        }
      } 
    }
        
  } catch(error){
    logger.error('Error in User Validation Function',error);
    throw new errors.BadRequest(error);
  }
};


/**
   * @name checkUserAuthorization
   * @description
   *  - Used to Validate the User Authorization
   * @memberof module:function of validation file ,used as hooks
   * @param {object} params - context
   * @return {object} formMeta - returns error or moves to next middleware.
   * @author Jeyalakshmi
   */
const checkUserAuthorization = async function(context){
  try {
    console.log('Enter into checkUserAuthorization');

    let data = {email:context.params.user.email};
    let userInfo = await context.app.service('users').find({query : data});
    console.log('userInfo,',userInfo);
    console.log('context.path',context.path);
    context.params.user = userInfo.data[0];
    if(context.path == 'teams'){
      console.log('userInfo.data[0].role_id ',userInfo.data[0].role_id );
      console.log('constants[\'ADMIN\']',constants['ADMIN']);
      if(!(userInfo.data[0].role_id === constants['ADMIN'])){
        throw new errors.Forbidden('Dont have an access to create the team');
      }
    }
    if(context.path == 'organization'){
      if(!(userInfo.data[0].role_id === constants['SUPER_ADMIN'])){
        throw new errors.Forbidden('You Dont have an access to create Organization');
      }
    }
  }catch(error){
    throw new errors.BadRequest(error);
  }
};

// module.exports = checkUserAuthorization;
module.exports = {
  tokenValidations,
  userValidation,
  checkUserAuthorization
};
