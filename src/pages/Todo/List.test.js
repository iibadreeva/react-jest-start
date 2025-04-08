import {render, screen, fireEvent} from '@testing-library/react';
import List from "./List";

describe('List of Todo', () => {
    it('should render items is empty', () => {
        const lists = []
        const deleteHandler = jest.fn();
        render(<List items={lists} deleteHandler={deleteHandler} />);

        // const result = screen.getByText(/в списке нет элементов/i)
        // expect(result).toBeInTheDocument();
        expect(screen.getByText('В списке нет элементов')).toBeInTheDocument();
    });

    it('should render items is 2 elements', () => {
        const list = [
            {
                id: '123',
                title: '123'
            },
            {
                id: '456',
                title: '456'
            }]
        const deleteHandler = jest.fn();
        render(<List items={list} deleteHandler={deleteHandler}  />);

        for(let item of list){
            expect(screen.getByText(item.title)).toBeInTheDocument();
        }
        for(let button of screen.getAllByTestId('delete-button')){
            fireEvent.click(button);
        }
        expect(deleteHandler).toHaveBeenCalledTimes(list.length);
    });
})