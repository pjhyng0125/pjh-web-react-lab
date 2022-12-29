import React, { Component } from 'react';

// state 값에 따른 input value 변경 예제
class PhoneForm extends Component {
    // input = null;
    input = React.createRef();

    state = {
        name: '',
        phone: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // 자식->부모 데이터 전달
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreate({
            name: this.state.name,
            phone: this.state.phone,
        })
        // this.props.onCreate(this.state);

        // input 값 초기화
        this.setState({
            name: '',
            phone: '',
        });

        // this.input.focus();
        this.input.current.focus(); // React.createRef 의 경우, current로 접근 가능
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input
                        name="name"
                        placeholder='이름'
                        onChange={this.handleChange}
                        value={this.state.name}
                        // ref={ref => this.input = ref}
                        ref={this.input}
                    />
                    <br />
                    <input
                        name="phone"
                        placeholder='전화번호'
                        onChange={this.handleChange}
                        value={this.state.phone}
                    />
                    <br />
                    <button type="submit">등록</button>
                </div>
            </form>
        );
    }
}

export default PhoneForm;