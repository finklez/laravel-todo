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
    async authenticate() {
      let { email, password } = this.getProperties('email', 'password');
        const credentials = this.getProperties('email', 'password');
      try {
        await this.get('session').authenticate('authenticator:token', credentials);
      } catch(error) {
        // this.set('errorMessage', error.error || error);
        this.set('errorMessage', error && error.json && error.json.error);
      }

      if (this.session.isAuthenticated) {
        // What to do with all this success?
      }
    }
  }
});
