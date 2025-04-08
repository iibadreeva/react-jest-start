const Item = ({title, id, deleteHandler}) => {
    return <li>
        {title}
        <button data-testid="delete-button" onClick={() => deleteHandler(id)}>x</button>
    </li>
}
export default Item