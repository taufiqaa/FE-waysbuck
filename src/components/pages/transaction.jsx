import React from "react"
import logo from "../../assets/logo.svg";
import Header from "../molecules/header"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext"
import { API } from "../config/api";
import dateFormat from 'dateformat'

export default function Income() {
  const navigate = useNavigate()
  const [state, dispatch] = React.useContext(UserContext)

  // const [id, setId] = React.useState()
  // const [user, setUser] = React.useState()

  const [transaction, setTransaction] = React.useState([])
  const [transactionPopUp, setTransactionPopUp] = React.useState(false);

  const getTransaction = async () => {
    try {
      const res = await API.get(`/transactions`);
      setTransaction(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const getUser = async () => {
  //   try {
  //     const res = await API.get(`/user/${id}`);
  //     setUser(res.data.data.name);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  React.useEffect(() => {
    if (state.isLogin === false || state.user.status === "customer") {
      navigate('/')
    } else {
      getTransaction()
      // getUser()
    }
  },[])
  return (
    <>
    <Header />
    <main className="after-nav pb5">
      <section className="pt4 mx5">
          <h1 className="txt-red mb2-5">Income Transaction</h1>
          <table>
            <thead className="bg-gray">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Product</th>
                <th>Income</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              { transaction.map((data, index)=>(               
              <tr>
                <td>{index+1}</td>
                <td>{data.user.name}</td>
                <td>{data.cart.map((data,index)=>(
                <h6 className="productIncome" key={index}>
                    {data.product.title}, </h6>
                    ))}</td>
                <td>Rp {data.amount}</td>
                <td onClick={()=>setTransactionPopUp(true)}>{data.status}</td>
                <td>
                <h6 className="productIncome" key={index}>
                    {dateFormat(data.updated_at, 'd mmmm yyyy')}</h6>
                    </td>
              </tr>
              ))}
            </tbody>
          </table>
      </section>
    </main>
    { transactionPopUp && 
    <section className="modal fixed z-index-3 w100 h100 flex jc-center ai-center"
    onClick={ () => setTransactionPopUp(false) }
    >
      <div className="detail-transaction">
        <div className="left-container">

          <div className="main-order">
            <div className="picture-menu">
              <img
              className="picture-menuPurchased"
              src="https://www.pngitem.com/pimgs/m/129-1296068_caramel-macchiato-vanilla-bean-macchiato-starbucks-hd-png.png"
              alt=""
              />
            </div>
            <div className="data-order">
              <div className="data-flavour">
                <h6>Ice Coffee Palm Sugar</h6>
              </div>
              <div className="orderTime">
                <h6>Saturday, 3-Juli-2022</h6>
              </div>
              <div className="data-topping">
                <h6>Topping: Berry Boba, Bubble Tea Gelatin</h6>
              </div>
              <div className="data-price">
                <h6>Price : Rp 33.000</h6>
              </div>
            </div>
          </div>

          <div className="main-order">
            <div className="picture-menu">
              <img
              className="picture-menuPurchased"
              src="https://www.pngitem.com/pimgs/m/129-1296068_caramel-macchiato-vanilla-bean-macchiato-starbucks-hd-png.png"
              alt=""
              />
            </div>
            <div className="data-order">
              <div className="data-flavour">
                <h6>Ice Coffee Palm Sugar</h6>
              </div>
              <div className="orderTime">
                <h6>Saturday, 3-Juli-2022</h6>
              </div>
              <div className="data-topping">
                <h6>Topping: Berry Boba, Bubble Tea Gelatin</h6>
              </div>
              <div className="data-price">
                <h6>Price : Rp 33.000</h6>
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
            <h6>On the way</h6>
          </div>
          <div className="subTotal">
            <h6>Sub Total : Rp 69.000</h6>
          </div>
        </div>
      </div>
    </section>
    }
    </>
  )
}