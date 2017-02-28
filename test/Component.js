var React = require('react');
var enzyme = require('enzyme');
var chai = require('chai');
var Promise = require('bluebird');

var Component = require('../src/Component');


var shallow = enzyme.shallow;
var assert = chai.assert;


function Page(component) {
  this.component = function() {
    return component;
  };

  this.child = function() {
    return component.find('.test-overlay');
  };
};


function createChild() {
  return React.createElement('div', {
    className: 'test-overlay'
  }, null);
}


function createComponent(props, children) {
  var componentProps = props || {};
  var componentChildren = children || null;

  var component = shallow(
      React.createElement(Component, componentProps, componentChildren));
  var page = new Page(component);

  return {
    page: page,
    component: component
  };
}


describe('<Component />', function() {
  it('Should render', function() {
    var created = createComponent();

    var component = created.component;

    expect(component.get(0)).toMatchSnapshot();
  });


  it('Should handle keys sequently without timeout', function() {
    var child = createChild();
    var created = createComponent({
      keys: ['t', 'e', 's', 't']
    }, child);

    var component = created.component;
    var page = created.page;

    page.component().simulate('keydown', {key: 't'});
    page.component().simulate('keydown', {key: 'e'});
    page.component().simulate('keydown', {key: 's'});
    page.component().simulate('keydown', {key: 't'});

    assert.lengthOf(page.child(), 1, 'Child is rendered');
  });


  it('Should handle keys sequently with timeout', function() {
    var child = createChild();
    var created = createComponent({
      keys: ['t', 'e', 's', 't'],
      timeout: 300
    }, child);

    var component = created.component;
    var page = created.page;

    page.component().simulate('keydown', {key: 't'});
    page.component().simulate('keydown', {key: 'e'});
    page.component().simulate('keydown', {key: 's'});
    page.component().simulate('keydown', {key: 't'});

    assert.lengthOf(page.child(), 1, 'Child is rendered');

    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, 500);
    }).then(function() {
      assert.lengthOf(page.child(), 0, 'Child dissapeared');
    });
  });
});
