import { noSSR, NoSSR } from './index';
import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';

class Com1 extends React.Component {
  render() {
    return <div></div>;
  }
}

const Com2: React.FC = () => {
  return <div></div>;
};

const WrappedCom1 = noSSR(Com1);

const WrappedCom2 = noSSR(Com2);

const WrappedCom3 = noSSR(() => <div></div>);

interface Props {
  a: string;
  b: boolean;
  c: number;
}

const WrappedCom4 = noSSR<Props>(({ a, b, c }) => {
  return (
    <div>
      {a},{b}, {c}
    </div>
  );
});

const Page = () => {
  return (
    <div>
      <NoSSR>
        <Com1 />>
        <Com2 />>
      </NoSSR>
      <WrappedCom1 />
      <WrappedCom2 />
      <WrappedCom3 />
      <WrappedCom4 a={''} b={true} c={1} />
    </div>
  );
};

let root: ReactTestRenderer | null = null;

it('can render', () => {
  act(() => {
    root = create(<Page />);
  });

  expect(((root as unknown) as ReactTestRenderer).toJSON()).toMatchSnapshot();
});
