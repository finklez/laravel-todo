import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  model() {

    return this.get('store').findAll('todo');

    // return this.store.query('song', { album: album_id });

    // return fetch('/api/todos').then(function(response) {
    //   return response.json();
    // });
  }
});
