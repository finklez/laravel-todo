import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return [
      {"name": "dfkj", "age": 23},
      {"name": "oi3ji3", "age": 11}
    ];
  }
});
