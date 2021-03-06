//import JSONAPIAdapter from '@ember-data/adapter/json-api';

import DS from 'ember-data';
import ENV from 'frontend/config/environment';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

export default DS.RESTAdapter.extend(TokenAuthorizerMixin, {
	host: ENV.apiBaseUrl,
	// authorizer: 'authorizer:token',
	namespace:'api',
  // crossOriginWhitelist: ['http://localhost:8000'],
});
// export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
// 	host: ENV.apiBaseUrl,
// 	namespace:'api',
// 	authorizer: 'authorizer:token',
// 	handleResponse: function(status, headers, payload){
// 		// If the response is 422 (Unprocessable Entity) then format the errors into JSONAPI format
// 		if(status === 422 && payload.errors){
// 			let error_response	=	[];
// 			for(var key in payload.errors) {
// 				error_response.push({id:key,title:payload.errors[key][0]});
// 			}
// 			return new DS.InvalidError(error_response);
// 		}
// 		return this._super(...arguments);
// 	}
// });
