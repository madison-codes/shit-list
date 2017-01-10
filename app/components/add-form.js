import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addPerson: function() {
      let newPerson = {
        name: this.get('name'),
        description: this.get('description')
      };
      this.sendAction('createAction', newPerson);
      this.set('name', '');
      this.set('description', '');
    }
  }
});
