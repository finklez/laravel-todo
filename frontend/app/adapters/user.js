import ApplicationAdapter from './application';

// src: https://github.com/simplabs/ember-simple-auth/blob/v2/guides/managing-current-user.md
export default ApplicationAdapter.extend({
  urlForQueryRecord(query) {
    if (query.me) {
      delete query.me;
      return `${this._super(...arguments)}/me`;
    }

    return this._super(...arguments);
  }
});
