import React, { Component } from 'react';

export default class Timer extends Component {
    state = {
        seconds: 10
    }

    componentDidMount() {
        this.myTimer = setInterval(() => {
            const {seconds} = this.state

            if(seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }

            if (seconds === 0) {
                clearInterval(this.myTimer)
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.myTimer)
    }
}


