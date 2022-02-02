

function Menu(props){
    return (
        <div id="menu">
            {props.items.map(item => <button id={item} key={item} onClick={() => props.onClick(item) }>{item.toUpperCase()}</button>)}
        </div>
    );
}

export default Menu;