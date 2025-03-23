import { render, screen } from '@testing-library/react';
import { Text } from './Text.jsx';

const text = 'Hello World!';

describe('Text component', () => {
  it('should render text of children', () => {
    render(<Text>{text}</Text>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should render class with the className', () => {
    render(<Text className="test-1">{text}</Text>);

    expect(screen.getByText(text)).toHaveClass('test-1');
    expect(screen.getByText(text)).toHaveClass('text');
  });

  it('should render class with the isError', () => {
    render(<Text isError>{text}</Text>);

    expect(screen.getByText(text)).toHaveClass('error');
    expect(screen.getByText(text)).not.toHaveClass('success');
  });

  it('should render class with the isSuccess', () => {
    render(<Text isSuccess>{text}</Text>);

    expect(screen.getByText(text)).not.toHaveClass('error');
    expect(screen.getByText(text)).toHaveClass('success');
  });
});
