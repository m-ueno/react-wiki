import 'enzyme/withDom';

import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Navigation from '../src/Navigation.jsx';
import { Button } from 'react-bootstrap';
import sinon from 'sinon';

describe('<Navigation />', function () {
  it('allows us to set props', () => {
    const wrapper = mount(<Navigation bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });

  it('should be loaded', function () {
    const wrapper = shallow(<Navigation />);
    const instance = wrapper.instance(); // react component
    expect(instance).to.not.be.null;
  });

  it('should find buttons', function () {
    const wrapper = mount(<Navigation />);
    // console.log(wrapper.html());
    // const expectedNode = (<button type="button" class="btn btn-success">New Entry</button>);
    // expect(wrapper).contains(<button />).to.equal(true);
    // expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('button')).to.have.length(3);
    expect(wrapper.render().find('button')).to.have.length(3);  // no need
  });
/*
  it('what happen if the button clicked', function () {
    const dummyRotuer = { push: sinon.spy() };
    const wrapper = mount(<Navigation />);

    console.log('props before: ', wrapper.props());
    console.log('context before: ', wrapper.context());
    wrapper.setContext({ router: dummyRotuer });
    console.log('props after: ', wrapper.props());
    console.log('props after: ', wrapper.context());

    console.log(wrapper.find('button.btn-success').simulate('click'));
  });

  it('calls componentDidMount', () => {
    console.log(Navigation); // => withRouter(MyNavbar)
    sinon.spy(Navigation.prototype, 'componentDidMount');
    expect(Navigation.prototype.componentDidMount).to.have.property('callCount', 1);
    Navigation.prototype.componentDidMount.restore();
  });
  // TODO
  // simulate button clicked
*/
});
