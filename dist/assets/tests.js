'use strict';

define('shit-list/tests/app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('shit-list/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('shit-list/tests/helpers/destroy-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('shit-list/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'shit-list/tests/helpers/start-app', 'shit-list/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _shitListTestsHelpersStartApp, _shitListTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _shitListTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _shitListTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('shit-list/tests/helpers/module-for-acceptance.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('shit-list/tests/helpers/resolver', ['exports', 'shit-list/resolver', 'shit-list/config/environment'], function (exports, _shitListResolver, _shitListConfigEnvironment) {

  var resolver = _shitListResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _shitListConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _shitListConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('shit-list/tests/helpers/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('shit-list/tests/helpers/start-app', ['exports', 'ember', 'shit-list/app', 'shit-list/config/environment'], function (exports, _ember, _shitListApp, _shitListConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    // use defaults, but you can override
    var attributes = _ember['default'].assign({}, _shitListConfigEnvironment['default'].APP, attrs);

    _ember['default'].run(function () {
      application = _shitListApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('shit-list/tests/helpers/start-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('shit-list/tests/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('shit-list/tests/router.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('shit-list/tests/test-helper', ['exports', 'shit-list/tests/helpers/resolver', 'ember-qunit'], function (exports, _shitListTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_shitListTestsHelpersResolver['default']);
});
define('shit-list/tests/test-helper.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('shit-list/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map