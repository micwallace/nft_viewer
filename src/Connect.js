
function Connect(props){
    return (
        <div id="connect-menu">
            <button id="connect-btn" title="Connect Wallet" onClick={props.onClick} className={props.visible ? 'visible' : 'hidden'}>Connect</button>
            <span id="connect-dtl" className={props.isConnected ? 'visible' : 'hidden'}>Connected to account:<br/>{props.account}</span>
        </div>
    );
}

export default Connect;