import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  store: service(),
  session: service(),
  currentUser: service(),

  // src: https://github.com/simplabs/ember-simple-auth/blob/v2/guides/managing-current-user.md
  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    let _super = this._super;
    this._loadCurrentUser();
    _super.call(this, ...arguments);
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  },

});
