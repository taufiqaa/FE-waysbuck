import logo from "../../assets/logo.svg";
import Header from "../molecules/header";
import { useEffect, useContext, useState } from "react";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import dateFormat from 'dateformat'

function Profile() {
  const [state] = useContext(UserContext)
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState([])
  

  useEffect(()=>{
  const getTransaction = async()=>{
    try{
      const response = await API.get("/transactionId")
      setTransaction(response.data.data)
    }catch(error){
      console.error(error)
    }
  };  
     getTransaction()
  }, [setTransaction])
  

  return (
    <>
    <Header />
    <div className="transaction-section after-nav">
      <div className="profile-container">
        <div className="profile-title">
          <h6>My Profile</h6>
        </div>
        <div className="detail-profile">
            <div className="picture-profile">
            <img
              className="picture-user"
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
              />
          </div>
          <div className="identity-profile">
            <div className="identity-name">
              <h6>Full Name</h6>
            </div>
            <div className="userName">
              <h6>{ state.user.name }</h6>
            </div>
            <div className="identity-email">
              <h6>Email</h6>
            </div>
            <div className="userEmail">
              <h6>{ state.user.email }</h6>
            </div>
          </div>
          <button className="bg-red br-none br5 txt-white" style={{width: "135px"}}
          onClick={ () => navigate('/update-profile')}
          >
            change profile
          </button>
        </div>
      </div>
      <div className="transaction-container">
        <div className="transaction-title">
          <h6>My Transaction</h6>
        </div>
        {transaction.map((data,index)=>(
        <div className="detail-transaction">
            {data.cart.map((item, index)=>(
          <div className="box-order">
          <div className="left-container">
            <div className="main-order">
              <div className="picture-menu">
                <img
                  className="picture-menuPurchased"
                  src={"http://localhost:2500/uploads/"+item?.product?.image}
                  alt=""
                />
              </div>
              <div className="data-order">
                <div className="data-flavour">
                  <h6>{item?.product?.title}</h6>
                </div>
                <div className="orderTime">
                  <h6>{dateFormat(item?.updated_at, 'dddd, ')}{dateFormat(item?.updated_at, 'd mmmm yyyy')}</h6>
                </div>
                <div className="data-price">
                  <h6>{item?.product?.price}</h6>
                </div>
                <div className="data-topping">
                  <h6>Topping :
                          {item?.topping.map((topping, idx) => (
                            <div key={idx} style={{display:"inline"}}>{topping?.title} ,</div>
                          ))}</h6>
                </div>
                <div className="subTotal">
              <h6>Sub Total : {item?.sub_amount}</h6>
              </div>
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="logo-transaction">
              <img className="logo-detail" src={logo} alt="logo" />
            </div>
            <div className="qr-transaction">
              <img
                className="qr-code"
                src="https://i.stack.imgur.com/XHWnX.png"
                alt=""
                />
            </div>
            <div className="status-order">
              <h6>{data.status}</h6>
            </div>
          </div>
        </div>
        ))}
        </div>
        ))}
      </div>
      
    </div>
    </>
  );
}

export default Profile;
