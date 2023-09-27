import React, { useState } from 'react';

type Props = {
    onChange: (value: string) => void;
    onChangeLineNum: (newLineNum: number) => void;
};

const Input: React.FC<Props> = ({onChange, onChangeLineNum}) => {
    const [value, setValue] = useState('');

    const handleSelect = (event: React.MouseEvent<HTMLTextAreaElement>) => {
        const cursorPos = event.currentTarget.selectionStart;
        const lines = event.currentTarget.value.substr(0, cursorPos).split('\n');
        const currentLineNum = lines.length - 1;
        onChangeLineNum(currentLineNum);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <div className="input">
            <textarea placeholder={"请输入"} value={value} onChange={handleChange} onSelect={handleSelect}/>
        </div>
    );
};

export default Input;
