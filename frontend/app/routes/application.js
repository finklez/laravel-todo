import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// export default Route.extend(AuthenticatedRouteMixin);

export default Route.extend(AuthenticatedRouteMixin, {
  store: service(),
  model() {
    return this.get('store').findAll('main-todo');
  }
});
