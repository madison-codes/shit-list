"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('shit-list/adapters/application', ['exports', 'pouchdb', 'ember-pouch'], function (exports, _pouchdb, _emberPouch) {

   _pouchdb['default'].debug.enable('*');

   var remote = new _pouchdb['default']('https://madisonkerndt.cloudant.com/shit-list');
   var db = new _pouchdb['default']('local_pouch');

   db.sync(remote, {
      live: true,
      retry: true
   });

   exports['default'] = _emberPouch.Adapter.extend({
      db: db
   });
});
define('shit-list/app', ['exports', 'ember', 'shit-list/resolver', 'ember-load-initializers', 'shit-list/config/environment'], function (exports, _ember, _shitListResolver, _emberLoadInitializers, _shitListConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _shitListConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _shitListConfigEnvironment['default'].podModulePrefix,
    Resolver: _shitListResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _shitListConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('shit-list/components/add-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      addPerson: function addPerson() {
        var newPerson = {
          name: this.get('name'),
          description: this.get('description')
        };
        this.sendAction('createAction', newPerson);
        this.set('name', '');
        this.set('description', '');
      }
    }
  });
});
define('shit-list/components/header-nav', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('shit-list/components/people-stats', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    model: function model() {
      return this.store.findAll('person');
    },

    // forgiven: Ember.computed.filterBy('person.forgiven', true),
    // notForgiven: Ember.computed.filterBy('person','forgiven', false),

    actions: {
      forgiven: _ember['default'].computed.filterBy('forgiven', true),
      // all: function(){
      //   Ember.computed('person');
      // },
      notForgiven: function notForgiven() {
        _ember['default'].computed('person.@each.forgiven', function () {
          var person = this.get('person');
          return person.filterBy('forgiven', false);
        });
      }
    }
  });
});
define('shit-list/helpers/app-version', ['exports', 'ember', 'shit-list/config/environment'], function (exports, _ember, _shitListConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _shitListConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('shit-list/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('shit-list/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('shit-list/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'shit-list/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _shitListConfigEnvironment) {
  var _config$APP = _shitListConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('shit-list/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('shit-list/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('shit-list/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('shit-list/initializers/export-application-global', ['exports', 'ember', 'shit-list/config/environment'], function (exports, _ember, _shitListConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_shitListConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _shitListConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_shitListConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('shit-list/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('shit-list/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('shit-list/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("shit-list/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('shit-list/models/person', ['exports', 'ember-data', 'ember-pouch'], function (exports, _emberData, _emberPouch) {
  exports['default'] = _emberPouch.Model.extend({
    name: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    forgiven: _emberData['default'].attr('boolean', { defaultValue: false }),
    rev: _emberData['default'].attr('string')
  });
});
define('shit-list/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('shit-list/router', ['exports', 'ember', 'shit-list/config/environment'], function (exports, _ember, _shitListConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _shitListConfigEnvironment['default'].locationType,
    rootURL: _shitListConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('home');
    this.route('new');
    this.route('people', function () {
      this.route('person', { path: ':person_id' });
    });
  });

  exports['default'] = Router;
});
define('shit-list/routes/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('person');
    },
    actions: {
      addNewPerson: function addNewPerson(newPerson) {
        var updatedPeople = this.store.createRecord('person', newPerson);
        updatedPeople.save();
      }
    }
  });
});
define('shit-list/routes/people', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('person');
    }
  });
});
define('shit-list/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("shit-list/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "RmApev8A", "block": "{\"statements\":[[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"body\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"header-nav\"]],false],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"footer\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "shit-list/templates/application.hbs" } });
});
define("shit-list/templates/components/add-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9UlClXFE", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"add form\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"section\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"add-new-reminder\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addPerson\",[\"get\",[\"model\"]]],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Who has wronged you today?\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n      Name\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"type\",\"name\"],[[\"get\",[\"name\"]],\"text\",\"name\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n      Description\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"type\",\"description\"],[[\"get\",[\"description\"]],\"text\",\"description\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"add-new-person-button\"],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "shit-list/templates/components/add-form.hbs" } });
});
define("shit-list/templates/components/header-nav", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "m6ja+2su", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"home\"],null,2],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"new\"],null,1],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"people\"],null,0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"People\"]],\"locals\":[]},{\"statements\":[[\"text\",\"New\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "shit-list/templates/components/header-nav.hbs" } });
});
define("shit-list/templates/components/people-stats", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "F809MJZc", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"PEOPLE STATS\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"All: \"],[\"append\",[\"unknown\",[\"people\",\"length\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "shit-list/templates/components/people-stats.hbs" } });
});
define("shit-list/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "GkVHpVSg", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "shit-list/templates/home.hbs" } });
});
define("shit-list/templates/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fjfM2zJQ", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"NEW\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"add-form\"],null,[[\"model\",\"createAction\"],[[\"get\",[\"model\"]],\"addNewPerson\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "shit-list/templates/new.hbs" } });
});
define("shit-list/templates/people", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FlrPNv+n", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"people\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"people-stats\"],null,[[\"people\"],[[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,1]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"person\",\"name\"]],false],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"block\",[\"link-to\"],[\"people.person\",[\"get\",[\"person\"]]],null,0],[\"text\",\"\\n  \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"person\",\"forgiven\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"person\"]}],\"hasPartials\":false}", "meta": { "moduleName": "shit-list/templates/people.hbs" } });
});
define("shit-list/templates/people/person", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kX92uqTU", "block": "{\"statements\":[[\"open-element\",\"article\",[]],[\"static-attr\",\"class\",\"clicked-reminder\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"MEEEEEEEEEEE\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"people\",\"person\",\"id\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "shit-list/templates/people/person.hbs" } });
});
define('shit-list/transforms/attachment', ['exports', 'ember-pouch/transforms/attachment'], function (exports, _emberPouchTransformsAttachment) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPouchTransformsAttachment['default'];
    }
  });
});
define('shit-list/transforms/attachments', ['exports', 'ember-pouch/transforms/attachments'], function (exports, _emberPouchTransformsAttachments) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPouchTransformsAttachments['default'];
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('shit-list/config/environment', ['ember'], function(Ember) {
  var prefix = 'shit-list';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("shit-list/app")["default"].create({"name":"shit-list","version":"0.0.0+6097b231"});
}

/* jshint ignore:end */
//# sourceMappingURL=shit-list.map
