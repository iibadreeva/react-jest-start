import { render, screen } from '@testing-library/react';
import { Title } from './Title.jsx';

const text = 'Hello World!';

describe('Title component', () => {
  it('should render title with children', () => {
    render(<Title>{text}</Title>);

    // screen.debug();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should render title the correct tag', () => {
    const { container } = render(<Title level={2}>{text}</Title>);

    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('should render title with the correct className', () => {
    render(<Title className="test1">{text}</Title>);

    expect(screen.getByText(text)).toHaveClass('test1');
    expect(screen.getByText(text)).toHaveClass('title');
  });
});
