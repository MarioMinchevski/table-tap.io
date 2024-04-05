export function User() {
    return (
        <div className="user">
            <div className="user-info">
                <span className="logged-in-as">Welcome,  <span className="username">Lorem Waiter</span> our Hospitality Hero!</span>

            </div>
            <button className="log-out-btn">
                Log out
            </button>
        </div>
    )
}