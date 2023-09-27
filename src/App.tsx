import React, { useState } from 'react';
import './App.css';
import Input from './Input';
import Result from './Result';

const App: React.FC = () => {
    const [expression, setExpression] = useState('');

    const handleInputChange = (value: string) => {
        setExpression(value);
    };

    const [lineNum, setLineNum] = useState(1);

    const handleChangeLineNum = (newLineNum: number) => {
        setLineNum(newLineNum);
    };

    return (
        <div className="app">
            <div className="textarea-container">
                <Input onChange={handleInputChange} onChangeLineNum={handleChangeLineNum}/>
            </div>
            <div className="result-container">
                <Result expression={expression} currentLine={lineNum}/>
            </div>
        </div>
    );
};

export default App;
