'use strict';



;define("frontend/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("frontend/adapters/application", ["exports", "ember-data", "frontend/config/environment", "ember-simple-auth/mixins/data-adapter-mixin"], function (_exports, _emberData, _environment, _dataAdapterMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  //import JSONAPIAdapter from '@ember-data/adapter/json-api';
  //export default JSONAPIAdapter.extend({
  //});
  var _default = _emberData.default.RESTAdapter.extend({
    host: _environment.default.apiBaseUrl,
    namespace: 'api'
  }); // export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
  // 	host: ENV.apiBaseUrl,
  // 	namespace:'api',
  // 	authorizer: 'authorizer:token',
  // 	handleResponse: function(status, headers, payload){
  // 		// If the response is 422 (Unprocessable Entity) then format the errors into JSONAPI format
  // 		if(status === 422 && payload.errors){
  // 			let error_response	=	[];
  // 			for(var key in payload.errors) {
  // 				error_response.push({id:key,title:payload.errors[key][0]});
  // 			}
  // 			return new DS.InvalidError(error_response);
  // 		}
  // 		return this._super(...arguments);
  // 	}
  // });


  _exports.default = _default;
});
;define("frontend/app", ["exports", "@babel/runtime/helpers/esm/defineProperty", "frontend/resolver", "ember-load-initializers", "frontend/config/environment"], function (_exports, _defineProperty2, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class App extends Ember.Application {
    constructor(...args) {
      super(...args);
      (0, _defineProperty2.default)(this, "modulePrefix", _environment.default.modulePrefix);
      (0, _defineProperty2.default)(this, "podModulePrefix", _environment.default.podModulePrefix);
      (0, _defineProperty2.default)(this, "Resolver", _resolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("frontend/components/todo", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['todo-container'],
    store: Ember.inject.service(),
    //Ember.inject.service(),
    ASCIILetterA: 65,
    // src: https://stackoverflow.com/questions/47741231/ember-computed-property-on-ember-data-store
    todos: Ember.computed(function () {
      return this.get('store').findAll('todo');
    }),
    incomplete: Ember.computed('todos.@each.done', function () {
      return this.todos.filterBy('done', false).map(item => item.id).length;
    }),
    completed: Ember.computed('todos.@each.done', function () {
      return this.total - this.incomplete;
    }),
    total: Ember.computed('todos.@each.done', function () {
      return this.todos.map(item => item.id).length;
    }),
    actions: {
      remove(todo) {
        todo.destroyRecord();
      },

      toggleDone(todo) {
        todo.set('done', !todo.done);
        todo.save();
      },

      add() {
        let todoCount = this.todos.length; // this.store.peekAll('todo').length;

        let newTodoText = 'משימה ' + String.fromCharCode(todoCount + this.ASCIILetterA);
        let todo = this.store.createRecord('todo', {
          text: newTodoText,
          done: false
        });
        todo.save();
      },

      edit(todo, event) {
        setTimeout(function () {
          event.target.nextElementSibling.focus();
        }, 0); // ugly hack

        todo.set('isEditing', true);
      },

      changeText(todo, event) {
        todo.set('isEditing', false);
        todo.set('text', event.target.value);
        todo.save();
      }

    }
  });

  _exports.default = _default;
});
;define("frontend/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("frontend/helpers/app-version", ["exports", "frontend/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("frontend/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("frontend/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("frontend/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "frontend/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("frontend/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("frontend/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This code initializes EmberData in an Ember application.
  
    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("frontend/initializers/ember-simple-auth", ["exports", "frontend/config/environment", "ember-simple-auth/configuration", "ember-simple-auth/initializers/setup-session", "ember-simple-auth/initializers/setup-session-service", "ember-simple-auth/initializers/setup-session-restoration"], function (_exports, _environment, _configuration, _setupSession, _setupSessionService, _setupSessionRestoration) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-simple-auth',

    initialize(registry) {
      const config = _environment.default['ember-simple-auth'] || {};
      config.rootURL = _environment.default.rootURL || _environment.default.baseURL;

      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
      (0, _setupSessionRestoration.default)(registry);
    }

  };
  _exports.default = _default;
});
;define("frontend/initializers/export-application-global", ["exports", "frontend/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

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
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("frontend/initializers/simple-auth-token", ["exports", "ember-simple-auth-token/authenticators/token", "ember-simple-auth-token/authenticators/jwt"], function (_exports, _token, _jwt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
    Ember Simple Auth Token's Initializer.
    By default load both the Token and JWT (with refresh) Authenticators.
  */
  var _default = {
    name: 'ember-simple-auth-token',
    before: 'ember-simple-auth',

    initialize(container) {
      container.register('authenticator:token', _token.default);
      container.register('authenticator:jwt', _jwt.default);
    }

  };
  _exports.default = _default;
});
;define("frontend/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("frontend/instance-initializers/ember-simple-auth", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // This is only needed for backwards compatibility and will be removed in the
  // next major release of ember-simple-auth. Unfortunately, there is no way to
  // deprecate this without hooking into Ember's internals…
  var _default = {
    name: 'ember-simple-auth',

    initialize() {}

  };
  _exports.default = _default;
});
;define("frontend/models/todo", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.Model.extend({
    text: _emberData.default.attr(),
    done: _emberData.default.attr('boolean')
  });

  _exports.default = _default;
});
;define("frontend/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("frontend/router", ["exports", "@babel/runtime/helpers/esm/defineProperty", "frontend/config/environment"], function (_exports, _defineProperty2, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class Router extends Ember.Router {
    constructor(...args) {
      super(...args);
      (0, _defineProperty2.default)(this, "location", _environment.default.locationType);
      (0, _defineProperty2.default)(this, "rootURL", _environment.default.rootURL);
    }

  } // Router.map(function() {
  //   this.route('application');
  // });


  _exports.default = Router;
});
;define("frontend/routes/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    store: Ember.inject.service(),

    model() {
      return this.get('store').findAll('todo'); // return this.store.query('song', { album: album_id });
      // return fetch('/api/todos').then(function(response) {
      //   return response.json();
      // });
    }

  });

  _exports.default = _default;
});
;define("frontend/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("frontend/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("frontend/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("frontend/services/cookies", ["exports", "ember-cookies/services/cookies"], function (_exports, _cookies) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _cookies.default;
  _exports.default = _default;
});
;define("frontend/services/session", ["exports", "ember-simple-auth/services/session"], function (_exports, _session) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _session.default;
  _exports.default = _default;
});
;define("frontend/session-stores/application", ["exports", "ember-simple-auth/session-stores/adaptive"], function (_exports, _adaptive) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _adaptive.default.extend();

  _exports.default = _default;
});
;define("frontend/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "dx6TfJDP",
    "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[1,[22,\"outlet\"],false],[0,\"\\n\\n\"],[5,\"todo\",[],[[\"@model\"],[[23,0,[\"model\"]]]]],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/components/todo", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "V9XQWsTn",
    "block": "{\"symbols\":[\"todo\"],\"statements\":[[0,\"\\n\"],[7,\"div\",true],[10,\"class\",\"head\"],[8],[0,\"\\n  \"],[7,\"span\",true],[10,\"class\",\"title\"],[8],[0,\"משימות\"],[9],[0,\"\\n  \"],[7,\"i\",true],[10,\"class\",\"fa fa-lg fa-plus-square add\"],[10,\"aria-hidden\",\"true\"],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"add\"],null]],[8],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[7,\"div\",true],[10,\"class\",\"todos\"],[8],[0,\"\\n\"],[4,\"each\",[[23,0,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[7,\"div\",true],[11,\"class\",[29,[\"todo \",[28,\"if\",[[23,1,[\"isEditing\"]],\"editing\"],null]]]],[11,\"data-id\",[23,1,[\"id\"]]],[8],[0,\"\\n      \"],[7,\"i\",true],[11,\"class\",[29,[\"fa fa-lg fa-\",[28,\"if\",[[23,1,[\"done\"]],\"square\",\"square-o\"],null],\" done\"]]],[10,\"aria-hidden\",\"true\"],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"toggleDone\",[23,1,[]]],null]],[8],[9],[0,\"\\n      \"],[7,\"div\",true],[10,\"class\",\"text-wrap\"],[8],[0,\"\\n        \"],[7,\"span\",true],[10,\"class\",\"text\"],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"edit\",[23,1,[]]],null]],[8],[1,[23,1,[\"text\"]],false],[9],[0,\"\\n        \"],[7,\"input\",false],[12,\"class\",\"text-edit\"],[12,\"onchange\",[28,\"action\",[[23,0,[]],\"changeText\",[23,1,[]]],null]],[12,\"type\",\"text\"],[3,\"action\",[[23,0,[]],\"setFocus\",[23,1,[]]]],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[7,\"i\",true],[10,\"class\",\"fa fa-lg fa-times remove\"],[10,\"aria-hidden\",\"true\"],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"remove\",[23,1,[]]],null]],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\\n\"],[7,\"div\",true],[10,\"class\",\"status\"],[8],[0,\"\\n    \"],[7,\"span\",true],[10,\"class\",\"st\"],[8],[0,\"לסיום: \"],[7,\"span\",true],[10,\"class\",\"num\"],[8],[1,[22,\"incomplete\"],false],[9],[9],[0,\"\\n    \"],[7,\"span\",true],[10,\"class\",\"st\"],[8],[0,\"הושלמו: \"],[7,\"span\",true],[10,\"class\",\"num\"],[8],[1,[22,\"completed\"],false],[9],[9],[0,\"\\n    \"],[7,\"span\",true],[10,\"class\",\"st\"],[8],[0,\"סה\\\"כ: \"],[7,\"span\",true],[10,\"class\",\"num\"],[8],[1,[24,[\"todos\",\"length\"]],false],[9],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/components/todo.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("frontend/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("frontend/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("frontend/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;

;define('frontend/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+156a9f95"});
          }
        
//# sourceMappingURL=frontend.map
