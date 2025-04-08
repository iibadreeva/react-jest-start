import {render, screen, fireEvent} from '@testing-library/react';

import Item from './Item';

describe('Item of Todo', () => {
    it('should render correctly', () => {
        const title = '123';
        render(<Item  title={title}  />);
        expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('should coled of remove item', () => {
        const id = '123';
        const title = '123';
        const deleteHandler = jest.fn();
        render(<Item id={id} title={title} deleteHandler={deleteHandler} />);
        expect(screen.getByText(title)).toBeInTheDocument();

        const button = screen.getByTestId('delete-button');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(deleteHandler).toHaveBeenLastCalledWith('123')
    })
})