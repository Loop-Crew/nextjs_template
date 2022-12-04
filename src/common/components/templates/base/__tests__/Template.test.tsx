import renderer from 'react-test-renderer';
import BaseTemplate from '../BaseTemplate';

describe('Home', () => {
  it('renders a heading', () => {
    const tree = renderer
      .create(<BaseTemplate sampleTextProp="test" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
