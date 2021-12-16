import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import { connect } from "react-redux";
import Address from "./Address/Address";
import { addAddress, placeOrder, storeData } from "../../redux/Ordering/ordering-actions";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
 
const Checkout = ({ addresses, price, currentAddress, addAddress, placeOrder, storeData }) => {
 
    const [addressesInfo, setAddressesInfo] = useState(addresses);
    const [addressError, setAddressError] = useState("white");
    const [addAddressError, setAddAddressError] = useState("white");
    const [addressTitle, setTitle] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
 
    const addAddressClick = () => {
        if (addressTitle !== "" && addressDetail !== "") {
            const address = { category: addressTitle, address: addressDetail };
            addAddress(address);
            setAddressDetail("");
            setAddAddressError("white")
            console.log("Address added");
        } else {
            setAddAddressError("red");
            console.log("Address not added", addressTitle, addressDetail);
        }
    }
 
    const onChangeAddressTitle = e => {
        setTitle(e.target.value);
    }
 
    const onChangeAddressDetail = e => {
        setAddressDetail(e.target.value);
    }
    const history = useHistory();
 
    useEffect(() => {
        setAddressesInfo(addresses);
        console.log("addressesInfo");
    }, [addresses]);
 
    useEffect(() => {
        if (currentAddress) {
            setAddressError("white");
        }
    }, [currentAddress]);
 
    const confirmOrderClick = () => {
        if (currentAddress) {
            const totPrice = price + 50 + price * 0.05;
            placeOrder(totPrice);
            storeData();
            history.push("/");
            alert("Order placed");
        } else {
            setAddressError("red");
        }
    }
 
    return (
        <div className={styles.checkout}>
            <div className={styles.checkout__address__container}>
                <div className={styles.address__titlehead}>
                    SELECT DELIVERY ADDRESS
                    <hr/>
                </div>
                {
                    addressesInfo.map((address) => (
                        <Address key={Math.random()} address={address} />
                    ))
                }
                <div className={styles.addAddress}>
                    <div className={styles.address__title}>
                        <Form.Control as="select" onClick={onChangeAddressTitle}>
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                    </div>
 
                    <div className={styles.address__detail}>
                        <Form.Group controlId="address">
                            <Form.Control
                                type="text"
                                name="addressDetail"
                                placeholder="Enter address"
                                value={addressDetail}
                                onChange={onChangeAddressDetail}
                            />
                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className={styles.addAddress__btn}>
                        <Button onClick={addAddressClick}>
                            ADD ADDRESS
                        </Button>
                    </div>
                    <div className={styles.error} style={{ color: addAddressError }}>
                        Select delivery address
                    </div>
                </div>
            </div>
            <div className={styles.checkout__price__container}>
                <div className={styles.checkout__price__title}>BILL DETAILS</div>
                <hr />
                <div className={styles.checkout__price__details}>
                    <div className={styles.checkout__price__detail}>
                        <span>Items Total</span>
                        <span>₹ {price}</span>
                    </div>
                    <div className={styles.checkout__price__detail}>
                        <span>Delivery fee</span>
                        <span>₹ 50</span>
                    </div>
                    <div className={styles.checkout__price__detail}>
                        <span>Taxes</span>
                        <span>₹ {(price * 0.05).toFixed(1)}</span>
                    </div>
                    <hr />
                    <div className={styles.checkout__price__total}>
                        <span>TO PAY</span>
                        <span>₹ {price + 50 + price * 0.05}</span>
                    </div>
                    <hr />
                </div>
                <div className={styles.button_div}>
                    <button className="form-control btn btn-primary" onClick={confirmOrderClick}>
                        CONFIRM ORDER
                    </button>
                </div>
                <div className={styles.error} style={{ color: addressError }}>
                    Select delivery address
                </div>
            </div>
        </div>
    );
};
 
const mapStateToProps = (state) => {
    console.log("Checkout -> state.orders.addresses: ", state.orders.addresses);
    return {
        addresses: state.orders.addresses,
        price: state.orders.price,
        currentAddress: state.orders.currentAddress,
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        addAddress: (address) => dispatch(addAddress(address)),
        placeOrder: (price) => dispatch(placeOrder(price)),
        storeData: () => dispatch(storeData()),
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);