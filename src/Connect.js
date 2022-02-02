
function Connect(props){
    return (
        <div id="connect-menu">
            <button id="connect-btn" title="Connect Wallet" onClick={props.onClick} class={props.visible ? 'visible' : 'hidden'}>Connect</button>
        </div>
    );
}

export default Connect;