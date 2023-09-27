import React from 'react';
import { all, BigNumber, ConfigOptions, create } from 'mathjs';
import * as chrono from 'chrono-node'

const config: ConfigOptions = {
    epsilon: 1e-12,
    matrix: 'Matrix',
    number: 'BigNumber',
    precision: 64,
    predictable: false,
    randomSeed: null,
}
const math = create(all, config)

type Props = {
    expression: string;
    currentLine: number;
};

const Result: React.FC<Props> = ({expression, currentLine}) => {

    type Variables = { [name: string]: number };

    const evalWithVariables = (expression: string, variables: Variables) => {
        let result = expression;
        for (const [name, value] of Object.entries(variables)) {
            result = result.replaceAll(name, value.toString());
        }
        let evaluate = math.evaluate(result);
        console.log(evaluate + "," + evaluate.type)

        return math.isInteger(evaluate) ? evaluate.toNumber() : evaluate.toFixed(1);
    };

    const lines = expression.split("\n");
    const variables: Variables = {};

    const list: BigNumber[] = [];

    const results = lines.map((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine === '') {
            return null;
        }

        try {
            return <div>{chrono.zh.hans.parseDate(trimmedLine).toLocaleString()} </div>
        } catch (error) {
        }

        if (trimmedLine === 'sum' || trimmedLine === '求和') {
            // const sum = list.reduce((acc: number, curr: number) => acc + curr, 0); // 使用 reduce 函数求和
            const sum = math.sum(list);

            return (<div key={index} style={{textDecoration: index === currentLine ? 'underline' : 'none'}}>
                求和 = {sum.toString()}
            </div>)
        }

        if (trimmedLine === 'avg' || trimmedLine === '平均') {
            const average = math.mean(list);

            return (<div key={index} style={{textDecoration: index === currentLine ? 'underline' : 'none'}}>
                平均 = {average.toString()}
            </div>)
        }

        const [left, right] = trimmedLine.split("=");
        if (right === undefined) {
            try {
                const value = evalWithVariables(trimmedLine, variables);
                list.push(value)
                return (
                    <div key={index} style={{textDecoration: index === currentLine ? 'underline' : 'none'}}>
                        {trimmedLine} = {typeof value === 'object' ? value.toString() : value}
                    </div>
                );
            } catch (error) {
                return (
                    <div key={index}>
                        {trimmedLine} = 计算异常
                    </div>
                );
            }
        } else {
            try {
                const value = evalWithVariables(right, variables);
                variables[left] = value;
                list.push(value)
                return (
                    <div key={index} style={{textDecoration: index === currentLine ? 'underline' : 'none'}}>
                        {left} = {typeof value === 'object' ? value.toString() : value}
                    </div>
                );
            } catch (error) {
                return (
                    <div key={index}>
                        {trimmedLine} = 计算异常
                    </div>
                );
            }
        }
    });

    return <div className="result">{results}</div>;
};

export default Result;
