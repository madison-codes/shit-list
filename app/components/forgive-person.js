import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    forgive: function() {
      console.log('component', 'forgiven');
      this.sendAction('createAction');
    }
  }
});
