import Controller from '@ember/controller';
// import { inject as service } from '@ember/service';
import { inject } from '@ember/service';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Controller.extend(UnauthenticatedRouteMixin, {
  // session: service(),
  session: inject('session'),
  sessionAuthenticated() {
    console.log('success2');
    this.transitionToRoute('/');
  },
sessionAuthenticationSucceeded: function() {
    console.log('success');
  },
  sessionAuthenticationFailed: function() {
    console.log('success3');
  },
  afterAuth: function() {
    console.log('anything?')
  },
  actions: {
    authenticate: function() {
      console.log(this.get('session').session.get('isAuthenticated'));
      const credentials = this.getProperties('email', 'password');
      const authenticator = 'authenticator:token'; // or 'authenticator:jwt'
      let _this = this;
      this.get('session').authenticate(authenticator, credentials)
        .then(()=>{
          console.log(_this.get('session').session.get('isAuthenticated'))});
    }
    // authenticate() {
    //   let { identification, password } = this.getProperties('identification', 'password');
    //   this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
    //     this.set('errorMessage', reason.error || reason);
    //   });
    // }
  }
});
