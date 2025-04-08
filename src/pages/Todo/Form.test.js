import {render, screen, fireEvent} from '@testing-library/react';
import Form from "./Form";

describe('Form of todo', () => {

    it('should submit correctly', () => {
        const text = '123';
        const handleSubmit = jest.fn()
        render(<Form createHandler={handleSubmit}   />);

        const input = screen.getByRole('textbox');
        fireEvent.input(input, {
            target: {value: text}
        });

        expect(handleSubmit).not.toHaveBeenCalled();
        fireEvent.submit(screen.getByTestId('todo-form'))
        expect(handleSubmit).toHaveBeenCalledWith(text);

        expect(screen.getByRole('textbox')).toHaveValue('')
    })
})