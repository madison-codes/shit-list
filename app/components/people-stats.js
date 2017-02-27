import Ember from 'ember';

export default Ember.Component.extend({
  model(){
    return this.store.findAll('person');
  },

  // forgiven: Ember.computed.filterBy('person.forgiven', true),
  // notForgiven: Ember.computed.filterBy('person','forgiven', false),

  // forgiven: Ember.computed('person.@each.forgiven', function() {
  //         var person = this.get('person');
  //         return person.filterBy('forgiven', true);
  //       }),
  actions: {
    // all: function(){
    //   Ember.computed('person');
    // },
    // forgiven: function(){
    //   Ember.computed('person.@each.forgiven', function() {
    //     var person = this.get('person');
    //     return person.filterBy('forgiven', true);
    //   });
    // }
  }
});


// this.getProerties 
