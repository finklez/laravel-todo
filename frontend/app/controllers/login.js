import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Controller.extend(UnauthenticatedRouteMixin, {
  session: service(),
  store: service(),

  sessionAuthenticated() {
    //
  },

  actions: {
    authenticate: function() {
      const credentials = this.getProperties('email', 'password');
      const authenticator = 'authenticator:token'; // or 'authenticator:jwt'

      this.get('session').authenticate(authenticator, credentials);
    }
  }
});
