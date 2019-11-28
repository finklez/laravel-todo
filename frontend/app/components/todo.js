import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject }  from '@ember/service';

export default Component.extend({
  classNames: ['todo-container'],
  store: inject(), //Ember.inject.service(),
  ASCIILetterA: 65,
  // src: https://stackoverflow.com/questions/47741231/ember-computed-property-on-ember-data-store
  todos: computed(function () {
    return this.get('store').findAll('todo');
  }),
  incomplete: computed('todos.@each.done', function () {
    return this.todos.filterBy('done', false).map(item => item.id).length;
  }),
  completed: computed('todos.@each.done', function () {
    return this.total - this.incomplete;
  }),
  total: computed('todos.@each.done', function () {
    return this.todos.map(item => item.id).length;
  }),
  actions: {
    remove(todo) {
      todo.destroyRecord();
    },
    toggleDone(todo) {
      todo.set('done', !todo.done);
      todo.save()
    },
    add() {
      let todoCount = this.todos.length; // this.store.peekAll('todo').length;
      let newTodoText = 'משימה ' + String.fromCharCode(todoCount + this.ASCIILetterA);
      let todo = this.store.createRecord('todo', {
        text: newTodoText,
        done: false
      });
      todo.save();
    },
    edit(todo, event) {
      setTimeout(function() {event.target.nextElementSibling.focus()}, 0); // ugly hack
      todo.set('isEditing', true);
    },
    changeText(todo, event) {
      todo.set('isEditing', false);
      todo.set('text', event.target.value);
      todo.save();
    }
  }
});
