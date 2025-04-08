import Item from './Item'

const List = ({deleteHandler, items}) => {


    if(!items.length) return <h2>В списке нет элементов</h2>

    return <ul>
        {items.map(item => <Item key={item.id} id={item.id} title={item.title} deleteHandler={deleteHandler} />)}
    </ul>
}
export default List