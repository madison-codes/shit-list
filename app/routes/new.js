import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll('person');
  },
  actions: {
    addNewPerson: function(newPerson){
      let updatedPeople = this.store.createRecord('person', newPerson);
      updatedPeople.save();
    }
  }
});
