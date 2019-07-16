import './index.css';
import React from 'react';
export default class Square extends React.Component {

    constructor() {
        super();
        this.state = {
            curState: 'empty',
            text: '?',
            locked: false,
            revealed: false
        }

        this.verifyNeighborhood = () => {
            let bombCount = 0;
            for (let i = this.props.i - 1; i <= this.props.i + 1; ++i) {
                for (let j = this.props.j - 1; j <= this.props.j + 1; ++j) {
                    if (j < this.props.config.width && j >= 0 && i < this.props.config.height && i >= 0) {
                        if (this.props.config.neighborhood[this.props.config.width * i + j].props.hasBomb) {
                            bombCount++;
                        }
                    }
                }
            }
            return bombCount;
        }

        this.hasBomb = () => {
            return this.props.hasBomb || false;
        }

        this.reveal = () => {

            if (this.state.locked) {
                return;
            }


            if (this.hasBomb()) {
                this.setState({ curState: 'exploded', text: 'X' });
            } else {
                let bombCount = this.verifyNeighborhood();
                this.setState({
                    curState: (() => {
                        if (bombCount < 3) {
                            return 'green'
                        } else if (bombCount < 5) {
                            return 'blue';
                        } else if (bombCount < 7) {
                            return 'orange';
                        } else {
                            return 'red'
                        }
                    })()
                    , text: bombCount
                });
            }

            this.setState({ revealed: true });
        }

        this.lock = (e) => {
            console.log(this.state);
            if (!this.state.revealed) {
                if (!this.state.locked) {
                    this.setState({ curState: 'flagged', text: 'F' })
                } else {
                    this.setState({ curState: 'empty', text: '?' })
                }
                this.setState({ locked: !this.state.locked });
            }
            e.preventDefault();
        }
    }

    render() {
        return <button onContextMenu={this.lock} onClick={this.reveal} className={"square field " + this.state.curState}> {this.state.text} </button>
    }
}