'use strict';

define("frontend/tests/helpers/ember-simple-auth", ["exports", "ember-simple-auth/authenticators/test"], function (_exports, _test) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.authenticateSession = authenticateSession;
  _exports.currentSession = currentSession;
  _exports.invalidateSession = invalidateSession;
  const TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    const authenticator = container.lookup(TEST_CONTAINER_KEY);

    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _test.default);
    }
  }

  function authenticateSession(app, sessionData) {
    const {
      __container__: container
    } = app;
    const session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return app.testHelpers.wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    const session = app.__container__.lookup('service:session');

    if (session.get('isAuthenticated')) {
      session.invalidate();
    }

    return app.testHelpers.wait();
  }
});
define("frontend/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/application.js should pass ESLint\n\n8:8 - \'DataAdapterMixin\' is defined but never used. (no-unused-vars)');
  });
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/todo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/todo.js should pass ESLint\n\n');
  });
  QUnit.test('models/todo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/todo.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });
});
define("frontend/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('frontend/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'frontend/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('frontend/templates/components/todo.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'frontend/templates/components/todo.hbs should pass TemplateLint.\n\nfrontend/templates/components/todo.hbs\n  22:4  error  Incorrect indentation for `<span>` beginning at L22:C4. Expected `<span>` to be at an indentation of 2 but was found at 4.  block-indentation\n  23:4  error  Incorrect indentation for `<span>` beginning at L23:C4. Expected `<span>` to be at an indentation of 2 but was found at 4.  block-indentation\n  24:4  error  Incorrect indentation for `<span>` beginning at L24:C4. Expected `<span>` to be at an indentation of 2 but was found at 4.  block-indentation\n  13:27  error  Interaction added to non-interactive element  no-invalid-interactive\n');
  });
});
define("frontend/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/todo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/todo-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/todo-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/todo-test.js should pass ESLint\n\n');
  });
});
define("frontend/tests/test-helper", ["frontend/app", "frontend/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("frontend/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("frontend/tests/unit/controllers/todo-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | todo', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:todo');
      assert.ok(controller);
    });
  });
});
define("frontend/tests/unit/routes/todo-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | todo', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:todo');
      assert.ok(route);
    });
  });
});
define('frontend/config/environment', [], function() {
  var prefix = 'frontend';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('frontend/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
