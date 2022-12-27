
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  // 화면 렌더링 시, 참조하는 값 -> setState X
  id = 0;

  state = {
    info: [],
  }

  handleCreate = (data) => {
    const { info } = this.state;
    console.log(data);
    // react 불변성 유지 필요 -> setState
    // Array.concat 새로운 배열 생명 및 주입
    this.setState({
      info: info.concat({
        ... data, // Object.assign 활용 가능
        id: this.id++
      })
    })
  }

  handleRemove = (id) => {
    console.log('[handleRemove] id :', id)
    const { info } = this.state;
    this.setState({
      info: info.filter(item => item.id !== id)
    });
  }

  handleUpdate = (id, data) => {
    const { info } = this.state;
    this.setState({
      info: info.map(
        item => {
          if (item.id === id) {
            return {
              id,
              ...data
            };
          }
          return item;
        }
      )
    });
  }

  render() {
    return (
      <div className="App">
        <PhoneForm onCreate={this.handleCreate} />
        <PhoneInfoList
          data={this.state.info}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
