import React, { useState } from 'react';
import axios from 'axios';

const Calc = () => {
    const [first, setFirst] = useState(0);
    const [second, setSecond] = useState(0);
    const [operation, setOperation] = useState('+');
    const [result, setResult] = useState(0);

    const setValue1 = (num1) => {
        setFirst(num1);
    };

    const setValue2 = (num2) => {
        setSecond(num2);
    };

    const selectOperation = (e) => {
        setOperation(e.target.value);
    };

    const calculateResult = async () => {
        try {
            let operationKey = null;
            if (operation === '+') {
                operationKey = 'add';
            } else if (operation === '-') {
                operationKey = 'sub';
            } else if (operation === '*') {
                operationKey = 'mul';
            } else {
                operationKey = 'div';
            }
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/${operationKey}?num1=${first}&num2=${second}`);
            console.log(response.data.result);
            setResult(response.data.result);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResult(0); // Reset result in case of an error
        }
    };

    return (
        <>
            {/* Input fields to set values */}
            <input type="number" onChange={(e) => setValue1(e.target.value)} value={first} />
            <select onChange={selectOperation} value={operation}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input type="number" onChange={(e) => setValue2(e.target.value)} value={second} />

            {/* Button to trigger the API call */}
            <button onClick={calculateResult}>Calculate</button>

            {/* Display the values and result */}
            <div>
                Result: {result}
                "test"
            </div>
        </>
    );
};

export default Calc;
