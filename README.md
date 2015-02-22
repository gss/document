GSS engine [![Build Status](https://travis-ci.org/gss/engine.png?branch=master)](https://travis-ci.org/gss/engine)
==========

[![Cross-browser testing status](https://saucelabs.com/browser-matrix/gss-engine.svg)](https://saucelabs.com/u/gss-engine)

GSS is an implementation of Badros & Borning's [Constraint Cascading Style Sheets](http://www.cs.washington.edu/research/constraints/web/ccss-uwtr.pdf).

It consists of three projects:

* [Engine](https://github.com/gss/engine#readme) - orchestrates multiple Cassowary.js solvers. *Usable without browser*.
* **Document** - Integrates Engine with DOM. *Use this on web pages*.
* [Parser](https://github.com/gss/parser#readme) - Converts GSS stylesheets to expression tree. *Can be preprocessed*



GSS supports the following syntaxes for defining layout rules:

* [CCSS](https://github.com/gss/ccss-compiler#readme) - direct constraints related to position and size of DOM elements
* [VFL](https://github.com/gss/vfl-compiler#readme) - horizontal and vertical spacing constraints based on [Apple's Visual Format Language](https://developer.apple.com/library/ios/documentation/userexperience/conceptual/AutolayoutPG/VisualFormatLanguage/VisualFormatLanguage.html)

Please refer to <http://gridstylesheets.org/> for documentation and usage instructions.
