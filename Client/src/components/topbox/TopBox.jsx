import "./topBox.scss";
import {topDealUsers} from "../../data"

function TopBox() {
  return (
    <div className='topBox'>
        <h1>Top Deals</h1>
        <div className="list">
            {topDealUsers.map((user) => (
                <div className="listItem" key={user.id}>
                    <div className="user">
                        <img src={user.img} />
                        <div className="usertexts">
                            <span className="username">{user.username}</span>
                            <div className="email">{user.email}</div>
                        </div>
                    </div>
                    <span className="amount">₹{user.amount}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TopBox