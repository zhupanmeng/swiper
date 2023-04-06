import React, { useEffect, useState } from "react";
import "./index.css";

export default function App(props) {
    let length = props.length || 9;
    let renderLength = props.renderLength || 7;
    let [renderlist, setList] = useState<any[]>([]);

    function randomColor() {
        let a = Math.ceil(Math.random() * 255);
        let b = Math.ceil(Math.random() * 255);
        let c = Math.ceil(Math.random() * 255);
        return `rgb(${a},${b},${c})`;
    }

    useEffect(() => {
        init();
    }, []);

    let init = () => {
        let pre: number;
        let next: number;
        let list: any[] = [];
        for (let i = 0; i < length; i++) {
            let item = {
                bgcolor: randomColor(),
                index: `--${i + 1}--`,
            };
            list.push(item);
        }
        for (let i = 0; i < length; i++) {
            pre = i ? i - 1 : length - 1;
            next = i === length - 1 ? 0 : i + 1;
            list[i].pre = list[pre];
            list[i].next = list[next];
        }
        setList([list[length - 1], ...list.slice(0, renderLength - 1)]);
    };

    let move = (left) => {
        setList((prevList) => {
            let newlist: any[] = [];
            for (let i = 0; i < renderLength; i++) {
                newlist[i] = prevList[i][left ? "next" : "pre"];
            }
            return newlist;
        });
    };

    let clickMove = (index) => {
        let moveindex = index - 3
        if (moveindex > 0) {
            for (let i = 0; i < moveindex; i++) {
                move(true)
            }
        } else if (moveindex < 0) {
            for (let i = 0; i < -moveindex; i++) {
                move(false)
            }
        }
    }
    return (
        <div style={{ position: "relative" }}>
            <div className="left" onClick={() => move(false)}>
                {"<"}
            </div>
            <div className="right" onClick={() => move(true)}>
                {">"}
            </div>
            <div className="swiper">
                <ul className="container">
                    {renderlist.map((item, index) => (
                        <li
                            style={{ backgroundColor: item.bgcolor }}
                            className={index === 3 ? "active" : ""}
                            onClick={() => clickMove(index)}
                            key={index}
                        >
                            {item.index}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
