(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var GSS;

GSS = require('gss-engine/src/GSS.coffee');

GSS.Document = require('../src/Document');

module.exports = global.GSS = GSS;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/Document":21,"gss-engine/src/GSS.coffee":6}],2:[function(require,module,exports){
/**
 * Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)
 * Parts Copyright (C) Copyright (C) 1998-2000 Greg J. Badros
 *
 * Use of this source code is governed by http://www.apache.org/licenses/LICENSE-2.0
 *
 * This is a compiled version of Cassowary/JS. For source versions or to
 * contribute, see the github project:
 *
 *  https://github.com/slightlyoff/cassowary-js-refactor
 *
 */

(function() {
!function(a){"use strict";try{!function(){}.bind(a)}catch(b){Object.defineProperty(Function.prototype,"bind",{value:function(a){var b=this;return function(){return b.apply(a,arguments)}},enumerable:!1,configurable:!0,writable:!0})}var c="undefined"!=typeof a.HTMLElement,d=function(a){for(var b=null;a&&a!=Object.prototype;){if(a.tagName){b=a.tagName;break}a=a.prototype}return b||"div"},e=1e-8,f={},g=function(a,b){if(a&&b){if("function"==typeof a[b])return a[b];var c=a.prototype;if(c&&"function"==typeof c[b])return c[b];if(c!==Object.prototype&&c!==Function.prototype)return"function"==typeof a.__super__?g(a.__super__,b):void 0}},h=a.c=function(){return h._api?h._api.apply(this,arguments):void 0};h.debug=!1,h.trace=!1,h.verbose=!1,h.traceAdded=!1,h.GC=!1,h.GEQ=1,h.LEQ=2,h.inherit=function(b){var e=null,g=null;b["extends"]&&(g=b["extends"],delete b["extends"]),b.initialize&&(e=b.initialize,delete b.initialize);var i=e||function(){};Object.defineProperty(i,"__super__",{value:g?g:Object,enumerable:!1,configurable:!0,writable:!1}),b._t&&(f[b._t]=i);var j=i.prototype=Object.create(g?g.prototype:Object.prototype);if(h.extend(j,b),c&&g&&g.prototype instanceof a.HTMLElement){var k=i,l=d(j),m=function(a){return a.__proto__=j,k.apply(a,arguments),j.created&&a.created(),j.decorate&&a.decorate(),a};this.extend(j,{upgrade:m}),i=function(){return m(a.document.createElement(l))},i.prototype=j,this.extend(i,{ctor:k})}return i},h.own=function(b,c,d){return Object.getOwnPropertyNames(b).forEach(c,d||a),b},h.extend=function(a,b){return h.own(b,function(c){var d=Object.getOwnPropertyDescriptor(b,c);try{"function"==typeof d.get||"function"==typeof d.set?Object.defineProperty(a,c,d):"function"==typeof d.value||"_"===c.charAt(0)?(d.writable=!0,d.configurable=!0,d.enumerable=!1,Object.defineProperty(a,c,d)):a[c]=b[c]}catch(e){}}),a},h.traceprint=function(a){h.verbose&&console.log(a)},h.fnenterprint=function(a){console.log("* "+a)},h.fnexitprint=function(a){console.log("- "+a)},h.assert=function(a,b){if(!a)throw new h.InternalError("Assertion failed: "+b)};var i=function(a){return"number"==typeof a?h.Expression.fromConstant(a):a instanceof h.Variable?h.Expression.fromVariable(a):a};h.plus=function(a,b){return a=i(a),b=i(b),a.plus(b)},h.minus=function(a,b){return a=i(a),b=i(b),a.minus(b)},h.times=function(a,b){return a=i(a),b=i(b),a.times(b)},h.divide=function(a,b){return a=i(a),b=i(b),a.divide(b)},h.approx=function(a,b){return a===b?!0:(a=+a,b=+b,0==a?Math.abs(b)<e:0==b?Math.abs(a)<e:Math.abs(a-b)<Math.abs(a)*e)};var j=1;h._inc=function(){return j++},h.parseJSON=function(a){return JSON.parse(a,function(a,b){if("object"!=typeof b||"string"!=typeof b._t)return b;var c=b._t,d=f[c];if(c&&d){var e=g(d,"fromJSON");if(e)return e(b,d)}return b})},"function"==typeof define&&define.amd?define(h):"object"==typeof module&&module.exports?module.exports=h:a.c=h}(this),function(a){"use strict";var b=function(a,b){Object.keys(a).forEach(function(c){b[c]=a[c]})},c={};a.HashTable=a.inherit({initialize:function(){this.size=0,this._store={},this._keyStrMap={},this._deleted=0},set:function(a,b){var c=a.hashCode;"undefined"==typeof this._store[c]&&this.size++,this._store[c]=b,this._keyStrMap[c]=a},get:function(a){if(!this.size)return null;a=a.hashCode;var b=this._store[a];return"undefined"!=typeof b?this._store[a]:null},clear:function(){this.size=0,this._store={},this._keyStrMap={}},_compact:function(){var a={};b(this._store,a),this._store=a},_compactThreshold:100,_perhapsCompact:function(){this._size>30||this._deleted>this._compactThreshold&&(this._compact(),this._deleted=0)},"delete":function(a){a=a.hashCode,this._store.hasOwnProperty(a)&&(this._deleted++,delete this._store[a],this.size>0&&this.size--)},each:function(a,b){if(this.size){this._perhapsCompact();var c=this._store,d=this._keyStrMap;for(var e in this._store)this._store.hasOwnProperty(e)&&a.call(b||null,d[e],c[e])}},escapingEach:function(a,b){if(this.size){this._perhapsCompact();for(var d=this,e=this._store,f=this._keyStrMap,g=c,h=Object.keys(e),i=0;i<h.length;i++)if(function(c){d._store.hasOwnProperty(c)&&(g=a.call(b||null,f[c],e[c]))}(h[i]),g){if(void 0!==g.retval)return g;if(g.brk)break}}},clone:function(){var c=new a.HashTable;return this.size&&(c.size=this.size,b(this._store,c._store),b(this._keyStrMap,c._keyStrMap)),c},equals:function(b){if(b===this)return!0;if(!(b instanceof a.HashTable)||b._size!==this._size)return!1;for(var c=Object.keys(this._store),d=0;d<c.length;d++){var e=c[d];if(this._keyStrMap[e]!==b._keyStrMap[e]||this._store[e]!==b._store[e])return!1}return!0},toString:function(){var b="";return this.each(function(a,c){b+=a+" => "+c+"\n"}),b}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.HashSet=a.inherit({_t:"c.HashSet",initialize:function(){this.storage=[],this.size=0,this.hashCode=a._inc()},add:function(a){var b=this.storage;b.indexOf(a),-1==b.indexOf(a)&&(b[b.length]=a),this.size=this.storage.length},values:function(){return this.storage},has:function(a){var b=this.storage;return-1!=b.indexOf(a)},"delete":function(a){var b=this.storage.indexOf(a);return-1==b?null:(this.storage.splice(b,1)[0],this.size=this.storage.length,void 0)},clear:function(){this.storage.length=0},each:function(a,b){this.size&&this.storage.forEach(a,b)},escapingEach:function(a,b){this.size&&this.storage.forEach(a,b)},toString:function(){var a=this.size+" {",b=!0;return this.each(function(c){b?b=!1:a+=", ",a+=c}),a+="}\n"},toJSON:function(){var a=[];return this.each(function(b){a[a.length]=b.toJSON()}),{_t:"c.HashSet",data:a}},fromJSON:function(b){var c=new a.HashSet;return b.data&&(c.size=b.data.length,c.storage=b.data),c}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Error=a.inherit({initialize:function(a){a&&(this._description=a)},_name:"c.Error",_description:"An error has occured in Cassowary",set description(a){this._description=a},get description(){return"("+this._name+") "+this._description},get message(){return this.description},toString:function(){return this.description}});var b=function(b,c){return a.inherit({"extends":a.Error,initialize:function(){a.Error.apply(this,arguments)},_name:b||"",_description:c||""})};a.ConstraintNotFound=b("c.ConstraintNotFound","Tried to remove a constraint never added to the tableu"),a.InternalError=b("c.InternalError"),a.NonExpression=b("c.NonExpression","The resulting expression would be non"),a.NotEnoughStays=b("c.NotEnoughStays","There are not enough stays to give specific values to every variable"),a.RequiredFailure=b("c.RequiredFailure","A required constraint cannot be satisfied"),a.TooDifficult=b("c.TooDifficult","The constraints are too difficult to solve")}(this.c||module.parent.exports||{}),function(a){"use strict";var b=1e3;a.SymbolicWeight=a.inherit({_t:"c.SymbolicWeight",initialize:function(){this.value=0;for(var a=1,c=arguments.length-1;c>=0;--c)this.value+=arguments[c]*a,a*=b},toJSON:function(){return{_t:this._t,value:this.value}}})}(this.c||module.parent.exports||{}),function(a){a.Strength=a.inherit({initialize:function(b,c,d,e){this.name=b,this.symbolicWeight=c instanceof a.SymbolicWeight?c:new a.SymbolicWeight(c,d,e)},get required(){return this===a.Strength.required},toString:function(){return this.name+(this.isRequired?"":":"+this.symbolicWeight)}}),a.Strength.required=new a.Strength("<Required>",1e3,1e3,1e3),a.Strength.strong=new a.Strength("strong",1,0,0),a.Strength.medium=new a.Strength("medium",0,1,0),a.Strength.weak=new a.Strength("weak",0,0,1)}(this.c||("undefined"!=typeof module?module.parent.exports.c:{})),function(a){"use strict";a.AbstractVariable=a.inherit({isDummy:!1,isExternal:!1,isPivotable:!1,isRestricted:!1,_init:function(b,c){this.hashCode=a._inc(),this.name=(c||"")+this.hashCode,b&&("undefined"!=typeof b.name&&(this.name=b.name),"undefined"!=typeof b.value&&(this.value=b.value),"undefined"!=typeof b.prefix&&(this._prefix=b.prefix))},_prefix:"",name:"",value:0,valueOf:function(){return this.value},toJSON:function(){var a={};return this._t&&(a._t=this._t),this.name&&(a.name=this.name),"undefined"!=typeof this.value&&(a.value=this.value),this._prefix&&(a._prefix=this._prefix),this._t&&(a._t=this._t),a},fromJSON:function(b,c){var d=new c;return a.extend(d,b),d},toString:function(){return this._prefix+"["+this.name+":"+this.value+"]"}}),a.Variable=a.inherit({_t:"c.Variable","extends":a.AbstractVariable,initialize:function(b){this._init(b,"v");var c=a.Variable._map;c&&(c[this.name]=this)},isExternal:!0}),a.DummyVariable=a.inherit({_t:"c.DummyVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"d")},isDummy:!0,isRestricted:!0,value:"dummy"}),a.ObjectiveVariable=a.inherit({_t:"c.ObjectiveVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"o")},value:"obj"}),a.SlackVariable=a.inherit({_t:"c.SlackVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"s")},isPivotable:!0,isRestricted:!0,value:"slack"})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Point=a.inherit({initialize:function(b,c,d){if(b instanceof a.Variable)this._x=b;else{var e={value:b};d&&(e.name="x"+d),this._x=new a.Variable(e)}if(c instanceof a.Variable)this._y=c;else{var f={value:c};d&&(f.name="y"+d),this._y=new a.Variable(f)}},get x(){return this._x},set x(b){b instanceof a.Variable?this._x=b:this._x.value=b},get y(){return this._y},set y(b){b instanceof a.Variable?this._y=b:this._y.value=b},toString:function(){return"("+this.x+", "+this.y+")"}})}(this.c||module.parent.exports||{}),function(a){"use strict";var b=function(a,b){return"number"==typeof a?a:b};a.Expression=a.inherit({initialize:function(c,d,e){this.constant=b(e,0),this.terms=new a.HashTable,c instanceof a.AbstractVariable?(d=b(d,1),this.setVariable(c,d)):"number"==typeof c&&(isNaN(c)?console.trace():this.constant=c)},initializeFromHash:function(b,c){return a.verbose&&(console.log("*******************************"),console.log("clone c.initializeFromHash"),console.log("*******************************")),a.GC&&console.log("clone c.Expression"),this.constant=b,this.terms=c.clone(),this},multiplyMe:function(a){this.constant*=a;var b=this.terms;return b.each(function(c,d){b.set(c,d*a)}),this},clone:function(){a.verbose&&(console.log("*******************************"),console.log("clone c.Expression"),console.log("*******************************"));var b=a.Expression.empty();return b.initializeFromHash(this.constant,this.terms),b},times:function(b){if("number"==typeof b)return this.clone().multiplyMe(b);if(this.isConstant)return b.times(this.constant);if(b.isConstant)return this.times(b.constant);throw new a.NonExpression},plus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,1):b instanceof a.Variable?this.clone().addVariable(b,1):void 0},minus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,-1):b instanceof a.Variable?this.clone().addVariable(b,-1):void 0},divide:function(b){if("number"==typeof b){if(a.approx(b,0))throw new a.NonExpression;return this.times(1/b)}if(b instanceof a.Expression){if(!b.isConstant)throw new a.NonExpression;return this.times(1/b.constant)}},addExpression:function(c,d,e,f){return c instanceof a.AbstractVariable&&(c=a.Expression.fromVariable(c)),d=b(d,1),this.constant+=d*c.constant,c.terms.each(function(a,b){this.addVariable(a,b*d,e,f)},this),this},addVariable:function(b,c,d,e){null==c&&(c=1);var f=this.terms.get(b);if(f){var g=f+c;0==g||a.approx(g,0)?(e&&e.noteRemovedVariable(b,d),this.terms.delete(b)):this.setVariable(b,g)}else a.approx(c,0)||(this.setVariable(b,c),e&&e.noteAddedVariable(b,d));return this},setVariable:function(a,b){return this.terms.set(a,b),this},anyPivotableVariable:function(){if(this.isConstant)throw new a.InternalError("anyPivotableVariable called on a constant");var b=this.terms.escapingEach(function(a){return a.isPivotable?{retval:a}:void 0});return b&&void 0!==b.retval?b.retval:null},substituteOut:function(b,c,d,e){this.setVariable.bind(this);var g=this.terms,h=g.get(b);g.delete(b),this.constant+=h*c.constant,c.terms.each(function(b,c){var f=g.get(b);if(f){var i=f+h*c;a.approx(i,0)?(e.noteRemovedVariable(b,d),g.delete(b)):g.set(b,i)}else g.set(b,h*c),e&&e.noteAddedVariable(b,d)})},changeSubject:function(a,b){this.setVariable(a,this.newSubject(b))},newSubject:function(a){var b=1/this.terms.get(a);return this.terms.delete(a),this.multiplyMe(-b),b},coefficientFor:function(a){return this.terms.get(a)||0},get isConstant(){return 0==this.terms.size},toString:function(){var b="",c=!1;if(!a.approx(this.constant,0)||this.isConstant){if(b+=this.constant,this.isConstant)return b;c=!0}return this.terms.each(function(a,d){c&&(b+=" + "),b+=d+"*"+a,c=!0}),b},equals:function(b){return b===this?!0:b instanceof a.Expression&&b.constant===this.constant&&b.terms.equals(this.terms)},Plus:function(a,b){return a.plus(b)},Minus:function(a,b){return a.minus(b)},Times:function(a,b){return a.times(b)},Divide:function(a,b){return a.divide(b)}}),a.Expression.empty=function(){return new a.Expression(void 0,1,0)},a.Expression.fromConstant=function(b){return new a.Expression(b)},a.Expression.fromValue=function(b){return b=+b,new a.Expression(void 0,b,0)},a.Expression.fromVariable=function(b){return new a.Expression(b,1,0)}}(this.c||module.parent.exports||{}),function(a){"use strict";a.AbstractConstraint=a.inherit({initialize:function(b,c){this.hashCode=a._inc(),this.strength=b||a.Strength.required,this.weight=c||1},isEditConstraint:!1,isInequality:!1,isStayConstraint:!1,get required(){return this.strength===a.Strength.required},toString:function(){return this.strength+" {"+this.weight+"} ("+this.expression+")"}});var b=a.AbstractConstraint.prototype.toString,c=function(b,c,d){a.AbstractConstraint.call(this,c||a.Strength.strong,d),this.variable=b,this.expression=new a.Expression(b,-1,b.value)};a.EditConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isEditConstraint:!0,toString:function(){return"edit:"+b.call(this)}}),a.StayConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isStayConstraint:!0,toString:function(){return"stay:"+b.call(this)}});var d=a.Constraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(b,c,d){a.AbstractConstraint.call(this,c,d),this.expression=b}});a.Inequality=a.inherit({"extends":a.Constraint,_cloneOrNewCle:function(b){return b.clone?b.clone():new a.Expression(b)},initialize:function(b,c,e,f,g){var h=b instanceof a.Expression,i=e instanceof a.Expression,j=b instanceof a.AbstractVariable,k=e instanceof a.AbstractVariable,l="number"==typeof b,m="number"==typeof e;if((h||l)&&k){var n=b,o=c,p=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else if(j&&(i||m)){var n=e,o=c,p=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else{if(h&&m){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(l&&i){var s=e,o=c,t=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(h&&i){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(t),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(s));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(s),-1)}}else{if(h)return d.call(this,b,c,e);if(c==a.GEQ)d.call(this,new a.Expression(e),f,g),this.expression.multiplyMe(-1),this.expression.addVariable(b);else{if(c!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");d.call(this,new a.Expression(e),f,g),this.expression.addVariable(b,-1)}}}},isInequality:!0,toString:function(){return d.prototype.toString.call(this)+" >= 0) id: "+this.hashCode}}),a.Equation=a.inherit({"extends":a.Constraint,initialize:function(b,c,e,f){if(b instanceof a.Expression&&!c||c instanceof a.Strength)d.call(this,b,c,e);else if(b instanceof a.AbstractVariable&&c instanceof a.Expression){var g=b,h=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.AbstractVariable&&"number"==typeof c){var g=b,k=c,i=e,j=f;d.call(this,new a.Expression(k),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.Expression&&c instanceof a.AbstractVariable){var h=b,g=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else{if(!(b instanceof a.Expression||b instanceof a.AbstractVariable||"number"==typeof b)||!(c instanceof a.Expression||c instanceof a.AbstractVariable||"number"==typeof c))throw"Bad initializer to c.Equation";b=b instanceof a.Expression?b.clone():new a.Expression(b),c=c instanceof a.Expression?c.clone():new a.Expression(c),d.call(this,b,e,f),this.expression.addExpression(c,-1)}a.assert(this.strength instanceof a.Strength,"_strength not set")},toString:function(){return d.prototype.toString.call(this)+" = 0)"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.EditInfo=a.inherit({initialize:function(a,b,c,d,e){this.constraint=a,this.editPlus=b,this.editMinus=c,this.prevEditConstant=d,this.index=e},toString:function(){return"<cn="+this.constraint+", ep="+this.editPlus+", em="+this.editMinus+", pec="+this.prevEditConstant+", index="+this.index+">"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Tableau=a.inherit({initialize:function(){this.columns=new a.HashTable,this.rows=new a.HashTable,this._infeasibleRows=new a.HashSet,this._externalRows=new a.HashSet,this._externalParametricVars=new a.HashSet},noteRemovedVariable:function(b,c){a.trace&&console.log("c.Tableau::noteRemovedVariable: ",b,c);var d=this.columns.get(b);c&&d&&d.delete(c)},noteAddedVariable:function(a,b){b&&this.insertColVar(a,b)},getInternalInfo:function(){var a="Tableau Information:\n";return a+="Rows: "+this.rows.size,a+=" (= "+(this.rows.size-1)+" constraints)",a+="\nColumns: "+this.columns.size,a+="\nInfeasible Rows: "+this._infeasibleRows.size,a+="\nExternal basic variables: "+this._externalRows.size,a+="\nExternal parametric variables: ",a+=this._externalParametricVars.size,a+="\n"},toString:function(){var a="Tableau:\n";return this.rows.each(function(b,c){a+=b,a+=" <==> ",a+=c,a+="\n"}),a+="\nColumns:\n",a+=this.columns,a+="\nInfeasible rows: ",a+=this._infeasibleRows,a+="External basic variables: ",a+=this._externalRows,a+="External parametric variables: ",a+=this._externalParametricVars},insertColVar:function(b,c){var d=this.columns.get(b);d||(d=new a.HashSet,this.columns.set(b,d)),d.add(c)},addRow:function(b,c){a.trace&&a.fnenterprint("addRow: "+b+", "+c),this.rows.set(b,c),c.terms.each(function(a){this.insertColVar(a,b),a.isExternal&&this._externalParametricVars.add(a)},this),b.isExternal&&this._externalRows.add(b),a.trace&&a.traceprint(this.toString())},removeColumn:function(b){a.trace&&a.fnenterprint("removeColumn:"+b);var c=this.columns.get(b);c?(this.columns.delete(b),c.each(function(a){var c=this.rows.get(a);c.terms.delete(b)},this)):a.trace&&console.log("Could not find var",b,"in columns"),b.isExternal&&(this._externalRows.delete(b),this._externalParametricVars.delete(b))},removeRow:function(b){a.trace&&a.fnenterprint("removeRow:"+b);var c=this.rows.get(b);return a.assert(null!=c),c.terms.each(function(c){var e=this.columns.get(c);null!=e&&(a.trace&&console.log("removing from varset:",b),e.delete(b))},this),this._infeasibleRows.delete(b),b.isExternal&&this._externalRows.delete(b),this.rows.delete(b),a.trace&&a.fnexitprint("returning "+c),c},substituteOut:function(b,c){a.trace&&a.fnenterprint("substituteOut:"+b+", "+c),a.trace&&a.traceprint(this.toString());var d=this.columns.get(b);d.each(function(a){var d=this.rows.get(a);d.substituteOut(b,c,a,this),a.isRestricted&&d.constant<0&&this._infeasibleRows.add(a)},this),b.isExternal&&(this._externalRows.add(b),this._externalParametricVars.delete(b)),this.columns.delete(b)},columnsHasKey:function(a){return!!this.columns.get(a)}})}(this.c||module.parent.exports||{}),function(a){var b=a.Tableau,c=b.prototype,d=1e-8,e=a.Strength.weak;a.SimplexSolver=a.inherit({"extends":a.Tableau,initialize:function(){a.Tableau.call(this),this._stayMinusErrorVars=[],this._stayPlusErrorVars=[],this._errorVars=new a.HashTable,this._markerVars=new a.HashTable,this._objective=new a.ObjectiveVariable({name:"Z"}),this._editVarMap=new a.HashTable,this._editVarList=[],this._slackCounter=0,this._artificialCounter=0,this._dummyCounter=0,this.autoSolve=!0,this._needsSolving=!1,this._optimizeCount=0,this.rows.set(this._objective,a.Expression.empty()),this._editVariableStack=[0],a.trace&&a.traceprint("objective expr == "+this.rows.get(this._objective))},add:function(){for(var a=0;a<arguments.length;a++)this.addConstraint(arguments[a]);return this},_addEditConstraint:function(b,c,d){var e=this._editVarMap.size,f=c[0],g=c[1],h=new a.EditInfo(b,f,g,d,e);this._editVarMap.set(b.variable,h),this._editVarList[e]={v:b.variable,info:h}},addConstraint:function(b){a.trace&&a.fnenterprint("addConstraint: "+b);var c=new Array(2),d=new Array(1),e=this.newExpression(b,c,d);return d=d[0],this.tryAddingDirectly(e)||this.addWithArtificialVariable(e),this._needsSolving=!0,b.isEditConstraint&&this._addEditConstraint(b,c,d),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},addConstraintNoException:function(b){a.trace&&a.fnenterprint("addConstraintNoException: "+b);try{return this.addConstraint(b),!0}catch(c){return!1}},addEditVar:function(b,c,d){return a.trace&&a.fnenterprint("addEditVar: "+b+" @ "+c+" {"+d+"}"),this.addConstraint(new a.EditConstraint(b,c||a.Strength.strong,d))},beginEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this._infeasibleRows.clear(),this._resetStayConstants(),this._editVariableStack[this._editVariableStack.length]=this._editVarMap.size,this},endEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this.resolve(),this._editVariableStack.pop(),this.removeEditVarsTo(this._editVariableStack[this._editVariableStack.length-1]),this},removeAllEditVars:function(){return this.removeEditVarsTo(0)},removeEditVarsTo:function(b){try{for(var c=this._editVarList.length,d=b;c>d;d++)this._editVarList[d]&&this.removeConstraint(this._editVarMap.get(this._editVarList[d].v).constraint);return this._editVarList.length=b,a.assert(this._editVarMap.size==b,"_editVarMap.size == n"),this}catch(e){throw new a.InternalError("Constraint not found in removeEditVarsTo")}},addPointStays:function(b){return a.trace&&console.log("addPointStays",b),b.forEach(function(a,b){this.addStay(a.x,e,Math.pow(2,b)),this.addStay(a.y,e,Math.pow(2,b))},this),this},addStay:function(b,c,d){var f=new a.StayConstraint(b,c||e,d||1);return this.addConstraint(f)},removeConstraint:function(b){a.trace&&a.fnenterprint("removeConstraintInternal: "+b),a.trace&&a.traceprint(this.toString()),this._needsSolving=!0,this._resetStayConstants();var c=this.rows.get(this._objective),d=this._errorVars.get(b);a.trace&&a.traceprint("eVars == "+d),null!=d&&d.each(function(e){var f=this.rows.get(e);null==f?c.addVariable(e,-b.weight*b.strength.symbolicWeight.value,this._objective,this):c.addExpression(f,-b.weight*b.strength.symbolicWeight.value,this._objective,this),a.trace&&a.traceprint("now eVars == "+d)},this);var e=this._markerVars.get(b);if(this._markerVars.delete(b),null==e)throw new a.InternalError("Constraint not found in removeConstraintInternal");if(a.trace&&a.traceprint("Looking to remove var "+e),null==this.rows.get(e)){var f=this.columns.get(e);a.trace&&a.traceprint("Must pivot -- columns are "+f);var g=null,h=0;f.each(function(b){if(b.isRestricted){var c=this.rows.get(b),d=c.coefficientFor(e);if(a.trace&&a.traceprint("Marker "+e+"'s coefficient in "+c+" is "+d),0>d){var f=-c.constant/d;(null==g||h>f||a.approx(f,h)&&b.hashCode<g.hashCode)&&(h=f,g=b)}}},this),null==g&&(a.trace&&a.traceprint("exitVar is still null"),f.each(function(a){if(a.isRestricted){var b=this.rows.get(a),c=b.coefficientFor(e),d=b.constant/c;(null==g||h>d)&&(h=d,g=a)}},this)),null==g&&(0==f.size?this.removeColumn(e):f.escapingEach(function(a){return a!=this._objective?(g=a,{brk:!0}):void 0},this)),null!=g&&this.pivot(e,g)}if(null!=this.rows.get(e)&&this.removeRow(e),null!=d&&d.each(function(a){a!=e&&this.removeColumn(a)},this),b.isStayConstraint){if(null!=d)for(var j=0;j<this._stayPlusErrorVars.length;j++)d.delete(this._stayPlusErrorVars[j]),d.delete(this._stayMinusErrorVars[j])}else if(b.isEditConstraint){a.assert(null!=d,"eVars != null");var k=this._editVarMap.get(b.variable);this.removeColumn(k.editMinus),this._editVarMap.delete(b.variable)}return null!=d&&this._errorVars.delete(d),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},reset:function(){throw a.trace&&a.fnenterprint("reset"),new a.InternalError("reset not implemented")},resolveArray:function(b){a.trace&&a.fnenterprint("resolveArray"+b);var c=b.length;this._editVarMap.each(function(a,d){var e=d.index;c>e&&this.suggestValue(a,b[e])},this),this.resolve()},resolvePair:function(a,b){this.suggestValue(this._editVarList[0].v,a),this.suggestValue(this._editVarList[1].v,b),this.resolve()},resolve:function(){a.trace&&a.fnenterprint("resolve()"),this.dualOptimize(),this._setExternalVariables(),this._infeasibleRows.clear(),this._resetStayConstants()},suggestValue:function(b,c){a.trace&&console.log("suggestValue("+b+", "+c+")");var d=this._editVarMap.get(b);if(!d)throw new a.Error("suggestValue for variable "+b+", but var is not an edit variable");var e=c-d.prevEditConstant;return d.prevEditConstant=c,this.deltaEditConstant(e,d.editPlus,d.editMinus),this},solve:function(){return this._needsSolving&&(this.optimize(this._objective),this._setExternalVariables()),this},setEditedValue:function(b,c){if(!this.columnsHasKey(b)&&null==this.rows.get(b))return b.value=c,this;if(!a.approx(c,b.value)){this.addEditVar(b),this.beginEdit();try{this.suggestValue(b,c)}catch(d){throw new a.InternalError("Error in setEditedValue")}this.endEdit()}return this},addVar:function(b){if(!this.columnsHasKey(b)&&null==this.rows.get(b)){try{this.addStay(b)}catch(c){throw new a.InternalError("Error in addVar -- required failure is impossible")}a.trace&&a.traceprint("added initial stay on "+b)}return this},getInternalInfo:function(){var a=c.getInternalInfo.call(this);return a+="\nSolver info:\n",a+="Stay Error Variables: ",a+=this._stayPlusErrorVars.length+this._stayMinusErrorVars.length,a+=" ("+this._stayPlusErrorVars.length+" +, ",a+=this._stayMinusErrorVars.length+" -)\n",a+="Edit Variables: "+this._editVarMap.size,a+="\n"},getDebugInfo:function(){return this.toString()+this.getInternalInfo()+"\n"},toString:function(){var a=c.getInternalInfo.call(this);return a+="\n_stayPlusErrorVars: ",a+="["+this._stayPlusErrorVars+"]",a+="\n_stayMinusErrorVars: ",a+="["+this._stayMinusErrorVars+"]",a+="\n",a+="_editVarMap:\n"+this._editVarMap,a+="\n"},addWithArtificialVariable:function(b){a.trace&&a.fnenterprint("addWithArtificialVariable: "+b);var c=new a.SlackVariable({value:++this._artificialCounter,prefix:"a"}),d=new a.ObjectiveVariable({name:"az"}),e=b.clone();a.trace&&a.traceprint("before addRows:\n"+this),this.addRow(d,e),this.addRow(c,b),a.trace&&a.traceprint("after addRows:\n"+this),this.optimize(d);var f=this.rows.get(d);if(a.trace&&a.traceprint("azTableauRow.constant == "+f.constant),!a.approx(f.constant,0))throw this.removeRow(d),this.removeColumn(c),new a.RequiredFailure;var g=this.rows.get(c);if(null!=g){if(g.isConstant)return this.removeRow(c),this.removeRow(d),void 0;var h=g.anyPivotableVariable();this.pivot(h,c)}a.assert(null==this.rows.get(c),"rowExpression(av) == null"),this.removeColumn(c),this.removeRow(d)},tryAddingDirectly:function(b){a.trace&&a.fnenterprint("tryAddingDirectly: "+b);var c=this.chooseSubject(b);return null==c?(a.trace&&a.fnexitprint("returning false"),!1):(b.newSubject(c),this.columnsHasKey(c)&&this.substituteOut(c,b),this.addRow(c,b),a.trace&&a.fnexitprint("returning true"),!0)},chooseSubject:function(b){a.trace&&a.fnenterprint("chooseSubject: "+b);var c=null,d=!1,e=!1,f=b.terms,g=f.escapingEach(function(a,b){if(d){if(!a.isRestricted&&!this.columnsHasKey(a))return{retval:a}}else if(a.isRestricted){if(!e&&!a.isDummy&&0>b){var f=this.columns.get(a);(null==f||1==f.size&&this.columnsHasKey(this._objective))&&(c=a,e=!0)}}else c=a,d=!0},this);if(g&&void 0!==g.retval)return g.retval;if(null!=c)return c;var h=0,g=f.escapingEach(function(a,b){return a.isDummy?(this.columnsHasKey(a)||(c=a,h=b),void 0):{retval:null}},this);if(g&&void 0!==g.retval)return g.retval;if(!a.approx(b.constant,0))throw new a.RequiredFailure;return h>0&&b.multiplyMe(-1),c},deltaEditConstant:function(b,c,d){a.trace&&a.fnenterprint("deltaEditConstant :"+b+", "+c+", "+d);var e=this.rows.get(c);if(null!=e)return e.constant+=b,e.constant<0&&this._infeasibleRows.add(c),void 0;var f=this.rows.get(d);if(null!=f)return f.constant+=-b,f.constant<0&&this._infeasibleRows.add(d),void 0;var g=this.columns.get(d);g||console.log("columnVars is null -- tableau is:\n"+this),g.each(function(a){var c=this.rows.get(a),e=c.coefficientFor(d);c.constant+=e*b,a.isRestricted&&c.constant<0&&this._infeasibleRows.add(a)},this)},dualOptimize:function(){a.trace&&a.fnenterprint("dualOptimize:");for(var b=this.rows.get(this._objective);this._infeasibleRows.size;){var c=this._infeasibleRows.values()[0];this._infeasibleRows.delete(c);var d=null,e=this.rows.get(c);if(e&&e.constant<0){var g,f=Number.MAX_VALUE,h=e.terms;if(h.each(function(c,e){if(e>0&&c.isPivotable){var h=b.coefficientFor(c);g=h/e,(f>g||a.approx(g,f)&&c.hashCode<d.hashCode)&&(d=c,f=g)}}),f==Number.MAX_VALUE)throw new a.InternalError("ratio == nil (MAX_VALUE) in dualOptimize");this.pivot(d,c)}}},newExpression:function(b,c,d){a.trace&&(a.fnenterprint("newExpression: "+b),a.traceprint("cn.isInequality == "+b.isInequality),a.traceprint("cn.required == "+b.required));var e=b.expression,f=a.Expression.fromConstant(e.constant),g=new a.SlackVariable,h=new a.DummyVariable,i=new a.SlackVariable,j=new a.SlackVariable,k=e.terms;if(k.each(function(a,b){var c=this.rows.get(a);c?f.addExpression(c,b):f.addVariable(a,b)},this),b.isInequality){if(a.trace&&a.traceprint("Inequality, adding slack"),++this._slackCounter,g=new a.SlackVariable({value:this._slackCounter,prefix:"s"}),f.setVariable(g,-1),this._markerVars.set(b,g),!b.required){++this._slackCounter,i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(i,1);var l=this.rows.get(this._objective);l.setVariable(i,b.strength.symbolicWeight.value*b.weight),this.insertErrorVar(b,i),this.noteAddedVariable(i,this._objective)}}else if(b.required)a.trace&&a.traceprint("Equality, required"),++this._dummyCounter,h=new a.DummyVariable({value:this._dummyCounter,prefix:"d"}),c[0]=h,c[1]=h,d[0]=e.constant,f.setVariable(h,1),this._markerVars.set(b,h),a.trace&&a.traceprint("Adding dummyVar == d"+this._dummyCounter);else{a.trace&&a.traceprint("Equality, not required"),++this._slackCounter,j=new a.SlackVariable({value:this._slackCounter,prefix:"ep"}),i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(j,-1),f.setVariable(i,1),this._markerVars.set(b,j);
var l=this.rows.get(this._objective);a.trace&&console.log(l);var m=b.strength.symbolicWeight.value*b.weight;0==m&&(a.trace&&a.traceprint("cn == "+b),a.trace&&a.traceprint("adding "+j+" and "+i+" with swCoeff == "+m)),l.setVariable(j,m),this.noteAddedVariable(j,this._objective),l.setVariable(i,m),this.noteAddedVariable(i,this._objective),this.insertErrorVar(b,i),this.insertErrorVar(b,j),b.isStayConstraint?(this._stayPlusErrorVars[this._stayPlusErrorVars.length]=j,this._stayMinusErrorVars[this._stayMinusErrorVars.length]=i):b.isEditConstraint&&(c[0]=j,c[1]=i,d[0]=e.constant)}return f.constant<0&&f.multiplyMe(-1),a.trace&&a.fnexitprint("returning "+f),f},optimize:function(b){a.trace&&a.fnenterprint("optimize: "+b),a.trace&&a.traceprint(this.toString()),this._optimizeCount++;var c=this.rows.get(b);a.assert(null!=c,"zRow != null");for(var g,h,e=null,f=null;;){if(g=0,h=c.terms,h.escapingEach(function(a,b){return a.isPivotable&&g>b?(g=b,e=a,{brk:1}):void 0},this),g>=-d)return;a.trace&&console.log("entryVar:",e,"objectiveCoeff:",g);var i=Number.MAX_VALUE,j=this.columns.get(e),k=0;if(j.each(function(b){if(a.trace&&a.traceprint("Checking "+b),b.isPivotable){var c=this.rows.get(b),d=c.coefficientFor(e);a.trace&&a.traceprint("pivotable, coeff = "+d),0>d&&(k=-c.constant/d,(i>k||a.approx(k,i)&&b.hashCode<f.hashCode)&&(i=k,f=b))}},this),i==Number.MAX_VALUE)throw new a.InternalError("Objective function is unbounded in optimize");this.pivot(e,f),a.trace&&a.traceprint(this.toString())}},pivot:function(b,c){a.trace&&console.log("pivot: ",b,c);var d=!1;d&&console.time(" SimplexSolver::pivot"),null==b&&console.warn("pivot: entryVar == null"),null==c&&console.warn("pivot: exitVar == null"),d&&console.time("  removeRow");var e=this.removeRow(c);d&&console.timeEnd("  removeRow"),d&&console.time("  changeSubject"),e.changeSubject(c,b),d&&console.timeEnd("  changeSubject"),d&&console.time("  substituteOut"),this.substituteOut(b,e),d&&console.timeEnd("  substituteOut"),d&&console.time("  addRow"),this.addRow(b,e),d&&console.timeEnd("  addRow"),d&&console.timeEnd(" SimplexSolver::pivot")},_resetStayConstants:function(){a.trace&&console.log("_resetStayConstants");for(var b=this._stayPlusErrorVars,c=b.length,d=0;c>d;d++){var e=this.rows.get(b[d]);null===e&&(e=this.rows.get(this._stayMinusErrorVars[d])),null!=e&&(e.constant=0)}},_setExternalVariables:function(){a.trace&&a.fnenterprint("_setExternalVariables:"),a.trace&&a.traceprint(this.toString());var b={};this._externalParametricVars.each(function(c){null!=this.rows.get(c)?a.trace&&console.log("Error: variable"+c+" in _externalParametricVars is basic"):(c.value=0,b[c.name]=0)},this),this._externalRows.each(function(a){var c=this.rows.get(a);a.value!=c.constant&&(a.value=c.constant,b[a.name]=c.constant)},this),this._changed=b,this._needsSolving=!1,this._informCallbacks(),this.onsolved()},onsolved:function(){},_informCallbacks:function(){if(this._callbacks){var a=this._changed;this._callbacks.forEach(function(b){b(a)})}},_addCallback:function(a){var b=this._callbacks||(this._callbacks=[]);b[b.length]=a},insertErrorVar:function(b,c){a.trace&&a.fnenterprint("insertErrorVar:"+b+", "+c);var d=this._errorVars.get(c);d||(d=new a.HashSet,this._errorVars.set(b,d)),d.add(c)}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Timer=a.inherit({initialize:function(){this.isRunning=!1,this._elapsedMs=0},start:function(){return this.isRunning=!0,this._startReading=new Date,this},stop:function(){return this.isRunning=!1,this._elapsedMs+=new Date-this._startReading,this},reset:function(){return this.isRunning=!1,this._elapsedMs=0,this},elapsedTime:function(){return this.isRunning?(this._elapsedMs+(new Date-this._startReading))/1e3:this._elapsedMs/1e3}})}(this.c||module.parent.exports||{}),this.c.parser=function(){function a(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var b={parse:function(b,c){function k(a){g>e||(e>g&&(g=e,h=[]),h.push(a))}function l(){var a,b,c,d,f;if(d=e,f=e,a=z(),null!==a){for(b=[],c=m();null!==c;)b.push(c),c=m();null!==b?(c=z(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)}else a=null,e=f;return null!==a&&(a=function(a,b){return b}(d,a[1])),null===a&&(e=d),a}function m(){var a,b,c,d;return c=e,d=e,a=P(),null!==a?(b=s(),null!==b?a=[a,b]:(a=null,e=d)):(a=null,e=d),null!==a&&(a=function(a,b){return b}(c,a[0])),null===a&&(e=c),a}function n(){var a;return b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),a}function o(){var a;return/^[a-zA-Z]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[a-zA-Z]")),null===a&&(36===b.charCodeAt(e)?(a="$",e++):(a=null,0===f&&k('"$"')),null===a&&(95===b.charCodeAt(e)?(a="_",e++):(a=null,0===f&&k('"_"')))),a}function p(){var a;return f++,/^[\t\x0B\f \xA0\uFEFF]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\t\\x0B\\f \\xA0\\uFEFF]")),f--,0===f&&null===a&&k("whitespace"),a}function q(){var a;return/^[\n\r\u2028\u2029]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\n\\r\\u2028\\u2029]")),a}function r(){var a;return f++,10===b.charCodeAt(e)?(a="\n",e++):(a=null,0===f&&k('"\\n"')),null===a&&("\r\n"===b.substr(e,2)?(a="\r\n",e+=2):(a=null,0===f&&k('"\\r\\n"')),null===a&&(13===b.charCodeAt(e)?(a="\r",e++):(a=null,0===f&&k('"\\r"')),null===a&&(8232===b.charCodeAt(e)?(a="\u2028",e++):(a=null,0===f&&k('"\\u2028"')),null===a&&(8233===b.charCodeAt(e)?(a="\u2029",e++):(a=null,0===f&&k('"\\u2029"')))))),f--,0===f&&null===a&&k("end of line"),a}function s(){var a,c,d;return d=e,a=z(),null!==a?(59===b.charCodeAt(e)?(c=";",e++):(c=null,0===f&&k('";"')),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=y(),null!==a?(c=r(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=z(),null!==a?(c=t(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d))),a}function t(){var a,c;return c=e,f++,b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),f--,null===a?a="":(a=null,e=c),a}function u(){var a;return f++,a=v(),null===a&&(a=x()),f--,0===f&&null===a&&k("comment"),a}function v(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function w(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=q()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=q()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function x(){var a,c,d,g,h,i,j;if(h=e,"//"===b.substr(e,2)?(a="//",e+=2):(a=null,0===f&&k('"//"')),null!==a){for(c=[],i=e,j=e,f++,d=q(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,d=q(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?(d=q(),null===d&&(d=t()),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function y(){var a,b;for(a=[],b=p(),null===b&&(b=w(),null===b&&(b=x()));null!==b;)a.push(b),b=p(),null===b&&(b=w(),null===b&&(b=x()));return a}function z(){var a,b;for(a=[],b=p(),null===b&&(b=r(),null===b&&(b=u()));null!==b;)a.push(b),b=p(),null===b&&(b=r(),null===b&&(b=u()));return a}function A(){var a,b;return b=e,a=C(),null===a&&(a=B()),null!==a&&(a=function(a,b){return{type:"NumericLiteral",value:b}}(b,a)),null===a&&(e=b),a}function B(){var a,c,d;if(d=e,/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]")),null!==c)for(a=[];null!==c;)a.push(c),/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]"));else a=null;return null!==a&&(a=function(a,b){return parseInt(b.join(""))}(d,a)),null===a&&(e=d),a}function C(){var a,c,d,g,h;return g=e,h=e,a=B(),null!==a?(46===b.charCodeAt(e)?(c=".",e++):(c=null,0===f&&k('"."')),null!==c?(d=B(),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)):(a=null,e=h),null!==a&&(a=function(a,b){return parseFloat(b.join(""))}(g,a)),null===a&&(e=g),a}function D(){var a,c,d,g;if(g=e,/^[\-+]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\-+]")),a=null!==a?a:"",null!==a){if(/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]")),null!==d)for(c=[];null!==d;)c.push(d),/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]"));else c=null;null!==c?a=[a,c]:(a=null,e=g)}else a=null,e=g;return a}function E(){var a,b;return f++,b=e,a=F(),null!==a&&(a=function(a,b){return b}(b,a)),null===a&&(e=b),f--,0===f&&null===a&&k("identifier"),a}function F(){var a,b,c,d,g;if(f++,d=e,g=e,a=o(),null!==a){for(b=[],c=o();null!==c;)b.push(c),c=o();null!==b?a=[a,b]:(a=null,e=g)}else a=null,e=g;return null!==a&&(a=function(a,b,c){return b+c.join("")}(d,a[0],a[1])),null===a&&(e=d),f--,0===f&&null===a&&k("identifier"),a}function G(){var a,c,d,g,h,i,j;return i=e,a=E(),null!==a&&(a=function(a,b){return{type:"Variable",name:b}}(i,a)),null===a&&(e=i),null===a&&(a=A(),null===a&&(i=e,j=e,40===b.charCodeAt(e)?(a="(",e++):(a=null,0===f&&k('"("')),null!==a?(c=z(),null!==c?(d=P(),null!==d?(g=z(),null!==g?(41===b.charCodeAt(e)?(h=")",e++):(h=null,0===f&&k('")"')),null!==h?a=[a,c,d,g,h]:(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j),null!==a&&(a=function(a,b){return b}(i,a[2])),null===a&&(e=i))),a}function H(){var a,b,c,d,f;return a=G(),null===a&&(d=e,f=e,a=I(),null!==a?(b=z(),null!==b?(c=H(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)):(a=null,e=f),null!==a&&(a=function(a,b,c){return{type:"UnaryExpression",operator:b,expression:c}}(d,a[0],a[2])),null===a&&(e=d)),a}function I(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"')),null===a&&(33===b.charCodeAt(e)?(a="!",e++):(a=null,0===f&&k('"!"')))),a}function J(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=H(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=K(),null!==d?(f=z(),null!==f?(g=H(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=K(),null!==d?(f=z(),null!==f?(g=H(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"MultiplicativeExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function K(){var a;return 42===b.charCodeAt(e)?(a="*",e++):(a=null,0===f&&k('"*"')),null===a&&(47===b.charCodeAt(e)?(a="/",e++):(a=null,0===f&&k('"/"'))),a}function L(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=J(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=M(),null!==d?(f=z(),null!==f?(g=J(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=M(),null!==d?(f=z(),null!==f?(g=J(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"AdditiveExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function M(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"'))),a}function N(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=L(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=O(),null!==d?(f=z(),null!==f?(g=L(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=O(),null!==d?(f=z(),null!==f?(g=L(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"Inequality",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function O(){var a;return"<="===b.substr(e,2)?(a="<=",e+=2):(a=null,0===f&&k('"<="')),null===a&&(">="===b.substr(e,2)?(a=">=",e+=2):(a=null,0===f&&k('">="')),null===a&&(60===b.charCodeAt(e)?(a="<",e++):(a=null,0===f&&k('"<"')),null===a&&(62===b.charCodeAt(e)?(a=">",e++):(a=null,0===f&&k('">"'))))),a}function P(){var a,c,d,g,h,i,j,l,m;if(j=e,l=e,a=N(),null!==a){for(c=[],m=e,d=z(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=z(),null!==h?(i=N(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==d;)c.push(d),m=e,d=z(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=z(),null!==h?(i=N(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==c?a=[a,c]:(a=null,e=l)}else a=null,e=l;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"Equality",operator:c[e][1],left:d,right:c[e][3]};return d}(j,a[0],a[1])),null===a&&(e=j),a}function Q(a){a.sort();for(var b=null,c=[],d=0;d<a.length;d++)a[d]!==b&&(c.push(a[d]),b=a[d]);return c}function R(){for(var a=1,c=1,d=!1,f=0;f<Math.max(e,g);f++){var h=b.charAt(f);"\n"===h?(d||a++,c=1,d=!1):"\r"===h||"\u2028"===h||"\u2029"===h?(a++,c=1,d=!0):(c++,d=!1)}return{line:a,column:c}}var d={start:l,Statement:m,SourceCharacter:n,IdentifierStart:o,WhiteSpace:p,LineTerminator:q,LineTerminatorSequence:r,EOS:s,EOF:t,Comment:u,MultiLineComment:v,MultiLineCommentNoLineTerminator:w,SingleLineComment:x,_:y,__:z,Literal:A,Integer:B,Real:C,SignedInteger:D,Identifier:E,IdentifierName:F,PrimaryExpression:G,UnaryExpression:H,UnaryOperator:I,MultiplicativeExpression:J,MultiplicativeOperator:K,AdditiveExpression:L,AdditiveOperator:M,InequalityExpression:N,InequalityOperator:O,LinearExpression:P};if(void 0!==c){if(void 0===d[c])throw new Error("Invalid rule name: "+a(c)+".")}else c="start";var e=0,f=0,g=0,h=[],S=d[c]();if(null===S||e!==b.length){var T=Math.max(e,g),U=T<b.length?b.charAt(T):null,V=R();throw new this.SyntaxError(Q(h),U,T,V.line,V.column)}return S},toSource:function(){return this._source}};return b.SyntaxError=function(b,c,d,e,f){function g(b,c){var d,e;switch(b.length){case 0:d="end of input";break;case 1:d=b[0];break;default:d=b.slice(0,b.length-1).join(", ")+" or "+b[b.length-1]}return e=c?a(c):"end of input","Expected "+d+" but "+e+" found."}this.name="SyntaxError",this.expected=b,this.found=c,this.message=g(b,c),this.offset=d,this.line=e,this.column=f},b.SyntaxError.prototype=Error.prototype,b}(),function(a){"use strict";var b=new a.SimplexSolver,c={},d={},e=a.Strength.weak;a.Strength.medium,a.Strength.strong,a.Strength.required;var i=function(f){if(d[f])return d[f];switch(f.type){case"Inequality":var g="<="==f.operator?a.LEQ:a.GEQ,h=new a.Inequality(i(f.left),g,i(f.right),e);return b.addConstraint(h),h;case"Equality":var h=new a.Equation(i(f.left),i(f.right),e);return b.addConstraint(h),h;case"MultiplicativeExpression":var h=a.times(i(f.left),i(f.right));return b.addConstraint(h),h;case"AdditiveExpression":return"+"==f.operator?a.plus(i(f.left),i(f.right)):a.minus(i(f.left),i(f.right));case"NumericLiteral":return new a.Expression(f.value);case"Variable":return c[f.name]||(c[f.name]=new a.Variable({name:f.name})),c[f.name];case"UnaryExpression":console.log("UnaryExpression...WTF?")}},j=function(a){return a.map(i)};a._api=function(){var c=Array.prototype.slice.call(arguments);if(1==c.length){if("string"==typeof c[0]){var d=a.parser.parse(c[0]);return j(d)}"function"==typeof c[0]&&b._addCallback(c[0])}}}(this.c||module.parent.exports||{});
}).call(
  (typeof module != "undefined") ?
      (module.compiled = true && module) : this
);

},{}],3:[function(require,module,exports){
var Command,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Command = (function() {
  var _i, _results;

  Command.prototype.type = 'Command';

  function Command(operation, parent, index, context) {
    var command, match;
    if (!(command = operation.command)) {
      match = Command.match(this, operation, parent, index, context);
      command = Command.assign(this, operation, match, context);
      if (!parent) {
        command = Command.descend(command, this, operation);
      }
    }
    return command;
  }

  Command.prototype.solve = function(engine, operation, continuation, scope, ascender, ascending) {
    var args, domain, result;
    domain = operation.domain || engine;
    switch (typeof (result = this.retrieve(domain, operation, continuation, scope, ascender, ascending))) {
      case 'undefined':
        break;
      case 'function':
        if ((continuation = result.call(this, engine, operation, continuation, scope)) == null) {
          return;
        }
        result = void 0;
        break;
      default:
        if (continuation.indexOf(this.PAIR) > -1 || this.reference) {
          return result;
        }
    }
    if (result === void 0) {
      if (this.head) {
        return this.jump(domain, operation, continuation, scope, ascender, ascending);
      }
      args = this.descend(domain, operation, continuation, scope, ascender, ascending);
      if (args === false) {
        return;
      }
      this.log(args, engine, operation, continuation, scope);
      result = this.before(args, domain, operation, continuation, scope, ascender, ascending);
      if (result == null) {
        result = this.execute.apply(this, args);
      }
      if (result = this.after(args, result, domain, operation, continuation, scope, ascender, ascending)) {
        continuation = this["continue"](domain, operation, continuation, scope, ascender, ascending);
      }
      this.unlog(engine, result);
    }
    if (result != null) {
      return this.ascend(engine, operation, continuation, scope, result, ascender, ascending);
    }
  };

  Command.prototype.descend = function(engine, operation, continuation, scope, ascender, ascending) {
    var args, argument, command, contd, extras, i, index, length, shift, _i, _ref;
    length = operation.length - 1 + this.padding;
    args = Array(length);
    index = 0;
    shift = this.contextualize(args, engine, operation, continuation, scope, ascender, ascending);
    while (++index < operation.length) {
      if (ascender === index) {
        argument = ascending;
      } else {
        argument = operation[index];
        if (argument instanceof Array) {
          command = argument.command || engine.Command(argument);
          argument.parent || (argument.parent = operation);
          if (continuation && ascender) {
            contd = this.connect(engine, operation, continuation, scope, args, ascender);
          }
          argument = command.solve(operation.domain || engine, argument, contd || continuation, scope, void 0, ascending);
          if (argument === void 0) {
            return false;
          }
        }
      }
      args[this.permutation[index - 1] + shift] = argument;
    }
    extras = (_ref = this.extras) != null ? _ref : this.execute.length - length;
    if (extras > 0) {
      for (i = _i = 0; _i < extras; i = _i += 1) {
        args.push(arguments[i]);
      }
    }
    return args;
  };

  Command.prototype.ascend = function(engine, operation, continuation, scope, result, ascender, ascending) {
    var domain, parent, top, wrapper, yielded;
    if ((parent = operation.parent)) {
      if (domain = operation.domain) {
        if ((wrapper = parent.domain) && wrapper !== domain && wrapper !== engine) {
          this.transfer(operation.domain, parent, continuation, scope, ascender, ascending, parent.command);
          return;
        }
      }
      if (top = parent.command) {
        if (yielded = typeof top["yield"] === "function" ? top["yield"](result, engine, operation, continuation, scope, ascender) : void 0) {
          if (yielded === true) {
            return;
          }
          if (yielded.command) {
            return yielded.command.solve(yielded.domain || engine, yielded, continuation, scope, -1, result);
          }
          return yielded;
        }
      }
      if (ascender > -1) {
        return top.solve(parent.domain || engine, parent, continuation, scope, parent.indexOf(operation), result);
      }
    }
    return result;
  };

  Command.prototype.contextualize = function(args, engine, operation, continuation, scope, ascender, ascending) {
    var command, context, node, parent, _ref;
    if (ascender === -1 && (ascending != null)) {
      node = ascending;
    } else if (context = operation.context || ((parent = operation.parent) && ((_ref = parent.command) != null ? _ref.sequence : void 0) && parent.context)) {
      if ((command = context.command).key != null) {
        if (context[0] === '&') {
          node = scope;
        } else {
          node = this.getByPath(engine, this.delimit(continuation));
        }
      } else {
        node = command.solve(context.domain || engine, context, continuation, scope, -2);
      }
    }
    if (node) {
      args.length++;
      args[0] = this.precontextualize(engine, scope, node);
    }
    return operation.context && 1 || 0;
  };

  Command.prototype.precontextualize = function(engine, scope, element) {
    return element || scope;
  };

  Command.match = function(engine, operation, parent, index, context) {
    var Default, argument, command, i, implicit, j, kind, match, signature, type, typed;
    i = -1;
    j = operation.length;
    while (++i < j) {
      argument = operation[i];
      typed = typeof argument;
      if (typed === 'object') {
        if (argument.push) {
          if (argument.parent == null) {
            argument.parent = operation;
          }
          command = (argument.domain || engine).Command(argument, operation, i, implicit);
          type = command.type;
          if (i) {
            if (implicit) {
              implicit = argument;
            }
          } else {
            if ((Default = command.Sequence)) {
              implicit = argument;
            } else {
              Default = Command.Sequence;
            }
          }
        } else if (i) {
          type = this.typeOfObject(argument);
        } else {
          kind = this.typeOfObject(argument);
          if (!(signature = engine.signatures[kind.toLowerCase()])) {
            return this.uncallable(kind.toLowerCase(), operation, engine);
          }
          if (!(type = context && context.command.type)) {
            continue;
          }
        }
      } else if (i) {
        type = this.types[typed];
      } else {
        if (typed === 'number') {
          if (!(signature = engine.signatures.number)) {
            return this.uncallable('number', operation, engine);
          }
        } else {
          if (!(signature = engine.signatures[argument])) {
            if (!(Default = engine.Default)) {
              return this.uncallable(argument, operation, engine);
            }
          }
        }
        if (!(type = context != null ? context.command.type : void 0)) {
          continue;
        }
      }
      if (signature) {
        if (match = signature[type] || signature.Any) {
          signature = match;
        } else if (!(Default || (Default = signature.Default || engine.Default))) {
          return this.unexpected(type, operation, signature, engine);
        }
      }
      if (Default != null ? Default.prototype.proxy : void 0) {
        implicit = context;
      }
    }
    if (command = Default || (signature != null ? signature.resolved : void 0) || engine.Default) {
      return command;
    } else {
      return this.unexpected('end of arguments', operation, signature, engine);
    }
  };

  Command.uncallable = function(type, operation, engine) {
    throw new Error("[" + engine.displayName + "] Undefined command: `" + type + "` called as `" + this.prototype.toExpression(operation) + '`');
  };

  Command.unexpected = function(type, operation, signature, engine) {
    var expected, property;
    expected = [];
    for (property in signature) {
      if (property !== 'resolved') {
        expected.push(property);
      }
    }
    if (expected.length) {
      throw new Error("[" + engine.displayName + "] Unexpected argument: `" + type + "` in `" + this.prototype.toExpression(operation) + '` expected ' + expected.join(', '));
    } else {
      throw new Error("[" + engine.displayName + "] Too many arguments: got `" + type + "` in `" + this.prototype.toExpression(operation) + "`");
    }
  };

  Command.assign = function(engine, operation, match, context) {
    var command;
    if (!(command = match.instance)) {
      command = new match(operation, engine);
    }
    if (context) {
      operation.context = context;
    }
    operation.command = command;
    if (command.key != null) {
      command.push(operation, context);
    } else {
      (command.definition || match).instance = command;
    }
    return command;
  };

  Command.descend = function(command, engine, operation) {
    var advices, argument, cmd, proto, result, type, _i, _j, _len, _len1;
    if (advices = command.advices) {
      for (_i = 0, _len = advices.length; _i < _len; _i++) {
        type = advices[_i];
        result = (proto = type.prototype).condition ? proto.condition(engine, operation, command) : type(engine, operation, command);
        if (!result) {
          continue;
        }
        if (result !== true) {
          type = result;
        }
        if (!(command = type.instance)) {
          command = new type(operation);
        }
        operation.command = command;
        if (command.key == null) {
          type.instance = command;
        }
        break;
      }
    }
    for (_j = 0, _len1 = operation.length; _j < _len1; _j++) {
      argument = operation[_j];
      if (cmd = argument.command) {
        Command.descend(cmd, engine, argument);
      }
    }
    return command;
  };

  Command.prototype["continue"] = function(engine, operation, continuation) {
    return continuation;
  };

  Command.prototype.before = function() {};

  Command.prototype.after = function(args, result) {
    return result;
  };

  Command.prototype.log = function(args, engine, operation, continuation, scope, name) {
    return engine.console.push(name || operation[0], args, continuation || "");
  };

  Command.prototype.unlog = function(engine, result) {
    return engine.console.pop(result);
  };

  Command.prototype.patch = function(engine, operation, continuation, scope, replacement) {
    var domain, op, _ref;
    op = this.sanitize(engine, operation, void 0, replacement);
    if (!((_ref = op.parent.command) != null ? _ref.boundaries : void 0)) {
      op = op.parent;
    }
    domain = replacement || engine;
    if (op.domain !== domain && op.command) {
      return op.command.transfer(domain, op, continuation, scope, void 0, void 0, op.command, replacement);
    }
  };

  Command.prototype.transfer = function(engine, operation, continuation, scope, ascender, ascending, top, replacement) {
    var domain, meta, parent, path, value, _ref, _ref1, _ref2;
    if ((meta = this.getMeta(operation)) && !engine.finalized) {
      for (path in operation.variables) {
        if ((value = (replacement || engine).values[path]) != null) {
          (meta.values || (meta.values = {}))[path] = value;
        } else if ((_ref = meta.values) != null ? _ref[path] : void 0) {
          delete meta.values[path];
        }
      }
    }
    if (top) {
      parent = operation;
      while (((_ref1 = parent.parent) != null ? _ref1.domain : void 0) === parent.domain && !parent.parent.command.boundaries) {
        operation = parent;
        parent = parent.parent;
      }
      if (!(domain = parent.domain)) {
        if (domain = (_ref2 = parent.command.domains) != null ? _ref2[parent.indexOf(operation)] : void 0) {
          domain = engine[domain];
        }
      }
      return engine.updating.push([parent], domain);
    }
  };

  Command.prototype.getMeta = function(operation) {
    var parent;
    parent = operation;
    while (parent = parent.parent) {
      if (parent[0].key != null) {
        return parent[0];
      }
    }
  };

  Command.prototype.connect = function(engine, operation, continuation, scope, args, ascender) {
    if ((ascender != null) && continuation[continuation.length - 1] !== this.DESCEND) {
      return this.delimit(continuation, this.PAIR);
    }
  };

  Command.prototype.rewind = function(engine, operation, continuation, scope) {
    return this.getPrefixPath(engine, continuation);
  };

  Command.prototype.fork = function(engine, continuation, item) {
    return this.delimit(continuation + engine.identify(item), this.ASCEND);
  };

  Command.prototype.jump = function() {};

  Command.prototype.retrieve = function() {};

  Command.prototype.permutation = (function() {
    _results = [];
    for (_i = 0; _i < 640; _i++){ _results.push(_i); }
    return _results;
  }).apply(this);

  Command.prototype.padding = 0;

  Command.prototype.extras = void 0;

  Command.prototype.toExpression = function(operation) {
    var i, str, _j, _k, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    switch (typeof operation) {
      case 'number':
        return operation;
      case 'string':
        return '"' + operation + '"';
    }
    if (typeof (str = operation[0]) === 'string') {
      if (str === 'get') {
        if (operation.length === 2) {
          return operation[1];
        } else {
          return operation[1].command.path + '[' + operation[2] + ']';
        }
      } else if (str.match(/^[a-zA-Z]/)) {
        str += '(';
        for (i = _j = 1, _ref = operation.length; _j < _ref; i = _j += 1) {
          if (i > 1) {
            str += ', ';
          }
          str += this.toExpression((_ref1 = operation[i]) != null ? _ref1 : '');
        }
        return str + ')';
      } else {
        return this.toExpression((_ref2 = operation[1]) != null ? _ref2 : '') + str + this.toExpression((_ref3 = operation[2]) != null ? _ref3 : '');
      }
    }
    str = '';
    for (i = _k = 0, _ref4 = operation.length; _k < _ref4; i = _k += 1) {
      if (i) {
        str += ', ';
      }
      str += this.toExpression((_ref5 = operation[i]) != null ? _ref5 : '');
    }
    return str;
  };

  Command.prototype.sanitize = function(engine, operation, ascend, replacement) {
    var argument, parent, _j, _len;
    if (ascend !== false) {
      for (_j = 0, _len = operation.length; _j < _len; _j++) {
        argument = operation[_j];
        if (ascend !== argument) {
          if (argument.push && (engine === true || (argument != null ? argument.domain : void 0) === engine)) {
            if (argument[0] === 'get' && engine !== true) {
              return ascend;
            }
            this.sanitize(engine, argument, false, replacement);
          }
        }
      }
    }
    operation.domain = operation.command = void 0;
    if (replacement) {
      operation.domain = replacement;
      replacement.Command(operation);
    }
    if (ascend !== false) {
      if ((parent = operation.parent) && parent.domain === engine && !parent.command.boundaries) {
        return this.sanitize(engine, parent, operation, replacement);
      }
    }
    return operation;
  };

  Command.prototype.ASCEND = String.fromCharCode(8593);

  Command.prototype.PAIR = String.fromCharCode(8594);

  Command.prototype.DESCEND = String.fromCharCode(8595);

  Command.prototype.DELIMITERS = [8593, 8594, 8595];

  Command.prototype.delimit = function(path, delimeter) {
    if (delimeter == null) {
      delimeter = '';
    }
    if (!path) {
      return path;
    }
    if (this.DELIMITERS.indexOf(path.charCodeAt(path.length - 1)) > -1) {
      return path.substring(0, path.length - 1) + delimeter;
    } else {
      return path + delimeter;
    }
  };

  Command.prototype.getRoot = function(operation) {
    while (operation.parent && operation.command.type !== 'Default') {
      operation = operation.parent;
    }
    return operation;
  };

  Command.extend = function(definition, methods) {
    var Constructor, Kommand, Prototype, property, value;
    if ((Constructor = this.prototype.constructor) === Command || Constructor.length === 0) {
      Constructor = void 0;
    }
    Kommand = function() {
      if (Constructor) {
        return Constructor.apply(this, arguments);
      }
    };
    Kommand.__super__ = this;
    Prototype = function() {};
    Prototype.prototype = this.prototype;
    Kommand.prototype = new Prototype;
    Kommand.prototype.definition = Kommand;
    Kommand.extend = Command.extend;
    Kommand.define = Command.define;
    for (property in definition) {
      value = definition[property];
      Kommand.prototype[property] = value;
    }
    if (methods) {
      Kommand.define(methods);
    }
    return Kommand;
  };

  Command.define = function(name, options) {
    var property, value;
    if (!options) {
      for (property in name) {
        value = name[property];
        Command.define.call(this, property, value);
      }
    } else {
      if (typeof options === 'function') {
        options = {
          execute: options
        };
      }
      this[name] = this.extend(options);
    }
  };

  Command.types = {
    'string': 'String',
    'number': 'Number',
    'object': 'Object',
    'boolean': 'Boolean'
  };

  Command.typeOfObject = function(object) {
    if (object.nodeType) {
      return 'Node';
    }
    if (object.push) {
      return 'List';
    }
    return 'Object';
  };

  Command.orphanize = function(operation) {
    var arg, _j, _len;
    if (operation.domain) {
      operation.domain = void 0;
    }
    if (operation.variables) {
      operation.variables = void 0;
    }
    for (_j = 0, _len = operation.length; _j < _len; _j++) {
      arg = operation[_j];
      if (arg != null ? arg.push : void 0) {
        this.orphanize(arg);
      }
    }
    return operation;
  };

  Command.compile = function(engine, command, force) {
    var Types, aliases, name, property, proto, value, _base, _j, _len, _ref, _ref1;
    if (!command) {
      if (engine.proto.hasOwnProperty('$signatures') && !force) {
        _ref = engine.proto.$signatures;
        for (property in _ref) {
          value = _ref[property];
          engine.signatures[property] = value;
        }
      } else {
        for (property in engine) {
          value = engine[property];
          if (((proto = value != null ? value.prototype : void 0) != null) && proto instanceof Command) {
            if (property.match(/^[A-Z]/)) {
              this.compile(engine, value);
            }
          }
        }
        engine.proto.$signatures = {};
        _ref1 = engine.signatures;
        for (property in _ref1) {
          value = _ref1[property];
          engine.proto.$signatures[property] = value;
        }
      }
      return;
    }
    if ((engine.compiled || (engine.compiled = [])).indexOf(command) > -1) {
      return;
    }
    engine.compiled.push(command);
    Types = command.types = {};
    for (property in command) {
      value = command[property];
      if (property.match(/^[A-Z]/)) {
        if ((value != null ? value.prototype : void 0) instanceof Command) {
          Types[property] = value;
          this.compile(engine, value);
        }
      }
    }
    for (property in command) {
      value = command[property];
      if (value !== Command[property] && property !== '__super__') {
        if ((value != null ? value.prototype : void 0) instanceof Command) {
          if (!property.match(/^[A-Z]/)) {
            if (value.__super__ === command) {
              this.register(engine.signatures, property, value, Types);
              if (engine.helps) {
                (_base = engine.$prototype)[property] || (_base[property] = this.Helper(engine, property));
                if (aliases = value.prototype.helpers) {
                  for (_j = 0, _len = aliases.length; _j < _len; _j++) {
                    name = aliases[_j];
                    engine.$prototype[name] = engine.$prototype[property];
                  }
                }
              }
            }
          }
        }
      }
    }
    this.Types = Types;
    return this;
  };

  Command.Helper = function(engine, name) {
    return function() {
      var arg, args, command, extras, index, length, parent, permutation, permuted, result, _j, _len, _ref;
      args = Array.prototype.slice.call(arguments);
      command = Command.match(engine, [name].concat(args)).prototype;
      if (!(parent = command.constructor.__super__)) {
        return this.engine.solve([name].concat(__slice.call(arguments)));
      }
      length = command.padding;
      if (command.hasOwnProperty('permutation')) {
        length += (permutation = command.permutation).length;
        permuted = [];
        for (index = _j = 0, _len = args.length; _j < _len; index = ++_j) {
          arg = args[index];
          permuted[permutation[index]] = arg;
        }
        args = permuted;
      }
      if (length > args.length) {
        args.length = length;
      }
      if (extras = (_ref = command.extras) != null ? _ref : command.execute.length) {
        args.push(this.input);
        if (extras > 1) {
          args.push(args);
          if (extras > 2) {
            args.push('');
            if (extras > 3) {
              args.push(this.scope);
            }
          }
        }
        if ((result = command.execute.apply(command, args)) != null) {
          if (command.ascend !== parent.ascend) {
            command.ascend(engine.input, args, '', this.scope, result);
          }
          return result;
        }
      }
    };
  };


  /*
  
  Generate lookup structures to match methods by name and argument type signature
  
  Signature for `['==', ['get', 'a'], 10]` would be `engine.signatures['==']['Variable']['Number']`
  
  A matched signature returns customized class for an operation that can further
  pick a sub-class dynamically. Signatures allows special case optimizations and
  composition to be implemented structurally, instead of branching in runtime.
  
  Signatures are shared between commands. Dispatcher support css-style
  typed optional argument groups, but has no support for keywords or repeating groups yet
   */

  Command.sign = function(command, object) {
    var signature, signatures, signed, storage, _j, _len;
    if (signed = command.signed) {
      return signed;
    }
    command.signed = storage = [];
    if (signature = object.signature) {
      this.get(command, storage, signature);
    } else if (signature === false) {
      storage.push(['default']);
    } else if (signatures = object.signatures) {
      for (_j = 0, _len = signatures.length; _j < _len; _j++) {
        signature = signatures[_j];
        this.get(command, storage, signature);
      }
    }
    return storage;
  };

  Command.permute = function(arg, permutation) {
    var group, i, index, j, keys, position, values, _j, _k, _l, _len, _len1, _m, _ref, _ref1, _ref2;
    keys = Object.keys(arg);
    if (!permutation) {
      return keys;
    }
    values = Object.keys(arg);
    group = [];
    for (index = _j = 0, _len = permutation.length; _j < _len; index = ++_j) {
      position = permutation[index];
      if (position !== null) {
        group[position] = keys[index];
      }
    }
    for (i = _k = _ref = permutation.length, _ref1 = keys.length; _k < _ref1; i = _k += 1) {
      for (j = _l = 0, _ref2 = keys.length; _l < _ref2; j = _l += 1) {
        if (group[j] == null) {
          group[j] = keys[i];
          break;
        }
      }
    }
    for (_m = 0, _len1 = group.length; _m < _len1; _m++) {
      arg = group[_m];
      if (arg === void 0) {
        return;
      }
    }
    return group;
  };

  Command.getPermutation = function(args, properties) {
    var arg, index, result, _j, _k, _len;
    result = [];
    for (index = _j = 0, _len = args.length; _j < _len; index = ++_j) {
      arg = args[index];
      if (arg !== null) {
        result[arg] = properties[index];
      }
    }
    for (index = _k = result.length - 1; _k >= 0; index = _k += -1) {
      arg = result[index];
      if (arg == null) {
        result.splice(index, 1);
      }
    }
    return result;
  };

  Command.getPositions = function(args) {
    var arg, index, result, value, _j, _k, _len;
    result = [];
    for (index = _j = 0, _len = args.length; _j < _len; index = ++_j) {
      value = args[index];
      if (value != null) {
        result[value] = index;
      }
    }
    for (index = _k = result.length - 1; _k >= 0; index = _k += -1) {
      arg = result[index];
      if (arg == null) {
        result.splice(index, 1);
      }
    }
    return result;
  };

  Command.getProperties = function(signature) {
    var a, arg, definition, properties, property, _j, _k, _len, _len1;
    if (properties = signature.properties) {
      return properties;
    }
    signature.properties = properties = [];
    for (_j = 0, _len = signature.length; _j < _len; _j++) {
      arg = signature[_j];
      if (arg.push) {
        for (_k = 0, _len1 = arg.length; _k < _len1; _k++) {
          a = arg[_k];
          for (property in a) {
            definition = a[property];
            properties.push(definition);
          }
        }
      } else {
        for (property in arg) {
          definition = arg[property];
          properties.push(definition);
        }
      }
    }
    return properties;
  };

  Command.generate = function(combinations, positions, properties, combination, length) {
    var i, j, position, props, type, _j, _len, _ref;
    if (combination) {
      i = combination.length;
    } else {
      combination = [];
      combinations.push(combination);
      i = 0;
    }
    while ((props = properties[i]) === void 0 && i < properties.length) {
      i++;
    }
    if (i === properties.length) {
      combination.length = length;
      combination.push(positions);
    } else {
      _ref = properties[i];
      for (j = _j = 0, _len = _ref.length; _j < _len; j = ++_j) {
        type = _ref[j];
        if (j === 0) {
          combination.push(type);
        } else {
          position = combinations.indexOf(combination);
          combination = combination.slice(0, i);
          combination.push(type);
          combinations.push(combination);
        }
        this.generate(combinations, positions, properties, combination, length);
      }
    }
    return combinations;
  };

  Command.write = function(command, storage, combination) {
    var arg, i, last, proto, resolved, variant, _j, _ref, _ref1, _ref2;
    for (i = _j = 0, _ref = combination.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
      if ((arg = combination[i]) === 'default') {
        storage.Default = command;
      } else {
        last = combination.length - 1;
        if (arg !== void 0 && i < last) {
          storage = storage[arg] || (storage[arg] = {});
        } else {
          variant = command.extend({
            permutation: combination[last],
            padding: last - i,
            definition: command
          });
          if (resolved = storage.resolved) {
            proto = resolved.prototype;
            if (variant.prototype.condition) {
              if (!proto.hasOwnProperty('advices')) {
                proto.advices = ((_ref1 = proto.advices) != null ? _ref1.slice() : void 0) || [];
                if (proto.condition) {
                  proto.advices.push(resolved);
                }
              }
              proto.advices.push(variant);
            } else {
              if (proto.condition) {
                variant.prototype.advices = ((_ref2 = proto.advices) != null ? _ref2.slice() : void 0) || [resolved];
                storage.resolved = variant;
              }
            }
          } else {
            storage.resolved = variant;
          }
        }
      }
    }
  };

  Command.register = function(signatures, property, command, types) {
    var Prototype, combination, execute, kind, proto, storage, subcommand, type, value, _j, _k, _len, _len1, _ref, _ref1;
    storage = signatures[property] || (signatures[property] = {});
    for (type in types) {
      subcommand = types[type];
      if (proto = command.prototype) {
        if ((execute = proto[type]) || ((kind = subcommand.prototype.kind) && ((kind === 'auto') || (execute = proto[kind])))) {
          Prototype = subcommand.extend();
          for (property in proto) {
            if (!__hasProp.call(proto, property)) continue;
            value = proto[property];
            Prototype.prototype[property] = value;
          }
          if (typeof execute === 'object') {
            for (property in execute) {
              value = execute[property];
              Prototype.prototype[property] = value;
            }
          } else if (execute) {
            Prototype.prototype.execute = execute;
          }
          _ref = this.sign(subcommand, Prototype.prototype);
          for (_j = 0, _len = _ref.length; _j < _len; _j++) {
            combination = _ref[_j];
            this.write(Prototype, storage, combination);
          }
        }
      }
    }
    _ref1 = this.sign(command, command.prototype);
    for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
      combination = _ref1[_k];
      this.write(command, storage, combination);
    }
  };

  Command.get = function(command, storage, signature, args, permutation) {
    var arg, argument, group, i, j, k, keys, obj, property, _j, _k, _l, _len, _len1, _ref;
    args || (args = []);
    i = args.length;
    seeker: {;
    for (_j = 0, _len = signature.length; _j < _len; _j++) {
      arg = signature[_j];
      if (arg.push) {
        for (k = _k = 0, _len1 = arg.length; _k < _len1; k = ++_k) {
          obj = arg[k];
          j = 0;
          group = arg;
          for (property in obj) {
            if (!i) {
              arg = obj;
              if (!(keys = this.permute(arg, permutation))) {
                return;
              }
              argument = arg[property];
              break seeker;
            }
            i--;
            j++;
          }
        }
      } else {
        j = void 0;
        for (property in arg) {
          if (!i) {
            argument = arg[property];
            break seeker;
          }
          i--;
        }
      }
    }
    };
    if (!argument) {
      this.generate(storage, this.getPositions(args), this.getPermutation(args, this.getProperties(signature)), void 0, args.length);
      return;
    }
    if (keys && (j != null)) {
      permutation || (permutation = []);
      for (i = _l = 0, _ref = keys.length; _l < _ref; i = _l += 1) {
        if (permutation.indexOf(i) === -1) {
          this.get(command, storage, signature, args.concat(args.length - j + i), permutation.concat(i));
        }
      }
      this.get(command, storage, signature, args.concat(null), permutation.concat(null));
      return;
    }
    return this.get(command, storage, signature, args.concat(args.length));
  };

  return Command;

})();

Command.Sequence = (function(_super) {
  __extends(Sequence, _super);

  function Sequence() {}

  Sequence.prototype.descend = function(engine, operation, continuation, scope, ascender, ascending) {
    var argument, command, index, result, _i, _ref, _ref1;
    if (ascender > -1) {
      index = ascender + 1;
      result = ascending;
    } else if (ascender === -1 && ascending) {
      result = ascending;
      continuation = this.delimit(continuation, this.ASCEND);
    }
    for (index = _i = _ref = index || 0, _ref1 = operation.length; _i < _ref1; index = _i += 1) {
      argument = operation[index];
      argument.parent || (argument.parent = operation);
      if (command = argument.command || engine.Command(argument)) {
        result = command.solve(engine, argument, continuation, scope, -1, result);
        if (result === void 0) {
          return;
        }
      }
      break;
    }
    return [result, engine, operation, continuation, scope];
  };

  Sequence.prototype.log = function() {};

  Sequence.prototype.unlog = function() {};

  Sequence.prototype.sequence = true;

  Sequence.prototype.execute = function(result) {
    return result;
  };

  Sequence.prototype.release = function(result, engine, operation, continuation, scope) {
    var parent, _base;
    parent = operation.parent;
    if (operation === parent[parent.length - 1]) {
      return typeof (_base = parent.parent.command).release === "function" ? _base.release(result, engine, parent, continuation, scope) : void 0;
    }
  };

  Sequence.prototype["yield"] = function(result, engine, operation, continuation, scope, ascender, ascending) {
    var next, parent;
    if (ascender === -2) {
      return;
    }
    parent = operation.parent;
    if ((next = parent[parent.indexOf(operation) + 1])) {
      return next;
    } else {
      if (parent.parent) {
        this.ascend(engine, parent, continuation, scope, result, parent.parent.indexOf(parent), ascending);
        return true;
      } else {
        return result;
      }
    }
  };

  return Sequence;

})(Command);

Command.List = (function(_super) {
  __extends(List, _super);

  List.prototype.type = 'List';

  List.prototype.condition = function(engine, operation) {
    var parent, _ref;
    if (parent = operation.parent) {
      return ((_ref = parent.command.List) != null ? _ref[parent.indexOf(operation)] : void 0) || parent[0] === true;
    } else {
      return !operation[0].command.Sequence;
    }
  };

  function List() {}

  List.prototype.extras = 0;

  List.prototype.boundaries = true;

  List.prototype.execute = function() {};

  List.prototype["yield"] = function() {
    return true;
  };

  List.prototype.descend = function(engine, operation, continuation, scope, ascender, ascending) {
    var argument, command, index, _i, _len;
    for (index = _i = 0, _len = operation.length; _i < _len; index = ++_i) {
      argument = operation[index];
      if (argument != null ? argument.push : void 0) {
        argument.parent || (argument.parent = operation);
        if (command = argument.command || engine.Command(argument)) {
          command.solve(engine, argument, continuation, scope);
        }
      }
    }
  };

  return List;

})(Command.Sequence);

Command.Sequence.prototype.advices = [Command.List];

Command.Default = (function(_super) {
  __extends(Default, _super);

  Default.prototype.type = 'Default';

  Default.prototype.extras = 2;

  Default.prototype.execute = function() {
    var args, engine, operation, _i;
    args = 3 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 2) : (_i = 0, []), engine = arguments[_i++], operation = arguments[_i++];
    args.unshift(operation[0]);
    return args;
  };

  function Default() {}

  return Default;

})(Command);

Command.Object = (function(_super) {
  __extends(Object, _super);

  function Object() {}

  return Object;

})(Command);

Command.Meta = (function(_super) {
  __extends(Meta, _super);

  function Meta() {
    return Meta.__super__.constructor.apply(this, arguments);
  }

  Meta.prototype.type = 'Meta';

  Meta.prototype.signature = [
    {
      body: ['Any']
    }
  ];

  Meta.prototype.execute = function(data) {
    return data;
  };

  return Meta;

})(Command);

module.exports = Command;



},{}],4:[function(require,module,exports){

/* Domain: Observable object. 

Has 3 use cases:

1) Base  

Interface:

  - (un)watch() - (un)subscribe expression to property updates
  - set()       - dispatches updates to subscribed expressions
  - get()       - retrieve value
  - remove()    - detach observes by continuation


State:
  - @watchers[key] - List of oservers of specific properties
                      as [operation, continuation, scope] triplets

  - @observers[continuation] - List of observers by continuation
                                as [operation, key, scope] triplets
 */
var Domain,
  __hasProp = {}.hasOwnProperty;

Domain = (function() {
  Domain.prototype.strategy = void 0;

  function Domain(values) {
    this.signatures = {};
    if (values) {
      this.merge(values);
    }
    if (this.url) {
      this.useWorker(this.url);
    }
    if (this.events !== this.engine.events) {
      this.addListeners(this.events);
    }
    if (this.Properties) {
      this.properties = new this.Properties(this);
      this.Property.compile(this.properties, this);
    } else {
      this.properties = {};
    }
    return this;
  }

  Domain.prototype.setup = function() {
    if (!this.hasOwnProperty('values')) {
      this.values = {};
      return this.construct();
    }
  };

  Domain.prototype.construct = function() {
    this.watchers = {};
    return this.watched = {};
  };

  Domain.prototype.solve = function(operation, continuation, scope, ascender, ascending) {
    var commands, commited, result, transacting, _ref;
    transacting = this.transact();
    if (typeof operation === 'object') {
      if (operation instanceof Array) {
        result = this.Command(operation).solve(this, operation, continuation || '', scope || this.scope, ascender, ascending);
      } else {
        result = this.data.merge(operation, continuation);
      }
    }
    if (this.constrained || this.unconstrained) {
      commands = this.Constraint.prototype.split(this);
      this.Constraint.prototype.reset(this);
    }
    if (typeof result !== 'object') {
      if (result = (_ref = this.perform) != null ? _ref.apply(this, arguments) : void 0) {
        result = this.apply(result);
      }
    }
    if (commands) {
      this.update(commands);
    }
    if (transacting) {
      commited = this.commit();
    }
    return result || commited;
  };

  Domain.prototype.watch = function(object, property, operation, continuation, scope) {
    var id, j, obj, observers, path, prop, value, watchers, _base, _base1, _base2;
    this.setup();
    path = this.getPath(object, property);
    value = this.get(path);
    if (this.indexOfTriplet(this.watchers[path], operation, continuation, scope) === -1) {
      observers = (_base = this.watched)[continuation] || (_base[continuation] = []);
      observers.push(operation, path, scope);
      watchers = (_base1 = this.watchers)[path] || (_base1[path] = []);
      watchers.push(operation, continuation, scope);
      if (this.subscribe && watchers.length === 3) {
        if ((j = path.indexOf('[')) > -1) {
          id = path.substring(0, j);
          obj = (_base2 = (this.subscribers || (this.subscribers = {})))[id] || (_base2[id] = {});
          prop = path.substring(j + 1, path.length - 1);
          obj[prop] = true;
          this.subscribe(id, prop, path);
        }
      }
    }
    return value;
  };

  Domain.prototype.unwatch = function(object, property, operation, continuation, scope) {
    var id, index, j, obj, observers, old, path, prop, watchers, _base;
    path = this.getPath(object, property);
    observers = this.watched[continuation];
    index = this.indexOfTriplet(observers, operation, path, scope);
    observers.splice(index, 3);
    if (!observers.length) {
      delete this.watched[continuation];
    }
    watchers = this.watchers[path];
    index = this.indexOfTriplet(watchers, operation, continuation, scope);
    watchers.splice(index, 3);
    if (!watchers.length) {
      delete this.watchers[path];
      if (this.subscribe) {
        if ((j = path.indexOf('[')) > -1) {
          id = path.substring(0, j);
          obj = (_base = this.subscribers)[id] || (_base[id] = {});
          prop = path.substring(j + 1, path.length - 1);
          old = obj[prop];
          delete obj[prop];
          if (this.updating) {
            this.transact();
            this.changes[path] = null;
            if (!(this.updating.domains.indexOf(this) > this.updating.index)) {
              this.updating.apply(this.changes);
            }
          }
          this.unsubscribe(id, prop, path);
          if (!Object.keys(obj).length) {
            delete this.subscribers[id];
            if (!Object.keys(this.subscribers).length) {
              return this.subscribers = void 0;
            }
          }
        }
      }
    }
  };

  Domain.prototype.get = function(object, property) {
    return this.values[this.getPath(object, property)];
  };

  Domain.prototype.merge = function(object, continuation, operation) {
    if (object && !object.push) {
      if (object instanceof Domain) {
        return;
      }
      if (this.updating) {
        return this.merger(object, void 0, continuation);
      } else {
        return this.engine.solve(this.displayName || 'GSS', this.merger, object, this, continuation, operation);
      }
    }
  };

  Domain.prototype.merger = function(object, domain, continuation, operation) {
    var async, path, transacting, value;
    if (domain == null) {
      domain = this;
    }
    transacting = domain.transact();
    async = false;
    for (path in object) {
      value = object[path];
      domain.set(void 0, path, value, continuation, operation);
    }
    if (transacting) {
      return domain.commit();
    }
  };

  Domain.prototype.set = function(object, property, value, continuation, operation) {
    var i, old, op, path, stack, updated, _base, _i, _len, _ref;
    path = this.getPath(object, property);
    old = this.values[path];
    if (continuation) {
      _ref = stack = (_base = (this.stacks || (this.stacks = {})))[path] || (_base[path] = []);
      for (i = _i = 0, _len = _ref.length; _i < _len; i = _i += 3) {
        op = _ref[i];
        if (op === operation && stack[i + 1] === continuation) {
          if (value != null) {
            stack[i + 2] = value;
            if (stack.length > i + 3) {
              return;
            }
          } else {
            stack.splice(i, 3);
            if (stack.length > i + 3) {
              return;
            }
            value = stack[stack.length - 1];
          }
          updated = true;
          break;
        }
      }
      if (!updated && value !== null) {
        stack.push(operation, continuation, value);
      }
    }
    if (old === value) {
      return;
    }
    this.transact();
    this.changes[path] = value != null ? value : null;
    if (value != null) {
      this.values[path] = value;
    } else {
      delete this.values[path];
    }
    if (this.updating) {
      this.callback(path, value);
    } else {
      this.engine.solve(this.displayName || 'GSS', function(domain) {
        return domain.callback(path, value);
      }, this);
    }
    return value;
  };

  Domain.prototype.callback = function(path, value) {
    var command, constraint, index, op, operation, url, values, variable, watcher, watchers, worker, workers, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    if (watchers = (_ref = this.watchers) != null ? _ref[path] : void 0) {
      for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
        watcher = watchers[index];
        if (!watcher) {
          break;
        }
        command = watcher.command;
        if (command.deferred) {
          this.Query.prototype.defer(this, watcher, watchers[index + 1], watchers[index + 2]);
        } else if (value != null) {
          watcher.command.solve(this, watcher, watchers[index + 1], watchers[index + 2], true);
        } else {
          watcher.command.patch(this, watcher, watchers[index + 1], watchers[index + 2]);
        }
      }
    }
    if (this.immutable) {
      return;
    }
    if (!(this instanceof this.Solver) && (variable = this.variables[path])) {
      _ref1 = variable.constraints;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        constraint = _ref1[_j];
        _ref2 = constraint.operations;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          operation = _ref2[_k];
          if (op = operation.variables[path]) {
            if (op.domain && op.domain.displayName !== this.displayName) {
              if (!watchers || watchers.indexOf(op) === -1) {
                op.command.patch(op.domain, op, void 0, void 0, this);
                op.command.solve(this, op);
              }
            }
          }
        }
      }
    }
    if (workers = this.workers) {
      for (url in workers) {
        worker = workers[url];
        if (values = worker.values) {
          if (values.hasOwnProperty(path)) {
            this.updating.push([['value', path, value != null ? value : null]], worker);
          }
        }
      }
    }
  };

  Domain.prototype.toObject = function() {
    var object, property, value;
    object = {};
    for (property in this) {
      if (!__hasProp.call(this, property)) continue;
      value = this[property];
      if (property !== 'engine' && property !== 'observers' && property !== 'watchers' && property !== 'values') {
        object[property] = value;
      }
    }
    return object;
  };

  Domain.prototype.compile = function(force) {
    return this.Command.compile(this, void 0, force);
  };

  Domain.prototype.add = function(path, value) {
    var group, _base;
    group = (_base = (this.paths || (this.paths = {})))[path] || (_base[path] = []);
    group.push(value);
  };

  Domain.prototype.transform = function(result) {
    var nullified, path, replaced, value, variable, _ref, _ref1, _ref2;
    if (result == null) {
      result = {};
    }
    nullified = this.nullified;
    replaced = this.replaced;
    if (this.declared) {
      _ref = this.declared;
      for (path in _ref) {
        variable = _ref[path];
        value = (_ref1 = variable.value) != null ? _ref1 : 0;
        if (this.values[path] !== value) {
          if (path.charAt(0) !== '%') {
            if (result[path] == null) {
              result[path] = value;
            }
            this.values[path] = value;
          }
        }
      }
      this.declared = void 0;
    }
    this.replaced = void 0;
    if (nullified) {
      for (path in nullified) {
        variable = nullified[path];
        if (path.charAt(0) !== '%') {
          result[path] = (_ref2 = this.data.values[path]) != null ? _ref2 : null;
        }
        this.nullify(variable);
      }
      this.nullified = void 0;
    }
    return result;
  };

  Domain.prototype.apply = function(solution) {
    var nullified, path, replaced, result, value;
    result = {};
    nullified = this.nullified;
    replaced = this.replaced;
    for (path in solution) {
      value = solution[path];
      if (!(nullified != null ? nullified[path] : void 0) && !(replaced != null ? replaced[path] : void 0) && path.charAt(0) !== '%') {
        result[path] = value;
      }
    }
    result = this.transform(result);
    this.merge(result);
    return result;
  };

  Domain.prototype.register = function(constraints) {
    var domains, index;
    if (constraints == null) {
      constraints = this.constraints;
    }
    domains = this.engine.domains;
    if (constraints != null ? constraints.length : void 0) {
      if (domains.indexOf(this) === -1) {
        return domains.push(this);
      }
    } else {
      if ((index = domains.indexOf(this)) > -1) {
        return domains.splice(index, 1);
      }
    }
  };

  Domain.prototype.remove = function() {
    var contd, i, observer, operation, operations, path, property, stack, stacks, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2;
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      path = arguments[_i];
      if (stacks = this.stacks) {
        _ref = this.stacks;
        for (property in _ref) {
          stack = _ref[property];
          while ((i = stack.indexOf(path)) > -1) {
            stack.splice(i - 1, 3);
            if (stack.length < i) {
              this.set(null, property, stack[stack.length - 1]);
              if (!stack.length) {
                delete this.stacks[property];
              }
            }
          }
        }
      }
      if (this.watched) {
        _ref1 = this.Query.prototype.getVariants(path) || [path];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          contd = _ref1[_j];
          if (observer = this.watched[contd]) {
            while (observer[0]) {
              this.unwatch(observer[1], void 0, observer[0], contd, observer[2]);
            }
          }
        }
      }
      if (operations = (_ref2 = this.paths) != null ? _ref2[path] : void 0) {
        for (i = _k = operations.length - 1; _k >= 0; i = _k += -1) {
          operation = operations[i];
          operation.command.remove(this, operation, path);
        }
      }
    }
  };

  Domain.prototype["export"] = function(constraints) {
    var constraint, operation, operations, ops, _i, _j, _len, _len1;
    if (constraints || (constraints = this.constraints)) {
      operations = [];
      for (_i = 0, _len = constraints.length; _i < _len; _i++) {
        constraint = constraints[_i];
        if (ops = constraint.operations) {
          for (_j = 0, _len1 = ops.length; _j < _len1; _j++) {
            operation = ops[_j];
            operations.push(operation.parent);
          }
        }
      }
      return operations;
    }
  };

  Domain.prototype.transfer = function(update, parent) {
    var prop, solution;
    if (parent) {
      parent.perform(this);
    }
    if (update) {
      update.perform(this);
    }
    this.updating.perform(this);
    if (this.unconstrained) {
      this.Constraint.prototype.reset(this);
      this.register();
    }
    if (this.nullified) {
      solution = {};
      for (prop in this.nullified) {
        (solution || (solution = {}))[prop] = null;
      }
      return this.updating.apply(solution);
    }
  };

  Domain.prototype.maybe = function() {
    var Base;
    if (!this.Maybe) {
      Base = function() {};
      Base.prototype = this;
      this.Maybe = function() {};
      this.Maybe.prototype = new Base;
    }
    return new this.Maybe;
  };

  Domain.prototype.transact = function() {
    if (!this.changes) {
      this.setup();
      return this.changes = {};
    }
  };

  Domain.prototype.commit = function() {
    var changes, prop;
    if (changes = this.changes) {
      if (this instanceof this.Solver) {
        this.register();
      }
      this.changes = void 0;
      for (prop in changes) {
        return changes;
      }
    }
  };

  Domain.compile = function(engine) {
    var EngineDomain, EngineDomainWrapper, domain, name, property, value, _ref;
    for (name in engine) {
      domain = engine[name];
      if (domain.prototype && domain.prototype instanceof Domain) {
        EngineDomain = engine[name] = function(values) {
          return domain.prototype.constructor.call(this, void 0, void 0, values);
        };
        EngineDomainWrapper = function() {};
        EngineDomainWrapper.prototype = engine;
        EngineDomain.prototype = new EngineDomainWrapper;
        EngineDomain.prototype.proto = domain;
        EngineDomain.prototype.engine = engine;
        EngineDomain.prototype.displayName = name;
        _ref = domain.prototype;
        for (property in _ref) {
          value = _ref[property];
          EngineDomain.prototype[property] = value;
        }
        engine[name.toLowerCase()] = new EngineDomain();
      }
    }
    return this;
  };

  Domain.prototype.Property = function(property, reference, properties) {
    var index, key, left, path, right, value, _base;
    if (typeof property === 'object') {
      if (property.push) {
        return properties[reference] = this.Style(property, reference, properties);
      } else {
        for (key in property) {
          value = property[key];
          if ((index = reference.indexOf('[')) > -1) {
            path = reference.replace(']', '-' + key + ']');
            left = reference.substring(0, index);
            right = path.substring(index + 1, path.length - 1);
            (_base = properties[left])[right] || (_base[right] = this.Property(value, path, properties));
          } else if (reference.match(/^[a-z]/i)) {
            path = reference + '-' + key;
          } else {
            path = reference + '[' + key + ']';
          }
          properties[path] = this.Property(value, path, properties);
        }
      }
    }
    return property;
  };

  Domain.prototype.Property.compile = function(properties, engine) {
    var key, property;
    for (key in properties) {
      property = properties[key];
      if (key === 'engine') {
        continue;
      }
      this.call(engine, property, key, properties);
    }
    return properties;
  };

  return Domain;

})();

module.exports = Domain;



},{}],5:[function(require,module,exports){

/* Base class: Engine

Engine is a base class for scripting environment.
It initializes and orchestrates all moving parts.

It operates over workers and domains. Workers are
separate engines running in web worker thread. 
Domains are either independent constraint graphs or
pseudo-solvers like DOM measurements.
 */
var Engine,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Engine = (function() {
  Engine.prototype.Command = require('./Command');

  Engine.prototype.Domain = require('./Domain');

  Engine.prototype.Update = require('./Update');

  Engine.prototype.Query = require('./Query');

  Engine.prototype.Solver = require('./domains/Linear');

  Engine.prototype.Input = require('./domains/Input');

  Engine.prototype.Data = require('./domains/Data');

  Engine.prototype.Output = require('./domains/Output');

  Engine.prototype.Console = require('./utilities/Console');

  Engine.prototype.Inspector = require('./utilities/Inspector');

  Engine.prototype.Exporter = require('./utilities/Exporter');

  function Engine(data, url) {
    var events, property, value, _i, _len, _ref;
    this.engine = this;
    this.$prototype = Engine.prototype;
    if ((url != null) && (typeof Worker !== "undefined" && Worker !== null)) {
      this.url = this.getWorkerURL(url);
    }
    this.eventHandler = this.handleEvent.bind(this);
    this.listeners = {};
    _ref = [this.events, this.$events, this.$$events];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      events = _ref[_i];
      this.addListeners(events);
    }
    this.observers = {};
    this.queries = {};
    this.lefts = [];
    this.pairs = {};
    this.variables = {};
    this.domains = [];
    this.stylesheets = [];
    this.imported = {};
    this.inspector = new this.Inspector(this);
    this.exporter = new this.Exporter(this);
    this.update = this.Update.compile(this);
    this.Domain.compile(this);
    this.data.setup();
    this.output.setup();
    this.values = this.output.values;
    if (data) {
      for (property in data) {
        value = data[property];
        this.data.values[property] = this.values[property] = value;
      }
    }
    if ((typeof window === "undefined" || window === null) && (typeof self !== "undefined" && self !== null)) {
      this.strategy = 'update';
    }
    if (typeof self !== "undefined" && self !== null) {
      self.addEventListener('error', this.eventHandler);
    }
    return this;
  }

  Engine.prototype.solve = function(a, b, c, d, e, f, g) {
    var args, result, strategy, transacting;
    if (!this.transacting) {
      this.transacting = transacting = true;
    }
    args = this.transact(a, b, c, d, e, f, g);
    if (typeof args[0] === 'function') {
      if (result = args.shift().apply(this, args)) {
        this.updating.apply(result);
      }
    } else if (args[0] != null) {
      strategy = this[this.strategy || 'input'];
      if (strategy.solve) {
        this.data.transact();
        this.console.start(strategy.displayName, args);
        strategy.solve.apply(strategy, args);
        this.console.end(result);
        result = this.data.commit();
      } else {
        result = strategy.apply(this, args);
      }
    }
    if (transacting) {
      this.transacting = void 0;
      return this.commit(result);
    }
  };

  Engine.prototype.propagate = function(values) {
    if (values) {
      this.updating.apply(values);
      this.output.merge(values);
    }
    return values;
  };

  Engine.prototype.transact = function() {
    var arg, args, index, problematic, reason, _i, _len;
    if (typeof arguments[0] === 'string') {
      reason = arguments[0];
      if (typeof arguments[1] === 'string') {
        arg = arguments[1];
      }
    }
    args = Array.prototype.slice.call(arguments, +(reason != null) + +(arg != null));
    if (!this.updating) {
      this.console.start(reason || (this.updated && 'Update' || 'Initialize'), arg || args);
      this.updating = new this.update;
      this.updating.start();
      this.triggerEvent('transact', this.updating);
    }
    if (!this.running) {
      this.compile();
    }
    problematic = void 0;
    for (index = _i = 0, _len = args.length; _i < _len; index = ++_i) {
      arg = args[index];
      if (arg && typeof arg !== 'string') {
        if (problematic) {
          if (typeof arg === 'function') {
            this.then(arg);
            args.splice(index, 1);
            break;
          }
        } else {
          problematic = arg;
        }
      }
    }
    return args;
  };

  Engine.prototype.write = function(update) {
    this.output.merge(update.changes);
    return update.changes = void 0;
  };

  Engine.prototype.commit = function(solution, update) {
    var _ref;
    if (update == null) {
      update = this.updating;
    }
    if (update.blocking) {
      return;
    }
    if (solution) {
      this.propagate(solution);
    }
    while (!(update.isDone() && !update.isDirty())) {
      this.triggerEvent('commit', update);
      if (update.blocking) {
        return update;
      }
      this.triggerEvent('assign', update);
      this.triggerEvent('perform', update);
      if ((_ref = update.busy) != null ? _ref.length : void 0) {
        return update;
      }
      if (this.write(update) || ((update.written || update.reflown) && update.isDone())) {
        update.written = true;
        this.triggerEvent('validate', update);
      }
      update.commit();
    }
    if (update.hadSideEffects()) {
      this.triggerEvent('finish', update);
      this.fireEvent('solve', update.solution, update);
      this.fireEvent('solved', update.solution, update);
      return update.solution;
    } else {
      return this.triggerEvent('finish');
    }
  };

  Engine.prototype.resolve = function(domain, problems, index, update) {
    var problem, result, _i, _len;
    if (domain && !domain.solve && domain.postMessage) {
      update.postMessage(domain, problems);
      update.await(domain.url);
      return domain;
    }
    for (index = _i = 0, _len = problems.length; _i < _len; index = ++_i) {
      problem = problems[index];
      if (problem instanceof Array && problem.length === 1 && problem[0] instanceof Array) {
        problem = problems[index] = problem[0];
      }
    }
    if (!domain) {
      return this.broadcast(problems, update);
    }
    this.console.start(domain.displayName, problems);
    result = domain.solve(problems) || void 0;
    if (result && result.postMessage) {
      update.await(result.url);
    } else {
      if ((result != null ? result.length : void 0) === 1) {
        result = result[0];
      }
    }
    this.console.end(result);
    return result;
  };

  Engine.prototype.broadcast = function(problems, update, insert) {
    var broadcasted, i, index, locals, other, others, path, problem, property, remove, removes, result, stacks, url, value, worker, working, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4;
    if (update == null) {
      update = this.updating;
    }
    others = [];
    removes = [];
    if (insert) {
      if (update.domains[update.index + 1] !== null) {
        update.domains.splice(update.index, 0, null);
        update.problems.splice(update.index, 0, problems);
      } else {
        broadcasted = update.problems[update.index + 1];
        broadcasted.push.apply(broadcasted, problems);
      }
    }
    if (problems[0] === 'remove') {
      removes.push(problems);
    } else {
      for (_i = 0, _len = problems.length; _i < _len; _i++) {
        problem = problems[_i];
        if (problem[0] === 'remove') {
          removes.push(problem);
        } else {
          others.push(problem);
        }
      }
    }
    _ref = [this.data, this.output].concat(this.domains);
    for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
      other = _ref[i];
      locals = [];
      other.changes = void 0;
      stacks = other.stacks;
      for (_k = 0, _len2 = removes.length; _k < _len2; _k++) {
        remove = removes[_k];
        for (index = _l = 0, _len3 = remove.length; _l < _len3; index = ++_l) {
          path = remove[index];
          if (index === 0) {
            continue;
          }
          if ((_ref1 = other.paths) != null ? _ref1[path] : void 0) {
            locals.push(path);
          } else if (((_ref2 = other.watched) != null ? _ref2[path] : void 0) || other.stacks) {
            other.remove(path);
          }
        }
      }
      if (other.changes) {
        _ref3 = other.changes;
        for (property in _ref3) {
          value = _ref3[property];
          (result || (result = {}))[property] = value;
        }
        other.changes = void 0;
      }
      if (locals.length) {
        locals.unshift('remove');
        locals.index = -1;
        update.push([locals], other, true);
      }
      if (others.length) {
        update.push(others, other);
      }
    }
    if (typeof problems[0] === 'string') {
      problems = [problems];
    }
    _ref4 = this.workers;
    for (url in _ref4) {
      worker = _ref4[url];
      working = problems.filter(function(command) {
        var _ref5;
        return command[0] !== 'remove' || ((_ref5 = worker.paths) != null ? _ref5[command[1]] : void 0);
      });
      update.push(working, worker, true);
    }
    if (result) {
      update.apply(result);
    }
  };

  Engine.prototype.compile = function() {
    var domain, name;
    for (name in this) {
      domain = this[name];
      if (domain && domain !== this && domain.engine) {
        if (typeof domain.compile === "function") {
          domain.compile();
        }
      }
    }
    this.running = true;
    return this.triggerEvent('compile', this);
  };

  Engine.prototype.fireEvent = function(name, data, object) {
    this.triggerEvent(name, data, object);
  };

  Engine.prototype.$events = {
    perform: function(update) {
      var _ref;
      if (update.domains.length) {
        if (!((_ref = update.busy) != null ? _ref.length : void 0)) {
          this.console.start('Solvers', update.problems.slice(update.index + 1));
          update.each(this.resolve, this);
          this.console.end(update.changes);
        }
        this.output.merge(update.solution);
      }
      return this.propagate(this.data.commit());
    },
    finish: function(update) {
      this.console.end(update != null ? update.solution : void 0);
      this.updating = void 0;
      if (update) {
        this.inspector.update();
        return this.updated = update;
      }
    },
    commit: function(update) {
      while (!update.isDocumentDone()) {
        this.Query.prototype.commit(this);
        this.Query.prototype.repair(this);
        this.Query.prototype.branch(this);
        this;
      }
    },
    remove: function(path) {
      var paths, ranges, subpath, _i, _len, _ref, _ref1, _results;
      this.output.remove(path);
      if ((_ref = this.updating) != null) {
        _ref.remove(path);
      }
      if (this.ranges) {
        paths = this.input.Query.prototype.getVariants(path);
        _results = [];
        for (_i = 0, _len = paths.length; _i < _len; _i++) {
          subpath = paths[_i];
          if (ranges = (_ref1 = this.ranges) != null ? _ref1[subpath] : void 0) {
            delete this.ranges[subpath];
            if (!Object.keys(this.ranges).length) {
              _results.push(this.ranges = void 0);
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    },
    assign: function(update) {
      var assignments, changes, constraints, continuation, index, operation, path, range, ranges, tickers, _ref;
      while (!!(assignments = update.assignments) + !!(ranges = update.ranges)) {
        if (assignments) {
          this.console.start('Assignments', assignments);
          index = 0;
          while (path = assignments[index]) {
            this.data.set(path, null, assignments[index + 1], assignments[index + 2], assignments[index + 3]);
            index += 4;
          }
          update.assignments = void 0;
          changes = this.propagate(this.data.commit());
          this.console.end(changes);
        }
        if (ranges) {
          this.console.start('Ranges', this.ranges);
          _ref = this.ranges;
          for (continuation in _ref) {
            tickers = _ref[continuation];
            index = 0;
            while (operation = tickers[index]) {
              range = tickers[index + 2];
              if (range.update !== update) {
                range.update = update;
                if (operation.command.update(range, this, operation, continuation, tickers[index + 1])) {
                  tickers.splice(index, 3);
                  if (!tickers.length) {
                    delete this.ranges[continuation];
                    if (!Object.keys(this.ranges).length) {
                      this.ranges = void 0;
                    }
                  }
                  continue;
                }
              }
              index += 3;
            }
          }
          this.console.end();
          this.updating.ranges = void 0;
        }
      }
      this.propagate(this.data.commit());
      if (constraints = update.constraints) {
        index = 0;
        this.console.start('Constraints', constraints);
        while (operation = constraints[index]) {
          this.update(operation, void 0, void 0, constraints[index + 1]);
          index += 2;
        }
        update.constraints = void 0;
        return this.console.end();
      }
    },
    destroy: function(e) {
      if (this.worker) {
        this.worker.removeEventListener('message', this.eventHandler);
        this.worker.removeEventListener('error', this.eventHandler);
      }
      return typeof self !== "undefined" && self !== null ? self.removeEventListener('error', this.eventHandler) : void 0;
    },
    message: function(e) {
      var property, value, values, _base, _ref, _ref1;
      values = (_base = e.target).values || (_base.values = {});
      _ref = e.data;
      for (property in _ref) {
        value = _ref[property];
        if (value != null) {
          values[property] = value;
        } else {
          delete values[property];
        }
      }
      if ((_ref1 = this.updating) != null ? _ref1.busy.length : void 0) {
        this.updating.solutions[this.updating.solutions.indexOf(e.target, this.updating.index)] = e.data;
        this.updating.busy.splice(this.updating.busy.indexOf(e.target.url), 1);
        return this.commit(e.data);
      }
    },
    error: function(e) {
      this.updating = void 0;
      if ((typeof window !== "undefined" && window !== null) && e.target !== window) {
        throw new Error(e.message + " (" + e.filename + ":" + e.lineno + ")");
      }
    }
  };

  Engine.prototype.getWorkerURL = (function() {
    var scripts, src, _ref, _ref1;
    if (typeof document !== "undefined" && document !== null) {
      scripts = document.getElementsByTagName('script');
      src = scripts[scripts.length - 1].src;
      if (!src.match(/gss/i)) {
        src = (_ref = document.querySelectorAll('script[src*=gss]')) != null ? (_ref1 = _ref[0]) != null ? _ref1.src : void 0 : void 0;
      }
    }
    return function(url) {
      if (typeof url !== 'string') {
        url = src;
      }
      if (!url) {
        throw new Error("Can not detect GSS source file to set up worker.\n\n- You can rename the gss file to contain \"gss\" in it:\n  `<script src=\"my-custom-path/my-gss.js\"></script>`\n\n- or provide worker path explicitly: \n  `GSS(<scope>, \"http://absolute.path/to/worker.js\")`");
      }
      return url;
    };
  })();

  Engine.prototype.useWorker = function(url) {
    var _base;
    if (typeof url !== 'string') {
      return;
    }
    if (typeof Worker === "undefined" || Worker === null) {
      return;
    }
    if (!url.match(/^http:/i) && (typeof location !== "undefined" && location !== null ? location.protocol.match(/^file:/i) : void 0)) {
      return;
    }
    (_base = this.engine).worker || (_base.worker = this.engine.getWorker(url));
    this.solve = (function(_this) {
      return function(commands) {
        var _base1;
        (_base1 = _this.engine).updating || (_base1.updating = new _this.update);
        _this.engine.updating.postMessage(_this.worker, commands);
        return _this.worker;
      };
    })(this);
    return this.worker;
  };

  Engine.prototype.getWorker = function(url) {
    var worker, _base, _base1, _base2;
    worker = (_base = ((_base1 = this.engine).workers || (_base1.workers = {})))[url] || (_base[url] = (_base2 = (Engine.workers || (Engine.workers = {})))[url] || (_base2[url] = new Worker(url)));
    worker.url || (worker.url = url);
    worker.addEventListener('message', this.engine.eventHandler);
    worker.addEventListener('error', this.engine.eventHandler);
    return worker;
  };

  Engine.prototype.getVariableDomainByConvention = function(operation, Default) {
    var i, path, property, props;
    if (operation.domain) {
      return operation.domain;
    }
    path = operation[1];
    if ((i = path.indexOf('[')) > -1) {
      property = path.substring(i + 1, path.length - 1);
    }
    if (this.data.values.hasOwnProperty(path)) {
      return this.data;
    } else if (property) {
      if (props = this.data.properties) {
        if ((props[path] != null) || (props[property] && !props[property].matcher)) {
          return this.data;
        }
      }
      if (property.indexOf('computed-') === 0 || property.indexOf('intrinsic-') === 0) {
        return this.data;
      }
    }
  };

  Engine.prototype.getPath = function(id, property) {
    var _ref;
    if (!property) {
      property = id;
      id = void 0;
    }
    if (property.indexOf('[') > -1 || !id) {
      return property;
    } else {
      if (typeof id !== 'string') {
        id = this.identify(id);
      }
      if (id === ((_ref = this.scope) != null ? _ref._gss_id : void 0) && !this.data.check(id, property)) {
        return property;
      }
      if (id.substring(0, 2) === '$"') {
        id = id.substring(1);
      }
      return id + '[' + property + ']';
    }
  };

  Engine.prototype.url = false;

  Engine.prototype.getVariableDomain = function(operation, Default) {
    var domain, op, _ref, _ref1, _ref2, _ref3;
    if (domain = this.getVariableDomainByConvention(operation)) {
      return domain;
    }
    if (Default) {
      return Default;
    }
    if (op = (_ref = this.variables[operation[1]]) != null ? (_ref1 = _ref.constraints) != null ? (_ref2 = _ref1[0]) != null ? (_ref3 = _ref2.operations[0]) != null ? _ref3.domain : void 0 : void 0 : void 0 : void 0) {
      return op;
    }
    if (this.solver.url) {
      return this.solver;
    } else {
      return this.solver.maybe();
    }
  };

  Engine.prototype.getScopeElement = function(node) {
    switch (node.tagName) {
      case 'HTML':
      case 'BODY':
      case 'HEAD':
        return document;
      case 'STYLE':
      case 'LINK':
        if (node.scoped) {
          return this.getScopeElement(node.parentNode);
        }
    }
    return node;
  };

  Engine.prototype.indexOfTriplet = function(array, a, b, c) {
    var index, op, _i, _len;
    if (array) {
      for (index = _i = 0, _len = array.length; _i < _len; index = _i += 3) {
        op = array[index];
        if (op === a && array[index + 1] === b && array[index + 2] === c) {
          return index;
        }
      }
    }
    return -1;
  };

  Engine.prototype.destroy = function() {
    this.triggerEvent('destroy');
    if (this.events) {
      return this.removeListeners(this.events);
    }
  };

  Engine.prototype.addListeners = function(listeners) {
    var callback, name, _results;
    _results = [];
    for (name in listeners) {
      callback = listeners[name];
      _results.push(this.addEventListener(name, callback));
    }
    return _results;
  };

  Engine.prototype.removeListeners = function(listeners) {
    var callback, name, _results;
    _results = [];
    for (name in listeners) {
      callback = listeners[name];
      _results.push(this.removeEventListener(name, callback));
    }
    return _results;
  };

  Engine.prototype.once = function(type, fn) {
    fn.once = true;
    return this.addEventListener(type, fn);
  };

  Engine.prototype.addEventListener = function(type, fn) {
    var _base;
    return ((_base = this.listeners)[type] || (_base[type] = [])).push(fn);
  };

  Engine.prototype.removeEventListener = function(type, fn) {
    var group, index;
    if (group = this.listeners[type]) {
      if ((index = group.indexOf(fn)) > -1) {
        return group.splice(index, 1);
      }
    }
  };

  Engine.prototype.triggerEvent = function(type, a, b, c) {
    var fn, group, index, j, method, _ref;
    if (group = (_ref = this.listeners) != null ? _ref[type] : void 0) {
      index = 0;
      j = group.length;
      while (index < j) {
        fn = group[index];
        if (fn.once) {
          group.splice(index--, 1);
          j--;
        }
        fn.call(this, a, b, c);
        index++;
      }
    }
    if (this[method = 'on' + type]) {
      return this[method](a, b, c);
    }
  };

  Engine.prototype.dispatchEvent = function(element, type, data, bubbles, cancelable) {
    var detail, e, event, prop, value;
    if (!this.scope) {
      return;
    }
    detail = {
      engine: this
    };
    for (prop in data) {
      value = data[prop];
      detail[prop] = value;
    }
    try {
      event = new window.CustomEvent(type, {
        detail: detail,
        bubbles: bubbles,
        cancelable: cancelable
      });
    } catch (_error) {
      e = _error;
      window.CustomEvent = function(event, params) {
        var evt;
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: void 0
        };
        evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };
      window.CustomEvent.prototype = window.Event.prototype;
      event = new window.CustomEvent(type, {
        detail: detail,
        bubbles: bubbles,
        cancelable: cancelable
      });
    }
    return element.dispatchEvent(event);
  };

  Engine.prototype.handleEvent = function(e) {
    return this.triggerEvent(e.type, e);
  };

  Engine.prototype.then = function(callback) {
    return this.once('solve', callback);
  };

  return Engine;

})();

Engine.prototype.Identity = (function() {
  function Identity() {
    this.set = __bind(this.set, this);
  }

  Identity.uid = 0;

  Identity.prototype.excludes = ['$'.charCodeAt(0), ':'.charCodeAt(0), '@'.charCodeAt(0)];

  Identity.prototype.set = function(object, generate) {
    var id;
    if (!object) {
      return '';
    }
    if (typeof object === 'string') {
      if (this.excludes.indexOf(object.charCodeAt(0)) === -1) {
        return '$' + object;
      }
      return object;
    }
    if (!(id = object._gss_id)) {
      if (object === document) {
        id = "::document";
      } else if (object === window) {
        id = "::window";
      }
      if (generate !== false) {
        object._gss_id = id || (id = "$" + (object.id || object._gss_uid || ++Identity.uid));
        this[id] = object;
      }
    }
    return id;
  };

  Identity.prototype.get = function(id) {
    return this[id];
  };

  Identity.prototype.solve = function(id) {
    return this[id];
  };

  Identity.prototype.unset = function(element) {
    var id;
    if (id = element._gss_id) {
      delete this[id];
      return element._gss_id = void 0;
    }
  };

  Identity.prototype.find = function(object) {
    return this.set(object, false);
  };

  return Identity;

})();

if ((typeof self !== "undefined" && self !== null) && !self.window && self.onmessage !== void 0) {
  self.addEventListener('message', function(e) {
    var commands, data, engine, property, removes, result, solution, value, values;
    if (!(engine = Engine.messenger)) {
      engine = Engine.messenger = new Engine();
    }
    data = e.data;
    values = void 0;
    commands = [];
    removes = [];
    solution = engine.solve(function() {
      var command, index, _i, _len, _ref;
      if ((values = data[0]) && !values.push) {
        for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
          command = data[index];
          if (index) {
            if (command[0] === 'remove') {
              removes.push(command);
            } else {
              if (((_ref = command[0]) != null ? _ref.key : void 0) != null) {
                command[1].parent = command;
                command.index = command[0].index;
              }
              commands.push(command);
            }
          }
        }
      }
      if (removes.length) {
        this.solve(removes);
        if (this.updating.domains[0] === null) {
          this.broadcast(this.updating.problems[0]);
          this.updating.index++;
        }
      }
      if (values) {
        this.data.merge(values);
      }
      if (commands.length) {
        return this.solve(commands);
      }
    });
    result = {};
    if (values) {
      for (property in values) {
        value = values[property];
        result[property] = value;
      }
      for (property in solution) {
        value = solution[property];
        result[property] = value;
      }
    }
    if (!engine.domains.length) {
      engine.variables = {};
      engine.solver.operations = void 0;
    }
    return postMessage(result);
  });
}

Engine.prototype.console = new Engine.prototype.Console;

Engine.prototype.identity = new Engine.prototype.Identity;

Engine.prototype.identify = Engine.prototype.identity.set;

Engine.prototype.clone = function(object) {
  if (object && object.map) {
    return object.map(this.clone, this);
  }
  return object;
};

module.exports = Engine;



},{"./Command":3,"./Domain":4,"./Query":7,"./Update":8,"./domains/Data":14,"./domains/Input":15,"./domains/Linear":16,"./domains/Output":17,"./utilities/Console":18,"./utilities/Exporter":19,"./utilities/Inspector":20}],6:[function(require,module,exports){

/* Constructor: GSS
  Dispatches arguments by type
  When element is given, creates Document
  Otherwise creates abstract Engine
 */
var GSS;

GSS = function() {
  var argument, data, engine, id, index, parent, scope, url, _i, _len;
  for (index = _i = 0, _len = arguments.length; _i < _len; index = ++_i) {
    argument = arguments[index];
    if (!argument) {
      continue;
    }
    switch (typeof argument) {
      case 'object':
        if (argument.nodeType) {
          scope = argument;
        } else {
          data = argument;
        }
        break;
      case 'string':
      case 'boolean':
        url = argument;
    }
  }
  if (!(this instanceof GSS) && scope) {
    parent = scope;
    while (parent) {
      if (id = GSS.identity.find(parent)) {
        if (engine = GSS.Engine[id]) {
          return engine;
        }
      }
      if (!parent.parentNode) {
        break;
      }
      parent = parent.parentNode;
    }
  }
  if (scope && GSS.Document) {
    return new GSS.Document(data, url, scope);
  } else {
    return new GSS.Engine(data, url, scope);
  }
};

GSS.Engine = require('./Engine');

GSS.identity = GSS.Engine.prototype.identity;

GSS.identify = GSS.Engine.prototype.identify;

GSS.console = GSS.Engine.prototype.console;

module.exports = GSS;



},{"./Engine":5}],7:[function(require,module,exports){
var Command, Query,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Command = require('./Command');

Query = (function(_super) {
  __extends(Query, _super);

  Query.prototype.type = 'Query';

  function Query(operation) {
    this.key = this.path = this.serialize(operation);
  }

  Query.prototype.ascend = function(engine, operation, continuation, scope, result, ascender, ascending) {
    var contd, node, parent, yielded, _base, _base1, _i, _len, _ref, _ref1;
    if (parent = operation.parent) {
      if (this.isCollection(result)) {
        for (_i = 0, _len = result.length; _i < _len; _i++) {
          node = result[_i];
          contd = this.fork(engine, continuation, node);
          if (yielded = typeof (_base = parent.command)["yield"] === "function" ? _base["yield"](node, engine, operation, contd, scope, ascender, ascending) : void 0) {
            if ((_ref = yielded.command) != null) {
              _ref.solve(yielded.domain || engine, yielded, contd, scope, -1, node);
            }
          } else {
            parent.command.solve(engine, parent, contd, scope, parent.indexOf(operation), node);
          }
        }
      } else {
        if (yielded = typeof (_base1 = parent.command)["yield"] === "function" ? _base1["yield"](result, engine, operation, continuation, scope, ascender, ascending) : void 0) {
          return (_ref1 = yielded.command) != null ? _ref1.solve(yielded.domain || engine, yielded, continuation, scope, -1, result) : void 0;
        } else if ((ascender != null) || !this.hidden || !this.reference) {
          return parent.command.solve(engine, parent, continuation, scope, parent.indexOf(operation), result);
        } else {
          return result;
        }
      }
    }
  };

  Query.prototype.serialize = function(operation) {
    var argument, cmd, index, length, start, string, _i, _ref;
    if (this.prefix != null) {
      string = this.prefix;
    } else {
      string = operation[0];
    }
    if (typeof operation[1] === 'object') {
      start = 2;
    }
    length = operation.length;
    for (index = _i = _ref = start || 1; _ref <= length ? _i < length : _i > length; index = _ref <= length ? ++_i : --_i) {
      if (argument = operation[index]) {
        if (cmd = argument.command) {
          string += cmd.key;
        } else {
          string += argument;
          if (length - 1 > index) {
            string += this.separator;
          }
        }
      }
    }
    if (this.suffix) {
      string += this.suffix;
    }
    return string;
  };

  Query.prototype.push = function(operation, context) {
    var arg, cmd, i, index, inherited, match, tag, tags, _i, _j, _k, _l, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
    if (context) {
      if (this.proxy) {
        this.proxied = context.command.path;
      }
      this.inherit(context.command, inherited, context);
    }
    for (index = _i = 1, _ref = operation.length; 1 <= _ref ? _i < _ref : _i > _ref; index = 1 <= _ref ? ++_i : --_i) {
      if (cmd = (_ref1 = operation[index]) != null ? _ref1.command : void 0) {
        inherited = this.inherit(cmd, inherited, context);
      }
    }
    if (tags = this.tags) {
      for (i = _j = 0, _len = tags.length; _j < _len; i = ++_j) {
        tag = tags[i];
        if (context) {
          if (cmd = context.command) {
            if ((((_ref2 = cmd.tags) != null ? _ref2.indexOf(tag) : void 0) > -1) && this.checkers[tag](this, cmd, operation, context, inherited)) {
              inherited = this.mergers[tag](this, cmd, operation, context);
            }
          }
        }
        match = true;
        for (index = _k = 1, _ref3 = operation.length; 1 <= _ref3 ? _k < _ref3 : _k > _ref3; index = 1 <= _ref3 ? ++_k : --_k) {
          if (cmd = (_ref4 = (arg = operation[index])) != null ? _ref4.command : void 0) {
            if (!(((_ref5 = cmd.tags) != null ? _ref5.indexOf(tag) : void 0) > -1) || !this.checkers[tag](this, cmd, operation, arg, inherited)) {
              match = false;
              break;
            }
          }
        }
        if (match) {
          inherited = false;
          for (index = _l = 1, _ref6 = operation.length; 1 <= _ref6 ? _l < _ref6 : _l > _ref6; index = 1 <= _ref6 ? ++_l : --_l) {
            if (cmd = (_ref7 = (arg = operation[index])) != null ? _ref7.command : void 0) {
              inherited = this.mergers[tag](this, cmd, operation, arg, inherited);
            }
          }
        }
      }
    }
    return this;
  };

  Query.prototype.inherit = function(command, inherited, context) {
    var path, proxied;
    if (command.scoped) {
      this.scoped = command.scoped;
    }
    if (path = command.path) {
      if (proxied = (proxied = this.proxied)) {
        path = path.slice(proxied.length);
      }
      if (inherited) {
        this.path += this.separator + path;
      } else {
        this.path = path + this.path;
      }
    }
    return true;
  };

  Query.prototype["continue"] = function(engine, operation, continuation) {
    if (continuation == null) {
      continuation = '';
    }
    return continuation + this.getKey(engine, operation, continuation);
  };

  Query.prototype.jump = function(engine, operation, continuation, scope, ascender, ascending) {
    var tail, _ref, _ref1;
    if (tail = this.tail) {
      if ((((_ref = tail[1]) != null ? (_ref1 = _ref.command) != null ? _ref1.key : void 0 : void 0) != null) && (ascender == null) && (continuation.lastIndexOf(this.PAIR) === continuation.indexOf(this.PAIR))) {
        return tail[1].command.solve(engine, tail[1], continuation, scope);
      }
    }
    return this.head.command.perform(engine, this.head, continuation, scope, ascender, ascending);
  };

  Query.prototype.prepare = function() {};

  Query.prototype.mergers = {};

  Query.prototype.checkers = {};

  Query.prototype.before = function(args, engine, operation, continuation, scope, ascender, ascending) {
    var alias, node, query, _ref, _ref1, _ref2, _ref3;
    node = ((_ref = args[0]) != null ? _ref.nodeType : void 0) === 1 ? args[0] : scope;
    query = this.getGlobalPath(engine, operation, continuation, node);
    alias = ((_ref1 = engine.updating.aliases) != null ? _ref1[query] : void 0) || query;
    if ((_ref2 = engine.updating.queries) != null ? _ref2.hasOwnProperty(alias) : void 0) {
      return engine.updating.queries[alias];
    }
    return (_ref3 = engine.updating.queries) != null ? _ref3[query] : void 0;
  };

  Query.prototype.after = function(args, result, engine, operation, continuation, scope) {
    var added, alias, aliases, child, index, isCollection, node, old, path, query, removed, updating, _base, _i, _j, _len, _len1, _ref, _ref1, _ref2;
    updating = engine.updating;
    node = this.precontextualize(engine, scope, args[0]);
    path = this.getLocalPath(engine, operation, continuation, node);
    if (!this.relative) {
      query = this.getGlobalPath(engine, operation, continuation, node);
      aliases = updating.aliases || (updating.aliases = {});
      if (!(alias = aliases[query]) || alias.length > path.length || !((_ref = updating.queries) != null ? _ref.hasOwnProperty(alias) : void 0)) {
        aliases[query] = path;
      }
    }
    old = this.get(engine, path);
    (updating.queries || (updating.queries = {}))[path] = result;
    if ((_ref1 = updating.snapshots) != null ? _ref1.hasOwnProperty(path) : void 0) {
      old = updating.snapshots[path];
    } else if ((old == null) && (result && result.length === 0) && continuation) {
      old = this.getCanonicalCollection(engine, path);
    }
    isCollection = this.isCollection(result);
    if (old) {
      if (this.isCollection(old)) {
        removed = void 0;
        for (index = _i = 0, _len = old.length; _i < _len; index = ++_i) {
          child = old[index];
          if (!old.scopes || ((_ref2 = old.scopes) != null ? _ref2[index] : void 0) === scope) {
            if (!result || Array.prototype.indexOf.call(result, child) === -1) {
              (removed || (removed = [])).push(child);
            }
          }
        }
      } else if (result !== old) {
        if (!result) {
          removed = old;
        }
        this.clean(engine, path, void 0, operation, scope);
      } else if (!this.unexpiring) {
        return;
      }
    }
    if (isCollection) {
      (_base = engine.queries)[path] || (_base[path] = []);
      added = void 0;
      for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
        child = result[_j];
        if (!old || Array.prototype.indexOf.call(old, child) === -1) {
          (added || (added = [])).push(child);
          added.isCollection = true;
        }
      }
      if (result && result.item) {
        result = Array.prototype.slice.call(result, 0);
      }
    } else {
      added = result;
      removed = old;
    }
    if (this.write(engine, operation, continuation, scope, node, path, result, old, added, removed)) {
      this.set(engine, path, result);
    }
    return added;
  };

  Query.prototype.write = function(engine, operation, continuation, scope, node, path, result, old, added, removed) {
    if (result != null ? result.operations : void 0) {
      this.reduce(engine, operation, path, scope, void 0, void 0, void 0, continuation);
    } else {
      this.reduce(engine, operation, path, scope, added, removed, void 0, continuation);
    }
    this.subscribe(engine, operation, continuation, scope, node);
    this.snapshot(engine, path, old);
    if (result !== old) {
      return !(result != null ? result.push : void 0);
    }
  };

  Query.prototype.subscribe = function(engine, operation, continuation, scope, node) {
    var id, observers, _base, _base1;
    id = engine.identify(node);
    observers = (_base = engine.engine.observers)[id] || (_base[id] = []);
    if (engine.indexOfTriplet(observers, operation, continuation, scope) === -1) {
      if (typeof (_base1 = operation.command).prepare === "function") {
        _base1.prepare(operation);
      }
      return observers.push(operation, continuation, scope);
    }
  };

  Query.prototype.commit = function(engine, solution) {
    var collection, contd, deferred, i, index, item, mutations, old, op, watcher, _i, _ref;
    if (mutations = engine.updating.mutations) {
      engine.console.start('Queries', mutations.slice());
      index = 0;
      while (mutations[index]) {
        watcher = mutations.splice(0, 3);
        engine.input.solve(watcher[0], watcher[1], watcher[2]);
      }
      engine.updating.mutations = void 0;
      engine.console.end();
    }
    if (deferred = engine.updating.deferred) {
      index = 0;
      engine.console.start('Deferred', deferred);
      while (deferred[index]) {
        contd = deferred[index + 1];
        collection = this.get(engine, contd);
        op = deferred[index];
        if (!op.command.singular) {
          if (old = (_ref = engine.updating.snapshots) != null ? _ref[contd] : void 0) {
            collection = collection.slice();
            collection.isCollection = true;
            for (i = _i = collection.length - 1; _i >= 0; i = _i += -1) {
              item = collection[i];
              if (old.indexOf(item) > -1) {
                collection.splice(i, 1);
              }
            }
          }
          if (collection != null ? collection.length : void 0) {
            op.command.ascend(engine.input, op, contd, deferred[index + 2], collection);
          }
        } else {
          op.command.solve(engine.input, op, contd, deferred[index + 2], true);
        }
        index += 3;
      }
      engine.updating.deferred = void 0;
      engine.console.end();
    }
  };

  Query.prototype.add = function(engine, node, continuation, operation, scope, key, contd) {
    var collection, continuations, dup, duplicates, el, index, operations, parent, scopes, _base, _base1, _i, _j, _len, _len1, _ref;
    collection = (_base = engine.queries)[continuation] || (_base[continuation] = []);
    if (!collection.push) {
      return;
    }
    collection.isCollection = true;
    operations = collection.operations || (collection.operations = []);
    continuations = collection.continuations || (collection.continuations = []);
    scopes = collection.scopes || (collection.scopes = []);
    if (engine.pairs[continuation]) {
      ((_base1 = engine.updating).pairs || (_base1.pairs = {}))[continuation] = true;
    }
    this.snapshot(engine, continuation, collection);
    if ((index = collection.indexOf(node)) === -1) {
      for (index = _i = 0, _len = collection.length; _i < _len; index = ++_i) {
        el = collection[index];
        if (!this.comparePosition(el, node, operations[index], key)) {
          break;
        }
      }
      collection.splice(index, 0, node);
      operations.splice(index, 0, key);
      continuations.splice(index, 0, contd);
      scopes.splice(index, 0, scope);
      this.chain(engine, collection[index - 1], node, continuation);
      this.chain(engine, node, collection[index + 1], continuation);
      parent = operation;
      while (parent = parent.parent) {
        if (!(parent.command.sequence && parent[parent.length - 1] === operation)) {
          break;
        }
      }
      if (parent[0] === 'rule') {
        if (continuation === this.getCanonicalPath(continuation)) {
          if ((_ref = engine.Stylesheet) != null) {
            _ref.match(engine, node, continuation, true);
          }
        }
      }
      return true;
    } else if (!(scopes[index] === scope && continuations[index] === contd)) {
      duplicates = (collection.duplicates || (collection.duplicates = []));
      for (index = _j = 0, _len1 = duplicates.length; _j < _len1; index = ++_j) {
        dup = duplicates[index];
        if (dup === node) {
          if (scopes[index] === scope && continuations[index] === contd) {
            return;
          }
        }
      }
      duplicates.push(node);
      operations.push(key);
      continuations.push(contd);
      scopes.push(scope);
      return;
    }
    return collection;
  };

  Query.prototype.get = function(engine, continuation) {
    return engine.queries[continuation];
  };

  Query.prototype.unobserve = function(engine, id, path, continuation, scope) {
    var index, observers, query, refs, subscope, watcher, _base, _results;
    if (typeof id === 'object') {
      observers = id;
      id = void 0;
    } else {
      if (!(observers = engine.observers[id])) {
        return;
      }
    }
    if (path !== true) {
      refs = this.getVariants(path);
    }
    index = 0;
    _results = [];
    while (watcher = observers[index]) {
      query = observers[index + 1];
      if (refs && refs.indexOf(query) === -1) {
        index += 3;
        continue;
      }
      subscope = observers[index + 2];
      observers.splice(index, 3);
      if (id != null) {
        if (typeof (_base = watcher.command).onClean === "function") {
          _base.onClean(engine, watcher, query, watcher, subscope);
        }
        this.clean(engine, watcher, query, watcher, subscope, continuation);
        if (!observers.length) {
          _results.push(delete engine.observers[id]);
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Query.prototype.snapshot = function(engine, key, collection) {
    var c, snapshots, _base;
    if ((snapshots = (_base = engine.updating).snapshots || (_base.snapshots = {})).hasOwnProperty(key)) {
      return;
    }
    if (collection != null ? collection.push : void 0) {
      c = collection.slice();
      if (collection.isCollection) {
        c.isCollection = true;
      }
      if (collection.duplicates) {
        c.duplicates = collection.duplicates.slice();
      }
      if (collection.scopes) {
        c.scopes = collection.scopes.slice();
      }
      if (collection.operations) {
        c.operations = collection.operations.slice();
      }
      collection = c;
    }
    return snapshots[key] = collection;
  };

  Query.prototype.defer = function(engine, operation, continuation, scope) {
    var _base;
    (_base = engine.updating).deferred || (_base.deferred = []);
    if (engine.indexOfTriplet(engine.updating.deferred, operation, continuation, scope) === -1) {
      return engine.updating.deferred.push(operation, continuation, scope);
    }
  };

  Query.prototype.removeFromCollection = function(engine, node, continuation, operation, scope, needle, contd) {
    var collection, continuations, dup, duplicate, duplicates, index, length, negative, operations, parent, refs, scopes, _i, _len, _ref;
    collection = this.get(engine, continuation);
    length = collection.length;
    operations = collection.operations;
    continuations = collection.continuations;
    scopes = collection.scopes;
    duplicate = null;
    refs = this.getVariants(contd);
    if ((duplicates = collection.duplicates)) {
      for (index = _i = 0, _len = duplicates.length; _i < _len; index = ++_i) {
        dup = duplicates[index];
        if (dup === node) {
          if (refs.indexOf(continuations[length + index]) > -1 && scopes[length + index] === scope) {
            this.snapshot(engine, continuation, collection);
            duplicates.splice(index, 1);
            operations.splice(length + index, 1);
            continuations.splice(length + index, 1);
            scopes.splice(length + index, 1);
            return false;
          } else {
            if (duplicate == null) {
              duplicate = index;
            }
          }
        }
      }
    }
    if (operation && length && (needle != null)) {
      this.snapshot(engine, continuation, collection);
      if ((index = collection.indexOf(node)) > -1) {
        if (operations) {
          negative = false;
          if (scopes[index] !== scope) {
            return null;
          }
          if (refs.indexOf(continuations[index]) === -1) {
            return null;
          }
          if (duplicate != null) {
            duplicates.splice(duplicate, 1);
            continuations[index] = continuations[duplicate + length];
            continuations.splice(duplicate + length, 1);
            operations[index] = operations[duplicate + length];
            operations.splice(duplicate + length, 1);
            scopes[index] = scopes[duplicate + length];
            scopes.splice(duplicate + length, 1);
            return false;
          }
        }
        collection.splice(index, 1);
        if (operations) {
          operations.splice(index, 1);
          continuations.splice(index, 1);
          scopes.splice(index, 1);
        }
        this.chain(engine, collection[index - 1], node, continuation);
        this.chain(engine, node, collection[index], continuation);
        parent = operation;
        while (parent = parent.parent) {
          if (!(parent.command.sequence && parent[parent.length - 1] === operation)) {
            break;
          }
        }
        if (parent[0] === 'rule') {
          if ((_ref = engine.Stylesheet) != null) {
            _ref.match(engine, node, continuation, false);
          }
        }
        return true;
      }
    }
    return false;
  };

  Query.prototype.remove = function(engine, id, continuation, operation, scope, needle, recursion, contd) {
    var collection, node, parent, ref, removed, _base, _base1;
    if (needle == null) {
      needle = operation;
    }
    if (contd == null) {
      contd = continuation;
    }
    if (typeof id === 'object') {
      node = id;
      id = engine.identity.find(id);
    } else {
      if (id.indexOf('"') > -1) {
        node = id;
      } else {
        node = engine.identity[id];
      }
    }
    if (engine.pairs[continuation]) {
      ((_base = engine.updating).pairs || (_base.pairs = {}))[continuation] = true;
    }
    collection = this.get(engine, continuation);
    if (collection && this.isCollection(collection)) {
      this.snapshot(engine, continuation, collection);
      removed = this.removeFromCollection(engine, node, continuation, operation, scope, needle, contd);
    }
    if (removed !== false) {
      if (this.isCollection(collection)) {
        ref = continuation + id;
      } else {
        ref = continuation;
      }
      if (parent = operation != null ? operation.parent : void 0) {
        if (typeof (_base1 = parent.command).release === "function") {
          _base1.release(node, engine, operation, ref, scope);
        }
      }
      this.unobserve(engine, id, ref, ref);
      if (recursion !== continuation) {
        if (removed !== false) {
          this.reduce(engine, operation, continuation, scope, recursion, node, continuation, contd);
        }
        if (removed) {
          this.clean(engine, continuation + id, void 0, void 0, node.scoped && node.parentNode);
        }
      }
    }
    return removed;
  };

  Query.prototype.getKey = function() {
    return this.key || '';
  };

  Query.prototype.clean = function(engine, path, continuation, operation, scope, contd) {
    var command, key, result;
    if (contd == null) {
      contd = continuation;
    }
    if (command = path.command) {
      if (key = command.getKey(engine, operation, continuation)) {
        path = continuation + key;
      } else {
        path = this.delimit(continuation);
      }
    }
    if ((result = this.get(engine, path)) !== void 0) {
      this.each(this.remove, engine, result, path, operation, scope, operation, false, contd);
    }
    this.set(engine, path, void 0);
    if (engine.updating.mutations) {
      this.unobserve(engine, engine.updating.mutations, path);
    }
    this.unobserve(engine, engine.identify(scope || engine.scope), path);
    if (!result || !this.isCollection(result)) {
      engine.triggerEvent('remove', path);
    }
    return true;
  };

  Query.prototype.chain = function(engine, left, right, continuation) {
    if (left) {
      this.match(engine, left, ':last', '*', void 0, continuation);
      this.match(engine, left, ':next', '*', void 0, continuation);
    }
    if (right) {
      this.match(engine, right, ':previous', '*', void 0, continuation);
      return this.match(engine, right, ':first', '*', void 0, continuation);
    }
  };

  Query.prototype.reduce = function(engine, operation, path, scope, added, removed, recursion, contd) {
    var oppath;
    oppath = this.getCanonicalPath(path);
    if (path !== oppath && recursion !== oppath) {
      this.collect(engine, operation, oppath, scope, added, removed, oppath, path);
    }
    return this.collect(engine, operation, path, scope, added, removed, recursion, contd || '');
  };

  Query.prototype.collect = function(engine, operation, path, scope, added, removed, recursion, contd) {
    var collection, i, index, node, self, sorted, updated, _i, _len, _ref, _results;
    if (removed) {
      this.each(this.remove, engine, removed, path, operation, scope, operation, recursion, contd);
    }
    if (added) {
      this.each(this.add, engine, added, path, operation, scope, operation, contd);
    }
    if ((_ref = (collection = this.get(engine, path))) != null ? _ref.operations : void 0) {
      self = this;
      sorted = collection.slice().sort(function(a, b) {
        var i, j;
        i = collection.indexOf(a);
        j = collection.indexOf(b);
        return self.comparePosition(a, b, collection.operations[i], collection.operations[j]) && -1 || 1;
      });
      updated = void 0;
      _results = [];
      for (index = _i = 0, _len = sorted.length; _i < _len; index = ++_i) {
        node = sorted[index];
        if (node !== collection[index]) {
          if (!updated) {
            updated = collection.slice();
            this.set(engine, path, updated);
            updated.operations = collection.operations.slice();
            updated.continuations = collection.continuations.slice();
            updated.scopes = collection.scopes.slice();
            updated.duplicates = collection.duplicates;
            updated.isCollection = collection.isCollection;
            updated[index] = node;
          }
          i = collection.indexOf(node);
          updated[index] = node;
          updated.operations[index] = collection.operations[i];
          updated.continuations[index] = collection.continuations[i];
          updated.scopes[index] = collection.scopes[i];
          this.chain(engine, sorted[index - 1], node, path);
          _results.push(this.chain(engine, node, sorted[index + 1], path));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  Query.prototype.each = function(method, engine, result, continuation, operation, scope, needle, recursion, contd) {
    var child, copy, returned, _i, _len;
    if (result == null) {
      result = void 0;
    }
    if (this.isCollection(result)) {
      copy = result.slice();
      returned = void 0;
      for (_i = 0, _len = copy.length; _i < _len; _i++) {
        child = copy[_i];
        if (method.call(this, engine, child, continuation, operation, scope, needle, recursion, contd)) {
          returned = true;
        }
      }
      return returned;
    } else if (result && typeof result !== 'number') {
      return method.call(this, engine, result, continuation, operation, scope, needle, recursion, contd);
    }
  };

  Query.prototype.set = function(engine, path, result) {
    var left, observers, old, _base, _ref;
    old = engine.queries[path];
    this.snapshot(engine, path, old);
    if (result != null) {
      engine.queries[path] = result;
    } else if (engine.queries.hasOwnProperty(path)) {
      delete engine.queries[path];
      if (engine.updating.branching) {
        engine.updating.branching.push(path);
      }
    }
    path = this.getCanonicalPath(path);
    _ref = engine.pairs;
    for (left in _ref) {
      observers = _ref[left];
      if (observers.indexOf(path) > -1) {
        ((_base = engine.updating).pairs || (_base.pairs = {}))[left] = true;
      }
    }
  };

  Query.prototype.onLeft = function(engine, operation, parent, continuation, scope) {
    var left;
    left = this.getCanonicalPath(continuation);
    if (engine.indexOfTriplet(engine.lefts, parent, left, scope) === -1) {
      parent.right = operation;
      engine.lefts.push(parent, left, scope);
      return this.rewind;
    } else {
      (engine.pairing || (engine.pairing = {}))[left] = true;
      return this.nothing;
    }
  };

  Query.prototype.nothing = function() {};

  Query.prototype.onRight = function(engine, operation, parent, continuation, scope, left, right) {
    var index, op, pairs, pushed, _base, _base1, _i, _len, _ref;
    right = this.getCanonicalPath(continuation.substring(0, continuation.length - 1));
    _ref = engine.lefts;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = _i += 3) {
      op = _ref[index];
      if (op === parent && engine.lefts[index + 2] === scope) {
        left = engine.lefts[index + 1];
        this.listen(engine, operation, continuation, scope, left, right);
      }
    }
    if (!left) {
      return;
    }
    left = this.getCanonicalPath(left);
    pairs = (_base = engine.pairs)[left] || (_base[left] = []);
    if (pairs.indexOf(right) === -1) {
      pushed = pairs.push(right, operation, scope);
    }
    if (engine.updating.pairs !== false) {
      ((_base1 = engine.updating).pairs || (_base1.pairs = {}))[left] = true;
    }
    return this.nothing;
  };

  Query.prototype.retrieve = function(engine, operation, continuation, scope, ascender, ascending, single) {
    var contd, index, last, parent, prev, result;
    last = continuation.lastIndexOf(this.PAIR);
    if (last > -1 && !operation.command.reference) {
      prev = -1;
      while ((index = continuation.indexOf(this.PAIR, prev + 1)) > -1) {
        if (result = this.retrieve(engine, operation, continuation.substring(prev + 1, index), scope, ascender, ascending, true)) {
          return result;
        }
        prev = index;
      }
      if (last === continuation.length - 1 && ascending) {
        parent = this.getRoot(operation);
        if (!parent.right || parent.right === operation) {
          return this.onLeft(engine, operation, parent, continuation, scope, ascender, ascending);
        } else {
          return this.onRight(engine, operation, parent, continuation, scope, ascender, ascending);
        }
      }
    } else {
      if (continuation.length === 1) {
        return;
      }
      contd = this.getCanonicalPath(continuation, true);
      if (contd.charAt(0) === this.PAIR) {
        contd = contd.substring(1);
      }
      if (contd === operation.command.path) {
        return this.getByPath(engine, continuation);
      }
    }
  };

  Query.prototype.repair = function(engine, reversed) {
    var dirty, index, pair, pairs, property, value, _i, _len, _ref;
    if (!(dirty = engine.updating.pairs)) {
      return;
    }
    engine.console.start('Pairs', dirty);
    engine.updating.pairs = false;
    for (property in dirty) {
      value = dirty[property];
      if (pairs = (_ref = engine.pairs[property]) != null ? _ref.slice() : void 0) {
        for (index = _i = 0, _len = pairs.length; _i < _len; index = _i += 3) {
          pair = pairs[index];
          this.pair(engine, property, pair, pairs[index + 1], pairs[index + 2], reversed);
        }
      }
    }
    engine.updating.pairs = void 0;
    return engine.console.end();
  };

  Query.prototype.count = function(value) {
    if (value != null ? value.push : void 0) {
      return value.length;
    } else {
      return (value != null) && 1 || 0;
    }
  };

  Query.prototype.pad = function(value, length) {
    var i, result, _i;
    if (value && !value.push) {
      result = [];
      for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
        result.push(value);
      }
      result.single = true;
      return result;
    } else if (value != null ? value.splice : void 0) {
      return value.slice();
    } else {
      return value || [];
    }
  };

  Query.prototype.restore = function(engine, path) {
    var _ref;
    if ((_ref = engine.updating.snapshots) != null ? _ref.hasOwnProperty(path) : void 0) {
      return engine.updating.snapshots[path];
    } else {
      return this.get(engine, path);
    }
  };

  Query.prototype.fetch = function(engine, path, reversed) {
    if (reversed) {
      return this.restore(engine, path);
    } else {
      return this.get(engine, path);
    }
  };

  Query.prototype.pair = function(engine, left, right, operation, scope, reversed) {
    var I, J, added, cleaned, cleaning, contd, el, index, leftNew, leftOld, object, op, pair, removed, rightNew, rightOld, root, solved, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _n, _ref, _ref1;
    root = this.getRoot(operation);
    right = this.getPrefixPath(engine, left) + root.right.command.path;
    if (reversed) {
      leftOld = engine.updating.queries.hasOwnProperty(left) ? engine.updating.queries[left] : this.restore(engine, left);
      rightOld = engine.updating.queries.hasOwnProperty(right) ? engine.updating.queries[right] : this.restore(engine, right);
    } else {
      leftNew = this.get(engine, left);
      rightNew = this.get(engine, right);
      leftOld = this.restore(engine, left);
      rightOld = this.restore(engine, right);
    }
    if (operation.command.singular) {
      if (leftNew != null ? leftNew.push : void 0) {
        leftNew = leftNew[0];
      }
      if (leftOld != null ? leftOld.push : void 0) {
        leftOld = leftOld[0];
      }
    }
    if (root.right.command.singular) {
      if (rightNew != null ? rightNew.push : void 0) {
        rightNew = rightNew[0];
      }
      if (rightOld != null ? rightOld.push : void 0) {
        rightOld = rightOld[0];
      }
    }
    I = Math.max(this.count(leftNew), this.count(rightNew));
    J = Math.max(this.count(leftOld), this.count(rightOld));
    leftNew = this.pad(leftNew, I);
    leftOld = this.pad(leftOld, J);
    rightNew = this.pad(rightNew, I);
    rightOld = this.pad(rightOld, J);
    removed = [];
    added = [];
    for (index = _i = 0, _len = leftOld.length; _i < _len; index = ++_i) {
      object = leftOld[index];
      if (leftNew[index] !== object || rightOld[index] !== rightNew[index]) {
        if (rightOld && rightOld[index]) {
          removed.push([object, rightOld[index]]);
        }
        if (leftNew[index] && rightNew[index]) {
          added.push([leftNew[index], rightNew[index]]);
        }
      }
    }
    if (leftOld.length < leftNew.length) {
      for (index = _j = _ref = leftOld.length, _ref1 = leftNew.length; _j < _ref1; index = _j += 1) {
        if (rightNew[index]) {
          added.push([leftNew[index], rightNew[index]]);
        }
      }
    }
    cleaned = [];
    for (_k = 0, _len1 = removed.length; _k < _len1; _k++) {
      pair = removed[_k];
      if (!pair[0] || !pair[1]) {
        continue;
      }
      contd = left;
      contd += engine.identify(pair[0]);
      contd += this.PAIR;
      contd += root.right.command.path;
      contd += engine.identify(pair[1]);
      cleaned.push(contd);
    }
    solved = [];
    for (_l = 0, _len2 = added.length; _l < _len2; _l++) {
      pair = added[_l];
      contd = left;
      contd += engine.identify(pair[0]);
      contd += this.PAIR;
      contd += root.right.command.path;
      contd += engine.identify(pair[1]);
      if ((index = cleaned.indexOf(contd)) > -1) {
        cleaned.splice(index, 1);
      } else {
        op = operation.parent;
        engine.input.solve(op, contd + this.PAIR, scope, true);
      }
    }
    for (_m = 0, _len3 = cleaned.length; _m < _len3; _m++) {
      contd = cleaned[_m];
      this.clean(engine, contd);
    }
    cleaning = true;
    for (_n = 0, _len4 = leftNew.length; _n < _len4; _n++) {
      el = leftNew[_n];
      if (el) {
        cleaning = false;
        break;
      }
    }
    if (cleaning) {
      return this.unpair(engine, left, scope, operation);
    }
  };

  Query.prototype.unpair = function(engine, left, scope, operation) {
    var contd, index, pairs, _ref;
    if (pairs = (_ref = engine.pairs) != null ? _ref[left] : void 0) {
      delete engine.pairs[left];
    }
    index = 0;
    while (contd = engine.lefts[index + 1]) {
      if (contd === left && engine.lefts[index + 2] === scope) {
        engine.lefts.splice(index, 3);
      } else {
        index += 3;
      }
    }
    return this;
  };

  Query.prototype.listen = function(engine, operation, continuation, scope, left, right) {
    var observers, _base;
    observers = (_base = engine.pairs)[left] || (_base[left] = []);
    if (engine.indexOfTriplet(observers, right, operation, scope) === -1) {
      return observers.push(right, operation, scope);
    }
  };

  Query.prototype.unlisten = function(engine, operation, continuation, scope, left, right) {
    var index, observers, _base;
    observers = (_base = engine.pairs)[left] || (_base[left] = []);
    if ((index = engine.indexOfTriplet(observers, right, operation, scope)) !== -1) {
      return observers.splice(index, 3);
    }
  };

  Query.prototype.getScope = function(engine, node, continuation) {
    var index, parent, path, scope;
    if (!node) {
      if ((index = continuation.lastIndexOf('$')) > -1) {
        if (path = this.getScopePath(continuation, 0)) {
          if (scope = this.getByPath(engine, path)) {
            if (scope.scoped) {
              if ((parent = engine.getScopeElement(scope.parentNode)) === engine.scope) {
                return;
              }
            }
            return scope._gss_id;
          }
        }
        if (scope = engine.scope) {
          return scope.gss_id;
        }
      }
    } else if (node !== engine.scope) {
      return node._gss_id || node;
    }
  };

  Query.prototype.getScopePath = function(continuation, level, virtualize) {
    var index, last;
    if (level == null) {
      level = 0;
    }
    last = continuation.length - 1;
    if (continuation.charCodeAt(last) === 8594) {
      last = continuation.lastIndexOf(this.DESCEND, last);
    }
    while (true) {
      if ((index = continuation.lastIndexOf(this.DESCEND, last)) === -1) {
        if (level > -1) {
          return '';
        }
      }
      if (continuation.charCodeAt(index + 1) === 64) {
        if (virtualize && level === -1) {
          break;
        } else {
          ++level;
        }
      }
      if (level === -1) {
        break;
      }
      last = index - 1;
      --level;
    }
    return continuation.substring(0, last + 1);
  };

  Query.prototype.getPrefixPath = function(engine, continuation, level) {
    var path;
    if (level == null) {
      level = 0;
    }
    if (path = this.getScopePath(continuation, level, true)) {
      return path + this.DESCEND;
    }
    return '';
  };

  Query.prototype.getParentScope = function(engine, scope, continuation, level) {
    var path, result;
    if (level == null) {
      level = 1;
    }
    if (!continuation) {
      return scope._gss_id;
    }
    if (path = this.getScopePath(continuation, level)) {
      if (result = this.getByPath(engine, path)) {
        if (result.scoped) {
          result = engine.getScopeElement(result);
        }
      }
      return result;
    }
    return engine.scope;
  };

  Query.prototype.getByPath = function(engine, path) {
    var id, j, last;
    if ((j = path.lastIndexOf('$')) > -1 && j > path.lastIndexOf(this.DESCEND)) {
      id = path.substring(j);
      last = id.length - 1;
      if (this.DELIMITERS.indexOf(id.charCodeAt(last)) > -1) {
        id = id.substring(0, last);
      }
      if (id.indexOf('"') > -1) {
        return id;
      }
    }
    return engine.identity[id] || this.get(engine, path);
  };

  Query.prototype.getCanonicalPath = function(continuation, compact) {
    var PopDirectives, RemoveForkMarks, bits, last;
    PopDirectives = Query.PopDirectives || (Query.PopDirectives = new RegExp("(?:" + "@[^@" + this.DESCEND + "]+" + this.DESCEND + ")+$", "g"));
    bits = this.delimit(continuation.replace(PopDirectives, '')).split(this.DESCEND);
    last = bits[bits.length - 1];
    RemoveForkMarks = Query.RemoveForkMarks || (Query.RemoveForkMarks = new RegExp("" + "([^" + this.PAIR + ",@])" + "\\$[^\[" + this.ASCEND + "]+" + "(?:" + this.ASCEND + "|$)", "g"));
    last = bits[bits.length - 1] = last.replace(RemoveForkMarks, '$1');
    if (compact) {
      return last;
    }
    return bits.join(this.DESCEND);
  };

  Query.prototype.getVariants = function(path) {
    return [path, path + this.ASCEND, path + this.PAIR, path + this.DESCEND, path + this.DESCEND + '&'];
  };

  Query.prototype.getCanonicalCollection = function(engine, path) {
    return engine.queries[this.getCanonicalPath(path)];
  };

  Query.prototype.getLocalPath = function(engine, operation, continuation) {
    return this["continue"](engine, operation, continuation);
  };

  Query.prototype.getGlobalPath = function(engine, operation, continuation, node) {
    return engine.identify(node) + ' ' + this.getKey(engine, operation, continuation, node);
  };

  Query.prototype.comparePosition = function(a, b, op1, op2) {
    var i, index, j, left, next, parent, right;
    if (op1 !== op2) {
      parent = op1.parent;
      i = parent.indexOf(op1);
      j = parent.indexOf(op2);
      if (i > j) {
        left = op2;
        right = op1;
      } else {
        left = op1;
        right = op2;
      }
      index = i;
      while (next = parent[++index]) {
        if (next === right) {
          break;
        }
        if (next[0] === 'virtual') {
          return i < j;
        }
      }
      if (!(a.nodeType && b.nodeType)) {
        return i < j;
      }
    }
    if (a.compareDocumentPosition) {
      return a.compareDocumentPosition(b) & 4;
    }
    return a.sourceIndex < b.sourceIndex;
  };

  Query.prototype.match = function(engine, node, group, qualifier, changed, continuation) {
    var change, contd, groupped, id, index, operation, path, scope, watchers, _i, _j, _len, _len1;
    if (!(id = engine.identify(node))) {
      return;
    }
    if (!(watchers = engine.observers[id])) {
      return;
    }
    if (continuation) {
      path = this.getCanonicalPath(continuation);
    }
    for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
      operation = watchers[index];
      if (groupped = operation.command[group]) {
        contd = watchers[index + 1];
        if (path && path !== this.getCanonicalPath(contd)) {
          continue;
        }
        scope = watchers[index + 2];
        if (qualifier) {
          this.qualify(engine, operation, contd, scope, groupped, qualifier);
        } else if (changed.nodeType) {
          this.qualify(engine, operation, contd, scope, groupped, changed.tagName, '*');
        } else if (typeof changed === 'string') {
          this.qualify(engine, operation, contd, scope, groupped, changed, '*');
        } else {
          for (_j = 0, _len1 = changed.length; _j < _len1; _j++) {
            change = changed[_j];
            if (typeof change === 'string') {
              this.qualify(engine, operation, contd, scope, groupped, change, '*');
            } else {
              this.qualify(engine, operation, contd, scope, groupped, change.tagName, '*');
            }
          }
        }
      }
    }
  };

  Query.prototype.qualify = function(engine, operation, continuation, scope, groupped, qualifier, fallback) {
    var indexed;
    if ((indexed = groupped[qualifier]) || (fallback && groupped[fallback])) {
      this.schedule(engine, operation, continuation, scope);
    }
  };

  Query.prototype.notify = function(engine, continuation, scope) {
    var index, watcher, watchers, _i, _len;
    if (watchers = engine.observers[engine.identify(scope)]) {
      for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
        watcher = watchers[index];
        if (watchers[index + 1] + watcher.command.key === continuation) {
          this.schedule(engine, watcher, continuation, scope);
        }
      }
    }
  };

  Query.prototype.continuate = function(engine, scope) {
    var contd, index, scoped, watcher, watchers, _i, _len;
    if (watchers = engine.observers[engine.identify(scope)]) {
      for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
        watcher = watchers[index];
        scoped = watchers[index + 2];
        contd = watcher.command["continue"](engine, watcher, watchers[index + 1], scoped);
        this.schedule(engine, watcher, contd, scoped);
      }
    }
  };

  Query.prototype.uncontinuate = function(engine, scope) {
    var index, watcher, watchers, _i, _len;
    if (watchers = engine.observers[engine.identify(scope)]) {
      for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
        watcher = watchers[index];
        this.clean(engine, watcher, this.delimit(watchers[index + 1]), watcher, watchers[index + 2]);
      }
    }
  };

  Query.prototype.schedule = function(engine, operation, continuation, scope) {
    var contd, index, last, length, mutations, other, stylesheet, watcher, _base, _i, _len;
    mutations = (_base = engine.updating).mutations || (_base.mutations = []);
    length = (continuation || '').length;
    last = null;
    stylesheet = operation.stylesheet;
    for (index = _i = 0, _len = mutations.length; _i < _len; index = _i += 3) {
      watcher = mutations[index];
      contd = mutations[index + 1] || '';
      if (watcher === operation && continuation === contd && scope === mutations[index + 2]) {
        return;
      }
      if (other = stylesheet) {
        if ((last == null) && !this.comparePosition(other, stylesheet, operation, operation)) {
          last = index + 3;
        }
      } else if (contd.length < length) {
        last = index + 3;
      }
    }
    return mutations.splice(last != null ? last : 0, 0, operation, continuation, scope);
  };

  Query.prototype.branch = function(engine) {
    var condition, conditions, index, path, queries, removed, snapshots, _base, _base1, _i, _j, _k, _len, _len1, _len2;
    if (conditions = engine.updating.branches) {
      engine.console.start('Branches', conditions.slice());
      engine.updating.branches = void 0;
      removed = engine.updating.branching = [];
      for (index = _i = 0, _len = conditions.length; _i < _len; index = _i += 3) {
        condition = conditions[index];
        condition.command.unbranch(engine, condition, conditions[index + 1], conditions[index + 2]);
      }
      engine.triggerEvent('branch');
      queries = (_base = engine.updating).queries || (_base.queries = {});
      snapshots = (_base1 = engine.updating).snapshots || (_base1.snapshots = {});
      this.repair(engine, true);
      engine.updating.branching = void 0;
      for (_j = 0, _len1 = removed.length; _j < _len1; _j++) {
        path = removed[_j];
        if (conditions.indexOf(path) > -1) {
          continue;
        }
        if (snapshots) {
          delete snapshots[path];
        }
        if (queries) {
          delete queries[path];
        }
        delete engine.queries[path];
      }
      for (index = _k = 0, _len2 = conditions.length; _k < _len2; index = _k += 3) {
        condition = conditions[index];
        condition.command.rebranch(engine, condition, conditions[index + 1], conditions[index + 2]);
      }
      return engine.console.end();
    }
  };

  Query.prototype.isCollection = function(object) {
    if (object && object.length !== void 0 && !object.substring && !object.nodeType) {
      if (object.isCollection) {
        return true;
      }
      switch (typeof object[0]) {
        case "object":
          return object[0].nodeType;
        case "undefined":
          return object.length === 0;
      }
    }
  };

  Query.prototype.Sequence = Command.Sequence;

  return Query;

})(Command);

module.exports = Query;



},{"./Command":3}],8:[function(require,module,exports){
var Update, Updater,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Updater = function(engine) {
  var Update, property, value, _ref;
  Update = function(problem, domain, parent, Domain, Auto) {
    var arg, index, object, result, update, vardomain, _i, _len;
    if (this instanceof Update) {
      this.problems = problem && (domain.push && problem || [problem]) || [];
      this.domains = domain && (domain.push && domain || [domain]) || [];
      return;
    }
    update = void 0;
    if (typeof problem[0] === 'string') {
      if (!this.solver.signatures[problem[0]]) {
        Domain = this.output;
      }
    }
    for (index = _i = 0, _len = problem.length; _i < _len; index = ++_i) {
      arg = problem[index];
      if (!(arg != null ? arg.push : void 0)) {
        continue;
      }
      if (!(arg[0] instanceof Array)) {
        arg.parent || (arg.parent = problem);
        if (arg[0] === 'get') {
          vardomain = arg.domain || (arg.domain = this.getVariableDomain(arg, Domain));
          (update || (update = new this.update)).push([arg], vardomain);
        } else {
          if (result = this.update(arg, domain, update || false, Domain)) {
            update || (update = result);
          }
        }
        object = true;
      }
    }
    if (!object) {
      if (!(problem instanceof Array)) {
        update.push([problem], null);
      }
    }
    if (!(problem[0] instanceof Array)) {
      if (update) {
        update.wrap(problem, parent, domain || Domain);
      } else if (problem[0] !== 'remove') {
        if (Domain) {
          problem.domain = Domain;
        }
        return;
      } else {
        update = new this.update([problem], [domain || Domain || null]);
      }
    }
    if (parent === false) {
      return update;
    } else if (parent || (parent = this.updating)) {
      return parent.push(update);
    } else {
      return update.each(this.resolve, this);
    }
  };
  if (this.prototype) {
    _ref = this.prototype;
    for (property in _ref) {
      value = _ref[property];
      Update.prototype[property] = value;
    }
  }
  if (engine) {
    Update.prototype.engine = engine;
  }
  return Update;
};

Update = Updater();

Update.compile = Updater;

Update.prototype = {
  push: function(problems, domain, reverse) {
    var index, other, position, _i, _len, _ref;
    if (domain === void 0) {
      _ref = problems.domains;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        domain = _ref[index];
        this.push(problems.problems[index], domain);
      }
      return this;
    }
    if ((position = this.domains.indexOf(domain, this.index + 1)) > -1) {
      return this.append(position, problems, reverse);
    }
    if (!domain) {
      position = this.index + 1;
    } else {
      position = this.domains.length;
      while (position - 1 > this.index && (other = this.domains[position - 1])) {
        if (!(other.priority < domain.priority || (reverse && this.problems[position - 1][0][0] !== 'remove'))) {
          break;
        }
        --position;
      }
    }
    this.insert(position, domain, problems);
    return position;
  },
  append: function(position, problems, reverse) {
    var cmds, domain, problem, _i, _len;
    cmds = this.problems[position];
    domain = this.domains[position];
    this.mix(cmds, problems);
    for (_i = 0, _len = problems.length; _i < _len; _i++) {
      problem = problems[_i];
      if (domain) {
        this.setVariables(cmds, problem);
        this.reify(problem, domain);
      }
    }
    if (domain) {
      return this.connect(position);
    }
  },
  insert: function(position, domain, problems) {
    var problem, property, variable, variables, _i, _len;
    for (_i = 0, _len = problems.length; _i < _len; _i++) {
      problem = problems[_i];
      this.setVariables(problems, problem);
    }
    this.domains.splice(position, 0, domain);
    this.problems.splice(position, 0, problems);
    if (variables = this.variables) {
      for (property in variables) {
        variable = variables[property];
        if (variable >= position) {
          variables[property]++;
        }
      }
    }
    this.reify(problems, domain);
    return this.connect(position);
  },
  splice: function(index) {
    var domain, name, variable, _ref;
    domain = this.domains[index];
    this.domains.splice(index, 1);
    this.problems.splice(index, 1);
    if (this.variables) {
      _ref = this.variables;
      for (name in _ref) {
        variable = _ref[name];
        if (variable >= index) {
          if (variable === index) {
            this.variables[name] = void 0;
          } else {
            this.variables[name] = variable - 1;
          }
        }
      }
    }
  },
  wrap: function(operation, parent, Domain, Auto) {
    var argument, domain, i, index, j, other, position, positions, problems, signed, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref;
    positions = void 0;
    _ref = this.problems;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      problems = _ref[index];
      if (domain = this.domains[index]) {
        signed = typeof operation[0] !== 'string' || domain.signatures[operation[0]];
        for (_j = 0, _len1 = operation.length; _j < _len1; _j++) {
          argument = operation[_j];
          if (signed && problems.indexOf(argument) > -1) {
            if (!other || (domain.Engine && !other.Engine)) {
              position = index;
              other = domain;
            }
          }
          if (!positions || positions.indexOf(index) === -1) {
            (positions || (positions = [])).push(index);
          }
        }
      }
    }
    if (!other || (Domain && other.displayName !== Domain.displayName)) {
      other = Domain;
      position = this.push([operation], other);
    }
    if (!positions) {
      this.push([operation], null);
      return;
    }
    for (j = _k = positions.length - 1; _k >= 0; j = _k += -1) {
      index = positions[j];
      if ((domain = this.domains[index]).displayName !== other.displayName) {
        positions.splice(j, 1);
      } else {
        problems = this.problems[index];
        for (_l = 0, _len2 = operation.length; _l < _len2; _l++) {
          argument = operation[_l];
          if ((i = problems.indexOf(argument)) > -1) {
            if (argument.push) {
              this.reify(argument, other, domain);
            }
            if (index === position && problems.indexOf(operation) === -1) {
              problems[i] = operation;
              positions.splice(j, 1);
              operation.domain = domain;
            } else {
              problems.splice(i, 1);
              if (problems.length === 0 && !domain.paths) {
                this.splice(index, 1);
                if (index < position) {
                  position--;
                }
                positions.splice(j, 1);
              }
            }
          }
        }
      }
    }
    if (other) {
      operation.domain = other;
      for (_m = 0, _len3 = operation.length; _m < _len3; _m++) {
        argument = operation[_m];
        if (argument.push) {
          operation.variables = argument.variables = this.setVariables(operation, argument, true);
        }
      }
      this.setVariables(this.problems[position], operation);
    }
    if (positions.length) {
      return this.connect(position, positions);
    } else {
      return this.connect(position);
    }
  },
  match: function(target, domain, positions) {
    var Solver, i, index, problems, property, variable, variables, _ref;
    problems = this.problems[target];
    variables = this.variables || (this.variables = {});
    if (Solver = domain.Engine) {
      _ref = problems.variables;
      for (property in _ref) {
        variable = _ref[property];
        if (variable.domain.Engine === Solver) {
          if (((i = variables[property]) != null) && (i !== target)) {
            if (__indexOf.call((positions || (positions = [])), i) < 0) {
              index = 0;
              while (positions[index] < i) {
                index++;
              }
              positions.splice(index, 0, i);
            }
          } else {
            variables[property] = target;
          }
        }
      }
    }
    return positions;
  },
  connect: function(target, positions) {
    var a, b, condition, domain, from, i, index, j, to, _i, _j, _ref, _ref1, _ref2;
    if (!(domain = this.domains[target])) {
      return;
    }
    if (positions || (positions = this.match(target, domain, positions))) {
      b = domain.constraints;
      for (index = _i = 0, _ref = positions.length; _i < _ref; index = _i += 1) {
        i = positions[index];
        a = this.domains[i].constraints;
        condition = a || b ? (a && a.length) < (b && b.length) : target < i;
        if (condition) {
          from = i;
          to = target;
        } else {
          from = target;
          to = i;
        }
        target = this.merge(from, to);
        for (j = _j = _ref1 = index + 1, _ref2 = positions.length; _j < _ref2; j = _j += 1) {
          if (positions[j] >= from) {
            positions[j]--;
          }
        }
      }
    }
    return target;
  },
  merge: function(from, to, parent) {
    var Solver, domain, exported, other, prob, problems, property, result, variable, _i, _j, _len, _len1, _ref;
    other = this.domains[to];
    problems = this.problems[from];
    result = this.problems[to];
    if (domain = this.domains[from]) {
      if (domain.paths && !domain.consumed) {
        domain.transfer(parent, this, other);
        exported = domain["export"]();
        domain.register(false);
      }
      for (_i = 0, _len = problems.length; _i < _len; _i++) {
        prob = problems[_i];
        if (result.indexOf(prob) === -1) {
          (exported || (exported = [])).push(prob);
        } else {
          this.reify(prob, other, domain);
        }
      }
    }
    this.splice(from, 1);
    if (from < to) {
      to--;
    }
    if (exported) {
      this.mix(result, exported);
      for (_j = 0, _len1 = exported.length; _j < _len1; _j++) {
        prob = exported[_j];
        this.setVariables(result, prob);
      }
      this.reify(exported, other, domain);
      if (Solver = domain.Engine) {
        _ref = result.variables;
        for (property in _ref) {
          variable = _ref[property];
          if (variable.domain.Engine === Solver) {
            (this.variables || (this.variables = {}))[property] = to;
          }
        }
      }
    }
    other.register();
    return to;
  },
  mix: function(result, exported) {
    var index, prob, problem, _i, _j, _len, _len1, _ref, _results;
    _results = [];
    for (_i = 0, _len = exported.length; _i < _len; _i++) {
      prob = exported[_i];
      for (index = _j = 0, _len1 = result.length; _j < _len1; index = ++_j) {
        problem = result[index];
        if (((_ref = problem.index) != null ? _ref : Infinity) > prob.index) {
          break;
        }
      }
      _results.push(result.splice(index, 0, prob));
    }
    return _results;
  },
  await: function(url) {
    return (this.busy || (this.busy = [])).push(url);
  },
  postMessage: function(url, message) {
    var _base, _name;
    return ((_base = (this.posted || (this.posted = {})))[_name = url.url || url] || (_base[_name] = [])).push(this.engine.clone(message));
  },
  terminate: function() {
    var changes, command, commands, constants, first, group, i, message, path, paths, property, removes, url, value, values, worker, _i, _j, _k, _len, _len1, _ref, _ref1;
    if (this.posted) {
      _ref = this.posted;
      for (url in _ref) {
        message = _ref[url];
        worker = this.engine.workers[url];
        paths = (worker.paths || (worker.paths = {}));
        values = (worker.values || (worker.values = {}));
        changes = {};
        commands = [changes];
        removes = [];
        for (_i = 0, _len = message.length; _i < _len; _i++) {
          group = message[_i];
          for (_j = 0, _len1 = group.length; _j < _len1; _j++) {
            command = group[_j];
            first = command[0];
            if (first === 'remove') {
              for (i = _k = 1, _ref1 = command.length; 1 <= _ref1 ? _k < _ref1 : _k > _ref1; i = 1 <= _ref1 ? ++_k : --_k) {
                delete paths[command[i]];
                removes.push(command[i]);
              }
            } else if (first === 'value') {
              if (command[2] !== values[command[1]]) {
                changes[command[1]] = command[2];
              }
            } else {
              if ((path = first.key) != null) {
                paths[path] = true;
                if (constants = first.values) {
                  for (property in constants) {
                    value = constants[property];
                    if (value !== values[property]) {
                      changes[property] = value;
                    }
                  }
                }
              }
              commands.push(command);
            }
          }
        }
        if (removes.length) {
          removes.unshift('remove');
          commands.splice(1, 0, removes);
        }
        worker.postMessage(commands);
        while ((i = this.busy.indexOf(url)) > -1 && this.busy.lastIndexOf(url) !== i) {
          this.busy.splice(i, 1);
        }
      }
      return this.posted = void 0;
    }
  },
  each: function(callback, bind, solution) {
    var domain, previous, property, result, variable, _ref, _ref1, _ref2;
    if (solution) {
      this.apply(solution);
    }
    if (!this.problems[this.index + 1]) {
      return;
    }
    previous = this.domains[this.index];
    while ((domain = this.domains[++this.index]) !== void 0) {
      previous = domain;
      if (this.variables) {
        _ref = this.variables;
        for (property in _ref) {
          variable = _ref[property];
          if (variable <= this.index) {
            delete this.variables[property];
          }
        }
      }
      result = (this.solutions || (this.solutions = []))[this.index] = callback.call(bind || this, domain, this.problems[this.index], this.index, this);
      if (((_ref1 = this.busy) != null ? _ref1.length : void 0) && this.busy.indexOf((_ref2 = this.domains[this.index + 1]) != null ? _ref2.url : void 0) === -1) {
        this.terminate();
        return result;
      }
      if (result && result.onerror === void 0) {
        if (result.push) {
          this.engine.update(result);
        } else {
          this.apply(result);
          solution = this.apply(result, solution || {});
        }
      }
    }
    this.terminate();
    this.index--;
    return solution || this;
  },
  apply: function(result) {
    var last, now, property, solution, value;
    solution = this.solution || (this.solution = {});
    last = this.last || (this.last = {});
    for (property in result) {
      value = result[property];
      now = solution[property];
      if (last[property] === value) {
        if (Math.abs(now - value) < 2) {
          (this.changes || (this.changes = {}))[property] = solution[property] = now;
        }
        continue;
      }
      if (now !== value) {
        if (solution === this.solution && (value != null)) {
          last[property] = now;
        }
        (this.changes || (this.changes = {}))[property] = value;
        solution[property] = value;
      }
    }
    return solution;
  },
  remove: function(continuation, problem) {
    var i, index, problems, _i, _j, _ref;
    this.push([['remove', continuation]], null);
    _ref = this.problems;
    for (index = _i = _ref.length - 1; _i >= 0; index = _i += -1) {
      problems = _ref[index];
      if (index === this.index) {
        break;
      }
      for (i = _j = problems.length - 1; _j >= 0; i = _j += -1) {
        problem = problems[i];
        if (problem && problem[0] && problem[0].key === continuation) {
          problems.splice(i, 1);
          if (problems.length === 0) {
            this.splice(index, 1);
          }
        }
      }
    }
  },
  perform: function(domain) {
    var glob, globals, globs, _i, _len;
    globals = this.domains.indexOf(null, this.index);
    if (globals > -1) {
      globs = this.problems[globals];
      if (typeof globs[0] === 'string') {
        if (globs[0] === 'remove') {
          domain.remove.apply(domain, globs.slice(1));
        }
      } else {
        for (_i = 0, _len = globs.length; _i < _len; _i++) {
          glob = globs[_i];
          if (glob[0] === 'remove') {
            domain.remove.apply(domain, glob.slice(1));
          }
        }
      }
    }
  },
  setVariables: function(result, operation, share) {
    var property, variable, variables;
    if (variables = operation.variables) {
      if (!result.variables && share) {
        result.variables = variables;
      } else {
        for (property in variables) {
          variable = variables[property];
          (result.variables || (result.variables = {}))[property] = variable;
        }
      }
    } else if (operation[0] === 'get') {
      (result.variables || (result.variables = {}))[operation[1]] = operation;
    }
    return result.variables;
  },
  reify: function(operation, domain, from) {
    var arg, _i, _len;
    if (operation.domain === from) {
      operation.domain = domain;
    }
    for (_i = 0, _len = operation.length; _i < _len; _i++) {
      arg = operation[_i];
      if (arg && arg.push) {
        this.reify(arg, domain, from);
      }
    }
    return operation;
  },
  cleanup: function(name, continuation) {
    var length, old, prop, _results;
    old = this[name];
    if (continuation) {
      if (old) {
        length = continuation.length;
        _results = [];
        for (prop in old) {
          if (prop.length > length) {
            if (prop.substring(0, length) === continuation) {
              _results.push(delete old[prop]);
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    } else {
      return this[name] = void 0;
    }
  },
  reset: function(continuation) {
    this.cleanup('queries', continuation);
    this.cleanup('snapshots', continuation);
    return this.cleanup('mutations');
  },
  commit: function() {
    var changes;
    if (this.restyled) {
      this.restyled = void 0;
    }
    if (this.reflown) {
      this.reflown = void 0;
    }
    if (changes = this.changes) {
      this.changes = void 0;
    }
    return changes;
  },
  getProblems: function(callback, bind) {
    return this.engine.clone(this.problems);
  },
  finish: function() {
    this.time = this.engine.console.getTime(this.started);
    return this.started = void 0;
  },
  start: function() {
    return this.started != null ? this.started : this.started = this.engine.console.getTime();
  },
  isDone: function() {
    return (this.domains.length === this.index + 1) && this.isDocumentDone() && this.isDataDone();
  },
  isDocumentDone: function() {
    return !(this.mutations || this.deferred || this.pairs || this.stylesheets || this.branches);
  },
  isDataDone: function() {
    return !(this.constraints || this.assignments || this.ranges);
  },
  isDirty: function() {
    return this.restyled || this.changes || this.reflown || this.engine.data.changes;
  },
  hadSideEffects: function(solution) {
    return this.solution || this.domains.length > 0 || this.hasOwnProperty('restyled');
  },
  block: function() {
    return this.blocking++;
  },
  unblock: function() {
    return --this.blocking === 0;
  },
  blocking: 0,
  index: -1
};

module.exports = Update;



},{}],9:[function(require,module,exports){
var Condition, Query,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Query = require('../Query');

Condition = (function(_super) {
  __extends(Condition, _super);

  Condition.prototype.type = 'Condition';

  Condition.prototype.Sequence = void 0;

  Condition.prototype.signature = [
    {
      "if": ['Query', 'Selector', 'Variable', 'Constraint', 'Default'],
      then: ['Any']
    }, [
      {
        "else": ['Any']
      }
    ]
  ];

  Condition.prototype.List = {
    2: true,
    3: true
  };

  Condition.prototype.cleaning = true;

  Condition.prototype.conditional = 1;

  Condition.prototype.boundaries = true;

  Condition.prototype.domains = {
    1: 'output'
  };

  function Condition(operation, engine) {
    var command, parent, previous;
    this.path = this.key = this.serialize(operation, engine);
    if (this.linked) {
      if (parent = operation.parent) {
        previous = parent[parent.indexOf(operation) - 1];
        if (command = previous.command) {
          if (command.type === 'Condition') {
            command.next = operation;
            this.previous = command;
          }
        }
      }
    }
  }

  Condition.prototype.descend = function(engine, operation, continuation, scope) {
    var branch, evaluate, path;
    continuation = this.delimit(continuation, this.DESCEND);
    if (this.conditional) {
      path = continuation + this.key;
      if (!engine.queries.hasOwnProperty(path)) {
        engine.queries[path] = 0;
        evaluate = true;
      }
      this.after([], engine.queries[path], engine, operation, continuation, scope);
      if (evaluate) {
        branch = operation[this.conditional];
        branch.command.solve(engine, branch, continuation, scope);
      }
    }
    return false;
  };

  Condition.prototype.execute = function(value) {
    return value;
  };

  Condition.prototype.serialize = function(operation, engine) {
    return '@' + this.toExpression(operation[1]);
  };

  Condition.prototype.getOldValue = function(engine, continuation) {
    var old, _ref, _ref1;
    old = (_ref = (_ref1 = engine.updating.snapshots) != null ? _ref1[continuation] : void 0) != null ? _ref : 0;
    return old > 0 || (old === 0 && 1 / old !== -Infinity);
  };

  Condition.prototype.ascend = function(engine, operation, continuation, scope, result) {
    var condition, conditions, contd, index, length, _base, _i, _len;
    if (conditions = ((_base = engine.updating).branches || (_base.branches = []))) {
      if (engine.indexOfTriplet(conditions, operation, continuation, scope) === -1) {
        length = continuation.length;
        for (index = _i = 0, _len = conditions.length; _i < _len; index = _i += 3) {
          condition = conditions[index];
          contd = conditions[index + 1];
          if (contd.length >= length) {
            break;
          } else if (continuation.substring(0, contd.length) === contd) {
            return;
          }
        }
        return conditions.splice(index || 0, 0, operation, continuation, scope);
      }
    }
  };

  Condition.prototype.rebranch = function(engine, operation, continuation, scope) {
    var branch, increment, index, inverted, result;
    increment = this.getOldValue(engine, continuation) ? -1 : 1;
    engine.queries[continuation] = (engine.queries[continuation] || 0) + increment;
    inverted = operation[0] === 'unless';
    index = this.conditional + 1 + ((increment === -1) ^ inverted);
    if (branch = operation[index]) {
      engine.console.start(index === 2 && 'if' || 'else', operation[index], continuation);
      result = engine.input.Command(branch).solve(engine.input, branch, this.delimit(continuation, this.DESCEND), scope);
      return engine.console.end(result);
    }
  };

  Condition.prototype.unbranch = function(engine, operation, continuation, scope) {
    var increment, old, _ref;
    if (old = (_ref = engine.updating.snapshots) != null ? _ref[continuation] : void 0) {
      increment = this.getOldValue(engine, continuation) ? -1 : 1;
      if ((engine.queries[continuation] += increment) === 0) {
        this.clean(engine, continuation, continuation, operation, scope);
        return true;
      }
    }
  };

  Condition.prototype["yield"] = function(result, engine, operation, continuation, scope) {
    var old, path, scoped, value, _base, _ref;
    if (!(operation.parent.indexOf(operation) > 1)) {
      if (operation[0].key != null) {
        continuation = operation[0].key;
        if (scoped = operation[0].scope) {
          scope = engine.identity[scoped];
        }
      }
      if (this.bound) {
        continuation = this.getPrefixPath(engine, continuation);
      }
      path = this.delimit(continuation, this.DESCEND) + this.key;
      if ((result != null ? result.push : void 0) && result.valueOf !== Array.prototype.valueOf) {
        result = result.valueOf() || false;
      }
      value = engine.queries[path];
      if (result && !value) {
        value = -0;
      }
      ((_base = engine.updating).snapshots || (_base.snapshots = {}))[path] = value;
      if (old = (_ref = engine.updating.snapshots) != null ? _ref[path] : void 0) {
        if (this.getOldValue(engine, path) === !!result) {
          return true;
        }
      }
      this.notify(engine, path, scope, result);
      return true;
    }
  };

  return Condition;

})(Query);

Condition.Global = Condition.extend({
  condition: function(engine, operation, command) {
    var argument, _i, _len;
    if (command) {
      operation = operation[1];
    }
    if (operation[0] === 'get' || operation[1] === 'virtual') {
      if (operation.length === 2) {
        return false;
      }
    } else if (operation[0] === '&') {
      return false;
    }
    for (_i = 0, _len = operation.length; _i < _len; _i++) {
      argument = operation[_i];
      if (argument && argument.push && this.condition(engine, argument) === false) {
        return false;
      }
    }
    return true;
  },
  global: true
});

Condition.Selector = Condition.extend({
  condition: function(engine, operation, command) {
    var argument, _i, _len;
    if (command) {
      operation = operation[1];
    }
    if (operation.command.type === 'Selector' && (operation.length > 1 || (operation.parent.command.type === 'Selector' && operation.parent.command.type === 'Iterator'))) {
      return true;
    }
    for (_i = 0, _len = operation.length; _i < _len; _i++) {
      argument = operation[_i];
      if (argument && argument.push && this.condition(engine, argument)) {
        return true;
      }
    }
    return false;
  },
  bound: true
});

Condition.prototype.advices = [Condition.Selector, Condition.Global];

Condition.define('if', {});

Condition.define('unless', {
  inverted: true
});

Condition.define('else', {
  signature: [
    {
      then: ['Any']
    }
  ],
  linked: true,
  conditional: null,
  domains: null
});

Condition.define('elseif', {
  linked: true
});

Condition.define('elsif', {});

module.exports = Condition;



},{"../Query":7}],10:[function(require,module,exports){
var Command, Constraint;

Command = require('../Command');

Constraint = Command.extend({
  type: 'Constraint',
  signature: [
    {
      left: ['Variable', 'Number'],
      right: ['Variable', 'Number']
    }, [
      {
        strength: ['String'],
        weight: ['Number']
      }
    ]
  ],
  log: function(args, engine, operation, continuation, scope, name) {
    return engine.console.push(name || operation[0], args, operation.hash || (operation.hash = this.toExpression(operation)));
  },
  toHash: function(meta) {
    var hash, property;
    hash = '';
    if (meta.values) {
      for (property in meta.values) {
        hash += property;
      }
    }
    return hash;
  },
  fetch: function(engine, operation) {
    var constraint, operations, signature, _ref, _ref1;
    if (operations = (_ref = engine.operations) != null ? _ref[operation.hash || (operation.hash = this.toExpression(operation))] : void 0) {
      for (signature in operations) {
        constraint = operations[signature];
        if (((_ref1 = engine.constraints) != null ? _ref1.indexOf(constraint) : void 0) > -1) {
          return constraint;
        }
      }
    }
  },
  declare: function(engine, constraint) {
    var constraints, definition, op, path, _ref, _ref1, _ref2, _ref3;
    _ref = constraint.variables;
    for (path in _ref) {
      op = _ref[path];
      if (definition = engine.variables[path]) {
        constraints = definition.constraints || (definition.constraints = []);
        if (((_ref1 = constraints[0]) != null ? (_ref2 = _ref1.operations[0]) != null ? (_ref3 = _ref2.parent.values) != null ? _ref3[path] : void 0 : void 0 : void 0) == null) {
          if (constraints.indexOf(constraint) === -1) {
            constraints.push(constraint);
          }
        }
      }
    }
  },
  undeclare: function(engine, constraint, quick) {
    var i, matched, object, op, other, path, _i, _len, _ref, _ref1, _ref2, _ref3;
    _ref = constraint.variables;
    for (path in _ref) {
      op = _ref[path];
      if (object = engine.variables[path]) {
        if ((i = (_ref1 = object.constraints) != null ? _ref1.indexOf(constraint) : void 0) > -1) {
          object.constraints.splice(i, 1);
          matched = false;
          _ref2 = object.constraints;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            other = _ref2[_i];
            if (engine.constraints.indexOf(other) > -1 && (((_ref3 = other.operations[0].parent[0].values) != null ? _ref3[path] : void 0) == null)) {
              matched = true;
              break;
            }
          }
          if (!matched) {
            op.command.undeclare(engine, object, quick);
          }
        }
      }
    }
  },
  add: function(constraint, engine, operation, continuation) {
    var i, op, operations, other, _i;
    other = this.fetch(engine, operation);
    operations = constraint.operations || (constraint.operations = (other != null ? other.operations : void 0) || []);
    constraint.variables = operation.variables;
    if (operations.indexOf(operation) === -1) {
      for (i = _i = operations.length - 1; _i >= 0; i = _i += -1) {
        op = operations[i];
        if (op.hash === operation.hash && op.parent[0].key === continuation) {
          operations.splice(i, 1);
          this.unwatch(engine, op, continuation);
        }
      }
      operations.push(operation);
    }
    this.watch(engine, operation, continuation);
    if (other !== constraint) {
      if (other) {
        this.unset(engine, other);
      }
      this.set(engine, constraint);
    }
  },
  reset: function(engine) {
    var constraint, editing, property, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
    if (engine.constrained) {
      _ref = engine.constrained;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        constraint = _ref[_i];
        engine.Constraint.prototype.declare(engine, constraint);
      }
    }
    if (engine.unconstrained) {
      _ref1 = engine.unconstrained;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        constraint = _ref1[_j];
        engine.Constraint.prototype.undeclare(engine, constraint);
      }
    }
    if (engine.instance._changed && engine.constrained && engine.unconstrained) {
      engine.instance = void 0;
      engine.construct();
      if (editing = engine.editing) {
        engine.editing = void 0;
        for (property in editing) {
          constraint = editing[property];
          engine.edit(engine.variables[property], engine.variables[property].value);
        }
      }
      if (engine.constraints) {
        _ref2 = engine.constraints;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          constraint = _ref2[_k];
          engine.Constraint.prototype.inject(engine, constraint);
        }
      }
    } else {
      if (engine.unconstrained) {
        _ref3 = engine.unconstrained;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          constraint = _ref3[_l];
          engine.Constraint.prototype.eject(engine, constraint);
        }
      }
      if (engine.constrained) {
        _ref4 = engine.constrained;
        for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
          constraint = _ref4[_m];
          engine.Constraint.prototype.inject(engine, constraint);
        }
      }
      engine.constrained || (engine.constrained = []);
    }
    return engine.unconstrained = void 0;
  },
  set: function(engine, constraint) {
    var index, _ref;
    if ((engine.constraints || (engine.constraints = [])).indexOf(constraint) === -1) {
      engine.constraints.push(constraint);
      (engine.constrained || (engine.constrained = [])).push(constraint);
    }
    if ((index = (_ref = engine.unconstrained) != null ? _ref.indexOf(constraint) : void 0) > -1) {
      return engine.unconstrained.splice(index, 1);
    }
  },
  unset: function(engine, constraint) {
    var index, operation, path, _i, _len, _ref, _ref1;
    if ((index = engine.constraints.indexOf(constraint)) > -1) {
      engine.constraints.splice(index, 1);
    }
    if ((index = (_ref = engine.constrained) != null ? _ref.indexOf(constraint) : void 0) > -1) {
      engine.constrained.splice(index, 1);
    } else {
      if ((engine.unconstrained || (engine.unconstrained = [])).indexOf(constraint) === -1) {
        engine.unconstrained.push(constraint);
      }
    }
    _ref1 = constraint.operations;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      operation = _ref1[_i];
      if ((path = operation.parent[0].key) != null) {
        this.unwatch(engine, operation, path);
      }
    }
  },
  unwatch: function(engine, operation, continuation) {
    var i, paths;
    if (paths = engine.paths[continuation]) {
      if ((i = paths.indexOf(operation)) > -1) {
        paths.splice(i, 1);
        if (paths.length === 0) {
          return delete engine.paths[continuation];
        }
      }
    }
  },
  watch: function(engine, operation, continuation) {
    return engine.add(continuation, operation);
  },
  remove: function(engine, operation, continuation) {
    var constraint, index, operations;
    if (constraint = this.fetch(engine, operation)) {
      if (operations = constraint.operations) {
        if ((index = operations.indexOf(operation)) > -1) {
          operations.splice(index, 1);
          if (operations.length === 0) {
            this.unset(engine, constraint);
          }
          return this.unwatch(engine, operation, continuation);
        }
      }
    }
  },
  find: function(engine, variable) {
    var other, _i, _len, _ref;
    _ref = variable.constraints;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      other = _ref[_i];
      if (other.operations[0].variables[variable.name].domain === engine) {
        if (engine.constraints.indexOf(other) > -1) {
          return true;
        }
      }
    }
  },
  group: function(constraints) {
    var constraint, group, groupped, groups, other, others, path, vars, _i, _j, _k, _len, _len1;
    groups = [];
    for (_i = 0, _len = constraints.length; _i < _len; _i++) {
      constraint = constraints[_i];
      groupped = void 0;
      vars = constraint.variables;
      for (_j = groups.length - 1; _j >= 0; _j += -1) {
        group = groups[_j];
        for (_k = 0, _len1 = group.length; _k < _len1; _k++) {
          other = group[_k];
          others = other.variables;
          for (path in vars) {
            if (others[path]) {
              if (groupped && groupped !== group) {
                groupped.push.apply(groupped, group);
                groups.splice(groups.indexOf(group), 1);
              } else {
                groupped = group;
              }
              break;
            }
          }
          if (groups.indexOf(group) === -1) {
            break;
          }
        }
      }
      if (!groupped) {
        groups.push(groupped = []);
      }
      groupped.push(constraint);
    }
    return groups;
  },
  split: function(engine) {
    var arg, args, commands, constraint, equal, group, groups, i, index, operation, separated, shift, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
    groups = this.group(engine.constraints).sort(function(a, b) {
      var al, bl;
      al = a.length;
      bl = b.length;
      return bl - al;
    });
    separated = groups.splice(1);
    commands = [];
    if (separated.length) {
      shift = 0;
      for (index = _i = 0, _len = separated.length; _i < _len; index = ++_i) {
        group = separated[index];
        for (index = _j = 0, _len1 = group.length; _j < _len1; index = ++_j) {
          constraint = group[index];
          this.unset(engine, constraint);
          _ref = constraint.operations;
          for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
            operation = _ref[_k];
            commands.push(operation.parent);
          }
        }
      }
    }
    if (commands != null ? commands.length : void 0) {
      if (commands.length === 1) {
        commands = commands[0];
      }
      args = arguments;
      if (args.length === 1) {
        args = args[0];
      }
      if (commands.length === args.length) {
        equal = true;
        for (i = _l = 0, _len3 = args.length; _l < _len3; i = ++_l) {
          arg = args[i];
          if (commands.indexOf(arg) === -1) {
            equal = false;
            break;
          }
        }
        if (equal) {
          throw new Error('Trying to separate what was just added. Means loop. ');
        }
      }
      return engine.Command.orphanize(commands);
    }
  }
});

module.exports = Constraint;



},{"../Command":3}],11:[function(require,module,exports){
var Command, Iterator,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Command = require('../Command');

Iterator = (function(_super) {
  __extends(Iterator, _super);

  function Iterator() {
    return Iterator.__super__.constructor.apply(this, arguments);
  }

  Iterator.prototype.type = 'Iterator';

  Iterator.prototype.signature = [
    {
      collection: ['Query', 'Selector'],
      body: ['Any']
    }
  ];

  Iterator.prototype.List = {
    2: true
  };

  Iterator.prototype["yield"] = function(result, engine, operation, continuation, scope) {
    var contd, op;
    if (operation.parent.indexOf(operation) === 1) {
      contd = this.delimit(continuation, this.DESCEND);
      op = operation.parent[2];
      op.command.solve(engine, op, contd, result);
      return true;
    }
  };

  Iterator.prototype.descend = function(engine, operation, continuation, scope, ascender, ascending) {
    var argument, command;
    argument = operation[1];
    command = argument.command || engine.Command(argument);
    argument.parent || (argument.parent = operation);
    command.solve(operation.domain || engine, argument, continuation, scope);
    return false;
  };

  return Iterator;

})(Command);

Iterator.define({
  "rule": {
    index: 'rules',
    advices: [
      function(engine, operation, command) {
        var parent;
        parent = operation;
        while (parent.parent) {
          parent = parent.parent;
        }
        operation.index = parent.rules = (parent.rules || 0) + 1;
      }
    ]
  },
  "each": {}
});

module.exports = Iterator;



},{"../Command":3}],12:[function(require,module,exports){
var Command, Range,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Command = require('../Command');

Range = (function(_super) {
  __extends(Range, _super);

  function Range() {
    return Range.__super__.constructor.apply(this, arguments);
  }

  Range.prototype.type = 'Range';

  Range.prototype.signature = [
    {
      from: ['Boolean', 'Number', 'Variable', 'Range']
    }, [
      {
        to: ['Boolean', 'Number', 'Variable', 'Range'],
        now: ['Number']
      }
    ]
  ];

  Range.prototype.extras = 0;

  Range.define({
    '...': function(from, to, progress) {
      var range, size;
      if (to != null) {
        if (to === false) {
          range = [from];
        } else {
          range = [from, to];
        }
      } else {
        range = [false, from];
      }
      if (size = this.size) {
        range.length = size;
      }
      if (progress != null) {
        range[2] = progress;
      }
      this.wrap(range);
      return range;
    }
  });

  Range.prototype.valueOf = function() {
    var end, start;
    start = this[0];
    end = this[1];
    console.log(this[0], this[1], this[2], this[2] * ((end - start) || 1) + start);
    return this[2] * ((end - start) || 1) + start;
  };

  Range.prototype.wrap = function(range) {
    range.valueOf = this.valueOf;
    return range;
  };

  Range.prototype.pause = function(range, engine, operation, continuation, scope) {
    range.operation = operation;
    range.continuation = continuation;
    range.scope = scope;
    return range;
  };

  Range.prototype.resume = function(range, engine) {
    this.start(range, engine, range.operation, range.continuation, range.scope);
    return range.operation.command.update(range, engine, range.operation, range.continuation, range.scope);
  };

  Range.prototype.copy = function(range) {
    var copy;
    copy = range.slice();
    copy.valueOf = range.valueOf;
    if (range.operation) {
      copy.operation = range.operation;
      copy.continuation = range.continuation;
      copy.scope = range.scope;
    }
    return copy;
  };

  Range.prototype.start = function(range, engine, operation, continuation, scope) {
    var i, index, other, ranges, _base, _base1;
    ranges = (_base = ((_base1 = engine.engine).ranges || (_base1.ranges = {})))[continuation] || (_base[continuation] = []);
    if ((index = ranges.indexOf(operation)) === -1) {
      i = 0;
      while ((other = ranges[i]) && other.length < range.length) {
        i += 3;
      }
      ranges.splice(i, 0, operation, scope, range);
    } else {
      ranges[index + 2] = range;
    }
    return range;
  };

  return Range;

})(Command);

Range.Modifier = (function(_super) {
  __extends(Modifier, _super);

  function Modifier() {
    return Modifier.__super__.constructor.apply(this, arguments);
  }

  Modifier.prototype.signature = [
    [
      {
        from: ['Boolean', 'Number', 'Variable', 'Range'],
        to: ['Boolean', 'Number', 'Variable', 'Range']
      }
    ]
  ];

  Modifier.prototype.before = function(args, domain, operation, continuation, scope, ascender, ascending) {
    if (typeof args[0] !== 'number' || typeof args[1] === 'number') {
      if (operation[0].indexOf('>') === -1) {
        return this.scale(args[0], null, args[1]);
      } else if (typeof args[1] === 'number') {
        return this.scale(args[0], args[1], null);
      }
    } else {
      if (operation[0].indexOf('>') === -1) {
        return this.scale(args[1], args[0], null);
      }
    }
    return this.scale(args[1], null, args[0]);
  };

  Modifier.prototype.valueOf = function() {
    var end, start, value;
    if ((value = this[2]) != null) {
      if ((start = this[0]) === false || value > 0) {
        if ((end = this[1]) === false || value < 1) {
          return value * ((end - start) || 1) + start;
        }
      }
    }
  };

  Modifier.prototype.scale = function(range, start, finish) {
    var from, progress, reversed, to, value;
    if (!range.push) {
      if (start != null) {
        if (start <= range) {
          return this.wrap([start, false, range / (start || 1)]);
        } else {
          return this.wrap([start, false, range / (start || 1) - 1]);
        }
      } else if (finish != null) {
        return this.wrap([false, finish, range / finish]);
      } else {
        return this.wrap([start, false, range / start]);
      }
    }
    reversed = +((range[0] > range[1]) && (range[1] != null));
    from = range[reversed];
    to = range[1 - reversed];
    if (start !== null && !(from > start)) {
      range = this.copy(range);
      if ((value = range[2]) != null) {
        to || (to = 0);
        progress = value * (to - from);
        range[2] = (progress - (start - from)) / (to - start);
      }
      range[+reversed] = from = start;
    }
    if (finish !== null && !(to < finish)) {
      range = this.copy(range);
      if ((value = range[2]) != null) {
        from || (from = 0);
        to || (to = 0);
        progress = value * (to - from);
        range[2] = progress / (finish - from);
      }
      range[1 - reversed] = finish;
    }
    console.log(range[2]);
    if (range[2] < 0 || range[2] > 1) {
      range.valueOf = this.execute;
    }
    return range;
  };

  Modifier.prototype.after = function(args, result) {
    if (result === false) {
      return;
    }
    return result;
  };

  Modifier.define({
    '-': function(from, to, progress) {
      return progress;
    },
    '~': function(from, to, progress) {
      if (Math.floor(progress % 2)) {
        return 1 - progress % 1;
      } else {
        return progress % 1;
      }
    },
    '|': function(from, to, progress) {
      if (progress > to) {
        return to;
      }
      if (progress < from) {
        return from;
      }
    },
    '<=': function(from, to, progress) {},
    '<': function(from, to, progress) {},
    '>=': function(from, to, progress) {},
    '>': function(from, to, progress) {}
  });

  return Modifier;

})(Range);

Range.Progress = (function(_super) {
  __extends(Progress, _super);

  function Progress() {
    return Progress.__super__.constructor.apply(this, arguments);
  }

  Progress.prototype.after = function(args, result, engine, operation, continuation, scope) {
    if (operation.anonymous) {
      this.start(result, engine, operation, continuation, scope);
    } else {
      this.pause(result, engine, operation, continuation, scope);
    }
    return result;
  };

  Progress.prototype.advices = [
    function(engine, operation, command) {
      var op, parent;
      op = operation;
      while (parent = op.parent) {
        if (parent[0] === 'map') {
          operation.anonymous = true;
        }
        op = parent;
      }
    }
  ];

  return Progress;

})(Range);

Range.Easing = (function(_super) {
  __extends(Easing, _super);

  function Easing(obj) {
    if (typeof obj === 'string') {
      if (obj = this.Type.Timings[obj]) {
        return obj;
      }
    } else if (obj[0] === 'steps' || obj[0] === 'cubic-bezier') {
      return obj;
    }
  }

  Easing.define({
    'ease': ['cubic-bezier', .42, 0, 1, 1],
    'ease-in': ['cubic-bezier', .42, 0, 1, 1],
    'ease-out': ['cubic-bezier', 0, 0, .58, 1],
    'ease-in-out': ['cubic-bezier', .42, 0, .58, 1],
    'linear': ['cubic-bezier', 0, 0, 1, 1],
    'step-start': function(value) {
      return Math.floor(value);
    },
    'step-end': function(value) {
      return Math.ceil(value);
    },
    out: function(value) {
      return 1 - value;
    },
    linear: function(value) {
      return value;
    },
    quad: function(value) {
      return Math.pow(value, 2);
    },
    cubic: function(value) {
      return Math.pow(value, 3);
    },
    quart: function(value) {
      return Math.pow(value, 4);
    },
    expo: function(value) {
      return Math.pow(2, 8 * (value - 1));
    },
    circ: function(value) {
      return 1 - Math.sin(Math.acos(value));
    },
    sine: function(value) {
      return 1 - Math.cos(value * Math.PI / 2);
    },
    back: function(value) {
      return Math.pow(value, 2) * ((1.618 + 1) * value - 1.618);
    },
    elastic: function(value) {
      return Math.pow(2, 10 * --value) * Math.cos(20 * value * Math.PI * 1 / 3);
    }
  });

  return Easing;

})(Range.Progress);

Range.Mapper = (function(_super) {
  __extends(Mapper, _super);

  function Mapper() {
    return Mapper.__super__.constructor.apply(this, arguments);
  }

  Mapper.prototype.signature = [
    {
      from: ['Number', 'Variable', 'Range'],
      to: ['Number', 'Variable', 'Range']
    }
  ];

  Mapper.prototype.extras = null;

  Mapper.define({
    map: function(left, right, engine, operation, continuation, scope, ascender, ascending) {
      var end, start, _ref, _ref1, _ref2;
      if (ascender === 2) {
        if ((start = (_ref = left[2]) != null ? _ref : left[0]) != null) {
          if (start !== false && right < start) {
            right = start;
          } else if ((end = left.push ? left[1] : left) < right) {
            right = end;
          }
        } else if ((end = left.push ? left[1] : left) < right) {
          right = end;
        } else if (right < 0) {
          return;
        }
        return right;
      } else {
        engine.updating.ranges = true;
        if (left.length < 4) {
          if ((left[0] != null) && (left[1] != null)) {
            right[2] = left[0] || null;
            right[3] = ((_ref1 = (_ref2 = left[2]) != null ? _ref2 : left[1]) != null ? _ref1 : left) || 0;
          }
        } else {
          if (right.length < 4) {
            right[2] = +left;
          } else {
            right[3] = +left || 0;
          }
        }
        if (right.operation) {
          this.resume(right, engine);
        }
        if (!left.push) {
          return this.valueOf.call(right);
        } else {
          return right;
        }
      }
    }
  });

  return Mapper;

})(Range);

module.exports = Range;



},{"../Command":3}],13:[function(require,module,exports){
var Command, Variable,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Command = require('../Command');

Variable = (function(_super) {
  __extends(Variable, _super);

  Variable.prototype.type = 'Variable';

  Variable.prototype.signature = [
    {
      property: ['String']
    }
  ];

  Variable.prototype.log = function() {};

  Variable.prototype.unlog = function() {};

  function Variable() {}

  Variable.prototype.before = function(args, engine, operation, continuation, scope, ascender, ascending) {
    var value, _ref;
    if ((value = ascending != null ? (_ref = ascending.values) != null ? _ref[args[0]] : void 0 : void 0) != null) {
      return value;
    }
  };

  Variable.prototype.declare = function(engine, name) {
    var variable, variables;
    variables = engine.variables;
    if (!(variable = variables[name])) {
      variable = variables[name] = engine.variable(name);
    }
    (engine.declared || (engine.declared = {}))[name] = variable;
    return variable;
  };

  Variable.prototype.undeclare = function(engine, variable, quick) {
    var _ref;
    if (quick) {
      (engine.replaced || (engine.replaced = {}))[variable.name] = variable;
    } else {
      (engine.nullified || (engine.nullified = {}))[variable.name] = variable;
      if ((_ref = engine.declared) != null ? _ref[variable.name] : void 0) {
        delete engine.declared[variable.name];
      }
    }
    delete engine.values[variable.name];
    engine.nullify(variable);
    return engine.unedit(variable);
  };

  return Variable;

})(Command);

Variable.Expression = (function(_super) {
  __extends(Expression, _super);

  function Expression() {
    return Expression.__super__.constructor.apply(this, arguments);
  }

  Expression.prototype.signature = [
    {
      left: ['Variable', 'Number', 'Range'],
      right: ['Variable', 'Number', 'Range']
    }
  ];

  return Expression;

})(Variable);

Variable.Expression.algebra = {
  '+': function(left, right) {
    return left + right;
  },
  '-': function(left, right) {
    return left - right;
  },
  '*': function(left, right) {
    return left * right;
  },
  '/': function(left, right) {
    return left / right;
  },
  '%': function(left, right) {
    return left % right;
  },
  'min': function(left, right) {
    return Math.min(left, right);
  },
  'max': function(left, right) {
    return Math.max(left, right);
  },
  'pow': function(left, right) {
    return Math.pow(left, right);
  }
};

module.exports = Variable;



},{"../Command":3}],14:[function(require,module,exports){

/* Domain: Given values

Provides values that don't need to be solved
 */
var Command, Data, Domain, Variable,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Domain = require('../Domain');

Command = require('../Command');

Variable = require('../commands/Variable');

Data = (function(_super) {
  __extends(Data, _super);

  function Data() {
    return Data.__super__.constructor.apply(this, arguments);
  }

  Data.prototype.priority = 200;

  Data.prototype["static"] = true;

  Data.prototype.url = null;

  Data.prototype.check = function(id, property) {
    return this.output.properties[property] || (this.properties[property] != null) || property.indexOf('intrinsic-') === 0 || property.indexOf('computed-') === 0 || ((this.properties[id._gss_id || id] && this.properties[(id._gss_id || id) + '[' + property + ']']) != null);
  };

  Data.prototype.verify = function(object, property) {
    var path;
    path = this.getPath(object, property);
    if (this.values.hasOwnProperty(path)) {
      return this.set(null, path, this.fetch(path));
    }
  };

  return Data;

})(Domain);

Data.prototype.Assignment = Command.extend({
  type: 'Assignment',
  signature: [
    {
      variable: ['String', 'Variable'],
      value: ['Variable', 'Number', 'Matrix', 'Command', 'Object', 'Range']
    }
  ]
}, {
  '=': function(variable, value, engine, operation, continuation) {
    var name, _base;
    if (typeof variable === 'string') {
      name = variable;
    } else if (variable[0] === 'get' && variable.length === 2) {
      name = variable[1];
    }
    if (value !== value) {
      return;
    }
    if (name) {
      ((_base = engine.updating).assignments || (_base.assignments = [])).push(name, value, this.delimit(continuation), operation);
    } else {
      throw new Error('[Input] Unexpected expression on left side of `=`: ' + JSON.stringify(variable));
    }
  }
});

Data.prototype.Variable = Variable.extend({}, {
  get: function(path, engine, operation, continuation, scope) {
    var meta, prefix;
    if (meta = this.getMeta(operation)) {
      continuation = meta.key;
      scope = meta.scope && engine.identity[meta.scope] || scope || engine.scope;
    } else {
      if (engine.queries) {
        prefix = engine.Query.prototype.getScope(engine, void 0, continuation);
      }
      if (!prefix && engine.scope && engine.data.check(engine.scope, path)) {
        prefix = engine.scope;
        engine = engine.data;
      }
    }
    return engine.watch(prefix, path, operation, continuation, scope);
  }
});

Data.prototype.Variable.Getter = Data.prototype.Variable.extend({
  signature: [
    {
      object: ['Query', 'Selector', 'String'],
      property: ['String']
    }
  ]
}, {
  'get': function(object, property, engine, operation, continuation, scope) {
    var domain, prefix;
    if (engine.queries) {
      prefix = engine.Query.prototype.getScope(engine, object, continuation);
    }
    if (!prefix && engine.data.check(engine.scope, property)) {
      prefix = engine.scope;
      domain = engine.data;
    }
    return (domain || engine).watch(prefix, property, operation, continuation, scope);
  }
});

Data.prototype.Variable.Expression = Variable.Expression.extend({
  before: function(args, engine) {
    var arg, _i, _len;
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      arg = args[_i];
      if ((arg == null) || arg !== arg) {
        return NaN;
      }
    }
  }
});

Data.prototype.Variable.Expression.define(Variable.Expression.algebra);

Data.prototype.Meta = Command.Meta.extend({}, {
  'object': {
    execute: function(result) {
      return result;
    },
    descend: function(engine, operation, continuation, scope, ascender, ascending) {
      var meta;
      if (ascender != null) {
        return [ascending];
      }
      meta = operation[0];
      scope = meta.scope && engine.identity[meta.scope] || engine.scope;
      return [operation[1].command.solve(engine, operation[1], meta.key, scope, void 0, operation[0])];
    }
  }
});

module.exports = Data;



},{"../Command":3,"../Domain":4,"../commands/Variable":13}],15:[function(require,module,exports){
var Command, Constraint, Domain, Input, Outputting, Solving, Variable,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

Domain = require('../Domain');

Command = require('../Command');

Variable = require('../commands/Variable');

Constraint = require('../commands/Constraint');

Input = (function(_super) {
  __extends(Input, _super);

  function Input() {
    return Input.__super__.constructor.apply(this, arguments);
  }

  Input.prototype.displayName = 'Input';

  Input.prototype.url = void 0;

  Input.prototype.helps = true;

  Input.prototype.Iterator = require('../commands/Iterator');

  Input.prototype.Condition = require('../commands/Condition');

  Input.prototype.Properties = (function() {
    function _Class() {}

    _Class.prototype.right = function(scope) {
      var id;
      id = this.identify(scope);
      return ['+', ['get', this.getPath(id, 'x')], ['get', this.getPath(id, 'width')]];
    };

    _Class.prototype.bottom = function(scope, path) {
      var id;
      id = this.identify(scope);
      return ['+', ['get', this.getPath(id, 'y')], ['get', this.getPath(id, 'height')]];
    };

    _Class.prototype.center = {
      x: function(scope, path) {
        var id;
        id = this.identify(scope);
        return ['+', ['get', this.getPath(id, 'x')], ['/', ['get', this.getPath(id, 'width')], 2]];
      },
      y: function(scope, path) {
        var id;
        id = this.identify(scope);
        return ['+', ['get', this.getPath(id, 'y')], ['/', ['get', this.getPath(id, 'height')], 2]];
      }
    };

    _Class.prototype.computed = {
      right: function(scope) {
        var id;
        id = this.identify(scope);
        return ['+', ['get', this.getPath(id, 'computed-x')], ['get', this.getPath(id, 'computed-width')]];
      },
      bottom: function(scope, path) {
        var id;
        id = this.identify(scope);
        return ['+', ['get', this.getPath(id, 'computed-y')], ['get', this.getPath(id, 'computed-height')]];
      }
    };

    return _Class;

  })();

  return Input;

})(Domain);

Input.prototype.Remove = Command.extend({
  signature: false,
  extras: 1
}, {
  remove: function() {
    var args, engine, path, _i, _j, _len;
    args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), engine = arguments[_i++];
    for (_j = 0, _len = args.length; _j < _len; _j++) {
      path = args[_j];
      engine.triggerEvent('remove', path);
    }
    return true;
  }
});

Input.prototype.Default = Command.Default.extend({
  extras: 2,
  execute: function() {
    var args, engine, operation, _i;
    args = 3 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 2) : (_i = 0, []), engine = arguments[_i++], operation = arguments[_i++];
    args.unshift(operation[0]);
    return args;
  }
});

Solving = Input.prototype.Default.extend({
  condition: function(engine, operation) {
    var parent;
    if (parent = operation.parent) {
      if (parent.command instanceof Input.prototype.Default) {
        return false;
      }
    }
    operation.index || (operation.index = engine.input.index = (engine.input.index || 0) + 1);
    return true;
  },
  extras: 4,
  execute: function() {
    var args, continuation, domain, engine, meta, operation, scope, wrapper, _base, _i;
    args = 5 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 4) : (_i = 0, []), engine = arguments[_i++], operation = arguments[_i++], continuation = arguments[_i++], scope = arguments[_i++];
    meta = {
      key: this.delimit(continuation)
    };
    if (scope !== engine.scope) {
      meta.scope = engine.identify(scope);
    }
    args.unshift(operation[0]);
    wrapper = this.produce(meta, args, operation);
    wrapper.index = operation.index;
    args.parent = wrapper;
    if (domain = typeof this.domain === "function" ? this.domain(engine, operation) : void 0) {
      wrapper.parent = operation.parent;
      wrapper.domain || (wrapper.domain = domain);
    }
    ((_base = engine.updating).constraints || (_base.constraints = [])).push(wrapper, domain);
  },
  produce: function(meta, args) {
    return [meta, args];
  },
  domain: function(engine, operation) {
    var domain, parent, _ref;
    if (parent = operation.parent) {
      if (domain = (_ref = parent.command.domains) != null ? _ref[parent.indexOf(operation)] : void 0) {
        return engine[domain];
      }
    }
  }
});

Outputting = function(engine, operation, command) {
  var _ref;
  if (operation[0] === '=') {
    if (operation[2].push) {
      Outputting.patch(engine.output, operation[2], true);
    }
    return Outputting.patch(engine.output, operation, false);
  } else if (operation.command.type === 'Default' && !engine.solver.signatures[operation[0]] && (!engine.data.signatures[operation[0]]) && engine.output.signatures[operation[0]]) {
    if (((_ref = operation.parent) != null ? _ref.command.type : void 0) === 'Default') {
      return Outputting.patch(engine.output, operation);
    } else {
      return Outputting.patch(engine.output, operation, true);
    }
  }
};

Outputting.patch = function(engine, operation, rematch) {
  var argument, context, i, match, parent, _i, _len, _ref;
  operation.domain = engine.output;
  parent = operation.parent;
  if ((parent != null ? parent.command.sequence : void 0) && parent.command.type !== 'List') {
    context = parent[parent.indexOf(operation) - 1];
  }
  if (rematch !== false) {
    for (i = _i = 0, _len = operation.length; _i < _len; i = ++_i) {
      argument = operation[i];
      if (argument.push) {
        if (rematch || argument.command.type === 'Default' || argument.command.type === 'Variable') {
          if (engine.output.signatures[argument[0]]) {
            Outputting.patch(engine, argument, rematch);
          }
        }
      }
    }
  }
  if (rematch || !engine.solver.signatures[operation[0]]) {
    if (operation[0] === true) {
      match = Command.List;
    } else {
      match = engine.Command.match(engine.output, operation, operation.parent, (_ref = operation.parent) != null ? _ref.indexOf(operation) : void 0, context);
    }
    Command.assign(engine, operation, match, context);
    if (context == null) {
      Command.descend(operation.command, engine, operation);
    }
  }
  return match;
};

Input.prototype.Default.prototype.advices = [Outputting, Solving];

Input.prototype.List = Command.List;

Input.prototype.Variable = Variable.extend({
  signature: [
    {
      property: ['String']
    }
  ]
}, {
  'get': function(property, engine, operation, continuation, scope) {
    var object, variable;
    if (engine.queries) {
      if (scope === engine.scope) {
        scope = void 0;
      }
      object = engine.Query.prototype.getScope(engine, scope, continuation);
    }
    variable = ['get', engine.getPath(object, property)];
    if (operation.domain !== engine.input) {
      variable.domain = operation.domain;
    }
    return variable;
  }
});

Input.prototype.Variable.Getter = Input.prototype.Variable.extend({
  signature: [
    {
      object: ['Query', 'Selector', 'String'],
      property: ['String']
    }
  ]
}, {
  'get': function(object, property, engine, operation, continuation, scope) {
    var prefix, prop, variable;
    if (engine.queries) {
      prefix = engine.Query.prototype.getScope(engine, object, continuation);
    }
    if (prop = engine.properties[property]) {
      if (!prop.matcher) {
        return prop.call(engine, object, continuation);
      }
    }
    if (!prefix && engine.data.check(engine.scope, property)) {
      prefix = engine.scope;
    }
    variable = ['get', engine.getPath(prefix, property)];
    if (operation.domain !== engine.input) {
      variable.domain = operation.domain;
    }
    return variable;
  }
});

Input.prototype.Variable.Expression = Variable.Expression.extend({}, {
  '+': function(left, right) {
    return ['+', left, right];
  },
  '-': function(left, right) {
    return ['-', left, right];
  },
  '/': function(left, right) {
    return ['/', left, right];
  },
  '*': function(left, right) {
    return ['*', left, right];
  }
});

Input.prototype.Assignment = Command.extend({
  type: 'Assignment',
  signature: [
    {
      variable: ['String', 'Variable'],
      value: ['Variable', 'Number', 'Matrix', 'Command', 'Range', 'Default', 'String']
    }
  ]
});

module.exports = Input;



},{"../Command":3,"../Domain":4,"../commands/Condition":9,"../commands/Constraint":10,"../commands/Iterator":11,"../commands/Variable":13}],16:[function(require,module,exports){
var Command, Constraint, Domain, Linear, Variable, c,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

Domain = require('../Domain');

Command = require('../Command');

Variable = require('../commands/Variable');

Constraint = require('../commands/Constraint');

c = require('cassowary');

c.Strength.require = c.Strength.required;

Linear = (function(_super) {
  __extends(Linear, _super);

  function Linear() {
    return Linear.__super__.constructor.apply(this, arguments);
  }

  Linear.prototype.displayName = 'Linear';

  Linear.prototype.priority = 0;

  Linear.prototype.Engine = c;

  Linear.prototype.construct = function() {
    if (this.paths == null) {
      this.paths = {};
    }
    this.instance = new c.SimplexSolver();
    this.instance.autoSolve = false;
    if (this.console.level > 2) {
      c.debug = true;
      return c.trace = true;
    }
  };

  Linear.prototype.perform = function() {
    if (this.constrained) {
      this.constrained = this.suggested = void 0;
      if (this.instance._needsSolving) {
        this.instance.solve();
        return this.instance._changed;
      }
    } else if (this.suggested) {
      this.suggested = void 0;
      this.instance.resolve();
      return this.instance._changed;
    }
  };

  Linear.prototype.unedit = function(variable) {
    var cei, constraint, _ref;
    if (constraint = (_ref = this.editing) != null ? _ref['%' + (variable.name || variable)] : void 0) {
      cei = this.instance._editVarMap.get(constraint.variable);
      this.instance.removeColumn(cei.editMinus);
      this.instance._editVarMap["delete"](constraint.variable);
      return delete this.editing[variable.name || variable];
    }
  };

  Linear.prototype.edit = function(variable, strength, weight, continuation) {
    var constraint, _ref;
    if (!((_ref = this.editing) != null ? _ref[variable.name] : void 0)) {
      constraint = new c.EditConstraint(variable, this.strength(strength, 'strong'), this.weight(weight));
      constraint.variable = variable;
      this.Constraint.prototype.inject(this, constraint);
      (this.editing || (this.editing = {}))[variable.name] = constraint;
    }
    return constraint;
  };

  Linear.prototype.nullify = function(variable, full) {
    this.instance._externalParametricVars["delete"](variable);
    return variable.value = 0;
  };

  Linear.prototype.suggest = function(path, value, strength, weight, continuation) {
    var variable;
    if (typeof path === 'string') {
      if (!(variable = this.variables[path])) {
        variable = this.Variable.prototype.declare(this, path);
      }
    } else {
      variable = path;
    }
    this.edit(variable, strength, weight, continuation);
    this.instance.suggestValue(variable, value);
    variable.value = value;
    this.suggested = true;
    return variable;
  };

  Linear.prototype.variable = function(name) {
    return new c.Variable({
      name: name
    });
  };

  Linear.prototype.strength = function(strength, byDefault) {
    if (byDefault == null) {
      byDefault = 'medium';
    }
    return strength && c.Strength[strength] || c.Strength[byDefault];
  };

  Linear.prototype.weight = function(weight, operation) {
    return weight;
  };

  return Linear;

})(Domain);

Linear.Mixin = {
  "yield": function(result, engine, operation, continuation, scope, ascender) {
    if (typeof result === 'number') {
      return operation.parent.domain.suggest('%' + operation.command.toExpression(operation), result, 'require');
    }
  }
};

Linear.prototype.Constraint = Constraint.extend({
  before: function(args, engine, operation, continuation, scope, ascender, ascending) {
    return this.get(engine, operation, ascending);
  },
  after: function(args, result, engine, operation, continuation, scope, ascender, ascending) {
    var _base, _base1, _name, _name1;
    if (result.hashCode) {
      return (_base = ((_base1 = (engine.operations || (engine.operations = {})))[_name1 = operation.hash || (operation.hash = this.toExpression(operation))] || (_base1[_name1] = {})))[_name = this.toHash(ascending)] || (_base[_name] = result);
    }
    return result;
  },
  get: function(engine, operation, scope) {
    var _ref, _ref1;
    return (_ref = engine.operations) != null ? (_ref1 = _ref[operation.hash || (operation.hash = this.toExpression(operation))]) != null ? _ref1[this.toHash(scope)] : void 0 : void 0;
  },
  "yield": Linear.Mixin["yield"],
  inject: function(engine, constraint) {
    return engine.instance.addConstraint(constraint);
  },
  eject: function(engine, constraint) {
    return engine.instance.removeConstraint(constraint);
  }
}, {
  '==': function(left, right, strength, weight, engine, operation) {
    return new c.Equation(left, right, engine.strength(strength), engine.weight(weight, operation));
  },
  '<=': function(left, right, strength, weight, engine, operation) {
    return new c.Inequality(left, c.LEQ, right, engine.strength(strength), engine.weight(weight, operation));
  },
  '>=': function(left, right, strength, weight, engine, operation) {
    return new c.Inequality(left, c.GEQ, right, engine.strength(strength), engine.weight(weight, operation));
  },
  '<': function(left, right, strength, weight, engine, operation) {
    return new c.Inequality(left, c.LEQ, engine['+'](right, 1), engine.strength(strength), engine.weight(weight, operation));
  },
  '>': function(left, right, strength, weight, engine, operation) {
    return new c.Inequality(left, c.GEQ, engine['+'](right, 1), engine.strength(strength), engine.weight(weight, operation));
  }
});

Linear.prototype.Variable = Variable.extend(Linear.Mixin, {
  get: function(path, engine, operation) {
    var variable;
    variable = this.declare(engine, path);
    engine.unedit(variable);
    return variable;
  }
});

Linear.prototype.Variable.Expression = Variable.Expression.extend(Linear.Mixin, {
  '+': function(left, right) {
    return c.plus(left, right);
  },
  '-': function(left, right) {
    return c.minus(left, right);
  },
  '*': function(left, right) {
    return c.times(left, right);
  },
  '/': function(left, right) {
    return c.divide(left, right);
  }
});

Linear.prototype.Meta = Command.Meta.extend({}, {
  'object': {
    execute: function(constraint, engine, operation) {
      if ((constraint != null ? constraint.hashCode : void 0) != null) {
        return operation[1].command.add(constraint, engine, operation[1], operation[0].key);
      }
    },
    descend: function(engine, operation) {
      var continuation, meta, scope;
      if (meta = operation[0]) {
        continuation = meta.key;
        scope = meta.scope && engine.identity[meta.scope] || engine.scope;
      }
      operation[1].parent = operation;
      return [operation[1].command.solve(engine, operation[1], continuation, scope, void 0, operation[0]), engine, operation];
    }
  }
});

Linear.prototype.Stay = Command.extend({
  signature: [
    {
      value: ['Variable']
    }
  ]
}, {
  stay: function(value, engine, operation) {
    engine.suggested = true;
    engine.instance.addStay(value);
  }
});

Linear.prototype.Remove = Command.extend({
  extras: 1,
  signature: false
}, {
  remove: function() {
    var args, engine, _i;
    args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), engine = arguments[_i++];
    return engine.remove.apply(engine, args);
  }
});

(function() {
  var obj, property, set;
  if (c.isUnordered == null) {
    obj = {
      '10': 1,
      '9': 1
    };
    for (property in obj) {
      break;
    }
    if (c.isUnordered = property > 9) {
      set = c.HashTable.prototype.set;
      return c.HashTable.prototype.set = function() {
        var store;
        if (!this._store.push) {
          store = this._store;
          this._store = [];
          for (property in store) {
            this._store[property] = store[property];
          }
        }
        return set.apply(this, arguments);
      };
    }
  }
})();

module.exports = Linear;



},{"../Command":3,"../Domain":4,"../commands/Constraint":10,"../commands/Variable":13,"cassowary":2}],17:[function(require,module,exports){
var Constraint, Data, Output,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Data = require('./Data');

Constraint = require('../commands/Constraint');

Output = (function(_super) {
  __extends(Output, _super);

  function Output() {
    return Output.__super__.constructor.apply(this, arguments);
  }

  Output.prototype.Range = require('../commands/Range');

  Output.prototype.displayName = 'Output';

  Output.prototype.immutable = true;

  Output.prototype.priority = -200;

  Output.prototype.finalized = true;

  return Output;

})(Data);

Output.prototype.Constraint = Constraint.extend({
  signature: [
    {
      left: ['Variable', 'Number', 'Constraint', 'Range'],
      right: ['Variable', 'Number', 'Constraint', 'Range']
    }
  ]
}, {
  "&&": function(a, b) {
    return a.valueOf() && b.valueOf() || false;
  },
  "||": function(a, b) {
    return a.valueOf() || b.valueOf() || false;
  },
  "!=": function(a, b) {
    return a.valueOf() !== b.valueOf() || false;
  },
  "==": function(a, b) {
    return a === b;
  }
});

module.exports = Output;



},{"../commands/Constraint":10,"../commands/Range":12,"./Data":14}],18:[function(require,module,exports){
var Console, method, _i, _len, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Console = (function() {
  function Console(_at_level) {
    var _ref, _ref1, _ref2;
    this.level = _at_level;
    this.onError = __bind(this.onError, this);
    if (this.level == null) {
      this.level = (_ref = typeof self !== "undefined" && self !== null ? self.GSS_LOG : void 0) != null ? _ref : parseFloat((typeof self !== "undefined" && self !== null ? (_ref1 = self.location) != null ? (_ref2 = _ref1.search.match(/log=([\d.]+)/)) != null ? _ref2[1] : void 0 : void 0 : void 0) || 0);
    }
    if (!Console.bind) {
      this.level = 0;
    }
    this.stack = [];
    this.buffer = [];
    if (typeof self !== "undefined" && self !== null) {
      self.addEventListener('error', this.onError, true);
    }
  }

  Console.prototype.methods = ['log', 'warn', 'info', 'error', 'group', 'groupEnd', 'groupCollapsed', 'time', 'timeEnd', 'profile', 'profileEnd'];

  Console.prototype.groups = 0;

  Console.prototype.onError = function(e) {
    var _results;
    _results = [];
    while (this.pop(e)) {
      _results.push(true);
    }
    return _results;
  };

  Console.prototype.push = function(a, b, c, type) {
    var index;
    if (this.level >= 0.5 || type) {
      if (!this.buffer.length) {
        if (this.level > 1) {
          if (typeof console !== "undefined" && console !== null) {
            console.profile();
          }
        }
      }
      index = this.buffer.push(a, b, c, void 0, type || this.row);
      return this.stack.push(index - 5);
    }
  };

  Console.prototype.pop = function(d, type, update) {
    var index;
    if (type == null) {
      type = this.row;
    }
    if ((this.level >= 0.5 || type !== this.row) && this.stack.length) {
      index = this.stack.pop();
      this.buffer[index + 3] = d;
      if (type !== this.row) {
        this.buffer[index + 2] = this.getTime(this.buffer[index + 2]);
      }
      if (!this.stack.length) {
        this.flush();
      }
      return true;
    }
    return false;
  };

  Console.prototype.flush = function() {
    var index, item, _i, _len, _ref;
    if (this.level > 1) {
      if (typeof console !== "undefined" && console !== null) {
        console.profileEnd();
      }
    }
    _ref = this.buffer;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = _i += 5) {
      item = _ref[index];
      this.buffer[index + 4].call(this, this.buffer[index], this.buffer[index + 1], this.buffer[index + 2], this.buffer[index + 3]);
    }
    return this.buffer = [];
  };

  Console.prototype.pad = function(object, length) {
    if (length == null) {
      length = 17;
    }
    if (object.length > length) {
      return object.substring(0, length - 1) + '…';
    } else {
      return object + Array(length - object.length).join(' ');
    }
  };

  Console.prototype.openGroup = function(name, reason, time, result) {
    var fmt, method;
    if (reason == null) {
      reason = '';
    }
    if (result == null) {
      result = '';
    }
    if (this.level < 0.5) {
      return;
    }
    fmt = '%c%s';
    switch (typeof reason) {
      case 'string':
        fmt += '%s';
        reason = this.pad(reason, 16);
        break;
      case 'object':
        fmt += '%O\t';
        if (reason.length == null) {
          fmt += '\t';
        }
    }
    switch (typeof result) {
      case 'string':
        fmt += '%s';
        result = this.pad(result, 17);
        break;
      case 'object':
        fmt += '%O\t';
        if (!(result.length > 9)) {
          fmt += '\t';
        }
    }
    fmt += ' %c%sms';
    name = this.pad(name, 13);
    if (this.level <= 1.5) {
      method = 'groupCollapsed';
    }
    return this[method || 'group'](fmt, 'font-weight: normal', name, reason, result, 'color: #999; font-weight: normal; font-style: italic;', time);
  };

  Console.prototype.closeGroup = function() {
    if (this.level >= 0.5) {
      return this.groupEnd();
    }
  };

  Console.prototype.stringify = function(obj) {
    if (!obj) {
      return '';
    }
    if (obj.push) {
      return obj.map(this.stringify, this);
    } else if (obj.nodeType) {
      return obj._gss_id;
    } else if (obj.toString !== Object.prototype.toString) {
      return obj.toString();
    } else if (obj.displayName) {
      return obj.displayName;
    } else {
      return JSON.stringify(obj);
    }
  };

  Console.prototype.debug = function(exp) {
    return document.location = document.location.toString().replace(/[&?]breakpoint=[^&]+|$/, ((document.location.search.indexOf('?') > -1) && '&' || '?') + 'breakpoint=' + exp.trim().replace(/\r?\n+|\r|\s+/g, ' '));
  };

  Console.prototype.breakpoint = decodeURIComponent(((typeof document !== "undefined" && document !== null ? document.location.search.match(/breakpoint=([^&]+)/, '') : void 0) || ['', ''])[1]);

  Console.prototype.row = function(a, b, c, d) {
    var fmt, index, p1, _ref;
    if (b == null) {
      b = '';
    }
    if (c == null) {
      c = '';
    }
    if (d == null) {
      d = '';
    }
    if (this.level < 1) {
      return;
    }
    a = a.name || a;
    if (typeof a !== 'string') {
      return;
    }
    p1 = Array(4 - Math.floor((a.length + 1) / 4)).join('\t');
    if ((index = c.indexOf((_ref = self.GSS) != null ? _ref.Engine.prototype.Command.prototype.DESCEND : void 0)) > -1) {
      if (c.indexOf('style[type*="gss"]') > -1) {
        c = c.substring(index + 1);
      }
    }
    c = c.replace(/\r?\n|\r|\s+/g, ' ');
    fmt = '%c%s';
    switch (typeof b) {
      case 'string':
        fmt += '%s';
        b = this.pad(b, 14);
        break;
      case 'object':
        fmt += '%O\t';
        if (!b.push) {
          b = [b];
        }
    }
    switch (typeof d) {
      case 'string':
      case 'boolean':
      case 'number':
        fmt += '  %s ';
        d = this.pad(String(d), 17);
        break;
      case 'object':
        fmt += '  %O\t   ';
        if (d.item) {
          d = Array.prototype.slice.call(d);
        } else if (d.length == null) {
          d = [d];
        }
    }
    if (typeof document !== "undefined" && document !== null) {
      return this.log(fmt + '%c%s', 'color: #666', this.pad(a, 11), b, d, 'color: #999', c);
    } else {
      return this.log(a, b, c);
    }
  };

  Console.prototype.start = function(reason, name) {
    if (this.level) {
      return this.push(reason, name, this.getTime(), this.openGroup);
    }
  };

  Console.prototype.end = function(result) {
    if (this.level) {
      this.buffer.push(void 0, void 0, void 0, void 0, this.closeGroup);
      return this.pop(result, this.openGroup, true);
    }
  };

  Console.prototype.getTime = function(other, time) {
    time || (time = (typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) || (typeof Date.now === "function" ? Date.now() : void 0) || +(new Date));
    if (time && !other) {
      return time;
    }
    return Math.floor((time - other) * 100) / 100;
  };

  return Console;

})();

_ref = Console.prototype.methods;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  method = _ref[_i];
  Console.prototype[method] = (function(method) {
    return function() {
      if (method === 'group' || method === 'groupCollapsed') {
        Console.prototype.groups++;
      } else if (method === 'groupEnd') {
        if (!Console.prototype.groups) {
          return;
        }
        Console.prototype.groups--;
      }
      if (this.level || method === 'error') {
        if (this.level > 0.5 || method === 'warn') {
          return typeof console !== "undefined" && console !== null ? typeof console[method] === "function" ? console[method].apply(console, arguments) : void 0 : void 0;
        }
      }
    };
  })(method);
}

module.exports = Console;



},{}],19:[function(require,module,exports){
var Exporter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Exporter = (function() {
  function Exporter(_at_engine) {
    var _ref;
    this.engine = _at_engine;
    this.postexport = __bind(this.postexport, this);
    this.preexport = __bind(this.preexport, this);
    if (!(this.command = typeof location !== "undefined" && location !== null ? (_ref = location.search.match(/export=([a-z0-9]+)/)) != null ? _ref[1] : void 0 : void 0)) {
      return;
    }
    this.preexport();
  }

  Exporter.prototype.preexport = function() {
    var baseline, element, height, pairs, scope, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    if ((scope = this.engine.scope).nodeType === 9) {
      scope = this.engine.scope.body;
    }
    this.engine.identify(scope);
    _ref = scope.getElementsByTagName('*');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      if (element.tagName !== 'SCRIPT' && (element.tagName !== 'STYLE' || ((_ref1 = element.getAttribute('type')) != null ? _ref1.indexOf('gss') : void 0) > -1)) {
        this.engine.identify(element);
      }
    }
    if (window.Sizes) {
      this.sizes = [];
      _ref2 = window.Sizes;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        pairs = _ref2[_j];
        _ref3 = pairs[0];
        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
          width = _ref3[_k];
          _ref4 = pairs[1];
          for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
            height = _ref4[_l];
            this.sizes.push(width + 'x' + height);
          }
        }
      }
    }
    if (this.command.indexOf('x') > -1) {
      _ref5 = this.command.split('x'), width = _ref5[0], height = _ref5[1];
      baseline = 72;
      width = parseInt(width) * baseline;
      height = parseInt(height) * baseline;
      window.addEventListener('load', (function(_this) {
        return function() {
          localStorage[_this.command] = JSON.stringify(_this["export"]());
          return _this.postexport();
        };
      })(this));
      document.body.style.width = width + 'px';
      this.engine.data.properties['::window[height]'] = function() {
        return height;
      };
      return this.engine.data.properties['::window[width]'] = function() {
        return width;
      };
    } else {
      if (this.command === 'true') {
        localStorage.clear();
        return this.postexport();
      }
    }
  };

  Exporter.prototype.postexport = function() {
    var property, result, size, value, _i, _len, _ref;
    _ref = this.sizes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      size = _ref[_i];
      if (!localStorage[size]) {
        location.search = location.search.replace(/[&?]export=([a-z0-9])+/, '') + '?export=' + size;
        return;
      }
    }
    result = {};
    for (property in localStorage) {
      value = localStorage[property];
      if (property.match(/^\d+x\d+$/)) {
        result[property] = JSON.parse(value);
      }
    }
    return document.write(JSON.stringify(result));
  };

  Exporter.prototype["export"] = function() {
    var id, index, path, property, value, values, _ref;
    values = {};
    _ref = this.engine.values;
    for (path in _ref) {
      value = _ref[path];
      if ((index = path.indexOf('[')) > -1 && path.indexOf('"') === -1) {
        property = this.engine.data.camelize(path.substring(index + 1, path.length - 1));
        id = path.substring(0, index);
        if (property === 'x' || property === 'y' || document.body.style[property] !== void 0) {
          if (this.engine.values[id + '[intrinsic-' + property + ']'] == null) {
            values[path] = Math.ceil(value);
          }
        }
      }
    }
    values.stylesheets = this.engine.document.Stylesheet["export"]();
    return values;
  };

  return Exporter;

})();

module.exports = Exporter;



},{}],20:[function(require,module,exports){
var Inspector,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty;

Inspector = (function() {
  function Inspector(_at_engine) {
    this.engine = _at_engine;
    this.draw = __bind(this.draw, this);
    this.onMouseMove = __bind(this.onMouseMove, this);
    this.onClick = __bind(this.onClick, this);
    this.onKeyUp = __bind(this.onKeyUp, this);
    this.onKeyDown = __bind(this.onKeyDown, this);
  }

  Inspector.prototype.toExpressionString = function(operation) {
    var i, klass, path, prop, _ref, _ref1, _ref2;
    if (operation != null ? operation.push : void 0) {
      if (operation[0] === 'get') {
        path = operation[1];
        i = path.indexOf('[');
        prop = path.substring(i + 1, path.length - 1);
        if ((this.engine.values[path.replace('[', '[intrinsic-')] != null) || prop.indexOf('intrinsic-') > -1) {
          klass = 'intrinsic';
        } else if (path.indexOf('"') > -1) {
          klass = 'virtual';
        } else if (i > -1) {
          if (prop === 'x' || prop === 'y') {
            klass = 'position';
          } else if (!((_ref = this.engine.data.properties[prop]) != null ? _ref.matcher : void 0)) {
            klass = 'local';
          }
        }
        return '<strong class="' + (klass || 'variable') + '" for="' + path + '" title="' + this.engine.values[path] + '">' + path + '</strong>';
      }
      return this.toExpressionString(operation[1]) + ' <b title=\'' + ((_ref1 = operation.parent) != null ? (_ref2 = _ref1[0]) != null ? _ref2.key : void 0 : void 0) + '\'>' + operation[0] + '</b> ' + this.toExpressionString(operation[2]);
    } else {
      return operation != null ? operation : '';
    }
  };

  Inspector.prototype.update = function() {
    if (this.engine.console.level > 0) {
      this.domains(this.engine.domains);
    }
    if (this.engine.console.level > 1.5 || this.rulers) {
      return this.refresh();
    }
  };

  Inspector.prototype.stylesheet = function() {
    var sheet;
    this.sheet = sheet = document.createElement('style');
    sheet.textContent = sheet.innerText = "domains {\n  display: block;\n  position: fixed;\n  z-index: 999999;\n  top: 0;\n  left: 0;\n  background: rgba(255,255,255,0.76);\n  font-family: Helvetica, Arial;\n}\ndomain {\n  -webkit-user-select: none;  /* Chrome all / Safari all */\n  -moz-user-select: none;     /* Firefox all */\n  -ms-user-select: none;      /* IE 10+ */\n\n  user-select: none;     \n}\npanel {\n  padding: 10px;\n  left: 0\n}\npanel strong, panel b{\n  font-weight: normal;\n}\npanel em {\n  color: red;\n}\npanel strong {\n  color: MidnightBlue;\n}\npanel strong.virtual {\n  color: green;\n}\npanel strong.intrinsic {\n  color: red;\n}\npanel strong.local {\n  color: black;\n}\npanel strong.position {\n  color: olive;\n}\npanel strong[mark] {\n  text-decoration: underline;\n}\ndomains domain{\n  padding: 5px;\n  text-align: center;\n  display: inline-block;\n  cursor: pointer;\n}\ndomain[hidden] {\n  color: #999;\n  background: none;\n}\ndomain.singles:before {\n  content: ' + ';\n  display: 'inline'\n}\ndomain, domain.active {\n  background: #fff;\n  color: #000;\n}\ndomain.active {\n  font-weight: bold;\n}\ndomains:hover domain {\n  background: none;\n}\ndomains:hover domain:hover {\n  background: #fff\n}\ndomain panel {\n  display: block;\n  position: absolute;\n  background: #fff;\n  text-align: left;\n  white-space: pre;\n  line-height: 18px;\n  font-size: 13px;\n  font-family: monospace, serif;\n}\ndomain panel {\n  display: none;\n}\ndomain:hover panel, body[reaching] panel {\n  display: block;\n}\nruler {\n  display: block;\n  position: absolute;\n  z-index: 99999;\n  border-width: 0;\n}\nruler[hidden] {\n  display: none;\n}\nruler.x {\n  border-bottom: 1px dotted orange;\n}\nruler.y {\n  border-right: 1px dotted orange;\n}\nruler.width {\n  border-bottom: 1px dashed blue;\n}\nruler.height {\n  border-right: 1px dashed blue;\n}\nruler.virtual {\n  border-color: green;\n}\nruler.virtual.height {\n  z-index: 99998;\n}\nbody:not([inspecting]) ruler.virtual.height {\n  width: 0px !important;\n}\nbody[inspecting][reaching] ruler.virtual.height:not(:hover) {\n  width: 0px !important;\n}\nruler.virtual.height:hover, body[inspecting]:not([reaching]) ruler.virtual.height {\n  background: rgba(0,255,0,0.15);\n}\nruler.constant {\n  border-style: solid;\n}\nruler.intrinsic {\n  border-color: red;\n}\nruler:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  right: 0;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  cursor: pointer;\n}\nruler.y:before, ruler.height:before, ruler.intrinsic-height:before {\n  left: -10px;\n  right: -10px;\n}\nruler.x:before, ruler.width:before, ruler.intrinsic-width:before {\n  top: -10px;\n  bottom: -10px;\n}\ndomain panel.filtered {\n  display: block\n}\nbody[reaching] ruler {\n  opacity: 0.2\n}\nbody[reaching] ruler.reached {\n  opacity: 1\n}";
    document.body.appendChild(sheet);
    document.addEventListener('mousedown', this.onClick);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('keydown', this.onKeyDown);
    return document.addEventListener('keyup', this.onKeyUp);
  };

  Inspector.prototype.refresh = function() {
    var bits, id, ids, property, value, values, _i, _len, _ref, _ref1, _results;
    values = {};
    _ref = this.engine.values;
    for (property in _ref) {
      value = _ref[property];
      values[property] = value;
    }
    if (this.rulers) {
      _ref1 = this.rulers;
      for (property in _ref1) {
        value = _ref1[property];
        if (!values.hasOwnProperty(property)) {
          values[property] = null;
        }
      }
    }
    ids = this.ids = [];
    for (property in values) {
      value = values[property];
      if ((bits = property.split('[')).length > 1) {
        if (ids.indexOf(bits[0]) === -1) {
          ids.push(bits[0]);
        }
      }
    }
    _results = [];
    for (_i = 0, _len = ids.length; _i < _len; _i++) {
      id = ids[_i];
      _results.push(this.draw(id, values));
    }
    return _results;
  };

  Inspector.prototype.onKeyDown = function(e) {
    if (e.altKey) {
      return document.body.setAttribute('inspecting', 'inspecting');
    }
  };

  Inspector.prototype.onKeyUp = function(e) {
    if (document.body.getAttribute('inspecting') != null) {
      return document.body.removeAttribute('inspecting');
    }
  };

  Inspector.prototype.getDomains = function(ids) {
    var domain, domains, id, property, value, _i, _len, _ref, _ref1;
    domains = [];
    _ref = this.engine.domains;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      domain = _ref[_i];
      if (domain.displayName !== 'Solved' && domain.constraints.length) {
        _ref1 = domain.values;
        for (property in _ref1) {
          if (!__hasProp.call(_ref1, property)) continue;
          value = _ref1[property];
          id = property.split('[');
          if (id.length > 1) {
            if (ids.indexOf(id[0]) > -1) {
              if (domains.indexOf(domain) === -1) {
                domains.push(domain);
              }
            }
          }
        }
      }
    }
    return domains;
  };

  Inspector.prototype.onClick = function(e) {
    var distance, domain, domains, ids, inspecting, prop, properties, property, props, target, _ref, _ref1, _ref2;
    if (((_ref = e.target.tagName) != null ? _ref.toLowerCase() : void 0) === 'domain') {
      if (!this.rulers) {
        this.refresh();
      }
      this.filter([e.target.getAttribute('for')], e.shiftKey || e.ctrlKey, true);
      e.preventDefault();
      return e.stopPropagation();
    } else {
      if (e.metaKey) {
        if (!this.rulers) {
          this.refresh();
        }
      }
      if (e.altKey || e.metaKey) {
        target = e.target;
        ids = [];
        inspecting = [];
        while (target) {
          if (target.nodeType === 1) {
            if (e.altKey && target._gss && target.classList.contains('virtual')) {
              inspecting.push(target.getAttribute('for'));
            } else if (target._gss_id) {
              inspecting.push(target._gss_id);
            }
          }
          target = target.parentNode;
        }
        domains = this.getDomains(inspecting);
        ids = domains.map(function(d) {
          return String(d.uid);
        });
        if (e.altKey) {
          this.visualize(null, inspecting, e.shiftKey);
          this.constraints(ids[0], null, inspecting, e.shiftKey);
        }
        if (e.metaKey) {
          this.filter(ids, e.shiftKey);
        }
      } else if ((property = document.body.getAttribute('reaching')) && ((_ref1 = e.target.tagName) != null ? _ref1.toLowerCase() : void 0) === 'ruler') {
        domain = this.reaching;
        if (domain && (properties = (_ref2 = domain.distances) != null ? _ref2[property] : void 0)) {
          props = [];
          for (prop in properties) {
            distance = properties[prop];
            if (!distance) {
              props.push(prop);
            }
          }
          this.constraints(domain.uid, null, props);
        }
      } else {
        return;
      }
      e.preventDefault();
      return e.stopPropagation();
    }
  };

  Inspector.prototype.constraints = function(id, element, props, all) {
    var d, diff, domain, el, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    if (!this.panel) {
      this.panel = document.createElement('panel');
    } else {
      this.panel.classList.remove('filtered');
    }
    if (!element) {
      _ref = this.list.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        if (el.getAttribute('for') === String(id)) {
          element = el;
          break;
        }
      }
      if (!element) {
        return;
      }
    }
    if (this.panel.parentNode !== element) {
      if ((_ref1 = this.panel.parentNode) != null) {
        _ref1.classList.remove('active');
      }
      element.appendChild(this.panel);
    }
    if (id === 'singles') {
      domain = this.singles;
    } else {
      _ref2 = this.engine.domains;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        d = _ref2[_j];
        if (String(d.uid) === String(id)) {
          domain = d;
          break;
        }
      }
    }
    if (domain) {
      this.panel.innerHTML = (_ref3 = domain.constraints) != null ? _ref3.map((function(_this) {
        return function(constraint) {
          return _this.toExpressionString(constraint.operations[0]);
        };
      })(this)).filter(function(string) {
        var prop, _k, _len2;
        if (!props) {
          return true;
        }
        for (_k = 0, _len2 = props.length; _k < _len2; _k++) {
          prop = props[_k];
          if (string.indexOf(prop) > -1) {
            if (!all && props.length > 1) {
              props.splice(1);
            }
            return true;
          }
        }
        return false;
      }).map(function(string) {
        var prop, _k, _len2;
        if (props) {
          for (_k = 0, _len2 = props.length; _k < _len2; _k++) {
            prop = props[_k];
            prop = prop.replace(/([\[\]$])/g, '\\$1');
            string = string.replace(new RegExp('\\>(' + prop + '[\\[\\"])', 'g'), ' mark>$1');
          }
        }
        return string;
      }).join('\n') : void 0;
      if (props) {
        this.panel.classList.add('filtered');
      }
      diff = element.offsetLeft + element.offsetWidth + 10 - this.panel.offsetWidth;
      if (diff > 0) {
        this.panel.style.left = diff + 'px';
      } else {
        this.panel.style.left = '';
      }
      return element.classList.add('active');
    }
  };

  Inspector.prototype.onMouseMove = function(e) {
    var target, _ref;
    target = e.target;
    if (target._gss) {
      return this.visualize(e.target.getAttribute('property'));
    }
    while (target) {
      if (target.nodeType === 1) {
        if (target.tagName.toLowerCase() === 'domain') {
          return this.constraints(target.getAttribute('for'), target);
        }
      }
      target = target.parentNode;
    }
    if ((_ref = this.panel) != null ? _ref.parentNode : void 0) {
      this.panel.parentNode.classList.remove('active');
      this.panel.parentNode.removeChild(this.panel);
    }
    if (this.reaching) {
      return this.visualize();
    }
  };

  Inspector.prototype.visualize = function(property, ids, all) {
    var distance, domain, id, key, prop, properties, props, reached, ruler, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
    if (!property && !ids) {
      if (this.reaching) {
        this.reaching = void 0;
        document.body.removeAttribute('reaching');
        _ref = document.getElementsByTagName('ruler');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ruler = _ref[_i];
          ruler.classList.remove('reached');
        }
      }
      return;
    }
    if (!ids && document.body.getAttribute('reaching') === property) {
      return;
    }
    if (ids) {
      props = [];
      for (property in this.rulers) {
        for (_j = 0, _len1 = ids.length; _j < _len1; _j++) {
          id = ids[_j];
          if (property.substring(0, id.length) === id) {
            if (property.substring(id.length, id.length + 1) === '[') {
              props.push(property);
              if (!all && ids.length > 1) {
                ids.splice(1);
                break;
              }
            }
          }
        }
      }
    } else {
      props = [property];
      ids = [property.split('[')[0]];
    }
    domain = this.getDomains(ids)[0];
    reached = false;
    _results = [];
    for (_k = 0, _len2 = props.length; _k < _len2; _k++) {
      prop = props[_k];
      if (domain && (properties = (_ref1 = domain.distances) != null ? _ref1[prop] : void 0)) {
        _results.push((function() {
          var _ref2, _results1;
          _results1 = [];
          for (key in properties) {
            distance = properties[key];
            if (!distance) {
              reached = true;
              if ((_ref2 = this.rulers[key]) != null) {
                _ref2.classList.add('reached');
              }
              this.reaching = domain;
              _results1.push(document.body.setAttribute('reaching', prop || id));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Inspector.prototype.filter = function(ids, all, scroll) {
    var domain, i, id, index, node, offsetTop, property, ruler, top, _i, _j, _len, _len1, _ref, _ref1, _ref2;
    this.indexes || (this.indexes = (function() {
      var _i, _len, _ref, _results;
      _ref = this.list.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.getAttribute('hidden') == null) {
          _results.push(node.getAttribute('for'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }).call(this));
    if (all) {
      ids = (function() {
        var _i, _len, _ref, _results;
        _ref = this.list.childNodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _results.push(node.getAttribute('for'));
        }
        return _results;
      }).call(this);
      if (ids.toString() === this.indexes.toString()) {
        ids = [];
      }
      this.indexes = ids || [];
    } else {
      for (_i = 0, _len = ids.length; _i < _len; _i++) {
        id = ids[_i];
        if ((i = this.indexes.indexOf(id)) === -1) {
          this.indexes.push(id);
        } else {
          this.indexes.splice(i, 1);
        }
      }
    }
    _ref = this.list.childNodes;
    for (index = _j = 0, _len1 = _ref.length; _j < _len1; index = ++_j) {
      domain = _ref[index];
      if (this.engine.domains[index] != null) {
        if (this.indexes.indexOf(String(this.engine.domains[index].uid)) === -1) {
          domain.setAttribute('hidden', 'hidden');
          if (((_ref1 = this.panel) != null ? _ref1.parentNode : void 0) === domain) {
            domain.classList.remove('active');
            domain.removeChild(this.panel);
          }
        } else {
          domain.removeAttribute('hidden');
        }
      }
    }
    top = null;
    _ref2 = this.rulers;
    for (property in _ref2) {
      ruler = _ref2[property];
      if (this.indexes.indexOf(ruler.getAttribute('domain')) === -1) {
        ruler.setAttribute('hidden', 'hidden');
      } else {
        if (ruler.getAttribute('hidden') != null) {
          ruler.removeAttribute('hidden');
          offsetTop = 0;
          while (ruler) {
            offsetTop += ruler.offsetTop;
            ruler = ruler.offsetParent;
          }
          if ((top == null) || top > offsetTop) {
            top = offsetTop;
          }
        }
      }
    }
    if ((top != null) && scroll) {
      return window.scrollTo(0, top);
    }
  };

  Inspector.prototype.domains = function(domains) {
    var domain, index, innerHTML, multiples, singles, total, _i;
    this.singles = void 0;
    if (!this.sheet) {
      this.stylesheet();
    }
    if (!this.list) {
      this.list = document.createElement('domains');
      this.list._gss = true;
      document.body.appendChild(this.list);
    }
    total = 0;
    multiples = [];
    for (index = _i = domains.length - 1; _i >= 0; index = _i += -1) {
      domain = domains[index];
      if (domain.constraints.length === 1) {
        singles = this.singles || (this.singles = {
          constraints: [],
          uid: 'singles',
          displayName: 'Singles'
        });
        singles.constraints.push(domain.constraints[0]);
      } else {
        multiples.push(domain);
      }
    }
    multiples = multiples.sort(function(a, b) {
      return b.constraints.length - a.constraints.length;
    });
    if (singles) {
      multiples.push(singles);
    }
    Inspector.uid || (Inspector.uid = 0);
    innerHTML = multiples.map((function(_this) {
      return function(d) {
        var length, _ref;
        d.uid || (d.uid = ++Inspector.uid);
        length = ((_ref = d.constraints) != null ? _ref.length : void 0) || 0;
        total += length;
        return "<domain for=\"" + d.uid + "\" count=\"" + length + "\" " + (_this.engine.console.level <= 1 && 'hidden') + " class=\"" + (d.displayName.toLowerCase()) + "\">" + length + "</domain>";
      };
    })(this)).join('');
    innerHTML += '<label> = <strong>' + total + '</strong></label>';
    return this.list.innerHTML = innerHTML;
  };


  /*remap: (domain) ->
    if !(distances = domain.distances)
      distances = domain.distances = {}
      for constraint in domain.constraints
        for a of constraint.operations[0].variables
          if a.match(/width\]|height\]|\[\x]|\[\y\]|/)
            for b of constraint.operations[0].variables
              if b.match(/width\]|height\]|\[\x]|\[\y\]|/)
                @reach distances, a, b
   */

  Inspector.prototype.ruler = function(element, path, value, x, y, width, height, inside) {
    var bits, constraint, domain, id, konst, other, property, ruler, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    bits = path.split('[');
    id = bits[0];
    property = bits[1].split(']')[0];
    if (!(ruler = (this.rulers || (this.rulers = {}))[path])) {
      if (value == null) {
        return;
      }
      ruler = this.rulers[path] = document.createElement('ruler');
      ruler.className = property;
      ruler._gss = true;
      id = path.split('[')[0];
      ruler.setAttribute('for', id);
      ruler.setAttribute('property', path);
      ruler.setAttribute('title', path);
      ruler.removeAttribute('hidden');
    } else if (value == null) {
      if ((_ref = ruler.parentNode) != null) {
        _ref.removeChild(ruler);
      }
      delete this.rulers[path];
      return;
    }
    domain = void 0;
    _ref1 = this.engine.domains;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      other = _ref1[_i];
      if (other.values.hasOwnProperty(path) && other.displayName !== 'Solved') {
        domain = other;
        break;
      }
    }
    if (!domain) {
      if ((_ref2 = ruler.parentNode) != null) {
        _ref2.removeChild(ruler);
      }
      return;
    }
    ruler.setAttribute('domain', domain.uid);
    if (!(konst = typeof this.engine.variables[path] === 'string')) {
      _ref3 = domain.constraints;
      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
        constraint = _ref3[_j];
        if (constraint.operations[0].variables[path] && Object.keys(constraint.operations[0].variables).length === 1) {
          konst = true;
          break;
        }
      }
    }
    if (konst) {
      ruler.classList.add('constant');
    } else {
      ruler.classList.remove('constant');
    }
    if (this.engine.values[path.replace('[', '[intrinsic-')] != null) {
      ruler.classList.add('intrinsic');
    } else {
      ruler.classList.remove('intrinsic');
    }
    if (inside) {
      ruler.classList.add('virtual');
    } else {
      ruler.classList.remove('virtual');
    }
    ruler.style.top = Math.floor(y) + 'px';
    ruler.style.left = Math.floor(x) + 'px';
    ruler.style.width = width + 'px';
    ruler.style.height = height + 'px';
    if (inside) {
      if (!element.offsetHeight) {
        element = element.parentNode;
      }
      element.appendChild(ruler);
      if (property === 'height' && (this.engine.values[id + '[width]'] != null)) {
        return ruler.style.width = this.engine.values[id + '[width]'] + 'px';
      }
    } else {
      return element.parentNode.appendChild(ruler);
    }
  };

  Inspector.prototype.reach = function(distances, a, b, level) {
    var bc, c, _results;
    if (level == null) {
      level = 0;
    }
    (distances[a] || (distances[a] = {}))[b] = level;
    (distances[b] || (distances[b] = {}))[a] = level;
    _results = [];
    for (c in distances[a]) {
      bc = distances[b][c];
      if ((bc == null) || bc > level + 1) {
        _results.push(this.reach(distances, b, c, level + 1));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Inspector.prototype.draw = function(id, data) {
    var bits, clientLeft, clientTop, element, left, offsetLeft, offsetTop, parenting, prop, scope, top, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
    if ((bits = id.split('"')).length > 1) {
      scope = bits[0];
    } else {
      scope = id;
    }
    if (((_ref = (element = this.engine.identity[scope])) != null ? _ref.nodeType : void 0) === 1) {
      if (scope !== id) {
        if (!element.offsetHeight && !element.offsetTop) {
          element = element.parentNode;
          scope = this.engine.identify(element);
          parenting = true;
        }
        top = (_ref1 = data[scope + '[y]']) != null ? _ref1 : 0;
        left = (_ref2 = data[scope + '[x]']) != null ? _ref2 : 0;
        clientTop = (_ref3 = data[id + '[y]']) != null ? _ref3 : 0;
        clientLeft = (_ref4 = data[id + '[x]']) != null ? _ref4 : 0;
        offsetTop = top + clientTop;
        offsetLeft = left + clientLeft;
      } else {
        top = element.offsetTop;
        left = element.offsetLeft;
      }
      if (!parenting) {
        if ((_ref5 = element.offsetWidth !== data[scope + '[width]']) != null ? _ref5 : data[scope + '[intrinsic-width]']) {
          clientLeft = left + element.clientLeft;
        }
        if ((_ref6 = element.offsetHeight !== data[scope + '[height]']) != null ? _ref6 : data[scope + '[intrinsic-height]']) {
          clientTop = top + element.clientTop;
        }
      }
    } else {
      element = document.body;
      left = (_ref7 = data[id + '[x]']) != null ? _ref7 : 0;
      top = (_ref8 = data[id + '[y]']) != null ? _ref8 : 0;
    }
    if (data.hasOwnProperty(prop = id + '[width]')) {
      this.ruler(element, prop, data[prop], clientLeft != null ? clientLeft : left, clientTop != null ? clientTop : top, data[prop], 0, scope !== id);
    }
    if (data.hasOwnProperty(prop = id + '[height]')) {
      this.ruler(element, prop, data[prop], clientLeft != null ? clientLeft : left, clientTop != null ? clientTop : top, 0, data[prop], scope !== id);
    }
    if (data.hasOwnProperty(prop = id + '[x]')) {
      this.ruler(element, prop, data[prop], (offsetLeft != null ? offsetLeft : left) - data[prop], offsetTop != null ? offsetTop : top, data[prop], 0, scope !== id);
    }
    if (data.hasOwnProperty(prop = id + '[y]')) {
      return this.ruler(element, prop, data[prop], offsetLeft != null ? offsetLeft : left, (offsetTop != null ? offsetTop : top) - data[prop], 0, data[prop], scope !== id);
    }
  };

  return Inspector;

})();

module.exports = Inspector;



},{}],21:[function(require,module,exports){
var Document, Engine,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Engine = require('gss-engine/src/Engine');

Document = (function(superClass) {
  extend(Document, superClass);

  Document.Measurement = require('./types/Measurement');

  Document.Primitive = require('./types/Primitive');

  Document.Unit = require('./commands/Unit');

  Document.prototype.Input = (function(superClass1) {
    extend(Input, superClass1);

    function Input() {
      return Input.__super__.constructor.apply(this, arguments);
    }

    Input.prototype.Selector = require('./commands/Selector');

    Input.prototype.Stylesheet = require('./commands/Stylesheet');

    Input.prototype.Unit = Document.Unit.prototype.Macro;

    return Input;

  })(Engine.prototype.Input);

  Document.prototype.Output = (function(superClass1) {
    extend(Output, superClass1);

    function Output() {
      return Output.__super__.constructor.apply(this, arguments);
    }

    Output.prototype.Style = require('./Style');

    Output.prototype.Properties = require('./properties/Styles');

    Output.prototype.Unit = Document.Unit.prototype.Numeric;

    Output.prototype.Transition = require('./commands/Transition');

    Output.prototype.Gradient = require('./types/Gradient');

    Output.prototype.Matrix = require('./types/Matrix');

    Output.prototype.Color = require('./types/Color');

    Output.prototype.URL = require('./types/URL');

    Output.prototype.Number = Document.Primitive.Number;

    Output.prototype.Integer = Document.Primitive.Integer;

    Output.prototype.String = Document.Primitive.String;

    Output.prototype.Strings = Document.Primitive.Strings;

    Output.prototype.Size = Document.Primitive.Size;

    Output.prototype.Position = Document.Primitive.Position;

    Output.prototype.Length = Document.Measurement.Length;

    Output.prototype.Time = Document.Measurement.Time;

    Output.prototype.Frequency = Document.Measurement.Frequency;

    Output.prototype.Angle = Document.Measurement.Angle;

    Output.prototype.Percentage = Document.Measurement.Percentage;

    Output.prototype.pretransform = function(id) {
      var ref, ref1, ref2;
      return this.Matrix.rst(+this.get(id, 'rotate-x') || 0, +this.get(id, 'rotate-y') || 0, +this.get(id, 'rotate-z') || 0, +((ref = this.get(id, 'scale-x')) != null ? ref : 1), +((ref1 = this.get(id, 'scale-y')) != null ? ref1 : 1), +((ref2 = this.get(id, 'scale-z')) != null ? ref2 : 1), +this.get(id, 'translate-x') || 0, +this.get(id, 'translate-y') || 0, +this.get(id, 'translate-z') || 0);
    };

    Document.prototype.Output.prototype.StyleAssignment = Document.prototype.Output.prototype.Assignment.extend({
      signature: [
        [
          {
            object: ['Query', 'Selector']
          }
        ], {
          property: ['String'],
          value: ['Any']
        }
      ],
      log: function() {},
      unlog: function() {},
      advices: [
        function(engine, operation, command) {
          var parent, rule;
          parent = operation;
          rule = void 0;
          while (parent.parent) {
            if (!rule && parent[0] === 'rule') {
              rule = parent;
            }
            parent = parent.parent;
          }
          operation.index || (operation.index = parent.assignments = (parent.assignments || 0) + 1);
          if (rule) {
            (rule.properties || (rule.properties = [])).push(operation.index);
          }
        }
      ]
    }, {
      'set': function(object, property, value, engine, operation, continuation, scope) {
        if (typeof engine.setStyle === "function") {
          engine.setStyle(object || scope, property, value, continuation, operation);
        }
      }
    });

    return Output;

  })(Engine.prototype.Output);

  Document.prototype.Data = (function(superClass1) {
    extend(Data, superClass1);

    function Data() {
      return Data.__super__.constructor.apply(this, arguments);
    }

    Data.prototype.immediate = true;

    Data.prototype.Properties = require('./properties/Getters');

    Data.prototype.perform = function() {
      var scope;
      if (arguments.length < 4 && this.data.subscribers) {
        this.console.start('Measure', this.values);
        scope = this.scope;
        if (scope.nodeType === 9) {
          this.measure(scope, 0, 0);
          scope = scope.body;
        }
        this.each(scope, 'measure');
        this.console.end(this.changes);
        return this.propagate(this.commit());
      }
    };

    Data.prototype.subscribe = function(id, property) {
      var node, path, ref;
      if ((node = this.identity.solve(id)) && node.nodeType === 1) {
        property = property.replace(/^intrinsic-/, '');
        path = this.getPath(id, property);
        if (this.engine.values.hasOwnProperty(path) || ((ref = this.engine.updating.solution) != null ? ref.hasOwnProperty(path) : void 0)) {
          node.style[this.camelize(property)] = '';
        }
        return this.updating.reflown = true;
      }
    };

    Data.prototype.unsubscribe = function(id, property, path) {
      this.output.set(path, null);
      return this.set(path, null);
    };

    Data.prototype.get = function(object, property) {
      var path, value;
      if ((value = Data.__super__.get.apply(this, arguments)) == null) {
        path = this.getPath(object, property);
        if ((value = this.fetch(path)) != null) {
          this.set(null, path, value);
        }
      }
      return value;
    };

    Data.prototype.fetch = function(path) {
      var id, j, object, prop, property;
      if ((prop = this.properties[path]) != null) {
        if (typeof prop === 'function') {
          return prop.call(this, object);
        } else {
          return prop;
        }
        return value;
      } else {
        if ((j = path.indexOf('[')) > -1) {
          id = path.substring(0, j);
          property = path.substring(j + 1, path.length - 1);
          object = this.identity.solve(path.substring(0, j));
          if ((prop = this.properties[property]) != null) {
            if (prop.axiom) {
              return prop.call(this, object);
            } else if (typeof prop !== 'function') {
              return prop;
            } else if (property.indexOf('intrinsic') === -1) {
              return prop.call(this, object);
            }
          }
        }
      }
    };

    return Data;

  })(Engine.prototype.Data);

  function Document(data, url, scope) {
    var state;
    if (scope == null) {
      scope = document;
    }
    Document.__super__.constructor.apply(this, arguments);
    this.scope = this.getScopeElement(scope);
    Engine[this.identify(this.scope)] = this;
    if (this.scope.nodeType === 9) {
      state = this.scope.readyState;
      if (state !== 'complete' && state !== 'loaded' && (state !== 'interactive' || document.documentMode)) {
        document.addEventListener('DOMContentLoaded', this.engine, false);
        document.addEventListener('readystatechange', this.engine, false);
        window.addEventListener('load', this.engine, false);
      } else {
        setTimeout((function(_this) {
          return function() {
            if (!_this.engine.running) {
              return _this.engine.compile();
            }
          };
        })(this), 10);
      }
    }
    this.input.Selector.observe(this.engine);
    this.scope.addEventListener('scroll', this.engine, true);
    if (typeof window !== "undefined" && window !== null) {
      window.addEventListener('resize', this.engine, true);
    }
  }

  Document.prototype.prefixes = ['moz', 'webkit', 'ms'];

  Document.prototype.write = function(update) {
    var assigned;
    this.input.Selector.disconnect(this, true);
    this.output.merge(update.changes);
    this.input.Stylesheet.rematch(this);
    if (assigned = this.assign(update.changes)) {
      update.assigned = true;
    }
    update.changes = void 0;
    this.input.Selector.connect(this, true);
    return assigned;
  };

  Document.prototype.$$events = {
    validate: function(update) {
      if (this.data.subscribers && update.domains.indexOf(this.data, update.index + 1) === -1) {
        this.data.verify('::window', 'width');
        this.data.verify('::window', 'height');
        this.data.verify(this.scope, 'width');
        this.data.verify(this.scope, 'height');
        return this.propagate(this.data.solve());
      }
    },
    remove: function(path) {
      this.input.Stylesheet.remove(this, path);
      return this.data.remove(path);
    },
    compile: function() {
      var i, len, prefix, prefixed, prop, property, ref, ref1, scope, value;
      scope = this.scope.body || this.scope;
      ref = this.output.properties;
      for (property in ref) {
        value = ref[property];
        if (scope.style[property] == null) {
          prop = this.camelize(property);
          prop = prop.charAt(0).toUpperCase() + prop.slice(1);
          ref1 = this.prefixes;
          for (i = 0, len = ref1.length; i < len; i++) {
            prefix = ref1[i];
            prefixed = prefix + prop;
            if (scope.style[prefixed] != null) {
              value.property = '-' + prefix + '-' + property;
              value.camelized = prefixed;
            }
          }
        }
      }
      this.solve(this.input.Stylesheet.operations);
      return this.input.Selector.connect(this, true);
    },
    solve: function() {
      var html, klass;
      if (this.scope.nodeType === 9) {
        html = this.scope.documentElement;
        klass = html.className;
        if (klass.indexOf('gss-ready') === -1) {
          this.input.Selector.disconnect(this, true);
          html.setAttribute('class', (klass && klass + ' ' || '') + 'gss-ready');
          return this.input.Selector.connect(this, true);
        }
      }
    },
    finish: function(update) {
      var element, engine, i, len, removed;
      if (removed = update != null ? update.removed : void 0) {
        for (i = 0, len = removed.length; i < len; i++) {
          element = removed[i];
          this.identity.unset(element);
        }
        update.removed = void 0;
      }
      if (this.ranges) {
        cancelAnimationFrame(this.transitioning);
        engine = this;
        return this.transitioning = requestAnimationFrame(function() {
          this.transitioning = void 0;
          return engine.solve('Transition', function() {
            this.updating.ranges = true;
          });
        });
      }
    },
    resize: function(e) {
      var id;
      if (e == null) {
        e = '::window';
      }
      id = e.target && this.identify(e.target) || e;
      if (this.resizer == null) {
        if (e.target && this.updating) {
          if (this.updating.resizing) {
            return this.updating.resizing = 'scheduled';
          }
          this.updating.resizing = 'computing';
        }
        this.once('finish', function() {
          return requestAnimationFrame((function(_this) {
            return function() {
              var ref;
              if (((ref = _this.updated) != null ? ref.resizing : void 0) === 'scheduled') {
                return _this.triggerEvent('resize');
              }
            };
          })(this));
        });
      } else {
        cancelAnimationFrame(this.resizer);
      }
      return this.resizer = requestAnimationFrame((function(_this) {
        return function() {
          _this.resizer = void 0;
          if (_this.updating && !_this.updating.resizing) {
            _this.updating.resizing = 'scheduled';
            return;
          }
          return _this.solve('Resize', id, function() {
            if (this.scope._gss_id !== id) {
              this.data.verify(id, "width");
              this.data.verify(id, "height");
            }
            if (id !== '::document') {
              this.data.verify(id, "width");
              this.data.verify(id, "height");
            }
            this.data.verify(this.scope, "width");
            this.data.verify(this.scope, "height");
            return this.data.commit();
          });
        };
      })(this));
    },
    scroll: function(e) {
      var id;
      if (e == null) {
        e = '::window';
      }
      id = e.target && this.identify(e.target) || e;
      return this.solve('Scroll', id, function() {
        if (this.transitioning) {
          cancelAnimationFrame(this.transitioning);
          this.updating.ranges = true;
        }
        if (id === '::window') {
          this.data.verify('::document', "scroll-top");
          this.data.verify('::document', "scroll-left");
        }
        this.data.verify(id, "scroll-top");
        this.data.verify(id, "scroll-left");
        return this.data.commit();
      });
    },
    DOMContentLoaded: function() {
      document.removeEventListener('DOMContentLoaded', this);
      this.compile();
      return this.solve('Ready', function() {});
    },
    readystatechange: function() {
      if (this.running && document.readyState === 'complete') {
        return this.solve('Statechange', function() {});
      }
    },
    load: function() {
      window.removeEventListener('load', this);
      document.removeEventListener('DOMContentLoaded', this);
      return this.solve('Loaded', function() {});
    },
    destroy: function() {
      var element, i, len, ref;
      if (this.scope) {
        Engine[this.scope._gss_id] = void 0;
        ref = this.scope.getElementsByTagName('*');
        for (i = 0, len = ref.length; i < len; i++) {
          element = ref[i];
          this.identity.unset(element);
        }
        this.identity.unset(this.scope);
        this.dispatchEvent(this.scope, 'destroy');
      }
      this.scope.removeEventListener('DOMContentLoaded', this);
      this.scope.removeEventListener('scroll', this);
      window.removeEventListener('resize', this);
      return this.input.Selector.disconnect(this);
    }
  };

  Document.prototype.getComputedStyle = function(element, force) {
    var computed, id, old;
    if ((old = element.currentStyle) == null) {
      computed = (this.computed || (this.computed = {}));
      id = this.identify(element);
      old = computed[id];
      if (force || (old == null)) {
        return computed[id] = window.getComputedStyle(element);
      }
    }
    return old;
  };

  Document.prototype.setAbsolutePosition = function(element, property, value) {
    var position;
    position = element.style.position;
    if (element.positioned === void 0) {
      element.positioned = +(!!position);
    }
    if (position && position !== 'absolute') {
      return;
    }
    if (element.style[property] === '') {
      if ((value != null) && value !== '') {
        element.positioned = (element.positioned || 0) + 1;
      }
    } else {
      if ((value == null) || value === '') {
        element.positioned = (element.positioned || 0) - 1;
      }
    }
    if (element.positioned === 1) {
      return element.style.position = 'absolute';
    } else if (element.positioned === 0) {
      return element.style.position = '';
    }
  };

  Document.prototype.setStyle = function(element, property, value, continuation, operation, bypass) {
    var camel, parent, path, prop, ref, ruled;
    if (value == null) {
      value = '';
    }
    switch (property) {
      case "x":
        property = "left";
        break;
      case "y":
        property = "top";
    }
    if (parent = operation) {
      while (parent.parent) {
        parent = parent.parent;
        if (parent.command.type === 'Iterator') {
          ruled = true;
        }
        if (!ruled && parent.command.type === 'Condition' && !parent.command.global) {
          break;
        }
      }
      if (parent.command.parse) {
        if (parent.command.set(this, operation, this.Command.prototype.delimit(continuation), element, property, value)) {
          return;
        }
      }
    }
    if (!(prop = this.output.properties[property])) {
      return;
    }
    camel = prop.camelized || this.camelize(property);
    if (typeof value !== 'string') {
      if (value < 0 && (property === 'width' || property === 'height')) {
        this.console.warn(property + ' of', element, ' is negative: ', value);
      }
      value = prop.format(value);
    }
    path = this.getPath(element, 'intrinsic-' + property);
    if ((ref = this.data.watchers) != null ? ref[path] : void 0) {
      return;
    }
    if (property === 'left' || property === 'top') {
      this.setAbsolutePosition(element, property, value);
    }
    if (element.style[camel] !== void 0) {
      element.style[camel] = value;
    }
  };

  Document.prototype.each = function(parent, callback, x, y, a, r, g, s) {
    var child, measure, offsets, scope;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    scope = this.engine.scope;
    if (offsets = this[callback](parent, x, y, a, r, g, s)) {
      x += offsets.x || 0;
      y += offsets.y || 0;
    }
    if (parent.offsetParent === scope) {
      x -= scope.offsetLeft;
      y -= scope.offsetTop;
    } else if (parent !== scope) {
      if (!offsets) {
        measure = true;
      }
    }
    if (parent === document) {
      parent = document.body;
    }
    child = parent.firstChild;
    while (child) {
      if (child.nodeType === 1) {
        if (child.style.position === 'relative') {
          this.each(child, callback, 0, 0, a, r, g, s);
        } else {
          if (measure && child.offsetParent === parent) {
            x += parent.offsetLeft + parent.clientLeft;
            y += parent.offsetTop + parent.clientTop;
            measure = false;
          }
          this.each(child, callback, x, y, a, r, g, s);
        }
      }
      child = child.nextSibling;
    }
    return a;
  };

  Document.prototype.getStyle = function(node, property) {
    var num, value;
    property = this.camelize(property);
    value = node.style[property] || this.getComputedStyle(node)[property];
    if (value) {
      num = parseFloat(value);
      if (String(num) === String(value) || (num + 'px') === value) {
        return num;
      }
    }
    return value;
  };

  Document.prototype.measure = function(node, x, y, full) {
    var id, prop, properties, style;
    if (id = node._gss_id) {
      if (properties = this.data.subscribers[id]) {
        if (node.nodeType === 9) {
          node = node.documentElement;
        }
        for (prop in properties) {
          switch (prop) {
            case "intrinsic-x":
            case "computed-x":
            case "intrinsic-left":
            case "computed-left":
              this.set(id, prop, x + node.offsetLeft);
              break;
            case "intrinsic-y":
            case "computed-y":
            case "intrinsic-top":
            case "computed-top":
              this.set(id, prop, y + node.offsetTop);
              break;
            case "intrinsic-width":
            case "computed-width":
              this.set(id, prop, node.offsetWidth);
              break;
            case "intrinsic-height":
            case "computed-height":
              this.set(id, prop, node.offsetHeight);
              break;
            case "scroll-top":
            case "scroll-left":
              break;
            default:
              style = prop.replace(/^(?:computed|intrinsic)-/, '');
              if (prop !== style) {
                if (this.properties[style]) {
                  this.set(id, prop, this.get(node, style));
                } else if (this.output.properties[style]) {
                  this.set(id, prop, this.getStyle(node, style));
                }
              }
          }
        }
      }
    }
  };

  Document.prototype.camelize = function(string) {
    return string.toLowerCase().replace(/-([a-z])/gi, function(match) {
      return match[1].toUpperCase();
    });
  };

  Document.prototype.dasherize = function(string) {
    return string.replace(/[A-Z]/g, function(match) {
      return '-' + match[0].toLowerCase();
    });
  };

  Document.prototype.group = function(data) {
    var base, base1, base2, base3, base4, id, key, last, name, path, pretransform, pretransforms, prop, property, result, transform, transforms, value;
    pretransforms = this.updating.pretransform;
    transforms = result = void 0;
    for (path in data) {
      value = data[path];
      last = path.lastIndexOf('[');
      if (last === -1) {
        continue;
      }
      property = path.substring(last + 1, path.length - 1);
      id = path.substring(0, last);
      if (id.charAt(0) === ':') {
        continue;
      }
      if (this.values[id + '[intrinsic-' + property + ']'] != null) {
        continue;
      }
      if (property === 'x' || property === 'y') {
        key = 'positions';
      } else if (prop = this.output.properties[property]) {
        key = 'styles';
        if (prop.task) {
          (base = ((base1 = this.updating)[name = prop.task] || (base1[name] = {})))[id] || (base[id] = true);
          if (prop.task === 'pretransform') {
            pretransforms = this.updating.pretransform;
          }
          continue;
        }
        if (property === 'transform') {
          (pretransforms || (pretransforms = {}))[id] = this.output.pretransform(id);
          (transforms || (transforms = {}))[id] = value;
          continue;
        }
      } else {
        continue;
      }
      if (id.indexOf('"') === -1) {
        if (this.identity[id] || document.getElementById(id.substring(1))) {
          ((base2 = ((base3 = (result || (result = {})))[key] || (base3[key] = {})))[id] || (base2[id] = {}))[property] = value;
        }
      }
    }
    if (pretransforms) {
      for (id in pretransforms) {
        pretransform = pretransforms[id];
        if (pretransform === true) {
          pretransform = this.output.pretransform(id);
        }
        transform = (transforms != null ? transforms[id] : void 0) || this.values[id + '[transform]'];
        ((base4 = (result || (result = {}))).transforms || (base4.transforms = {}))[id] = pretransform && transform ? this.output.Matrix.prototype._mat4.multiply(pretransform, transform, pretransform) : pretransform || transform || null;
      }
      this.updating.pretransform = void 0;
    }
    return result;
  };


  /* 
  Applies style changes in bulk, separates reflows & positions.
  It recursively offsets global coordinates to respect offset parent, 
  then sets new positions
   */

  Document.prototype.assign = function(data) {
    var camel, changes, element, id, path, positions, prop, properties, styles, transforms, value;
    if (!(changes = this.group(data))) {
      return;
    }
    this.console.start('Apply', changes);
    styles = changes.styles;
    positions = changes.positions;
    if (transforms = changes.transforms) {
      prop = this.output.properties.transform;
      camel = prop.camelized || 'transform';
      for (id in transforms) {
        value = transforms[id];
        element = this.identity[id];
        if ((element != null ? element.nodeType : void 0) === 1) {
          element.style[camel] = value != null ? this.output.Matrix.prototype.format(value) : '';
        } else {
          path = this.output.getPath(id, 'final-transform');
          if ((value != null) || (this.output.values[path] != null)) {
            this.output.set(null, path, value);
          }
        }
      }
      if (!styles && !positions) {
        this.console.end(changes);
        return;
      }
    }
    if (styles) {
      for (id in styles) {
        properties = styles[id];
        element = this.identity[id] || document.getElementById(id.substring(1));
        if (element.nodeType === 1) {
          for (prop in properties) {
            value = properties[prop];
            this.setStyle(element, prop, value);
          }
        }
      }
    }
    if (positions) {
      this.each(this.scope, 'placehold', null, null, changes.positions);
      for (id in positions) {
        styles = positions[id];
        element = this.identity[id] || document.getElementById(id.substring(1));
        if (element.nodeType === 1) {
          for (prop in styles) {
            value = styles[prop];
            this.setStyle(element, prop, value);
          }
        }
      }
    }
    this.console.end(changes);
    return true;
  };

  Document.prototype.placehold = function(element, x, y, positioning, full) {
    var left, offsets, property, styles, top, uid, value, values;
    offsets = void 0;
    if (uid = element._gss_id) {
      styles = positioning != null ? positioning[uid] : void 0;
      if (values = this.engine.values) {
        if ((styles != null ? styles.x : void 0) === void 0) {
          if ((left = values[uid + '[x]']) != null) {
            (styles || (styles = (positioning[uid] || (positioning[uid] = {})))).x = left;
          }
        }
        if ((styles != null ? styles.y : void 0) === void 0) {
          if ((top = values[uid + '[y]']) != null) {
            (styles || (styles = (positioning[uid] || (positioning[uid] = {})))).y = top;
          }
        }
      }
      if (styles) {
        for (property in styles) {
          value = styles[property];
          if (value !== null) {
            switch (property) {
              case "x":
                styles.x = value - x;
                (offsets || (offsets = {})).x = value - x;
                break;
              case "y":
                styles.y = value - y;
                (offsets || (offsets = {})).y = value - y;
            }
          }
        }
      }
    }
    return offsets;
  };

  return Document;

})(Engine);

module.exports = Document;



},{"./Style":22,"./commands/Selector":23,"./commands/Stylesheet":24,"./commands/Transition":25,"./commands/Unit":26,"./properties/Getters":27,"./properties/Styles":28,"./types/Color":29,"./types/Gradient":30,"./types/Matrix":31,"./types/Measurement":32,"./types/Primitive":33,"./types/URL":34,"gss-engine/src/Engine":5}],22:[function(require,module,exports){
var Matcher, Shorthand, Style;

Style = function(definition, name, styles, options, keywords, types, keys, properties, required, optional) {
  var def, index, initial, item, key, l, len, len1, len2, len3, len4, m, matcher, n, o, p, previous, prop, property, q, ref, ref1, ref2, ref3, requirement, started, storage, style, type, value;
  if (options == null) {
    options = {};
  }
  if (!keywords) {
    keywords = {};
    types = [];
    keys = [];
    properties = [];
    required = {};
    started = true;
  }
  requirement = true;
  initial = previous = void 0;
  if (definition.length === void 0) {
    for (key in definition) {
      def = definition[key];
      if (typeof def !== 'object') {
        options[key] = def;
        continue;
      }
      property = key.indexOf('-') > -1 && styles[key] && key || name + '-' + key;
      style = this.Style(def, property, styles, options);
      if (optional !== true) {
        required[property] = optional || requirement;
        requirement = property;
      }
      if (style.types) {
        ref = style.types;
        for (index = l = 0, len = ref.length; l < len; index = ++l) {
          type = ref[index];
          types.push(type);
          prop = ((ref1 = style.keys) != null ? ref1[index] : void 0) || property;
          keys.push(prop);
          if (properties.indexOf(prop) === -1) {
            properties.push(prop);
          }
        }
      }
      if (style.keywords) {
        ref2 = style.keywords;
        for (prop in ref2) {
          value = ref2[prop];
          for (m = 0, len1 = value.length; m < len1; m++) {
            item = value[m];
            ref3 = item.push && item || [item];
            for (n = 0, len2 = ref3.length; n < len2; n++) {
              p = ref3[n];
              if (properties.indexOf(p) === -1) {
                properties.push(p);
              }
            }
          }
          (keywords[prop] || (keywords[prop] = [])).push(value);
        }
      }
    }
  } else {
    for (index = o = 0, len3 = definition.length; o < len3; index = ++o) {
      property = definition[index];
      switch (typeof property) {
        case "object":
          this.Style(property, name, styles, options, keywords, types, keys, properties, required, property.push && (requirement || true) || optional);
          break;
        case "string":
          if (type = this[property]) {
            types.push(type);
            if (storage = type.Keywords) {
              for (key in storage) {
                initial = key;
                break;
              }
            }
            if (initial == null) {
              initial = 0;
            }
          } else {
            if (initial == null) {
              initial = property;
            }
            (keywords[property] || (keywords[property] = [])).push(name);
          }
          break;
        default:
          if (initial == null) {
            initial = property;
          }
      }
    }
  }
  if (!started) {
    return;
  }
  if (initial === void 0) {
    matcher = new Matcher(keywords, types, keys, required);
    initial = new Shorthand;
    initial.displayName = initial.prototype.property = name;
    for (q = 0, len4 = properties.length; q < len4; q++) {
      property = properties[q];
      initial.prototype[property] = styles[property].initial;
      styles[property].shorthand = matcher;
    }
  } else {
    if (keys.length === 0) {
      keys = void 0;
    }
    matcher = new Matcher(keywords, types, keys, required);
  }
  matcher.displayName = name;
  matcher.keywords = keywords;
  matcher.types = types;
  matcher.keys = keys;
  matcher.matcher = true;
  matcher.initial = initial;
  for (property in options) {
    value = options[property];
    matcher[property] = value;
  }
  if (initial != null ? initial.displayName : void 0) {
    initial.prototype.style = matcher;
    initial.prototype.styles = styles;
    initial.prototype.properties = properties;
  }
  matcher.format = function(value) {
    return Shorthand.prototype.toExpressionString(name, value, false, styles);
  };
  return styles[name] = matcher;
};

Shorthand = (function() {
  function Shorthand(callback) {
    callback || (callback = function(options) {
      var key, value;
      if (options) {
        for (key in options) {
          value = options[key];
          this[key] = value;
        }
      }
      return this;
    });
    callback.prototype = this;
    return callback;
  }

  Shorthand.prototype.format = function(styles, number) {
    var expression, i, index, k, key, keys, l, len, m, pad, prefix, previous, ref, ref1, string, style, types, value;
    string = void 0;
    if (this.style.keys) {
      while (style = this[i = (i != null ? i : -1) + 1]) {
        string = (string && string + ', ' || '') + style.format(styles, i + 1);
      }
      pad = this.style.pad;
      ref = keys = this.properties;
      for (index = l = 0, len = ref.length; l < len; index = ++l) {
        key = ref[index];
        if (index && pad) {
          if (index > 2) {
            if (this.equals(key, keys[1])) {
              continue;
            }
          } else if (index > 1) {
            if (this.equals(key, keys[0]) && (!this.hasOwnProperty[keys[3]] || this.equals(keys[3], keys[1]))) {
              continue;
            }
          } else {
            if (this.equals(key, keys[0]) && this.equals(keys[1], keys[2]) && this.equals(keys[2], keys[3])) {
              continue;
            }
          }
        } else {
          if (styles && number && ((value = styles[key + '-' + number]) != null)) {
            prefix = previous = void 0;
            if (typeof value !== 'string') {
              keys = this.style.keys;
              types = this.style.types;
              for (index = m = ref1 = keys.indexOf(key) - 1; m > 0; index = m += -1) {
                if ((k = keys[index]) !== previous) {
                  if (this.hasOwnProperty(k)) {
                    break;
                  }
                  if (types[index] === this.styles.engine.Length) {
                    expression = this.toExpressionString(k, this[k]);
                    prefix = ((string || prefix) && ' ' || '') + expression + (prefix && ' ' + prefix || '');
                    previous = k;
                  }
                }
              }
            }
            if (prefix) {
              string += prefix;
            }
          } else {
            if (!this.hasOwnProperty(key)) {
              continue;
            }
            value = this[key];
          }
        }
        expression = this.toExpressionString(key, value);
        string = (string && string + ' ' || '') + expression;
      }
    }
    return string;
  };

  Shorthand.prototype.equals = function(first, second) {
    var a, b;
    a = this[first];
    b = this[second];
    if (typeof a !== 'object') {
      return a === b;
    } else {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
  };

  Shorthand.prototype.toExpressionString = function(key, operation, expression, styles) {
    var index, l, len, m, name, ref, ref1, ref2, string, type, types, value;
    if (styles == null) {
      styles = this.styles;
    }
    switch (typeof operation) {
      case 'object':
        name = operation[0];
        if (typeof name === 'number') {
          value = operation.valueOf();
          if (value !== operation) {
            return value;
          } else {
            return styles.engine.Matrix.prototype.format(operation);
          }
        } else if ((ref = styles.engine.signatures[name] || styles.engine.input.signatures[name]) != null ? (ref1 = ref.Number) != null ? ref1.resolved : void 0 : void 0) {
          return this.toExpressionString(key, operation[1], true) + name;
        } else {
          string = name + '(';
          for (index = l = 1, ref2 = operation.length - 1; 1 <= ref2 ? l <= ref2 : l >= ref2; index = 1 <= ref2 ? ++l : --l) {
            if (index !== 1) {
              string += ',';
            }
            string += this.toExpressionString(key, operation[index], true);
          }
          return string + ')';
        }
        break;
      case 'number':
        if (!expression) {
          types = styles[key].types;
          if (operation) {
            for (m = 0, len = types.length; m < len; m++) {
              type = types[m];
              if (type.formatNumber) {
                if ((expression = type.formatNumber(operation)) != null) {
                  return expression;
                }
              }
            }
          }
          return operation;
        }
    }
    return operation;
  };

  return Shorthand;

})();

Matcher = function(keywords, types, keys, required) {
  var matcher;
  matcher = function() {
    var arg, args, argument, i, index, j, l, len, len1, len2, m, matched, n, pad, property, props, ref, ref1, ref2, ref3, req, result, type;
    result = matched = void 0;
    if ((pad = matcher.pad) && arguments.length < 4) {
      args = [arguments[0], (ref = arguments[1]) != null ? ref : arguments[0], (ref1 = arguments[2]) != null ? ref1 : arguments[0], (ref2 = arguments[1]) != null ? ref2 : arguments[0]];
    }
    ref3 = args || arguments;
    for (i = l = 0, len = ref3.length; l < len; i = ++l) {
      argument = ref3[i];
      switch (typeof argument) {
        case 'object':
          if (typeof argument[0] !== 'string' || argument.length === 1) {
            if (matched = matcher.apply(this, argument)) {
              (result || (result = new matcher.initial))[i] = matched;
            } else {
              return;
            }
          }
          break;
        case 'string':
          if (props = keywords[argument]) {
            if (keys) {
              j = pad && i || 0;
              while ((property = props[j++]) != null) {
                if (!result || !result.hasOwnProperty(property)) {
                  if (!required[property] || (result && result[required[property]] !== void 0)) {
                    matched = (result || (result = new matcher.initial))[property] = argument;
                    break;
                  }
                } else if (props.length === 1 && argument !== result[property]) {
                  arg = argument;
                  argument = result[property];
                  result[property] = arg;
                  if (typeof argument === 'string' && (props = keywords[argument])) {
                    j = pad && i || 0;
                    continue;
                  }
                  break;
                }
                if (pad) {
                  break;
                }
              }
            } else {
              return argument;
            }
          }
      }
      if (types && (matched == null)) {
        if (keys) {
          for (index = m = 0, len1 = keys.length; m < len1; index = ++m) {
            property = keys[index];
            if (!result || (!result.hasOwnProperty(property) && (!(req = required[property]) || result.hasOwnProperty(req)))) {
              if ((matched = types[index](argument)) !== void 0) {
                (result || (result = new matcher.initial))[property] = argument;
                break;
              }
            }
          }
        } else {
          for (index = n = 0, len2 = types.length; n < len2; index = ++n) {
            type = types[index];
            if (type(argument) !== void 0) {
              return argument;
            }
          }
        }
      }
      if (matched == null) {
        return;
      }
      matched = void 0;
    }
    return result;
  };
  return matcher;
};

module.exports = Style;



},{}],23:[function(require,module,exports){

/* Selectors with custom combinators 
inspired by Slick of mootools fame (shout-out & credits)

Combinators fetch new elements, while qualifiers filter them.
 */
var Query, Selector, div, dummy, property, ref, value,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Query = require('gss-engine/src/Query');

require('../../vendor/weakmap.js');

require('../../vendor/MutationObserver.js');

Selector = (function(superClass) {
  extend(Selector, superClass);

  Selector.prototype.type = 'Selector';

  function Selector(operation) {
    this.key = this.path = this.serialize(operation);
  }

  Selector.prototype.prepare = function(operation, parent) {
    var argument, base, base1, context, j, len, name, name1, prefix, ref, suffix;
    if (this.prepared) {
      return;
    }
    this.prepared = true;
    prefix = this.getIndexPrefix(operation, parent);
    name = this.getIndex(operation, parent);
    suffix = this.getIndexSuffix(operation, parent);
    ((base = ((base1 = parent || this)[name1 = prefix + name] || (base1[name1] = {})))[suffix] || (base[suffix] = [])).push(operation);
    if (this.head) {
      if (context = operation.context) {
        if (context.command.head === (parent || this).head) {
          context.command.prepare(context, parent || this);
        }
      }
      for (j = 0, len = operation.length; j < len; j++) {
        argument = operation[j];
        if (((ref = argument.command) != null ? ref.head : void 0) === (parent || this).head) {
          argument.command.prepare(argument, parent || this);
        }
      }
    }
  };

  Selector.prototype.perform = function(engine, operation, continuation, scope, ascender, ascending) {
    var args, command, node, ref, result, selector;
    command = operation.command;
    selector = command.selector;
    args = [scope, selector];
    if (ascender != null) {
      args[0] = ascending;
    } else {
      if ((ref = this.tail) != null) {
        ref.command.contextualize(args, engine, this.tail, continuation, scope);
      }
    }
    command.log(args, engine, operation, continuation, scope, command.selecting && 'select' || 'match');
    result = command.before(args, engine, operation, continuation, scope);
    node = this.precontextualize(engine, scope, args[0]);
    if (command.selecting) {
      if (result == null) {
        result = node.querySelectorAll(args[1]);
      }
    } else if ((result !== node) && node.matches(args[1])) {
      if (result == null) {
        result = node;
      }
    }
    command.unlog(engine, result);
    if (result = command.after(args, result, engine, operation, continuation, scope)) {
      return command.ascend(engine, operation, continuation + selector, scope, result, ascender);
    }
  };

  Selector.prototype.precontextualize = function(engine, scope, element) {
    var i, id;
    if (!this.relative) {
      if (typeof (element || (element = scope)) === 'string') {
        if ((i = element.indexOf('"')) > -1) {
          id = element.substring(0, i);
          if (id === '$') {
            return engine.scope;
          }
          return engine.identity[id];
        } else {
          return scope;
        }
      }
    }
    return element || scope;
  };

  Selector.prototype.separator = '';

  Selector.prototype.scoped = void 0;

  Selector.prototype.prefix = void 0;

  Selector.prototype.suffix = void 0;

  Selector.prototype.key = void 0;

  Selector.prototype.path = void 0;

  Selector.prototype.tail = void 0;

  Selector.prototype.head = void 0;

  Selector.prototype.singular = void 0;

  Selector.prototype.getIndexPrefix = function(operation, parent) {
    return (parent || this.selecting) && ' ' || '';
  };

  Selector.prototype.getIndex = function(operation) {
    var ref;
    return (ref = this.prefix) != null ? ref : operation[0];
  };

  Selector.prototype.getIndexSuffix = function(operation) {
    return operation[2] || operation[1];
  };

  Selector.prototype.getKey = function() {
    return this.selector || this.key;
  };

  Selector.options = {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
    attributeOldValue: true
  };

  Selector.observe = function(engine) {
    if (this.Observer) {
      this.listener = new this.Observer(this.onMutations.bind(engine));
      return this.connect(engine);
    }
  };

  Selector.Observer = (typeof window !== "undefined" && window !== null) && (window.MutationObserver || window.WebKitMutationObserver || window.JsMutationObserver);

  Selector.connect = function(engine, temporary) {
    if (temporary && window.JsMutationObserver === this.Observer) {
      return;
    }
    return this.listener.observe(engine.scope, this.options);
  };

  Selector.disconnect = function(engine, temporary) {
    if (temporary && window.JsMutationObserver === this.Observer) {
      return;
    }
    return this.listener.disconnect();
  };

  Selector.filterMutation = function(mutation) {
    var parent;
    parent = mutation.target;
    while (parent) {
      if (parent.nodeType === 1 && this.filterNodeMutation(parent) === false) {
        return false;
      }
      parent = parent.parentNode;
    }
    return true;
  };

  Selector.filterNodeMutation = function(target) {
    if (target._gss) {
      return false;
    }
    return true;
  };

  Selector.onMutations = function(mutations) {
    var result;
    if (!this.running) {
      if (this.scope.nodeType === 9) {
        return;
      }
      return this.solve('Kick', function() {});
    }
    result = this.solve('Mutate', String(mutations.length), function() {
      var base, j, len, mutation;
      if (this.updating.index > -1) {
        this.updating.reset();
      }
      for (j = 0, len = mutations.length; j < len; j++) {
        mutation = mutations[j];
        if (Selector.filterMutation(mutation) === false) {
          continue;
        }
        switch (mutation.type) {
          case "attributes":
            Selector.mutateAttribute(this, mutation.target, mutation.attributeName, mutation.oldValue || '');
            break;
          case "childList":
            Selector.mutateChildList(this, mutation.target, mutation);
            break;
          case "characterData":
            Selector.mutateCharacterData(this, mutation.target, mutation);
        }
        (base = this.updating).reflown || (base.reflown = this.scope);
      }
    });
    if (!this.scope.parentNode && this.scope.nodeType === 1) {
      this.destroy();
    }
    return result;
  };

  Selector.mutateChildList = function(engine, target, mutation) {
    var added, allAdded, allChanged, allMoved, allRemoved, attribute, base, changed, changedTags, child, el, firstNext, firstPrev, index, j, k, kls, l, len, len1, len10, len11, len12, len2, len3, len4, len5, len6, len7, len8, len9, m, moved, n, next, node, o, p, parent, prev, prop, property, q, queries, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, removed, s, t, tag, u, update, v, value, values;
    added = [];
    removed = [];
    ref = mutation.addedNodes;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      if (child.nodeType === 1 && this.filterNodeMutation(child) !== false) {
        added.push(child);
      }
    }
    ref1 = mutation.removedNodes;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      child = ref1[k];
      if (child.nodeType === 1 && this.filterNodeMutation(child) !== false) {
        if ((index = added.indexOf(child)) > -1) {
          added.splice(index, 1);
        } else {
          removed.push(child);
        }
      }
    }
    changed = added.concat(removed);
    if (target.tagName === 'STYLE' && ((ref2 = mutation.addedNodes[0]) != null ? ref2.nodeType : void 0) !== 1) {
      this.mutateCharacterData(engine, target, target);
    }
    if (!changed.length) {
      return;
    }
    changedTags = [];
    for (l = 0, len2 = changed.length; l < len2; l++) {
      node = changed[l];
      tag = node.tagName;
      if (changedTags.indexOf(tag) === -1) {
        changedTags.push(tag);
      }
    }
    prev = next = mutation;
    firstPrev = firstNext = true;
    queries = engine.queries;
    while ((prev = prev.previousSibling)) {
      if (prev.nodeType === 1) {
        if (firstPrev) {
          this.prototype.match(engine, prev, '+', void 0, '*');
          this.prototype.match(engine, prev, '++', void 0, '*');
          firstPrev = false;
        }
        this.prototype.match(engine, prev, '~', void 0, changedTags);
        this.prototype.match(engine, prev, '~~', void 0, changedTags);
        next = prev;
      }
    }
    while ((next = next.nextSibling)) {
      if (next.nodeType === 1) {
        if (firstNext) {
          this.prototype.match(engine, next, '!+', void 0, '*');
          this.prototype.match(engine, next, '++', void 0, '*');
          firstNext = false;
        }
        this.prototype.match(engine, next, '!~', void 0, changedTags);
        this.prototype.match(engine, next, '~~', void 0, changedTags);
      }
    }
    this.prototype.match(engine, target, '>', void 0, changedTags);
    allAdded = [];
    allRemoved = [];
    allMoved = [];
    moved = [];
    for (m = 0, len3 = added.length; m < len3; m++) {
      child = added[m];
      this.prototype.match(engine, child, '!>', void 0, target);
      allAdded.push(child);
      ref3 = child.getElementsByTagName('*');
      for (n = 0, len4 = ref3.length; n < len4; n++) {
        el = ref3[n];
        allAdded.push(el);
      }
    }
    for (o = 0, len5 = removed.length; o < len5; o++) {
      child = removed[o];
      if (allAdded.indexOf(child) === -1) {
        allRemoved.push(child);
        ref4 = child.getElementsByTagName('*');
        for (p = 0, len6 = ref4.length; p < len6; p++) {
          el = ref4[p];
          allRemoved.push(el);
        }
      }
    }
    if (Selector.destructuring) {
      ref5 = engine.identity;
      for (property in ref5) {
        el = ref5[property];
        if (el.nodeType && !el.parentNode) {
          allRemoved.push(el);
        }
      }
    }
    for (q = 0, len7 = allRemoved.length; q < len7; q++) {
      el = allRemoved[q];
      if (indexOf.call(allAdded, el) < 0) {
        ((base = engine.updating).removed || (base.removed = [])).push(el);
      }
    }
    allChanged = allAdded.concat(allRemoved, allMoved);
    update = {};
    for (r = 0, len8 = allChanged.length; r < len8; r++) {
      node = allChanged[r];
      if (node.className) {
        ref6 = node.classList || node.className.split(/\s+/);
        for (s = 0, len9 = ref6.length; s < len9; s++) {
          kls = ref6[s];
          this.index(update, ' .', kls);
        }
      }
      if (node.id) {
        this.index(update, ' #', node.id);
      }
      ref7 = node.attributes;
      for (t = 0, len10 = ref7.length; t < len10; t++) {
        attribute = ref7[t];
        if (attribute.name === 'class' || attribute.name === 'id') {
          continue;
        }
        this.index(update, ' attribute', attribute.name);
      }
      prev = next = node;
      while (prev = prev.previousSibling) {
        if (prev.nodeType === 1) {
          this.index(update, ' +', prev.tagName);
          break;
        }
      }
      while (next = next.nextSibling) {
        if (next.nodeType === 1) {
          break;
        }
      }
      if (!prev) {
        this.index(update, ' :', 'first-child');
      }
      if (!next) {
        this.index(update, ' :', 'last-child');
      }
      this.index(update, ' +', child.tagName);
    }
    parent = target;
    while (parent) {
      this.prototype.match(engine, parent, ' ', void 0, allChanged);
      for (u = 0, len11 = allChanged.length; u < len11; u++) {
        child = allChanged[u];
        this.prototype.match(engine, child, '!', void 0, parent);
      }
      for (prop in update) {
        values = update[prop];
        for (v = 0, len12 = values.length; v < len12; v++) {
          value = values[v];
          if (prop.charAt(1) === '$') {
            this.prototype.match(engine, parent, prop, value);
          } else {
            this.prototype.match(engine, parent, prop, void 0, value);
          }
        }
      }
      if (parent === engine.scope) {
        break;
      }
      if (!(parent = parent.parentNode)) {
        break;
      }
    }
    return true;
  };

  Selector.mutateCharacterData = function(engine, target, parent) {
    var id, ref;
    if (parent == null) {
      parent = target.parentNode;
    }
    if (id = engine.identity.find(parent)) {
      if (parent.tagName === 'STYLE') {
        if (((ref = parent.getAttribute('type')) != null ? ref.indexOf('text/gss') : void 0) > -1) {
          return engine["import"](parent);
        }
      }
    }
  };

  Selector.mutateAttribute = function(engine, target, name, changed) {
    var $attribute, $class, j, k, klasses, kls, l, len, len1, len2, old, parent, ref;
    if (name === 'class' && typeof changed === 'string') {
      klasses = target.classList || target.className.split(/\s+/);
      old = changed.split(' ');
      changed = [];
      for (j = 0, len = old.length; j < len; j++) {
        kls = old[j];
        if (!(kls && ((ref = klasses.indexOf && klasses.indexOf(kls) > -1) != null ? ref : klasses.contains(kls)))) {
          changed.push(kls);
        }
      }
      for (k = 0, len1 = klasses.length; k < len1; k++) {
        kls = klasses[k];
        if (!(kls && old.indexOf(kls) > -1)) {
          changed.push(kls);
        }
      }
    }
    parent = target;
    while (parent) {
      $attribute = target === parent && 'attribute' || ' attribute';
      this.prototype.match(engine, parent, $attribute, name, target);
      if ((changed != null ? changed.length : void 0) && name === 'class') {
        $class = target === parent && '.' || ' .';
        for (l = 0, len2 = changed.length; l < len2; l++) {
          kls = changed[l];
          this.prototype.match(engine, parent, $class, kls, target);
        }
      }
      if (parent === engine.scope) {
        break;
      }
      if (!(parent = parent.parentNode)) {
        break;
      }
    }
    return this;
  };

  Selector.index = function(update, type, value) {
    var group;
    if (group = update[type]) {
      if (group.indexOf(value) !== -1) {
        return;
      }
    } else {
      update[type] = [];
    }
    return update[type].push(value);
  };

  return Selector;

})(Query);

Selector.prototype.Sequence = (function(superClass) {
  extend(Sequence, superClass);

  function Sequence(operation) {
    var last;
    last = operation[operation.length - 1].command;
    this.key = "";
    this.path = last.path;
    if (last.path === last.selector) {
      this.selector = last.selector;
      this.tags = last.tags;
    }
  }

  Sequence.prototype.selecting = true;

  Sequence.prototype.tags = ['selector'];

  return Sequence;

})(Selector);

ref = Query.prototype.Sequence.prototype;
for (property in ref) {
  value = ref[property];
  if (!(property === 'constructor' || property === 'retrieve' || property === 'type')) {
    Selector.prototype.Sequence.prototype[property] = value;
  }
}

Selector.prototype.Sequence.prototype.push = function() {};

Selector.prototype.checkers.selector = function(command, other, parent, operation) {
  var selecting;
  if (!other.head) {
    if (other instanceof Selector.Combinator && operation[0] !== ' ') {
      return;
    }
  }
  if (parent[0] === ',') {
    if (operation.length === 1 && typeof operation[0] === 'object') {
      other = operation[0].command;
    }
    if ((other.selector || other.key) !== other.path) {
      return;
    }
  }
  if (!command.key && !other.selector && other.key !== other.path) {
    return;
  }
  if (selecting = command.selecting) {
    if (!other.selecting) {
      return;
    }
  }
  return true;
};

Selector.prototype.mergers.selector = function(command, other, parent, operation, inherited) {
  var left, right;
  if (other.selecting) {
    command.selecting || (command.selecting = true);
  }
  other.head = parent;
  command.head = parent;
  command.tail = other.tail || (other.tail = operation);
  command.tail.command.head = parent;
  if (command.proxy) {
    command.head = parent;
    command.tail = void 0;
  }
  left = other.selector || other.key || other.path;
  right = command.selector || command.key;
  command.selector = inherited ? right + command.separator + left : left + right;
  return true;
};

Selector.Qualifier = Selector.extend({
  signature: [
    {
      context: ['Selector'],
      matcher: ['String']
    }
  ]
});

Selector.Search = Selector.extend({
  signature: [
    [
      {
        context: ['Selector']
      }
    ], {
      matcher: ['String'],
      query: ['String']
    }
  ]
});

Selector.Attribute = Selector.Search.extend({
  getIndex: function() {
    return 'attribute';
  }
});

Selector.Selecter = Selector.extend({
  signature: [
    [
      {
        context: ['Selector']
      }
    ], {
      query: ['String']
    }
  ],
  selecting: true,
  getIndexPrefix: function() {
    return ' ';
  }
});

Selector.Combinator = Selector.Selecter.extend({
  signature: [
    [
      {
        context: ['Selector']
      }
    ]
  ],
  getIndexSuffix: function(operation) {
    return operation.parent[0] === 'tag' && operation.parent[2].toUpperCase() || "*";
  },
  getIndexPrefix: function(operation, parent) {
    return parent && ' ' || '';
  }
});

Selector.Pseudo = Selector.Combinator.extend({
  signature: [
    [
      {
        context: ['Selector'],
        query: ['String', 'Number']
      }
    ]
  ]
});

Selector.Virtual = Selector.extend({
  signature: [
    [
      {
        context: ['Selector']
      }
    ], {
      query: ['String']
    }
  ]
});

Selector.Element = Selector.extend({
  signature: [
    [
      {
        parameter: ['Number', 'String']
      }
    ]
  ]
});

Selector.Reference = Selector.Element.extend({
  excludes: ['Selector', 'Iterator'],
  condition: function(engine, operation) {
    return this.excludes.indexOf(operation.parent.command.type) === -1;
  },
  kind: 'Element',
  prefix: '',
  after: function() {
    return result;
  },
  retrieve: function(engine, operation, continuation, scope, ascender, ascending) {
    return this.execute(operation[1], engine, operation, continuation, scope, ascender, ascending);
  },
  reference: true
});

Selector.define({
  '.': {
    helpers: ['class', 'getElementsByClassName'],
    tags: ['selector'],
    Qualifier: function(node, value) {
      if (node.classList.contains(value)) {
        return node;
      }
    },
    Selecter: function(node, value, engine, operation, continuation, scope) {
      if (node == null) {
        node = scope;
      }
      return node.getElementsByClassName(value);
    }
  },
  'tag': {
    helpers: ['getElementsByTagName'],
    tags: ['selector'],
    prefix: '',
    Selecter: function(node, value, engine, operation, continuation, scope) {
      if (node == null) {
        node = scope;
      }
      return node.getElementsByTagName(value);
    },
    Qualifier: function(node, value) {
      if (value === '*' || node.tagName === value.toUpperCase()) {
        return node;
      }
    },
    getIndexSuffix: function(operation) {
      return operation[operation.length - 1].toUpperCase();
    }
  },
  '#': {
    helpers: ['id', 'getElementById'],
    tags: ['selector'],
    Selecter: function(node, id, engine, operation, continuation, scope) {
      if (node == null) {
        node = scope;
      }
      if (scope == null) {
        scope = engine.scope;
      }
      return (typeof node.getElementById === "function" ? node.getElementById(id) : void 0) || node.querySelector('[id="' + id + '"]');
    },
    Qualifier: function(node, value) {
      if (node.id === value) {
        return node;
      }
    },
    singular: true
  },
  ' ': {
    tags: ['selector'],
    Combinator: {
      execute: function(node, engine, operation, continuation, scope) {
        return (node || scope).getElementsByTagName("*");
      },
      getIndexPrefix: function() {
        return '';
      }
    }
  },
  '!': {
    Combinator: function(node, engine, operation, continuation, scope) {
      var nodes;
      nodes = void 0;
      while (node = (node || scope).parentNode) {
        if (node.nodeType === 1) {
          (nodes || (nodes = [])).push(node);
        }
      }
      return nodes;
    }
  },
  '>': {
    tags: ['selector'],
    Combinator: function(node, engine, operation, continuation, scope) {
      return (node || scope).children;
    }
  },
  '!>': {
    Combinator: function(node, engine, operation, continuation, scope) {
      return (node || scope).parentElement;
    }
  },
  '+': {
    tags: ['selector'],
    Combinator: function(node, engine, operation, continuation, scope) {
      return (node || scope).nextElementSibling;
    }
  },
  '!+': {
    Combinator: function(node, engine, operation, continuation, scope) {
      return (node || scope).previousElementSibling;
    }
  },
  '++': {
    Combinator: function(node) {
      var next, nodes, prev;
      nodes = void 0;
      if (prev = node.previousElementSibling) {
        (nodes || (nodes = [])).push(prev);
      }
      if (next = node.nextElementSibling) {
        (nodes || (nodes = [])).push(next);
      }
      return nodes;
    }
  },
  '~': {
    tags: ['selector'],
    Combinator: function(node) {
      var nodes;
      nodes = void 0;
      while (node = node.nextElementSibling) {
        (nodes || (nodes = [])).push(node);
      }
      return nodes;
    }
  },
  '!~': {
    Combinator: function(node) {
      var nodes, prev;
      nodes = void 0;
      prev = node.parentNode.firstElementChild;
      while (prev !== node) {
        (nodes || (nodes = [])).push(prev);
        prev = prev.nextElementSibling;
      }
      return nodes;
    }
  },
  '~~': {
    Combinator: function(node) {
      var nodes, prev;
      nodes = void 0;
      prev = node.parentNode.firstElementChild;
      while (prev) {
        if (prev !== node) {
          (nodes || (nodes = [])).push(prev);
        }
        prev = prev.nextElementSibling;
      }
      return nodes;
    }
  }
});

Selector.define({
  '&': {
    before: function() {},
    after: function(args, result) {
      return result;
    },
    serialize: function(operation) {
      var parent, ref1;
      if (typeof (parent = operation.parent)[0] === 'object') {
        parent = parent[parent.indexOf(operation) + 1];
      }
      if ((ref1 = Selector[parent[0]]) != null ? ref1.prototype.Qualifier : void 0) {
        return '&';
      } else {
        return '';
      }
    },
    log: function() {},
    unlog: function() {},
    hidden: true,
    Element: function(parameter, engine, operation, continuation, scope) {
      return scope;
    },
    retrieve: function(engine, operation, continuation, scope) {
      if (!this.key) {
        return this.execute(void 0, engine, operation, continuation, scope);
      }
    },
    "continue": function(engine, operation, continuation) {
      var key;
      if (continuation == null) {
        continuation = '';
      }
      if ((key = this.key) === '&' && continuation.charAt(continuation.length - 1) === '&') {
        return continuation;
      }
      return continuation + this.key;
    }
  },
  '^': {
    Element: function(parameter, engine, operation, continuation, scope) {
      if (parameter == null) {
        parameter = 1;
      }
      return this.getParentScope(engine, scope, continuation, parameter);
    }
  },
  '$': {
    Element: function(parameter, engine, operation, continuation, scope) {
      return engine.scope;
    }
  },
  '::document': {
    Reference: function() {
      return document;
    }
  },
  '::window': {
    Reference: function() {
      return window;
    }
  },
  'virtual': {
    localizers: ['Selector', 'Iterator'],
    Virtual: function(node, value, engine, operation, continuation, scope) {
      var prefix;
      if (!node && this.localizers.indexOf(operation.parent.command.type) > -1) {
        if (scope !== engine.scope) {
          node = scope;
        }
      }
      prefix = this.getScope(engine, node, continuation) || '$';
      return prefix + '"' + value + '"';
    },
    prefix: '"',
    virtual: true,
    unexpiring: true
  }
});

Selector.define({
  '[=]': {
    tags: ['selector'],
    prefix: '[',
    separator: '="',
    suffix: '"]',
    Attribute: function(node, attribute, value) {
      if (node.getAttribute(attribute) === value) {
        return node;
      }
    }
  },
  '[*=]': {
    tags: ['selector'],
    prefix: '[',
    separator: '*="',
    suffix: '"]',
    Attribute: function(node, attribute, value) {
      var ref1;
      if (((ref1 = node.getAttribute(attribute)) != null ? ref1.indexOf(value) : void 0) > -1) {
        return node;
      }
    }
  },
  '[|=]': {
    tags: ['selector'],
    prefix: '[',
    separator: '|="',
    suffix: '"]',
    Attribute: function(node, attribute, value) {
      if (node.getAttribute(attribute) != null) {
        return node;
      }
    }
  },
  '[]': {
    tags: ['selector'],
    prefix: '[',
    suffix: ']',
    Attribute: function(node, attribute) {
      if (node.getAttribute(attribute) != null) {
        return node;
      }
    }
  }
});

Selector.define({
  ':value': {
    Qualifier: function(node) {
      return node.value;
    },
    watch: "oninput"
  },
  ':get': {
    Qualifier: function(node, property, engine, operation, continuation, scope) {
      return node[property];
    }
  },
  ':first-child': {
    tags: ['selector'],
    Combinator: function(node) {
      if (!node.previousElementSibling) {
        return node;
      }
    }
  },
  ':last-child': {
    tags: ['selector'],
    Combinator: function(node) {
      if (!node.nextElementSibling) {
        return node;
      }
    }
  }
});

Selector.define({
  ':next': {
    relative: true,
    Combinator: function(node, engine, operation, continuation, scope) {
      var collection, index;
      if (node == null) {
        node = scope;
      }
      collection = this.getCanonicalCollection(engine, continuation);
      index = collection != null ? collection.indexOf(node) : void 0;
      if ((index == null) || index === -1 || index === collection.length - 1) {
        return;
      }
      return collection[index + 1];
    }
  },
  ':previous': {
    relative: true,
    Combinator: function(node, engine, operation, continuation, scope) {
      var collection, index;
      if (node == null) {
        node = scope;
      }
      collection = this.getCanonicalCollection(engine, continuation);
      index = collection != null ? collection.indexOf(node) : void 0;
      if (index === -1 || !index) {
        return;
      }
      return collection[index - 1];
    }
  },
  ':last': {
    relative: true,
    singular: true,
    Combinator: function(node, engine, operation, continuation, scope) {
      var collection, index;
      if (node == null) {
        node = scope;
      }
      collection = this.getCanonicalCollection(engine, continuation);
      index = collection != null ? collection.indexOf(node) : void 0;
      if (index == null) {
        return;
      }
      if (index === collection.length - 1) {
        return node;
      }
    }
  },
  ':first': {
    relative: true,
    singular: true,
    Combinator: function(node, engine, operation, continuation, scope) {
      var collection, index;
      if (node == null) {
        node = scope;
      }
      collection = this.getCanonicalCollection(engine, continuation);
      index = collection != null ? collection.indexOf(node) : void 0;
      if (index == null) {
        return;
      }
      if (index === 0) {
        return node;
      }
    }
  }
});

Selector.define({
  ':visible': {
    singular: true,
    deferred: true,
    Pseudo: function(node, offset, engine, operation, continuation, scope) {
      return Selector[':visible-y'].prototype.Pseudo.apply(this, arguments) && Selector[':visible-x'].prototype.Pseudo.apply(this, arguments);
    }
  },
  ':visible-y': {
    singular: true,
    deferred: true,
    Pseudo: function(node, offset, engine, operation, continuation, scope) {
      var eh, ey, sh, sy;
      if (node == null) {
        node = scope;
      }
      property = engine.scope.nodeType === 1 && 'computed-height' || 'height';
      ey = engine.data.watch(node, 'computed-y', operation, continuation, scope);
      eh = engine.data.watch(node, 'computed-height', operation, continuation, scope);
      sy = engine.data.watch(engine.scope, 'scroll-top', operation, continuation, scope) - (offset || 0);
      sh = engine.data.watch(engine.scope, property, operation, continuation, scope) + (offset || 0) * 2;
      if ((ey <= sy && ey + eh > sy + sh) || (ey > sy && ey < sy + sh) || (ey + eh > sy && ey + eh < sy + sh)) {
        return node;
      }
    }
  },
  ':visible-x': {
    singular: true,
    deferred: true,
    Pseudo: function(node, offset, engine, operation, continuation, scope) {
      var ew, ex, sw, sx;
      if (node == null) {
        node = scope;
      }
      property = engine.scope.nodeType === 1 && 'computed-width' || 'width';
      ex = engine.data.watch(node, 'computed-x', operation, continuation, scope);
      ew = engine.data.watch(node, 'computed-width', operation, continuation, scope);
      sx = engine.data.watch(engine.scope, 'scroll-left', operation, continuation, scope) - (offset || 0);
      sw = engine.data.watch(engine.scope, property, operation, continuation, scope) + (offset || 0);
      if ((ex <= sx && ex + ew > sx + sw) || (ex > sx && ex < sx + sw) || (ex + ew > sx && ex + ew < sx + sw)) {
        return node;
      }
    }
  }
});

Selector.define({
  ',': {
    tags: ['selector'],
    signature: false,
    separator: ',',
    proxy: true,
    serialize: function() {
      return '';
    },
    "yield": function(result, engine, operation, continuation, scope, ascender) {
      var contd;
      contd = this.getPrefixPath(engine, continuation) + operation.parent.command.path;
      this.add(engine, result, contd, operation.parent, scope, operation, continuation);
      this.defer(engine, operation.parent, contd, scope);
      return true;
    },
    release: function(result, engine, operation, continuation, scope) {
      var contd;
      contd = this.getPrefixPath(engine, continuation) + operation.parent.command.path;
      this.remove(engine, result, contd, operation.parent, scope, operation, void 0, continuation);
      return true;
    },
    descend: function(engine, operation, continuation, scope, ascender, ascending) {
      var argument, index, j, ref1;
      for (index = j = 1, ref1 = operation.length; j < ref1; index = j += 1) {
        if ((argument = operation[index]) instanceof Array) {
          argument.parent || (argument.parent = operation);
          engine.Command(argument).solve(operation.domain || engine, argument, continuation, scope);
        }
      }
      return false;
    }
  }
});

if (typeof document !== "undefined" && document !== null) {
  dummy = Selector.dummy = document.createElement('_');
  div = document.createElement('div');
  div.appendChild(document.createElement('b'));
  dummy.appendChild(div);
  dummy.innerHTML = "";
  Selector.destructuring = !div.childNodes.length;
  if (!dummy.hasOwnProperty("classList")) {
    Selector['.'].prototype.Qualifier = function(node, value) {
      if (node.className.split(/\s+/).indexOf(value) > -1) {
        return node;
      }
    };
  }
  if (dummy.parentElement !== void 0) {
    Selector['!>'].prototype.Combinator = function(node, engine, operation, continuation, scope) {
      var parent;
      if (node == null) {
        node = scope;
      }
      if (parent = node.parentNode) {
        if (parent.nodeType === 1) {
          return parent;
        }
      }
    };
  }
  if (dummy.nextElementSibling !== void 0) {
    Selector['+'].prototype.Combinator = function(node, engine, operation, continuation, scope) {
      if (node == null) {
        node = scope;
      }
      while (node = node.nextSibling) {
        if (node.nodeType === 1) {
          return node;
        }
      }
    };
    Selector['!+'].prototype.Combinator = function(node, engine, operation, continuation, scope) {
      if (node == null) {
        node = scope;
      }
      while (node = node.previousSibling) {
        if (node.nodeType === 1) {
          return node;
        }
      }
    };
    Selector['++'].prototype.Combinator = function(node, engine, operation, continuation, scope) {
      var next, nodes, prev;
      if (node == null) {
        node = scope;
      }
      nodes = void 0;
      prev = next = node;
      while (prev = prev.previousSibling) {
        if (prev.nodeType === 1) {
          (nodes || (nodes = [])).push(prev);
          break;
        }
      }
      while (next = next.nextSibling) {
        if (next.nodeType === 1) {
          (nodes || (nodes = [])).push(next);
          break;
        }
      }
      return nodes;
    };
    Selector['~'].prototype.Combinator = function(node, engine, operation, continuation, scope) {
      var nodes;
      if (node == null) {
        node = scope;
      }
      nodes = void 0;
      while (node = node.nextSibling) {
        if (node.nodeType === 1) {
          (nodes || (nodes = [])).push(node);
        }
      }
      return nodes;
    };
    Selector['!~'].prototype.Combinator = function(node, engine, operation, continuation, scope) {
      var nodes, prev;
      if (node == null) {
        node = scope;
      }
      nodes = void 0;
      prev = node.parentNode.firstChild;
      while (prev && (prev !== node)) {
        if (prev.nodeType === 1) {
          (nodes || (nodes = [])).push(prev);
        }
        prev = prev.nextSibling;
      }
      return nodes;
    };
    Selector['~~'].prototype.Combinator = function(node, engine, operation, continuation, scope) {
      var nodes, prev;
      if (node == null) {
        node = scope;
      }
      nodes = void 0;
      prev = node.parentNode.firstChild;
      while (prev) {
        if (prev !== node && prev.nodeType === 1) {
          (nodes || (nodes = [])).push(prev);
        }
        prev = prev.nextSibling;
      }
      return nodes;
    };
    Selector[':first-child'].prototype.Selecter = function(node, engine, operation, continuation, scope) {
      var child, parent;
      if (node == null) {
        node = scope;
      }
      if (parent = node.parentNode) {
        child = parent.firstChild;
        while (child && child.nodeType !== 1) {
          child = child.nextSibling;
        }
        if (child === node) {
          return node;
        }
      }
    };
    Selector[':last-child'].prototype.Qualifier = function(node, engine, operation, continuation, scope) {
      var child, parent;
      if (node == null) {
        node = scope;
      }
      if (parent = node.parentNode) {
        child = parent.lastChild;
        while (child && child.nodeType !== 1) {
          child = child.previousSibling;
        }
        if (child === node) {
          return mpde;
        }
      }
    };
  }
}

module.exports = Selector;



},{"../../vendor/MutationObserver.js":35,"../../vendor/weakmap.js":37,"gss-engine/src/Query":7}],24:[function(require,module,exports){
var Command, Query, Stylesheet,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('gss-engine/src/Command');

Query = require('gss-engine/src/Query');

Stylesheet = (function(superClass) {
  extend(Stylesheet, superClass);

  function Stylesheet() {
    return Stylesheet.__super__.constructor.apply(this, arguments);
  }

  Stylesheet.prototype.mimes = {
    "text/gss-ast": function(source) {
      return JSON.parse(source);
    },
    "text/gss": function(source) {
      var ref;
      return (ref = GSS.Parser.parse(source)) != null ? ref.commands : void 0;
    }
  };

  Stylesheet.prototype.parse = function(engine, type, source) {
    var operations;
    if (type == null) {
      type = 'text/gss';
    }
    engine.console.push(type.split('/')[1], [source]);
    operations = engine.clone(this.mimes[type](source));
    if (typeof operations[0] === 'string') {
      operations = [operations];
    }
    engine.console.pop(operations);
    return operations;
  };

  Stylesheet.prototype.descend = function(engine, operation, continuation, scope, ascender, ascending) {
    var argument, command, index, j, len;
    this.users = (this.users || 0) + 1;
    for (index = j = 0, len = operation.length; j < len; index = ++j) {
      argument = operation[index];
      if (argument != null ? argument.push : void 0) {
        if (argument.parent == null) {
          argument.parent = operation;
        }
        if (command = argument.command || engine.Command(argument)) {
          command.solve(engine, argument, this.delimit(continuation, this.DESCEND), scope);
        }
      }
    }
  };

  Stylesheet.operations = [['import', ['[*=]', ['tag', 'style'], 'type', 'gss']], ['import', ['[*=]', ['tag', 'link'], 'type', 'gss']]];

  Stylesheet.CanonicalizeSelectorRegExp = new RegExp("[$][a-z0-9]+[" + Command.prototype.DESCEND + "]\\s*", "gi");

  Stylesheet.prototype.update = function(engine, operation, property, value, stylesheet, rule) {
    var body, generated, i, index, j, len, needle, ops, other, previous, prop, ref, rules, selectors, sheet, watchers;
    watchers = this.getWatchers(engine, stylesheet);
    if (!(sheet = stylesheet.sheet)) {
      if ((ref = stylesheet.parentNode) != null) {
        ref.removeChild(stylesheet);
      }
      return;
    }
    if (prop = engine.output.properties[property]) {
      if (prop.property) {
        property = prop.property;
      }
      if (typeof value !== 'string') {
        value = prop.format(value);
      }
    }
    needle = this.getOperation(operation, watchers, rule);
    previous = [];
    for (index = j = 0, len = watchers.length; j < len; index = ++j) {
      ops = watchers[index];
      if (ops) {
        other = this.getRule(watchers[ops[0]][0]);
        if (other === rule && index !== needle) {
          break;
        } else if (index > needle) {
          break;
        } else if (other !== rule && previous.indexOf(other) === -1) {
          previous.push(other);
        }
      }
    }
    rules = sheet.cssRules || sheet.rules;
    index = previous.length;
    generated = rules[index];
    if (generated && (needle !== operation.index || value === '' || (other === rule && index !== needle))) {
      if ((i = value.indexOf('!important')) > -1) {
        generated.style.setProperty(property, value.substring(0, i), 'important');
      } else {
        generated.style[property] = value;
      }
      if (generated.style.length === 0) {
        sheet.deleteRule(index);
      }
    } else {
      body = property + ':' + value;
      selectors = this.getSelector(stylesheet, operation);
      index = sheet.insertRule(selectors + "{" + body + "}", previous.length);
    }
    return true;
  };

  Stylesheet.prototype.onClean = function(engine, operation, query, watcher, subscope) {
    if (this.users && !--this.users) {
      engine.Query.prototype.clean(engine, this.source);
      return engine.Query.prototype.unobserve(engine, this.source, this.delimit(query));
    }
  };

  Stylesheet.prototype.getRule = function(operation) {
    var rule;
    rule = operation;
    while (rule = rule.parent) {
      if (rule[0] === 'rule') {
        return rule;
      }
    }
  };

  Stylesheet.prototype.getStylesheet = function(engine, continuation) {
    var anchor, boundary, imported, index, path, prefix, sheet;
    path = continuation;
    boundary = path.lastIndexOf('@import');
    index = path.indexOf(this.DESCEND, boundary);
    if (boundary > -1) {
      prefix = this.getCanonicalSelector(path.substring(0, boundary));
      path = prefix + continuation.substring(boundary, index);
    } else {
      path = path.substring(0, index);
    }
    if (!(sheet = engine.stylesheets[path])) {
      if ((index = continuation.indexOf(this.DESCEND)) > -1) {
        continuation = continuation.substring(0, index);
      }
      sheet = engine.stylesheets[path] = document.createElement('STYLE');
      if (anchor = engine.Query.prototype.getByPath(engine, continuation)) {
        if (imported = engine.imported[anchor._gss_id]) {
          sheet.selectors = imported[path];
        }
        while (anchor = anchor.nextSibling) {
          if (!anchor.selectors) {
            break;
          }
        }
      }
      engine.stylesheets.push(sheet);
      engine.identify(sheet);
      if (anchor) {
        anchor.parentNode.insertBefore(sheet, anchor);
      } else {
        (engine.scope.documentElement || engine.scope).appendChild(sheet);
      }
    }
    return sheet;
  };

  Stylesheet.prototype.getWatchers = function(engine, stylesheet) {
    var base, name1;
    return (base = (stylesheet.assignments || (stylesheet.assignments = {})))[name1 = stylesheet._gss_id] || (base[name1] = []);
  };

  Stylesheet.prototype.getOperation = function(operation, watchers, rule) {
    var j, len, needle, other, ref, ref1;
    needle = operation.index;
    ref = rule.properties;
    for (j = 0, len = ref.length; j < len; j++) {
      other = ref[j];
      if ((ref1 = watchers[other]) != null ? ref1.length : void 0) {
        needle = other;
        break;
      }
    }
    return needle;
  };

  Stylesheet.prototype.set = function(engine, operation, continuation, element, property, value) {
    var rule, stylesheet;
    if (rule = this.getRule(operation)) {
      if (stylesheet = this.getStylesheet(engine, continuation)) {
        if (this.watch(engine, operation, continuation, stylesheet, value)) {
          if (this.update(engine, operation, property, value, stylesheet, rule)) {
            engine.updating.restyled = true;
          }
        }
      }
      return true;
    }
  };

  Stylesheet.remove = function(engine, continuation) {
    var j, k, len, operation, operations, ref, stylesheet, watchers;
    if (engine.stylesheets) {
      ref = engine.stylesheets;
      for (j = 0, len = ref.length; j < len; j++) {
        stylesheet = ref[j];
        if (watchers = this.prototype.getWatchers(engine, stylesheet)) {
          if (operations = watchers[continuation]) {
            for (k = operations.length - 1; k >= 0; k += -1) {
              operation = operations[k];
              this.prototype.unwatch(engine, operation, continuation, stylesheet, watchers);
            }
          }
        }
      }
    }
  };

  Stylesheet.prototype.watch = function(engine, operation, continuation, stylesheet, value) {
    var i, meta, name1, watchers;
    watchers = this.getWatchers(engine, stylesheet);
    meta = (watchers[name1 = operation.index] || (watchers[name1] = []));
    if ((i = meta.indexOf(continuation)) > -1) {
      return i === 0;
    }
    (watchers[continuation] || (watchers[continuation] = [])).push(operation);
    return meta.push(continuation) === 1;
  };

  Stylesheet.prototype.unwatch = function(engine, operation, continuation, stylesheet, watchers) {
    var index, meta, observers;
    if (watchers == null) {
      watchers = this.getWatchers(engine, stylesheet);
    }
    index = operation.index;
    meta = watchers[index];
    meta.splice(meta.indexOf(continuation), 1);
    observers = watchers[continuation];
    observers.splice(observers.indexOf(operation), 1);
    if (!observers.length) {
      delete watchers[continuation];
    }
    if (meta.length === 0) {
      delete watchers[index];
      return this.update(engine, operation, operation[1], '', stylesheet, this.getRule(operation));
    }
  };

  Stylesheet["export"] = function() {
    var id, j, len, ref, ref1, rule, sheet, style, text;
    sheet = [];
    ref = engine.stylesheets;
    for (id in ref) {
      style = ref[id];
      ref1 = style.sheet.cssRules || style.sheet.rules;
      for (j = 0, len = ref1.length; j < len; j++) {
        rule = ref1[j];
        text = rule.cssText.replace(/\[matches~="(.*?)"\]/g, function(m, selector) {
          return selector.replace(/@[^↓]+/g, '').replace(/↓&/g, '').replace(/↓/g, ' ');
        });
        sheet.push(text);
      }
    }
    return sheet.join('');
  };

  Stylesheet.prototype.getSelector = function(stylesheet, operation) {
    return this.getSelectors(stylesheet, operation).join(', ');
  };

  Stylesheet.prototype.getSelectors = function(stylesheet, operation) {
    var custom, index, j, len, parent, result, results, wrapped;
    parent = operation;
    results = wrapped = custom = void 0;
    while (parent) {
      if (parent.command.type === 'Condition' && !parent.global) {
        if (results) {
          for (index = j = 0, len = results.length; j < len; index = ++j) {
            result = results[index];
            results[index] = ' ' + this.getCustomSelector(parent.command.key, result);
          }
        }
      } else if (parent.command.type === 'Iterator') {
        results = this.combineSelectors(results, parent[1]);
      }
      if (!(parent = parent.parent) && (stylesheet != null ? stylesheet.selectors : void 0)) {
        results = this.combineSelectors(results, stylesheet);
      }
    }
    return results;
  };

  Stylesheet.empty = [''];

  Stylesheet.prototype.combineSelectors = function(results, operation) {
    var index, j, k, l, len, len1, ref, ref1, result, selector, update;
    if (results == null) {
      results = Stylesheet.empty;
    }
    update = [];
    for (index = j = 0, len = results.length; j < len; index = ++j) {
      result = results[index];
      if (operation.selectors) {
        if (result.substring(0, 12) === ' [matches~="') {
          update.push(' ' + this.getCustomSelector(result.selector, result));
        } else {
          ref = operation.selectors;
          for (k = 0, len1 = ref.length; k < len1; k++) {
            selector = ref[k];
            update.push(selector + result);
          }
        }
      } else if (result.substring(0, 12) === ' [matches~="') {
        update.push(' ' + this.getCustomSelector(operation.command.path, result));
      } else if (operation[0] === ',') {
        for (index = l = 1, ref1 = operation.length; l < ref1; index = l += 1) {
          update.push(this.getRuleSelector(operation[index], operation.command) + result);
        }
      } else {
        update.push(this.getRuleSelector(operation) + result);
      }
    }
    return update;
  };

  Stylesheet.prototype.getRuleSelector = function(operation, parent) {
    var command, key, path;
    command = operation.command;
    path = command.path;
    if (path.charAt(0) === '&') {
      if ((key = path.substring(1)) === command.key || !command.key) {
        return key;
      } else {
        return this.getCustomSelector((parent || command).path);
      }
    }
    if ((command.selector || command.key) === path) {
      return ' ' + path;
    } else {
      return ' ' + this.getCustomSelector((parent || command).path);
    }
  };

  Stylesheet.prototype.getCustomSelector = function(selector, suffix, prefix) {
    var DESCEND;
    DESCEND = this.DESCEND;
    selector = selector.replace(/\s+/g, DESCEND);
    if (suffix) {
      if (suffix.charAt(0) === ' ') {
        suffix = suffix.substring(1);
      }
      if (suffix.substring(0, 11) === '[matches~="') {
        suffix = DESCEND + suffix.substring(11);
      } else {
        suffix = DESCEND + suffix.replace(/\s+/g, DESCEND) + '"]';
      }
    } else {
      suffix = '"]';
    }
    return '[matches~="' + selector + suffix;
  };

  Stylesheet.prototype.getCanonicalSelector = function(selector) {
    selector = selector.trim();
    selector = selector.replace(Stylesheet.CanonicalizeSelectorRegExp, ' ').replace(/\s+/g, this.DESCEND);
    return selector;
  };

  Stylesheet.match = function(engine, node, continuation, value) {
    var append, base, base1, base2, base3, i, index, name1, name2, ref, ref1, remove;
    if (node.nodeType !== 1) {
      return;
    }
    if ((index = continuation.indexOf(this.prototype.DESCEND)) > -1) {
      continuation = continuation.substring(index + 1);
    }
    continuation = this.prototype.getCanonicalSelector(continuation).replace(/\s+/, this.prototype.DESCEND);
    if (value) {
      append = (base = ((base1 = engine.updating).matches || (base1.matches = {})))[name1 = node._gss_id] || (base[name1] = []);
      remove = (ref = engine.updating.unmatches) != null ? ref[node._gss_id] : void 0;
    } else {
      remove = (ref1 = engine.updating.matches) != null ? ref1[node._gss_id] : void 0;
      append = (base2 = ((base3 = engine.updating).unmatches || (base3.unmatches = {})))[name2 = node._gss_id] || (base2[name2] = []);
    }
    if (append && append.indexOf(continuation) === -1) {
      append.push(continuation);
    }
    if (remove && (i = remove.indexOf(continuation)) > -1) {
      return remove.splice(i, 1);
    }
  };

  Stylesheet.rematch = function(engine) {
    var bits, element, id, index, j, k, len, len1, matches, tokens, unmatches, value, values;
    if (matches = engine.updating.matches) {
      for (id in matches) {
        values = matches[id];
        element = engine.identity.get(id);
        if (tokens = element.getAttribute('matches')) {
          bits = tokens.split(' ');
          for (j = 0, len = values.length; j < len; j++) {
            value = values[j];
            if (bits.indexOf(value) === -1) {
              bits.push(value);
            }
          }
        } else {
          bits = values;
        }
        element.setAttribute('matches', bits.join(' '));
      }
      engine.updating.matches = void 0;
    }
    if (unmatches = engine.updating.unmatches) {
      for (id in unmatches) {
        values = unmatches[id];
        element = engine.identity.get(id);
        if (tokens = element.getAttribute('matches')) {
          bits = tokens.split(' ');
          for (k = 0, len1 = values.length; k < len1; k++) {
            value = values[k];
            if ((index = bits.indexOf(value)) > -1) {
              bits.splice(index, 1);
            }
          }
        }
        if (bits.length) {
          element.setAttribute('matches', bits.join(' '));
        } else {
          element.removeAttribute('matches');
        }
      }
      return engine.updating.unmatches = void 0;
    }
  };

  Stylesheet.prototype.getKey = function(engine, operation, continuation, node) {
    if (!node && continuation && continuation.lastIndexOf(this.DESCEND) === -1) {
      return '';
    }
    return this.key;
  };

  Stylesheet.prototype["continue"] = function() {
    return Query.prototype["continue"].apply(this, arguments);
  };

  return Stylesheet;

})(Command.List);

Stylesheet.Import = (function(superClass) {
  extend(Import, superClass);

  function Import() {
    return Import.__super__.constructor.apply(this, arguments);
  }

  Import.prototype.Sequence = void 0;

  Import.prototype.type = 'Import';

  Import.prototype.relative = true;

  Import.prototype.signature = [
    {
      'source': ['Selector', 'String', 'Node']
    }, [
      {
        'type': ['String'],
        'text': ['String']
      }
    ]
  ];

  Import.define({
    'directive': function(name, type, text, engine, operation, continuation, scope) {
      return Stylesheet.Import[name].prototype.execute(type, text, void 0, engine, operation, continuation, scope);
    },
    'import': function(node, type, method, engine, operation, continuation, scope) {
      var anchor, async, base, command, imported, index, left, name1, path, src, stylesheet, text;
      if (typeof node === 'string') {
        src = node;
        node = void 0;
      } else {
        if (!(src = this.getUrl(node))) {
          text = node.textContent || node.innerText;
        }
        type || (type = typeof node.getAttribute === "function" ? node.getAttribute('type') : void 0);
      }
      path = this.getGlobalPath(engine, operation, continuation, node);
      if (stylesheet = engine.queries[path]) {
        command = stylesheet.command;
        if (stylesheet.length) {
          stylesheet.splice(0);
          if (node.parentNode) {
            command.users = 0;
            this.uncontinuate(engine, path);
            if (text) {
              stylesheet.push.apply(stylesheet, command.parse(engine, type, text));
              this.continuate(engine, path);
              return;
            }
          } else {
            this.clean(engine, path);
            return;
          }
        }
      } else {
        stylesheet = [];
        command = stylesheet.command = new Stylesheet(engine, operation, continuation, node);
        command.key = this.getGlobalPath(engine, operation, continuation, node, 'import');
        command.source = path;
        if ((node != null ? node.getAttribute('scoped') : void 0) != null) {
          node.scoped = command.scoped = true;
        }
      }
      if ((index = continuation.indexOf(this.DESCEND)) > -1) {
        left = continuation.substring(0, index);
        if (anchor = engine.Query.prototype.getByPath(engine, left)) {
          if (anchor.tagName === 'STYLE') {
            left = engine.Stylesheet.prototype.getCanonicalSelector(continuation) + command.key;
            imported = (base = engine.imported)[name1 = anchor._gss_id] || (base[name1] = {});
            imported[left] = engine.Stylesheet.prototype.getSelectors(null, operation);
          }
        }
      }
      if (text) {
        stylesheet.push.apply(stylesheet, command.parse(engine, type, text));
      } else if (!command.resolver) {
        engine.updating.block(engine);
        command.resolver = (function(_this) {
          return function(text) {
            command.resolver = void 0;
            stylesheet.push.apply(stylesheet, command.parse(engine, type, text));
            _this.continuate(engine, command.source);
            if (engine.updating.unblock(engine) && async) {
              return engine.engine.commit();
            }
          };
        })(this);
        this.resolve(src, method, command.resolver);
        async = true;
      }
      return stylesheet;
    }
  });

  Import.prototype.resolve = function(url, method, callback) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (function(_this) {
      return function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || (!xhr.status && url.indexOf('file://') === 0)) {
            return callback(xhr.responseText);
          }
        }
      };
    })(this);
    xhr.open(method && method.toUpperCase() || 'GET', url, true);
    return xhr.send();
  };

  Import.prototype.after = function(args, result, engine, operation, continuation, scope) {
    var contd, node, path, ref;
    if (result == null) {
      return result;
    }
    node = ((ref = args[0]) != null ? ref.nodeType : void 0) === 1 ? args[0] : scope;
    path = result.command.source;
    this.set(engine, path, result);
    contd = this.delimit(continuation, this.DESCEND);
    if (node.scoped) {
      scope = engine.getScopeElement(node);
    }
    this.subscribe(engine, result, contd, scope, path);
    this.subscribe(engine, result, contd, scope, node);
    if (result.command.users === 0) {
      this.continuate(engine, path);
    }
    return result;
  };

  Import.prototype.ascend = function(engine, operation, continuation, scope, result) {
    if (result.length === 0) {
      return;
    }
    this.schedule(engine, result, this.delimit(continuation, this.DESCEND), scope);
  };

  Import.prototype.write = function(engine, operation, continuation, scope, node) {
    return true;
  };

  Import.prototype.getUrl = function(node) {
    return node.getAttribute('href') || node.getAttribute('src');
  };

  Import.prototype.getId = function(node) {
    return this.getUrl(node) || node._gss_id;
  };

  Import.prototype.formatId = function(id) {
    var i;
    if ((i = id.lastIndexOf('/')) > -1) {
      id = id.substring(i + 1);
    }
    return id;
  };

  Import.prototype.getLocalPath = function(engine, operation, continuation, node) {
    return this.getGlobalPath(engine, operation, continuation, node);
  };

  Import.prototype.getGlobalPath = function(engine, operation, continuation, node, command) {
    var id, index;
    if (command == null) {
      command = 'parse';
    }
    index = operation[0] === 'directive' && 2 || 1;
    if (typeof operation[index] === 'string') {
      id = operation[index];
    } else {
      if ((node == null) && continuation) {
        node = this.getByPath(engine, continuation);
      }
      id = this.getId(node);
    }
    return '@' + command + '(' + this.formatId(id) + ')';
  };

  return Import;

})(Query);

module.exports = Stylesheet;



},{"gss-engine/src/Command":3,"gss-engine/src/Query":7}],25:[function(require,module,exports){
var Range, Transition,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Range = require('gss-engine/src/commands/Range');

Transition = (function(superClass) {
  extend(Transition, superClass);

  function Transition() {
    return Transition.__super__.constructor.apply(this, arguments);
  }

  Transition.prototype.condition = function(engine, operation) {
    var i, len, op;
    for (i = 0, len = operation.length; i < len; i++) {
      op = operation[i];
      if (op.command) {
        if (engine.output.Time[op[0]] || this.condition(engine, op)) {
          return true;
        }
      }
    }
  };

  Transition.prototype.size = 4;

  Transition.prototype.lazy = true;

  Transition.define({
    '...': Range['...'].prototype.execute
  });

  Transition.prototype.valueOf = function() {
    return this[2];
  };

  Transition.prototype.compute = function(range, now, from) {
    var end, start;
    start = range[0] || 0;
    end = range[1] || 0;
    return Math.min(1, (now - from - start) / ((end - start) || 1));
  };

  Transition.prototype.complete = function(range, value) {
    if (value >= 1) {
      return true;
    }
  };

  Transition.prototype.update = function(range, engine, operation, continuation, scope) {
    var copy, from, now, value;
    now = Date.now();
    from = range[4] || (range[4] = now);
    value = this.compute(range, now, from);
    if (value === true) {
      return true;
    }
    if ((value == null) && (range[2] == null)) {
      value = range[0];
    }
    if (value != null) {
      copy = this.copy(range);
      copy[2] = value;
      this.ascend(engine, operation, continuation, scope, copy, true);
    }
    return this.complete(range, value);
  };

  return Transition;

})(Range.Progress);

Transition.Spring = (function(superClass) {
  extend(Spring, superClass);

  function Spring() {
    return Spring.__super__.constructor.apply(this, arguments);
  }

  Spring.prototype.signature = [
    {
      tension: ['Number'],
      friction: ['Number']
    }
  ];

  Spring.prototype.condition = null;

  Spring.define({
    'spring': function(tension, friction) {
      if (tension == null) {
        tension = 40;
      }
      if (friction == null) {
        friction = 7;
      }
      return this.wrap([0, 1, null, 1, 0, 0, 0, 0, 0, 0, 0, 0, this.getTension(tension), this.getFriction(friction), 0]);
    }
  });

  Spring.prototype.valueOf = function() {
    var end, start, value;
    if ((value = this[2]) != null) {
      start = this[0];
      end = this[1];
      return value * ((end - start) || 1) + start;
    }
  };

  Spring.prototype.getTension = function(value) {
    return (value - 30.0) * 3.62 + 194.0;
  };

  Spring.prototype.getFriction = function(value) {
    return (value - 8.0) * 3.0 + 25.0;
  };

  Spring.prototype.compute = function(range, now, from) {
    var Aa, Av, Ba, Bv, Ca, Cv, Da, Dv, HALF, Pp, Pv, STEP, Tp, Tv, dvdt, dxdt, end, friction, goal, interpolation, old, position, ref, start, tension, velocity;
    start = range[0] || 0;
    end = range[1] || 0;
    goal = (ref = range[3]) != null ? ref : 1;
    from = range[14] || from;
    range[5] = Math.min(this.MAX, range[5] + (now - from) / 1000);
    tension = range[12];
    friction = range[13];
    velocity = range[6];
    position = old = range[2];
    Tv = range[8];
    Tp = range[9];
    Pv = range[10];
    Pp = range[11];
    STEP = this.STEP;
    HALF = this.HALF;
    while (range[5] >= STEP) {
      range[5] -= STEP;
      if (range[5] < STEP) {
        range[10] = velocity;
        range[11] = position;
      }
      Av = velocity;
      Aa = (tension * (goal - Tp)) - friction * velocity;
      Tp = position + Av * HALF;
      Tv = velocity + Aa * HALF;
      Bv = Tv;
      Ba = (tension * (goal - Tp)) - friction * Tv;
      Tp = position + Bv * HALF;
      Tv = velocity + Ba * HALF;
      Cv = Tv;
      Ca = (tension * (goal - Tp)) - friction * Tv;
      Tp = position + Cv * HALF;
      Tv = velocity + Ca * HALF;
      Dv = Tv;
      Da = (tension * (goal - Tp)) - friction * Tv;
      dxdt = (Av + 2 * (Bv + Cv) + Dv) / 6;
      dvdt = (Aa + 2 * (Ba + Ca) + Da) / 6;
      position += dxdt * STEP;
      velocity += dvdt * STEP;
    }
    if (interpolation = range[5] / STEP) {
      position = position * interpolation + range[10] * (1 - interpolation);
      velocity = velocity * interpolation + range[11] * (1 - interpolation);
    }
    range[6] = velocity;
    range[8] = Tv;
    range[9] = Tp;
    range[14] = now;
    if (range[7] && Math.abs(range[6]) < this.REST_THRESHOLD) {
      if (position !== goal) {
        return goal;
      } else {
        return;
      }
    }
    range[2] = position;
    if (Math.abs(old - position) > this.DISPLACEMENT_THRESHOLD) {
      range[7] = 1;
      return position;
    }
  };

  Spring.prototype.complete = function(range, value) {
    if (range[7] && Math.abs(range[6]) < this.REST_THRESHOLD) {
      range[7] = 0;
      return true;
    }
  };

  Spring.prototype.STEP = 0.001;

  Spring.prototype.HALF = 0.0005;

  Spring.prototype.MAX = 0.064;

  Spring.prototype.DISPLACEMENT_THRESHOLD = 0.0001;

  Spring.prototype.REST_THRESHOLD = 0.0001;

  return Spring;

})(Transition);

module.exports = Transition;



},{"gss-engine/src/commands/Range":12}],26:[function(require,module,exports){
var Unit, Variable,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Variable = require('gss-engine/src/commands/Variable');

Unit = (function(superClass) {
  extend(Unit, superClass);

  function Unit() {
    return Unit.__super__.constructor.apply(this, arguments);
  }

  Unit.prototype.signature = [
    {
      value: ['Variable', 'Number']
    }
  ];

  Unit.prototype.getProperty = function(operation) {
    var parent;
    parent = operation;
    while (parent = parent.parent) {
      if (parent.command.type === 'Assignment') {
        return parent[1];
      }
    }
  };

  Unit.prototype.Dependencies = {
    'margin-top': 'containing-width',
    'margin-top': 'containing-width',
    'margin-right': 'containing-width',
    'margin-left': 'containing-width',
    'padding-top': 'containing-width',
    'padding-top': 'containing-width',
    'padding-right': 'containing-width',
    'padding-left': 'containing-width',
    'left': 'containing-width',
    'right': 'containing-width',
    'width': 'containing-width',
    'min-width': 'containing-width',
    'max-width': 'containing-width',
    'text-width': 'containing-width',
    'top': 'containing-height',
    'bottom': 'containing-height',
    'height': 'containing-height',
    'font-size': 'containing-font-size',
    'vertical-align': 'computed-line-height',
    'background-position-x': 'computed-width',
    'background-position-y': 'computed-height'
  };

  return Unit;

})(Variable);

Unit.prototype.Macro = (function(superClass) {
  extend(Macro, superClass);

  function Macro() {
    return Macro.__super__.constructor.apply(this, arguments);
  }

  Macro.define({
    '%': function(value, engine, operation, continuation, scope) {
      var path, property;
      property = this.Dependencies[this.getProperty(operation)] || 'containing-width';
      path = engine.getPath(scope, property);
      return ['*', ['px', value], ['get', path]];
    },
    em: function(value, engine, operation, continuation, scope) {
      var path;
      path = engine.getPath(scope, 'computed-font-size');
      return ['*', ['px', value], ['get', path]];
    },
    rem: function(value, engine, operation, continuation, scope) {
      var path;
      path = this.engine.getPath(engine.scope._gss_id, 'computed-font-size');
      return ['*', ['px', value], ['get', path]];
    },
    vw: function(value, engine, operation, continuation, scope) {
      return ['*', ['/', ['px', value], 100], ['get', '::window[width]']];
    },
    vh: function(value, engine, operation, continuation, scope) {
      return ['*', ['/', ['px', value], 100], ['get', '::window[height]']];
    },
    vmin: function(value, engine, operation, continuation, scope) {
      return ['*', ['/', ['px', value], 100], ['min', ['get', '::window[height]'], ['get', '::window[width]']]];
    },
    vmax: function(value, engine, operation, continuation, scope) {
      return ['*', ['/', ['px', value], 100], ['max', ['get', '::window[height]'], ['get', '::window[width]']]];
    }
  });

  return Macro;

})(Unit);

Unit.prototype.Numeric = (function(superClass) {
  extend(Numeric, superClass);

  function Numeric() {
    return Numeric.__super__.constructor.apply(this, arguments);
  }

  Numeric.define({
    '%': function(value, engine, operation, continuation, scope) {
      var path, property;
      property = this.Dependencies[this.getProperty(operation)] || 'containing-width';
      path = engine.getPath(scope, property);
      return ['*', ['px', value], ['get', path]];
    },
    em: function(value, engine, operation, continuation, scope) {
      return value * engine.data.watch(scope, 'computed-font-size', operation, continuation, scope);
    },
    rem: function(value, engine, operation, continuation, scope) {
      return value * engine.data.watch(engine.scope, 'computed-font-size', operation, continuation, scope);
    },
    vw: function(value, engine, operation, continuation, scope) {
      return value / 100 * engine.data.watch('::window[width]', null, operation, continuation, scope);
    },
    vh: function(value, engine, operation, continuation, scope) {
      return value / 100 * engine.data.watch('::window[height]', null, operation, continuation, scope);
    },
    vmin: function(value, engine, operation, continuation, scope) {
      return value / 100 * Math.min(engine.data.watch('::window[width]', null, operation, continuation, scope), engine.data.watch('::window[height]', null, operation, continuation, scope));
    },
    vmax: function(value, engine, operation, continuation, scope) {
      return value / 100 * Math.max(engine.data.watch('::window[width]', null, operation, continuation, scope), engine.data.watch('::window[height]', null, operation, continuation, scope));
    }
  });

  return Numeric;

})(Unit);

module.exports = Unit;



},{"gss-engine/src/commands/Variable":13}],27:[function(require,module,exports){
var Getters;

Getters = (function() {
  function Getters() {}

  Getters.prototype['::window'] = {
    width: function() {
      return Math.min(window.innerWidth, document.documentElement.clientWidth);
    },
    height: function() {
      return Math.min(window.innerHeight, document.documentElement.clientHeight);
    },
    x: 0,
    y: 0
  };

  Getters.prototype['::document'] = {
    height: function() {
      return document.documentElement.clientHeight;
    },
    width: function() {
      return document.documentElement.clientWidth;
    },
    x: 0,
    y: 0,
    scroll: {
      height: function() {
        return document.body.scrollHeight;
      },
      width: function() {
        return document.body.scrollWidth;
      },
      left: function() {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
      },
      top: function() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      }
    }
  };

  Getters.prototype.intrinsic = {
    height: function(element) {},
    width: function(element) {},
    y: function(element) {},
    x: function(element) {}
  };

  Getters.prototype.scroll = {
    left: function(element) {
      return element.scrollLeft;
    },
    top: function(element) {
      return element.scrollTop;
    },
    height: function(element) {
      return element.scrollHeight;
    },
    width: function(element) {
      return element.scrollWidth;
    }
  };

  Getters.prototype.client = {
    left: function(element) {
      return element.clientLeft;
    },
    top: function(element) {
      return element.clientTop;
    },
    height: function(element) {
      return element.clientHeight;
    },
    width: function(element) {
      return element.clientWidth;
    }
  };

  Getters.prototype.offset = {
    left: function(element) {
      return element.offsetLeft;
    },
    top: function(element) {
      return element.offsetTop;
    },
    height: function(element) {
      return element.offsetHeight;
    },
    width: function(element) {
      return element.offsetWidth;
    }
  };

  return Getters;

})();

module.exports = Getters;



},{}],28:[function(require,module,exports){
var Styles;

Styles = (function() {
  var base, base1, base2, base3, base4, i, index, j, k, l, len, len1, name, prop, ref, ref1, side, sides, type;

  function Styles(engine) {
    this.engine = engine;
  }

  Styles.prototype.content = [
    function() {
      return console.log(123);
    }, {
      content: ['String', 'Variable']
    }
  ];

  Styles.prototype.rotate = [
    {
      task: 'pretransform',
      x: ['Length', 'Percentage']
    }, [
      {
        y: ['Length', 'Percentage']
      }
    ], [
      {
        z: ['Length', 'Percentage']
      }
    ], [
      {
        origin: ['transform-origin']
      }
    ]
  ];

  Styles.prototype.scale = [
    {
      task: 'pretransform',
      x: ['Length', 'Percentage']
    }, [
      {
        y: ['Length', 'Percentage']
      }
    ], [
      {
        z: ['Length', 'Percentage']
      }
    ], [
      {
        origin: ['transform-origin']
      }
    ]
  ];

  Styles.prototype.translate = [
    {
      task: 'pretransform',
      x: ['Length', 'Percentage']
    }, [
      {
        y: ['Length', 'Percentage']
      }
    ], [
      {
        z: ['Length', 'Percentage']
      }
    ], [
      {
        origin: ['transform-origin']
      }
    ]
  ];

  Styles.prototype.transform = [['Matrix']];

  Styles.prototype.animation = [
    [
      [
        {
          name: ['none', 'String'],
          duration: ['Time'],
          delay: ['Time'],
          direction: ['normal', 'reverse', 'alternate'],
          'timing-function': ['Easing'],
          'iteration-count': [1, 'infinite', 'Number'],
          'fill-mode': ['none', 'both', 'forwards', 'backwards'],
          'play-state': ['running', 'paused']
        }
      ]
    ]
  ];

  Styles.prototype.transition = [
    [
      [
        {
          property: ['all', 'property', 'none'],
          duration: ['Time'],
          delay: ['Time'],
          direction: ['reverse', 'normal'],
          'timing-function': ['Easing']
        }
      ]
    ]
  ];

  Styles.prototype.background = [
    [
      [
        {
          image: ['URL', 'Gradient', 'none'],
          position: {
            x: ['Length', 'Percentage', 'center', 'left', 'right'],
            y: ['Length', 'Percentage', 'center', 'top', 'bottom']
          },
          size: {
            x: ['Length', 'Percentage', 'cover', 'contain'],
            y: ['Length', 'Percentage']
          },
          repeat: ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'space', 'round'],
          attachment: ['fixed', 'scroll', 'local'],
          origin: ['padding-box', 'border-box', 'content-box'],
          clip: ['border-box', 'content-box', 'padding-box']
        }
      ]
    ], [
      {
        color: ['Color', 'transparent']
      }
    ]
  ];

  Styles.prototype.text = {
    shadow: [
      [
        [
          {
            offset: {
              x: ['Length'],
              y: ['Length']
            },
            blur: ['Length'],
            color: ['Color']
          }
        ]
      ]
    ],
    decoration: ['none', 'capitalize', 'uppercase', 'lowercase'],
    align: ['left', 'right', 'center', 'justify'],
    ident: ['Length', 'Percentage']
  };

  Styles.prototype.box = {
    shadow: [
      [
        [
          {
            inset: ['inset']
          }
        ], {
          offset: {
            x: ['Length'],
            y: ['Length']
          }
        }, [
          {
            blur: ['Length'],
            spread: ['Length']
          }
        ], {
          color: ['Color']
        }
      ]
    ],
    sizing: ['padding-box', 'border-box', 'content-box']
  };

  Styles.prototype.outline = [
    {
      width: ['medium', 'Length'],
      style: ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'],
      color: ['invert', 'Color']
    }
  ];

  Styles.prototype['line-height'] = ['normal', 'Length', 'Number', 'Percentage'];

  Styles.prototype.font = [
    [
      {
        style: ['normal', 'italic', 'oblique'],
        variant: ['normal', 'small-caps'],
        weight: ['normal', 'Number', 'bold']
      }
    ], {
      size: ['Size', 'Length', 'Percentage']
    }, [
      {
        'line-height': ['normal', 'Length', 'Number', 'Percentage']
      }
    ], {
      family: ['inherit', 'strings']
    }
  ];

  Styles.prototype['font-stretch'] = ['normal', 'ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded'];

  Styles.prototype['font-size-adjust'] = ['Number'];

  Styles.prototype['letter-spacing'] = ['normal', 'Length'];

  Styles.prototype.list = {
    style: [
      {
        type: ['disc', 'circle', 'square', 'decimal', 'decimal-leading-zero', 'lower-roman', 'upper-roman', 'lower-greek', 'lower-latin', 'upper-latin', 'armenian', 'georgian', 'lower-alpha', 'none', 'upper-alpha'],
        image: ['none', 'URL'],
        position: ['outside', 'inside', 'none']
      }
    ]
  };

  Styles.prototype.width = ['Length', 'auto'];

  Styles.prototype.height = ['Length', 'auto'];

  Styles.prototype.min = {
    width: ['Length', 'auto'],
    height: ['Length', 'auto']
  };

  Styles.prototype.max = {
    width: ['Length', 'auto'],
    height: ['Length', 'auto']
  };

  Styles.prototype.display = ['inline', 'inline-block', 'block', 'list-item', 'run-in', 'table', 'inline-table', 'none', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-row', 'table-column-group', 'table-column', 'table-cell', 'table-caption'];

  Styles.prototype.visibility = ['visible', 'hidden'];

  Styles.prototype.float = ['none', 'left', 'right'];

  Styles.prototype.clear = ['none', 'left', 'right', 'both'];

  Styles.prototype.overflow = ['visible', 'hidden', 'scroll', 'auto'];

  Styles.prototype['overflow-x'] = ['visible', 'hidden', 'scroll', 'auto'];

  Styles.prototype['overflow-y'] = ['visible', 'hidden', 'scroll', 'auto'];

  Styles.prototype.position = ['static', 'relative', 'absolute', 'fixed', 'sticky'];

  Styles.prototype.top = ['Length', 'Percentage', 'auto'];

  Styles.prototype.left = ['Length', 'Percentage', 'auto'];

  Styles.prototype.right = ['Length', 'Percentage', 'auto'];

  Styles.prototype.bottom = ['Length', 'Percentage', 'auto'];

  Styles.prototype.opacity = ['Number'];

  Styles.prototype['z-index'] = ['Integer'];

  Styles.prototype.cursor = ['auto', 'crosshair', 'default', 'hand', 'move', 'e-resize', 'ne-resize', 'nw-resize', 'n-resize', 'se-resize', 'sw-resize', 's-resize', 'w-resize', 'text', 'wait', 'help'];

  Styles.prototype.color = ['color'];

  Styles.prototype.columns = ['Length'];

  Styles.prototype['column-gap'] = ['Length'];

  Styles.prototype['column-width'] = ['Length'];

  Styles.prototype['column-count'] = ['Integer'];

  ref = sides = ['top', 'right', 'bottom', 'left'];
  for (index = j = 0, len = ref.length; j < len; index = ++j) {
    side = ref[index];
    ((base = Styles.prototype).margin || (base.margin = [
      {
        'pad': 'pad'
      }
    ]))[0][side] = ['Length', 'Percentage', 'auto'];
    ((base1 = Styles.prototype).padding || (base1.padding = [
      {
        'pad': 'pad'
      }
    ]))[0][side] = ['Length', 'Percentage', 'auto'];
    ((base2 = Styles.prototype).border || (base2.border = [{}]))[0][side] = [
      [
        {
          width: ['Length', 'thin', 'thick', 'medium'],
          style: ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none'],
          color: ['Color']
        }
      ]
    ];
    Styles.prototype.border.push({
      'pad': 'pad'
    });
    ref1 = ['width', 'color', 'style'];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      type = ref1[k];
      ((base3 = Styles.prototype)[name = 'border-' + type] || (base3[name] = [
        [
          {
            'pad': 'pad'
          }
        ]
      ]))[0][+0]['border-' + side + '-' + type] = Styles.prototype.border[0][side][0][0][type];
    }
    if (!(index % 2)) {
      for (i = l = 3; l > 0; i = l += -2) {
        prop = 'border-' + side + '-' + sides[i] + '-radius';
        Styles.prototype[prop] = ['Length', 'none'];
        ((base4 = Styles.prototype)['border-radius'] || (base4['border-radius'] = [
          {
            'pad': 'pad'
          }
        ]))[0][prop] = ['Length', 'none'];
      }
    }
  }

  return Styles;

})();

module.exports = Styles;



},{}],29:[function(require,module,exports){
var Color, Command,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('gss-engine/src/Command');

Color = (function(superClass) {
  extend(Color, superClass);

  Color.Keywords = {
    'transparent': 'transparent',
    'currentColor': 'currentColor'
  };

  function Color(obj) {
    switch (typeof obj) {
      case 'string':
        if (Color.Keywords[obj]) {
          return obj;
        } else if (obj.charAt(0) === '#') {
          return obj;
        }
        break;
      case 'object':
        if (Color[obj[0]]) {
          return obj;
        }
    }
  }

  Color.define({
    hsl: function(h, s, l) {
      var b, c, g, i, j, r, ref, t1, t2, t3;
      if (s === 0) {
        r = g = b = l * 255;
      } else {
        t3 = [0, 0, 0];
        c = [0, 0, 0];
        t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
        t1 = 2 * l - t2;
        h /= 360;
        t3[0] = h + 1 / 3;
        t3[1] = h;
        t3[2] = h - 1 / 3;
        for (i = j = 0; j <= 2; i = ++j) {
          if (t3[i] < 0) {
            t3[i] += 1;
          }
          if (t3[i] > 1) {
            t3[i] -= 1;
          }
          if (6 * t3[i] < 1) {
            c[i] = t1 + (t2 - t1) * 6 * t3[i];
          } else if (2 * t3[i] < 1) {
            c[i] = t2;
          } else if (3 * t3[i] < 2) {
            c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
          } else {
            c[i] = t1;
          }
        }
        ref = [Math.round(c[0] * 255), Math.round(c[1] * 255), Math.round(c[2] * 255)], r = ref[0], g = ref[1], b = ref[2];
      }
      return ['rgb', r, g, b];
    },
    hsla: function(h, s, l, a) {
      return Type.Color.hsl.execute(h, s, l).concat[a];
    },
    rgb: function(r, g, b) {
      return ['rgb', r, g, b];
    },
    rgba: function(r, g, b, a) {
      return ['rgba', r, g, b, a];
    },
    hex: function(hex) {
      var a, b, g, r, u;
      if (hex.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
        if (hex.length === 4 || hex.length === 7) {
          hex = hex.substr(1);
        }
        if (hex.length === 3) {
          hex = hex.split("");
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        u = parseInt(hex, 16);
        r = u >> 16;
        g = u >> 8 & 0xFF;
        b = u & 0xFF;
        return ['rgb', r, g, b];
      }
      if (hex.match(/^#?([A-Fa-f0-9]{8})$/)) {
        if (hex.length === 9) {
          hex = hex.substr(1);
        }
        u = parseInt(hex, 16);
        r = u >> 24 & 0xFF;
        g = u >> 16 & 0xFF;
        b = u >> 8 & 0xFF;
        a = u & 0xFF;
        return ['rgba', r, g, b, a];
      }
    }
  });

  return Color;

})(Command);

module.exports = Color;



},{"gss-engine/src/Command":3}],30:[function(require,module,exports){
var Command, Gradient,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('gss-engine/src/Command');

Gradient = (function(superClass) {
  extend(Gradient, superClass);

  Gradient.prototype.type = 'Gradient';

  function Gradient(obj) {
    switch (typeof obj) {
      case 'object':
        if (Gradient[obj[0]]) {
          return obj;
        }
    }
  }

  Gradient.define({
    'linear-gradient': function() {},
    'radial-gradient': function() {},
    'repeating-linear-gradient': function() {},
    'repeating-radial-gradient': function() {}
  });

  return Gradient;

})(Command);

module.exports = Gradient;



},{"gss-engine/src/Command":3}],31:[function(require,module,exports){
var Command, Matrix,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('gss-engine/src/Command');

Matrix = (function(superClass) {
  var method, property, ref;

  extend(Matrix, superClass);

  function Matrix() {
    return Matrix.__super__.constructor.apply(this, arguments);
  }

  Matrix.prototype.type = 'Matrix';

  Matrix.prototype.Library = require('../../vendor/gl-matrix');

  Matrix.rst = function(rX, rY, rZ, sX, sY, sZ, tX, tY, tZ) {
    var mat4, matrix, maxR;
    mat4 = this.prototype._mat4;
    if (rX || rY || rZ) {
      maxR = Math.max(rX, rY, rZ);
      matrix = mat4.create();
      mat4.rotate(matrix, matrix, maxR * 360 * (Math.PI / 180), [rX / maxR, rY / maxR, rZ / maxR]);
    }
    if (tX || tY || tZ) {
      matrix || (matrix = mat4.create());
      mat4.translate(matrix, matrix, [tX, tY, tZ]);
    }
    if (sX !== 1 || sY !== 1 || sZ !== 1) {
      matrix || (matrix = mat4.create());
      mat4.scale(matrix, matrix, [sX, sY, sZ]);
    }
    return matrix;
  };

  Matrix.prototype.matrix = function() {};

  Matrix.prototype.matrix3d = function() {};

  Matrix.prototype.precontextualize = function(engine, scope, argument) {
    if (argument == null) {
      argument = scope;
    }
    return argument;
  };

  Matrix.prototype.mat3 = function(matrix, method, a, b, c) {
    if (matrix == null) {
      matrix = this._mat4.create();
    }
    if (matrix.length === 9) {
      return this._mat3[method](matrix, matrix, a, b, c);
    } else {
      return this._mat4[method](matrix, matrix, a, b, c);
    }
  };

  Matrix.prototype.mat4 = function(matrix, method, a, b, c) {
    if (matrix == null) {
      matrix = this._mat4.create();
    }
    if (matrix.length === 9) {
      matrix = this._mat4.fromMat3(matrix);
    }
    return this._mat4[method](matrix, matrix, a, b, c);
  };

  ref = Matrix.prototype.Library;
  for (property in ref) {
    method = ref[property];
    Matrix.prototype['_' + property] = method;
  }

  Matrix.prototype.format = function(matrix) {
    return 'matrix3d(' + matrix[0] + ',' + matrix[1] + ',' + matrix[2] + ',' + matrix[3] + ',' + matrix[4] + ',' + matrix[5] + ',' + matrix[6] + ',' + matrix[7] + ',' + matrix[8] + ',' + matrix[9] + ',' + matrix[10] + ',' + matrix[11] + ',' + matrix[12] + ',' + matrix[13] + ',' + matrix[14] + ',' + matrix[15] + ')';
  };

  return Matrix;

})(Command);

Matrix.prototype.Sequence = (function(superClass) {
  extend(Sequence, superClass);

  function Sequence() {
    return Sequence.__super__.constructor.apply(this, arguments);
  }

  return Sequence;

})(Command.Sequence);

Matrix.Transformation1 = (function(superClass) {
  extend(Transformation1, superClass);

  function Transformation1() {
    return Transformation1.__super__.constructor.apply(this, arguments);
  }

  Transformation1.prototype.signature = [
    [
      {
        matrix: ['Matrix', 'Selector']
      }
    ], {
      x: ['Variable', 'Number']
    }
  ];

  Transformation1.define({
    translateX: function(matrix, x) {
      return this.mat3(matrix, 'translate', [x, 0, 0]);
    },
    translateY: function(matrix, y) {
      return this.mat3(matrix, 'translate', [0, y, 0]);
    },
    translateZ: function(matrix, z) {
      return this.mat4(matrix, 'translate', [0, 0, z]);
    },
    translate: function(matrix, x) {
      return this.mat3(matrix, 'translate', [x, x]);
    },
    rotateX: function(matrix, angle) {
      return this.mat4(matrix, 'rotateX', angle * 360 * (Math.PI / 180));
    },
    rotateY: function(matrix, angle) {
      return this.mat4(matrix, 'rotateY', angle * 360 * (Math.PI / 180));
    },
    rotateZ: function(matrix, angle) {
      return this.mat4(matrix, 'rotateZ', angle * 360 * (Math.PI / 180));
    },
    scaleX: function(matrix, x) {
      return this.mat3(matrix, 'scale', [x, 1, 1]);
    },
    scaleY: function(matrix, y) {
      return this.mat3(matrix, 'scale', [1, y, 1]);
    },
    scaleZ: function(matrix, z) {
      return this.mat4(matrix, 'scale', [1, 1, z]);
    },
    scale: function(matrix, x) {
      return this.mat4(matrix, 'scale', [x, x, 1]);
    },
    skewX: function(matrix, y) {
      return this.mat3(matrix, 'scale', [1, y, 1]);
    },
    skewY: function(matrix, z) {
      return this.mat4(matrix, 'scale', [1, 1, z]);
    },
    skew: function(matrix, x) {
      return this.mat4(matrix, 'scale', [x, x, 1]);
    },
    rotate: function(matrix, angle) {
      return this.mat3(matrix, 'rotate', angle * 360 * (Math.PI / 180), [0, 0, 1]);
    }
  });

  return Transformation1;

})(Matrix);

Matrix.Transformation2 = (function(superClass) {
  extend(Transformation2, superClass);

  function Transformation2() {
    return Transformation2.__super__.constructor.apply(this, arguments);
  }

  Transformation2.prototype.signature = [
    [
      {
        matrix: ['Matrix', 'Selector']
      }
    ], {
      x: ['Variable', 'Number'],
      y: ['Variable', 'Number']
    }
  ];

  Transformation2.define({
    translate: function(matrix, x, y) {
      return this.mat3(matrix, 'translate', [x, y]);
    },
    scale: function(matrix, x, y) {
      return this.mat3(matrix, 'translate', [x, y]);
    }
  });

  return Transformation2;

})(Matrix);

Matrix.Transformation3 = (function(superClass) {
  extend(Transformation3, superClass);

  function Transformation3() {
    return Transformation3.__super__.constructor.apply(this, arguments);
  }

  Transformation3.prototype.signature = [
    [
      {
        matrix: ['Matrix', 'Selector']
      }
    ], {
      x: ['Variable', 'Number'],
      y: ['Variable', 'Number'],
      z: ['Variable', 'Number']
    }
  ];

  Transformation3.define({
    translate3d: function(matrix, x, y, z) {
      if (z === 0) {
        return this.mat3(matrix, 'translate', [x, y]);
      } else {
        return this.mat4(matrix, 'translate', [x, y, z]);
      }
    },
    scale3d: function(matrix, x, y, z) {
      if (z === 1) {
        return this.mat3(matrix, 'scale', [x, y]);
      } else {
        return this.mat4(matrix, 'scale', [x, y, z]);
      }
    }
  });

  return Transformation3;

})(Matrix);

Matrix.Transformation3A = (function(superClass) {
  extend(Transformation3A, superClass);

  function Transformation3A() {
    return Transformation3A.__super__.constructor.apply(this, arguments);
  }

  Transformation3A.prototype.signature = [
    [
      {
        matrix: ['Matrix', 'Selector']
      }
    ], {
      x: ['Variable', 'Number'],
      y: ['Variable', 'Number'],
      z: ['Variable', 'Number'],
      a: ['Variable', 'Number']
    }
  ];

  Transformation3A.define({
    rotate3d: function(matrix, x, y, z, angle) {
      if (y == null) {
        y = x;
      }
      if (z == null) {
        z = 0;
      }
      if (z === 0) {
        return this.mat3(matrix, 'rotate', [x, y], angle * 360);
      } else {
        return this.mat4(matrix, 'rotate', [x, y, z], angle * 360);
      }
    }
  });

  return Transformation3A;

})(Matrix);

module.exports = Matrix;



},{"../../vendor/gl-matrix":36,"gss-engine/src/Command":3}],32:[function(require,module,exports){
var Measurement, Unit,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Unit = require('../commands/Unit').prototype.Macro;

Measurement = (function(superClass) {
  extend(Measurement, superClass);

  function Measurement() {
    return Measurement.__super__.constructor.apply(this, arguments);
  }

  Measurement.prototype.signature = [
    {
      value: ['Variable', 'Number']
    }
  ];

  return Measurement;

})(Unit);

Measurement.Percentage = (function(superClass) {
  extend(Percentage, superClass);

  function Percentage(obj) {
    switch (typeof obj) {
      case 'object':
        if (obj[0] === '%') {
          return this;
        }
    }
  }

  return Percentage;

})(Measurement);

Measurement.Length = (function(superClass) {
  extend(Length, superClass);

  function Length(obj) {
    switch (typeof obj) {
      case 'number':
        return obj;
      case 'object':
        if (Measurement.Length[obj[0]] || (Unit[obj[0]] && obj[0] !== '%')) {
          return this;
        }
    }
  }

  Length.define({
    px: function(value) {
      return value;
    },
    pt: function(value) {
      return value;
    },
    dm: function(value) {
      return value * 378;
    },
    cm: function(value) {
      return value * 37.8;
    },
    mm: function(value) {
      return value * 3.78;
    },
    "in": function(value) {
      return value * 96;
    }
  });

  Length.formatNumber = function(number) {
    return number + 'px';
  };

  return Length;

})(Measurement);

Measurement.Angle = (function(superClass) {
  extend(Angle, superClass);

  function Angle(obj) {
    switch (typeof obj) {
      case 'number':
        return obj;
      case 'object':
        if (Measurement.Angle[obj[0]]) {
          return this;
        }
    }
  }

  Angle.define({
    deg: function(value) {
      return value * 360;
    },
    grad: function(value) {
      return value / (360 / 400);
    },
    rad: function(value) {
      return value * (Math.PI / 180);
    },
    turn: function(value) {
      return value;
    }
  });

  Angle.formatNumber = function(number) {
    return number + 'rad';
  };

  return Angle;

})(Measurement);

Measurement.Time = (function(superClass) {
  extend(Time, superClass);

  function Time(obj) {
    switch (typeof obj) {
      case 'number':
        return obj;
      case 'object':
        if (Measurement.Time[obj[0]]) {
          return this;
        }
    }
  }

  Time.define({
    h: function(value) {
      return value * 60 * 60 * 1000;
    },
    min: function(value) {
      return value * 60 * 1000;
    },
    s: function(value) {
      return value * 1000;
    },
    ms: function(value) {
      return value;
    }
  });

  Time.formatNumber = function(number) {
    return number + 'ms';
  };

  return Time;

})(Measurement);

Measurement.Frequency = (function(superClass) {
  extend(Frequency, superClass);

  function Frequency(obj) {
    switch (typeof obj) {
      case 'number':
        return obj;
      case 'object':
        if (Measurement.Frequency[obj[0]]) {
          return this;
        }
    }
  }

  Frequency.define({
    mhz: function(value) {
      return value * 1000 * 1000;
    },
    khz: function(value) {
      return value * 1000;
    },
    hz: function(value) {
      return value;
    }
  });

  Frequency.formatNumber = function(number) {
    return number + 'hz';
  };

  return Frequency;

})(Measurement);

module.exports = Measurement;



},{"../commands/Unit":26}],33:[function(require,module,exports){
var Command, Primitive,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('gss-engine/src/Command');

Primitive = (function(superClass) {
  extend(Primitive, superClass);

  function Primitive() {
    return Primitive.__super__.constructor.apply(this, arguments);
  }

  return Primitive;

})(Command);

Primitive.Number = (function(superClass) {
  extend(Number, superClass);

  Number.prototype.type = 'Number';

  function Number(obj) {
    var parsed;
    parsed = parseFloat(obj);
    if (parsed === obj) {
      return parsed;
    }
  }

  Number.formatNumber = function(number) {
    return number;
  };

  return Number;

})(Primitive);

Primitive.Integer = (function(superClass) {
  extend(Integer, superClass);

  Integer.prototype.type = 'Integer';

  function Integer(obj) {
    var parsed;
    parsed = parseInt(obj);
    if (String(parsed) === String(obj)) {
      return parsed;
    }
  }

  return Integer;

})(Primitive);

Primitive.String = (function(superClass) {
  extend(String, superClass);

  String.prototype.type = 'String';

  function String(obj) {
    if (typeof obj === 'string') {
      return obj;
    }
  }

  return String;

})(Primitive);

Primitive.Strings = (function(superClass) {
  extend(Strings, superClass);

  Strings.prototype.type = 'Strings';

  function Strings(obj) {
    if (typeof obj === 'string' || obj instanceof Array) {
      return obj;
    }
  }

  return Strings;

})(Primitive);

Primitive.Size = (function(superClass) {
  extend(Size, superClass);

  Size.prototype.type = 'Size';

  function Size(obj) {
    var ref;
    if (typeof obj === 'string' && ((ref = Primitive.Size.Keywords) != null ? ref[obj] : void 0)) {
      return obj;
    }
  }

  Size.Keywords = {
    'medium': 'medium',
    'xx-small': 'xx-small',
    'x-small': 'x-small',
    'small': 'small',
    'large': 'large',
    'x-large': 'x-large',
    'xx-large': 'xx-large',
    'smaller': 'smaller',
    'larger': 'larger'
  };

  return Size;

})(Primitive);

Primitive.Position = (function(superClass) {
  extend(Position, superClass);

  Position.prototype.type = 'Position';

  function Position(obj) {
    var ref;
    if (typeof obj === 'string' && ((ref = Primitive.Position.Keywords) != null ? ref[obj] : void 0)) {
      return obj;
    }
  }

  Position.Keywords = {
    "top": "top",
    "bottom": "bottom",
    "left": "left",
    "right": "right"
  };

  return Position;

})(Primitive);

Primitive.Property = (function(superClass) {
  extend(Property, superClass);

  function Property() {
    return Property.__super__.constructor.apply(this, arguments);
  }

  Property.prototype.type = 'Property';

  Property.prototype.Property = function(obj) {
    if (this.properties[obj]) {
      return obj;
    }
  };

  return Property;

})(Primitive);

module.exports = Primitive;



},{"gss-engine/src/Command":3}],34:[function(require,module,exports){
var Command, URL,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('gss-engine/src/Command');

URL = (function(superClass) {
  extend(URL, superClass);

  URL.prototype.type = 'URL';

  function URL(obj) {
    switch (typeof obj) {
      case 'object':
        if (URL[obj[0]]) {
          return obj;
        }
    }
  }

  URL.define({
    'url': function() {},
    'src': function() {},
    'canvas': function() {}
  });

  return URL;

})(Command);

module.exports = URL;



},{"gss-engine/src/Command":3}],35:[function(require,module,exports){
(function (global){
/*
 * Copyright 2012 The Polymer Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

if (typeof window != 'undefined') {
  var registrationsTable = new WeakMap();

  // We use setImmediate or postMessage for our future callback.
  var setImmediate = window.msSetImmediate || window.setImmediate;

  // Use post message to emulate setImmediate.
  if (!setImmediate) {
    var setImmediateQueue = [];
    var sentinel = String(Math.random());
    window.addEventListener('message', function(e) {
      if (e.data === sentinel) {
        var queue = setImmediateQueue;
        setImmediateQueue = [];
        queue.forEach(function(func) {
          func();
        });
      }
    });
    setImmediate = function(func) {
      setImmediateQueue.push(func);
      window.postMessage(sentinel, '*');
    };
  }

  // This is used to ensure that we never schedule 2 callas to setImmediate
  var isScheduled = false;

  // Keep track of observers that needs to be notified next time.
  var scheduledObservers = [];

  /**
   * Schedules |dispatchCallback| to be called in the future.
   * @param {MutationObserver} observer
   */
  function scheduleCallback(observer) {
    scheduledObservers.push(observer);
    if (!isScheduled) {
      isScheduled = true;
      setImmediate(dispatchCallbacks);
    }
  }

  function wrapIfNeeded(node) {
    return window.ShadowDOMPolyfill &&
        window.ShadowDOMPolyfill.wrapIfNeeded(node) ||
        node;
  }

  function dispatchCallbacks() {
    // http://dom.spec.whatwg.org/#mutation-observers

    isScheduled = false; // Used to allow a new setImmediate call above.

    var observers = scheduledObservers;
    scheduledObservers = [];
    // Sort observers based on their creation UID (incremental).
    observers.sort(function(o1, o2) {
      return o1.uid_ - o2.uid_;
    });

    var anyNonEmpty = false;
    observers.forEach(function(observer) {

      // 2.1, 2.2
      var queue = observer.takeRecords();
      // 2.3. Remove all transient registered observers whose observer is mo.
      removeTransientObserversFor(observer);

      // 2.4
      if (queue.length) {
        observer.callback_(queue, observer);
        anyNonEmpty = true;
      }
    });

    // 3.
    if (anyNonEmpty)
      dispatchCallbacks();
  }

  function removeTransientObserversFor(observer) {
    observer.nodes_.forEach(function(node) {
      var registrations = registrationsTable.get(node);
      if (!registrations)
        return;
      registrations.forEach(function(registration) {
        if (registration.observer === observer)
          registration.removeTransientObservers();
      });
    });
  }

  /**
   * This function is used for the "For each registered observer observer (with
   * observer's options as options) in target's list of registered observers,
   * run these substeps:" and the "For each ancestor ancestor of target, and for
   * each registered observer observer (with options options) in ancestor's list
   * of registered observers, run these substeps:" part of the algorithms. The
   * |options.subtree| is checked to ensure that the callback is called
   * correctly.
   *
   * @param {Node} target
   * @param {function(MutationObserverInit):MutationRecord} callback
   */
  function forEachAncestorAndObserverEnqueueRecord(target, callback) {
    for (var node = target; node; node = node.parentNode) {
      var registrations = registrationsTable.get(node);

      if (registrations) {
        for (var j = 0; j < registrations.length; j++) {
          var registration = registrations[j];
          var options = registration.options;

          // Only target ignores subtree.
          if (node !== target && !options.subtree)
            continue;

          var record = callback(options);
          if (record)
            registration.enqueue(record);
        }
      }
    }
  }

  var uidCounter = 0;

  /**
   * The class that maps to the DOM MutationObserver interface.
   * @param {Function} callback.
   * @constructor
   */
  function JsMutationObserver(callback) {
    this.callback_ = callback;
    this.nodes_ = [];
    this.records_ = [];
    this.uid_ = ++uidCounter;
  }

  JsMutationObserver.prototype = {
    observe: function(target, options) {
      target = wrapIfNeeded(target);

      // 1.1
      if (!options.childList && !options.attributes && !options.characterData ||

          // 1.2
          options.attributeOldValue && !options.attributes ||

          // 1.3
          options.attributeFilter && options.attributeFilter.length &&
              !options.attributes ||

          // 1.4
          options.characterDataOldValue && !options.characterData) {

        throw new SyntaxError();
      }

      var registrations = registrationsTable.get(target);
      if (!registrations)
        registrationsTable.set(target, registrations = []);

      // 2
      // If target's list of registered observers already includes a registered
      // observer associated with the context object, replace that registered
      // observer's options with options.
      var registration;
      for (var i = 0; i < registrations.length; i++) {
        if (registrations[i].observer === this) {
          registration = registrations[i];
          registration.removeListeners();
          registration.options = options;
          break;
        }
      }

      // 3.
      // Otherwise, add a new registered observer to target's list of registered
      // observers with the context object as the observer and options as the
      // options, and add target to context object's list of nodes on which it
      // is registered.
      if (!registration) {
        registration = new Registration(this, target, options);
        registrations.push(registration);
        this.nodes_.push(target);
      }

      registration.addListeners();
    },

    disconnect: function() {
      this.nodes_.forEach(function(node) {
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          var registration = registrations[i];
          if (registration.observer === this) {
            registration.removeListeners();
            registrations.splice(i, 1);
            // Each node can only have one registered observer associated with
            // this observer.
            break;
          }
        }
      }, this);
      this.records_ = [];
    },

    takeRecords: function() {
      var copyOfRecords = this.records_;
      this.records_ = [];
      return copyOfRecords;
    }
  };

  /**
   * @param {string} type
   * @param {Node} target
   * @constructor
   */
  function MutationRecord(type, target) {
    this.type = type;
    this.target = target;
    this.addedNodes = [];
    this.removedNodes = [];
    this.previousSibling = null;
    this.nextSibling = null;
    this.attributeName = null;
    this.attributeNamespace = null;
    this.oldValue = null;
  }

  function copyMutationRecord(original) {
    var record = new MutationRecord(original.type, original.target);
    record.addedNodes = original.addedNodes.slice();
    record.removedNodes = original.removedNodes.slice();
    record.previousSibling = original.previousSibling;
    record.nextSibling = original.nextSibling;
    record.attributeName = original.attributeName;
    record.attributeNamespace = original.attributeNamespace;
    record.oldValue = original.oldValue;
    return record;
  };

  // We keep track of the two (possibly one) records used in a single mutation.
  var currentRecord, recordWithOldValue;

  /**
   * Creates a record without |oldValue| and caches it as |currentRecord| for
   * later use.
   * @param {string} oldValue
   * @return {MutationRecord}
   */
  function getRecord(type, target) {
    return currentRecord = new MutationRecord(type, target);
  }

  /**
   * Gets or creates a record with |oldValue| based in the |currentRecord|
   * @param {string} oldValue
   * @return {MutationRecord}
   */
  function getRecordWithOldValue(oldValue) {
    if (recordWithOldValue)
      return recordWithOldValue;
    recordWithOldValue = copyMutationRecord(currentRecord);
    recordWithOldValue.oldValue = oldValue;
    return recordWithOldValue;
  }

  function clearRecords() {
    currentRecord = recordWithOldValue = undefined;
  }

  /**
   * @param {MutationRecord} record
   * @return {boolean} Whether the record represents a record from the current
   * mutation event.
   */
  function recordRepresentsCurrentMutation(record) {
    return record === recordWithOldValue || record === currentRecord;
  }

  /**
   * Selects which record, if any, to replace the last record in the queue.
   * This returns |null| if no record should be replaced.
   *
   * @param {MutationRecord} lastRecord
   * @param {MutationRecord} newRecord
   * @param {MutationRecord}
   */
  function selectRecord(lastRecord, newRecord) {
    if (lastRecord === newRecord)
      return lastRecord;

    // Check if the the record we are adding represents the same record. If
    // so, we keep the one with the oldValue in it.
    if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord))
      return recordWithOldValue;

    return null;
  }

  /**
   * Class used to represent a registered observer.
   * @param {MutationObserver} observer
   * @param {Node} target
   * @param {MutationObserverInit} options
   * @constructor
   */
  function Registration(observer, target, options) {
    this.observer = observer;
    this.target = target;
    this.options = options;
    this.transientObservedNodes = [];
  }

  Registration.prototype = {
    enqueue: function(record) {
      var records = this.observer.records_;
      var length = records.length;

      // There are cases where we replace the last record with the new record.
      // For example if the record represents the same mutation we need to use
      // the one with the oldValue. If we get same record (this can happen as we
      // walk up the tree) we ignore the new record.
      if (records.length > 0) {
        var lastRecord = records[length - 1];
        var recordToReplaceLast = selectRecord(lastRecord, record);
        if (recordToReplaceLast) {
          records[length - 1] = recordToReplaceLast;
          return;
        }
      } else {
        scheduleCallback(this.observer);
      }

      records[length] = record;
    },

    addListeners: function() {
      this.addListeners_(this.target);
    },

    addListeners_: function(node) {
      var options = this.options;
      
      if (options.attributes)
        node.addEventListener('DOMAttrModified', this, true);

      if (options.characterData)
        node.addEventListener('DOMCharacterDataModified', this, true);

      if (options.childList)
        node.addEventListener('DOMNodeInserted', this, true);

      if (options.childList || options.subtree)
        node.addEventListener('DOMNodeRemoved', this, true);
    },

    removeListeners: function() {
      this.removeListeners_(this.target);
    },

    removeListeners_: function(node) {
      var options = this.options;
      if (options.attributes)
        node.removeEventListener('DOMAttrModified', this, true);

      if (options.characterData)
        node.removeEventListener('DOMCharacterDataModified', this, true);

      if (options.childList)
        node.removeEventListener('DOMNodeInserted', this, true);

      if (options.childList || options.subtree)
        node.removeEventListener('DOMNodeRemoved', this, true);
    },

    /**
     * Adds a transient observer on node. The transient observer gets removed
     * next time we deliver the change records.
     * @param {Node} node
     */
    addTransientObserver: function(node) {
      // Don't add transient observers on the target itself. We already have all
      // the required listeners set up on the target.
      if (node === this.target)
        return;

      this.addListeners_(node);
      this.transientObservedNodes.push(node);
      var registrations = registrationsTable.get(node);
      if (!registrations)
        registrationsTable.set(node, registrations = []);

      // We know that registrations does not contain this because we already
      // checked if node === this.target.
      registrations.push(this);
    },

    removeTransientObservers: function() {
      var transientObservedNodes = this.transientObservedNodes;
      this.transientObservedNodes = [];

      transientObservedNodes.forEach(function(node) {
        // Transient observers are never added to the target.
        this.removeListeners_(node);

        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i] === this) {
            registrations.splice(i, 1);
            // Each node can only have one registered observer associated with
            // this observer.
            break;
          }
        }
      }, this);
    },

    handleEvent: function(e) {
      // Stop propagation since we are managing the propagation manually.
      // This means that other mutation events on the page will not work
      // correctly but that is by design.
      e.stopImmediatePropagation();

      switch (e.type) {
        case 'DOMAttrModified':
          // http://dom.spec.whatwg.org/#concept-mo-queue-attributes

          var name = e.attrName;
          var namespace = e.relatedNode.namespaceURI;
          var target = e.target;

          // 1.
          var record = new getRecord('attributes', target);
          record.attributeName = name;
          record.attributeNamespace = namespace;

          // 2.
          var oldValue =
              e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;

          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
            // 3.1, 4.2
            if (!options.attributes)
              return;

            // 3.2, 4.3
            if (options.attributeFilter && options.attributeFilter.length &&
                options.attributeFilter.indexOf(name) === -1 &&
                options.attributeFilter.indexOf(namespace) === -1) {
              return;
            }
            // 3.3, 4.4
            if (options.attributeOldValue)
              return getRecordWithOldValue(oldValue);

            // 3.4, 4.5
            return record;
          });

          break;

        case 'DOMCharacterDataModified':
          // http://dom.spec.whatwg.org/#concept-mo-queue-characterdata
          var target = e.target;

          // 1.
          var record = getRecord('characterData', target);

          // 2.
          var oldValue = e.prevValue;


          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
            // 3.1, 4.2
            if (!options.characterData)
              return;

            // 3.2, 4.3
            if (options.characterDataOldValue)
              return getRecordWithOldValue(oldValue);

            // 3.3, 4.4
            return record;
          });

          break;

        case 'DOMNodeRemoved':
          this.addTransientObserver(e.target);
          // Fall through.
        case 'DOMNodeInserted':
          // http://dom.spec.whatwg.org/#concept-mo-queue-childlist
          var target = e.relatedNode;
          var changedNode = e.target;
          var addedNodes, removedNodes;
          if (e.type === 'DOMNodeInserted') {
            addedNodes = [changedNode];
            removedNodes = [];
          } else {

            addedNodes = [];
            removedNodes = [changedNode];
          }
          var previousSibling = changedNode.previousSibling;
          var nextSibling = changedNode.nextSibling;

          // 1.
          var record = getRecord('childList', target);
          record.addedNodes = addedNodes;
          record.removedNodes = removedNodes;
          record.previousSibling = previousSibling;
          record.nextSibling = nextSibling;

          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
            // 2.1, 3.2
            if (!options.childList)
              return;

            // 2.2, 3.3
            return record;
          });

      }

      clearRecords();
    }
  };

  global.JsMutationObserver = JsMutationObserver;

  if (!global.MutationObserver)
    global.MutationObserver = JsMutationObserver;
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],36:[function(require,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.0
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a1 * b2;
    out[1] = a0 * b1 + a1 * b3;
    out[2] = a2 * b0 + a3 * b2;
    out[3] = a2 * b1 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a1 * s;
    out[1] = a0 * -s + a1 * c;
    out[2] = a2 *  c + a3 * s;
    out[3] = a2 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v1;
    out[2] = a2 * v0;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx,ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0
 *  c, d, 0
 *  tx,ty,1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5],
        ba = b[0], bb = b[1], bc = b[2], bd = b[3],
        btx = b[4], bty = b[5];

    out[0] = aa*ba + ab*bc;
    out[1] = aa*bb + ab*bd;
    out[2] = ac*ba + ad*bc;
    out[3] = ac*bb + ad*bd;
    out[4] = ba*atx + bc*aty + btx;
    out[5] = bb*atx + bd*aty + bty;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var aa = a[0],
        ab = a[1],
        ac = a[2],
        ad = a[3],
        atx = a[4],
        aty = a[5],
        st = Math.sin(rad),
        ct = Math.cos(rad);

    out[0] = aa*ct + ab*st;
    out[1] = -aa*st + ab*ct;
    out[2] = ac*ct + ad*st;
    out[3] = -ac*st + ct*ad;
    out[4] = ct*atx + st*aty;
    out[5] = ct*aty - st*atx;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var vx = v[0], vy = v[1];
    out[0] = a[0] * vx;
    out[1] = a[1] * vy;
    out[2] = a[2] * vx;
    out[3] = a[3] * vy;
    out[4] = a[4] * vx;
    out[5] = a[5] * vy;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4] + v[0];
    out[5] = a[5] + v[1];
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33;

        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];
        a30 = a[12]; a31 = a[13]; a32 = a[14]; a33 = a[15];
    
    out[0] = a00 + a03*x;
    out[1] = a01 + a03*y;
    out[2] = a02 + a03*z;
    out[3] = a03;

    out[4] = a10 + a13*x;
    out[5] = a11 + a13*y;
    out[6] = a12 + a13*z;
    out[7] = a13;

    out[8] = a20 + a23*x;
    out[9] = a21 + a23*y;
    out[10] = a22 + a23*z;
    out[11] = a23;
    out[12] = a30 + a33*x;
    out[13] = a31 + a33*y;
    out[14] = a32 + a33*z;
    out[15] = a33;

    return out;
};
/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[7]-m[5])*fRoot;
        out[1] = (m[2]-m[6])*fRoot;
        out[2] = (m[3]-m[1])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);

},{}],37:[function(require,module,exports){
/*
 * Copyright 2012 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

if (typeof window != 'undefined')
if (typeof WeakMap === 'undefined') {
  (function() {
    var defineProperty = Object.defineProperty;
    var counter = Date.now() % 1e9;

    var WeakMap = function() {
      this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
    };

    WeakMap.prototype = {
      set: function(key, value) {
        var entry = key[this.name];
        if (entry && entry[0] === key)
          entry[1] = value;
        else
          defineProperty(key, this.name, {value: [key, value], writable: true});
      },
      get: function(key) {
        var entry;
        return (entry = key[this.name]) && entry[0] === key ?
            entry[1] : undefined;
      },
      'delete': function(key) {
        this.set(key, undefined);
      }
    };

    window.WeakMap = WeakMap;
  })();
}

},{}]},{},[1]);
