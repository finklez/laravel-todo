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
    // console.log('incomplete');
    // let todos = this.get('store').peekAll('todo');
    return this.todos.filterBy('done', false).map(item => item.id).length;
  }),
  completed: computed('todos.@each.done', function () {
    return this.total - this.incomplete;
    // let todos = this.get('store').peekAll('todo');
    // return todos.filterBy('done', true).map(item => item.id).length;
  }),
  total: computed('todos.@each.done', function () {
    // console.log('total');
    // let todos = this.get('store').peekAll('todo');
    return this.todos.map(item => item.id).length;
  }),
  isEditing: false,
  isEditComp: computed('isEditing', function () {
    console.log(this.isEditing);
    return this.isEditing
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
    rename(todo) {
      console.log('rename');
      // let text = prompt("new text");
      // console.log(text);
      todo.set('isEditing', true);
    }
  }
});
