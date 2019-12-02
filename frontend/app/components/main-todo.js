import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service }  from '@ember/service';

export default Component.extend({
  classNames: ['todo-container'],
  store: service(),
  ASCIILetterA: 65,
  // src: https://stackoverflow.com/questions/47741231/ember-computed-property-on-ember-data-store
  todos: computed(function () {
    return this.get('store').findAll('main-todo');
  }),
  incomplete: computed('todos.@each.done', function () {
    return this.get('todos').filterBy('done', false).map(item => item.id).length;
  }),
  completed: computed('todos.@each.done', function () {
    return this.get('total') - this.get('incomplete');
  }),
  total: computed('todos.@each.done', function () {
    return this.get('todos').map(item => item.id).length;
  }),
  actions: {
    remove(todo) {
      todo.destroyRecord();
    },
    toggleDone(todo) {
      todo.set('done', !todo.get('done'));
      todo.save()
    },
    add() {
      let todoCount = this.get('todos').toArray().length;
      let newTodoText = 'משימה ' + String.fromCharCode(todoCount + this.ASCIILetterA);
      let todo = this.get('store').createRecord('mainTodo', {
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
