import React from 'react';
import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import { stub, spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import InfiniteScroll from '../src/InfiniteScroll';

configure({ adapter: new Adapter() });

describe('InfiniteScroll component', () => {
  it('should render', () => {
    const loadMore = stub();
    const children = (
      <div>
        <div className="child-class">1</div>
        <div className="child-class">2</div>
        <div className="child-class">3</div>
      </div>
    );

    const node = (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={false}
        >
          <div className="om-product__list">
            {children}
          </div>
        </InfiniteScroll>
      </div>
    );
    const wrapper = mount(node);
    expect(wrapper.find('.child-class').length).to.equal(3);
  });

  it('should render componentDidMount', () => {
    spy(InfiniteScroll.prototype, 'componentDidMount');
    const loadMore = stub();
    const children = (
      <div>
        <div className="child-class">1</div>
        <div className="child-class">2</div>
        <div className="child-class">3</div>
      </div>
    );
    const node = (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={false}
        >
          <div className="om-product__list">
            {children}
          </div>
        </InfiniteScroll>
      </div>
    );
    mount(node);
    expect(InfiniteScroll.prototype.componentDidMount.callCount).to.equal(1);
    InfiniteScroll.prototype.componentDidMount.restore();
  });

  it('should attach scroll listeners', () => {
    spy(InfiniteScroll.prototype, 'attachScrollListener');
    spy(InfiniteScroll.prototype, 'scrollListener');
    const loadMore = stub();
    const children = (
      <div>
        <div className="child-class">1</div>
        <div className="child-class">2</div>
        <div className="child-class">3</div>
      </div>
    );
    const node = (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore
          useWindow={false}
          threshold={0}
        >
          <div className="om-product__list">
            {children}
          </div>
        </InfiniteScroll>
      </div>
    );
    mount(node);
    expect(InfiniteScroll.prototype.attachScrollListener.callCount).to.equal(1);
    expect(InfiniteScroll.prototype.scrollListener.callCount).to.equal(1);
    InfiniteScroll.prototype.attachScrollListener.restore();
    InfiniteScroll.prototype.scrollListener.restore();
  });
});
