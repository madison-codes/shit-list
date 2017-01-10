import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('person', params._id);
  },
  actions: {
    updatePerson: function(){
      console.log('routes', 'forgiven');
    }
  }
});
