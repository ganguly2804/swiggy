import React, { useState } from "react";
import styles from "./Address.module.css";
import { connect } from "react-redux";
import { setAddress } from "../../../redux/Ordering/ordering-actions";
import { Button } from "react-bootstrap";
 
const Address = ({ address, setAddress }) => {
    const [addressSelectStatus, setAddressSelectStatus] = useState("0 2px 8px rgba(0, 0, 0, 0.26)");
 
    const selectAddress = () => {
        
        setAddressSelectStatus("0 2px 8px rgba(0, 0, 0, 1)");
        setAddress(address);
    }
 
    return (
        <div className={styles.address} style={{ boxShadow: addressSelectStatus }}>
            <div className={styles.address__inner}>
                <div className={styles.location__icon}>
                    <i className="fa fa-map-marker fa-lg" aria-hidden="true"></i>
                </div>
                <div>
                    <div className={styles.address__category}>
                        {address.category}
                    </div>
                    <div className={styles.address__detail}>
                        {address.address}
                    </div>
                </div>
            </div>
            <div className={styles.address__btn}>
                <Button onClick={selectAddress}>
                    SELECT ADDRESS
                </Button>
            </div>
        </div>
    );
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        setAddress: (address) => dispatch(setAddress(address)),
    }
}
 
export default connect(null, mapDispatchToProps)(Address);