import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('protected');
  this.route('index', { path: '/' });
  this.route('authenticated', { path: 'dd' }, function() {
    // all routes that require the session to be authenticated
  });
});

export default Router;
