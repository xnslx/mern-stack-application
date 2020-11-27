import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './FilterSort.module.css';

const FilterSort = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
            <FontAwesomeIcon icon="filter" onClick={handleShow}/>
            <Modal show={show} onHide={handleClose} className={classes.Modal}>
                <Modal.Header className={classes.Header}>
                    <Modal.Title className={classes.Title}>Filter & Sort</Modal.Title>
                    <Button variant="secondary" onClick={handleClose} className={classes.Button}>X</Button>
                </Modal.Header>
                <Modal.Body className={classes.Body}>
                    <div className={classes.container}>
                        <ul className={classes.List}>
                            <strong><span>Gender:</span></strong>
                            <li className={classes.ListItem}>
                                <input type="checkbox" />
                                <label htmlFor="" className={classes.Label}>Boy</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>Girl</label>
                            </li>
                        </ul>
                        <ul className={classes.List}>
                            <strong><span>Size:</span></strong>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>3 month</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>3-6 month</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>6-9 month</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>9 month</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>12month</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>18 month</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>2T</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>3T</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>4T</label>
                            </li>
                            <li className={classes.ListItem}>
                                <input type="checkbox"/>
                                <label htmlFor="" className={classes.Label}>5T</label>
                            </li>
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default FilterSort;

