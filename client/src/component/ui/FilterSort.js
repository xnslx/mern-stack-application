import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './FilterSort.module.css';
import axios from 'axios';
import {gender, size, category} from './objects';
import {useHistory} from 'react-router-dom';

const FilterSort = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const productsGender = gender;
    const productsSize = size;
    const productsCategory = category;

    const [checkedItems, setCheckedItems] = useState({});

    const [filterResult, setFilterResult] = useState('')


    const changeHandler = (e) => {
        setCheckedItems({...checkedItems, [e.target.value]: e.target.checked});
    }

    let queryArray = [];
    let needToBeFilteredQuery = Object.entries(checkedItems).forEach(([key,value]) => {
        if(value === true) {
            queryArray.push(key)
        }
    });

    let params = queryArray.map(item => {
        if(productsGender.find(prod => prod.value === item)){
            return 'gender=' + item
        } else if (productsSize.find(prod => prod.value === item)) {
            return 'size=' + item
        } else {
            return 'category=' + item
        }
    }).join('&')


    let history = useHistory()
    const submitHandler = () => {
        axios.post('/products?' + params)
            .then(result => {
                props.parentCallback(result.data)
                setFilterResult(result.data.length)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <FontAwesomeIcon icon="filter" onClick={handleShow} className={classes.FilterIcon}/>FILTER & SORT
            <Modal show={show} onHide={handleClose} className={classes.Modal}>
                <Modal.Header className={classes.Header}>
                    <Modal.Title className={classes.Title}>Filter & Sort</Modal.Title>
                    <Button variant="secondary" onClick={handleClose} className={classes.Button}>X</Button>
                </Modal.Header>
                <Modal.Body className={classes.Body}>
                    <div className={classes.container}>
                        <ul className={classes.List}>
                        <strong><span>Gender:</span></strong>
                            {productsGender.map(item => (
                                <li key={item.id} className={classes.ListItem}>
                                    <label className={classes.Label}>
                                        <input type="checkbox" value={item.value} onChange={changeHandler} />{item.value}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <ul className={classes.List}>
                        <strong><span>Size:</span></strong>
                            {productsSize.map(item => (
                                <li key={item.id} className={classes.ListItem}>
                                    <label className={classes.Label}>
                                        <input type="checkbox" value={item.value} onChange={changeHandler} />{item.value}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <ul className={classes.List}>
                        <strong><span>Category:</span></strong>
                            {productsCategory.map(item => (
                                <li key={item.id} className={classes.ListItem}>
                                    <label className={classes.Label}>
                                        <input type="checkbox" value={item.value} onChange={changeHandler}/>{item.value}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={classes.ApplyButton} onClick={submitHandler}>
                        APPLY
                        {filterResult}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default FilterSort;

