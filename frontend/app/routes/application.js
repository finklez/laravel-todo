import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  model() {
    // return [
    //   {"name": "dfkj", "age": 23},
    //   {"name": "oi3ji3", "age": 11}
    // ];

    // return this.get('store').findAll('todo');

    // return this.store.query('song', { album: album_id });

    return fetch('/api/v1/todos').then(function(response) {
      return response.json();
    });
  }
});
