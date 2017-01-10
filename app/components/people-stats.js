import Ember from 'ember';

export default Ember.Component.extend({
  model(){
    return this.store.findAll('person');
  },

  // forgiven: Ember.computed.filterBy('person.forgiven', true),
  // notForgiven: Ember.computed.filterBy('person','forgiven', false),

  actions: {
    forgiven: Ember.computed.filterBy('forgiven', true),
    // all: function(){
    //   Ember.computed('person');
    // },
    notForgiven: function(){
      Ember.computed('person.@each.forgiven', function() {
        var person = this.get('person');
        return person.filterBy('forgiven', false);
      });
    }
  }
});
