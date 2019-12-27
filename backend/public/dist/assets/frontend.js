"use strict";



define('frontend/adapters/application', ['exports', 'ember-data', 'frontend/config/environment', 'ember-simple-auth-token/mixins/token-authorizer'], function (exports, _emberData, _environment, _tokenAuthorizer) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _emberData.default.RESTAdapter.extend(_tokenAuthorizer.default, {
		host: _environment.default.apiBaseUrl,
		// authorizer: 'authorizer:token',
		namespace: 'api'
		// crossOriginWhitelist: ['http://localhost:8000'],
	});
});
define('frontend/adapters/user', ['exports', 'frontend/adapters/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    urlForQueryRecord: function urlForQueryRecord(query) {
      if (query.me) {
        delete query.me;
        return this._super.apply(this, arguments) + '/me';
      }

      return this._super.apply(this, arguments);
    }
  });
});
define('frontend/app', ['exports', 'frontend/resolver', 'ember-load-initializers', 'frontend/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('frontend/components/main-todo', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['todo-container'],
    store: Ember.inject.service(),
    ASCIILetterA: 65,
    // src: https://stackoverflow.com/questions/47741231/ember-computed-property-on-ember-data-store
    todos: Ember.computed(function () {
      return this.get('store').peekAll('main-todo');
    }),
    incomplete: Ember.computed('todos.@each.done', function () {
      return this.get('todos').filterBy('done', false).map(function (item) {
        return item.id;
      }).length;
    }),
    completed: Ember.computed('todos.@each.done', function () {
      return this.get('total') - this.get('incomplete');
    }),
    total: Ember.computed('todos.@each.done', function () {
      return this.get('todos').map(function (item) {
        return item.id;
      }).length;
    }),
    actions: {
      remove: function remove(todo) {
        todo.destroyRecord();
      },
      toggleDone: function toggleDone(todo) {
        todo.set('done', !todo.get('done'));
        todo.save();
      },
      add: function add() {
        var todoCount = this.get('todos').toArray().length;
        var newTodoText = 'משימה ' + String.fromCharCode(todoCount + this.ASCIILetterA);
        var todo = this.get('store').createRecord('mainTodo', {
          text: newTodoText,
          done: false
        });
        todo.save();
      },
      edit: function edit(todo, event) {
        setTimeout(function () {
          event.target.nextElementSibling.focus();
        }, 0); // ugly hack
        todo.set('isEditing', true);
      },
      changeText: function changeText(todo, event) {
        todo.set('isEditing', false);
        todo.set('text', event.target.value);
        todo.save();
      }
    }
  });
});
define('frontend/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('frontend/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),

    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });
});
define('frontend/controllers/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service()

  });
});
define('frontend/controllers/login', ['exports', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _applicationRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Controller.extend(_applicationRouteMixin.default, {
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    sessionAuthenticated: function sessionAuthenticated() {
      //
    },


    actions: {
      authenticate: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _getProperties, email, password, credentials;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _getProperties = this.getProperties('email', 'password'), email = _getProperties.email, password = _getProperties.password;
                  credentials = this.getProperties('email', 'password');
                  _context.prev = 2;
                  _context.next = 5;
                  return this.get('session').authenticate('authenticator:token', credentials);

                case 5:
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](2);

                  // this.set('errorMessage', error.error || error);
                  this.set('errorMessage', _context.t0 && _context.t0.json && _context.t0.json.error);

                case 10:

                  if (this.session.isAuthenticated) {
                    // What to do with all this success?
                  }

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 7]]);
        }));

        function authenticate() {
          return _ref.apply(this, arguments);
        }

        return authenticate;
      }()
    }
  });
});
define('frontend/helpers/app-version', ['exports', 'frontend/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('frontend/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('frontend/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'frontend/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('frontend/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('frontend/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('frontend/initializers/ember-simple-auth', ['exports', 'frontend/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service', 'ember-simple-auth/initializers/setup-session-restoration'], function (exports, _environment, _configuration, _setupSession, _setupSessionService, _setupSessionRestoration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _environment.default['ember-simple-auth'] || {};
      config.rootURL = _environment.default.rootURL || _environment.default.baseURL;
      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
      (0, _setupSessionRestoration.default)(registry);
    }
  };
});
define('frontend/initializers/export-application-global', ['exports', 'frontend/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
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

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
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

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('frontend/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/simple-auth-token', ['exports', 'ember-simple-auth-token/authenticators/token', 'ember-simple-auth-token/authenticators/jwt'], function (exports, _token, _jwt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth-token',
    before: 'ember-simple-auth',
    initialize: function initialize(container) {
      container.register('authenticator:token', _token.default);
      container.register('authenticator:jwt', _jwt.default);
    }
  };
});
define('frontend/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('frontend/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("frontend/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('frontend/instance-initializers/ember-simple-auth', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize() {}
  };
});
define('frontend/models/main-todo', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    text: _emberData.default.attr(),
    done: _emberData.default.attr('boolean')
  });
});
define('frontend/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr(),
    email: _emberData.default.attr()
  });
});
define('frontend/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('frontend/router', ['exports', 'frontend/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('login');
    this.route('index', { path: '/' });
    this.route('authenticated', { path: 'dd' }, function () {
      // all routes that require the session to be authenticated
    });
  });

  exports.default = Router;
});
define('frontend/routes/application', ['exports', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _applicationRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_applicationRouteMixin.default, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),

    // src: https://github.com/simplabs/ember-simple-auth/blob/v2/guides/managing-current-user.md
    beforeModel: function beforeModel() {
      return this._loadCurrentUser();
    },
    sessionAuthenticated: function sessionAuthenticated() {
      var _super = this._super;
      this._loadCurrentUser();
      _super.call.apply(_super, [this].concat(Array.prototype.slice.call(arguments)));
    },
    _loadCurrentUser: function _loadCurrentUser() {
      var _this = this;

      return this.get('currentUser').load().catch(function () {
        return _this.get('session').invalidate();
      });
    }
  });
});
define('frontend/routes/index', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    model: function model() {
      return this.get('store').findAll('main-todo');
    }
  });
});
define('frontend/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('frontend/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _cookies) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cookies.default;
});
define('frontend/services/current-user', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    load: function load() {
      var _this = this;

      if (this.get('session.isAuthenticated')) {
        return this.get('store').queryRecord('user', { me: true }).then(function (user) {
          _this.set('user', user);
        });
      } else {
        return Ember.RSVP.resolve();
      }
    }
  });
});
define('frontend/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _session.default;
});
define('frontend/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _adaptive) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adaptive.default.extend();
});
define("frontend/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KPGPdCGi", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"menu\"],[7],[0,\"\\n\"],[4,\"if\",[[20,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"      \"],[6,\"a\"],[3,\"action\",[[19,0,[]],\"invalidateSession\"]],[7],[0,\"שלום, \"],[1,[20,[\"currentUser\",\"user\",\"name\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    לא מחובר\\n\"]],\"parameters\":[]}],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"main\"],[7],[0,\"\\n  \"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/application.hbs" } });
});
define("frontend/templates/components/main-todo", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ydNbzcZ3", "block": "{\"symbols\":[\"todo\"],\"statements\":[[6,\"div\"],[9,\"class\",\"head\"],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"title\"],[7],[0,\"משימות\"],[8],[0,\"\\n  \"],[6,\"i\"],[9,\"class\",\"fa fa-lg fa-plus-square add\"],[9,\"aria-hidden\",\"true\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"add\"],null],null],[7],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"todos\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",[26,[\"todo \",[25,\"if\",[[19,1,[\"isEditing\"]],\"editing\"],null]]]],[10,\"data-id\",[19,1,[\"id\"]],null],[7],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",[26,[\"fa fa-lg fa-\",[25,\"if\",[[19,1,[\"done\"]],\"square\",\"square-o\"],null],\" done\"]]],[9,\"aria-hidden\",\"true\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"toggleDone\",[19,1,[]]],null],null],[7],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"text-wrap\"],[7],[0,\"\\n              \"],[6,\"span\"],[9,\"class\",\"text\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"edit\",[19,1,[]]],null],null],[7],[1,[19,1,[\"text\"]],false],[8],[0,\"\\n              \"],[6,\"input\"],[9,\"type\",\"text\"],[9,\"class\",\"text-edit\"],[10,\"onchange\",[25,\"action\",[[19,0,[]],\"changeText\",[19,1,[]]],null],null],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"fa fa-lg fa-times remove\"],[9,\"aria-hidden\",\"true\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"remove\",[19,1,[]]],null],null],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[4,\"unless\",[[19,0,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"no-todos\"],[7],[0,\"\\n      אין משימות\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"status\"],[7],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"st\"],[7],[0,\"לסיום: \"],[6,\"span\"],[9,\"class\",\"num\"],[7],[1,[18,\"incomplete\"],false],[8],[8],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"st\"],[7],[0,\"הושלמו: \"],[6,\"span\"],[9,\"class\",\"num\"],[7],[1,[18,\"completed\"],false],[8],[8],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"st\"],[7],[0,\"סה\\\"כ: \"],[6,\"span\"],[9,\"class\",\"num\"],[7],[1,[20,[\"todos\",\"length\"]],false],[8],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/components/main-todo.hbs" } });
});
define("frontend/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LOwNQ/Fb", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"main-todo\",null,[[\"model\"],[[19,0,[\"model\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/index.hbs" } });
});
define("frontend/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WK7vqVQq", "block": "{\"symbols\":[],\"statements\":[[6,\"form\"],[9,\"class\",\"login-form\"],[3,\"action\",[[19,0,[]],\"authenticate\"],[[\"on\"],[\"submit\"]]],[7],[0,\"\\n  \"],[1,[25,\"input\",null,[[\"id\",\"placeholder\",\"value\"],[\"email\",\"אימייל\",[20,[\"email\"]]]]],false],[0,\"\\n  \"],[1,[25,\"input\",null,[[\"id\",\"placeholder\",\"type\",\"value\"],[\"password\",\"סיסמא\",\"password\",[20,[\"password\"]]]]],false],[0,\"\\n  \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-default\"],[7],[0,\"הרשם\"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"errorMessage\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"err-msg\"],[7],[0,\"\\n      \"],[6,\"p\"],[7],[1,[18,\"errorMessage\"],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "frontend/templates/login.hbs" } });
});


define('frontend/config/environment', [], function() {
  var prefix = 'frontend';
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

});

if (!runningTests) {
  require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+851b02de"});
}
//# sourceMappingURL=frontend.map
