import {useState} from "react";

const Form = ({  createHandler}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        createHandler(value)
        setValue('');
    }

    return <form
            data-testid="todo-form"
            onSubmit={(event) => handleSubmit(event)}
    >
        <input
            data-testid="todo-input"
            type="text"
            onChange={(event) => setValue(event.target.value)}
            value={value}
        />
        <input data-testid="submit-button" type="submit" value="Submit" />
    </form>
}

export default Form