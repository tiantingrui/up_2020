import React from 'react';
import './App.css';
import ListItem from './components/listItem'

const listData = [
  {
    id: 1,
    name: 'aa',
    price: 2000
  },
  {
    id: 2,
    name: 'bb',
    price: 3000
  }
]

class App extends Comment {
  renderList() {
    if (listData.length === 0) {
      return <div className='text-center'>购物车是空的</div>
    }

    return listData.map((item, idx) => {
      return <ListItem key={idx} data={item} />
    })
  }
  render() {
    return (
      <div className="container">
        {listData.length === 0 && <div className='text-center'>购物车是空的</div>}
       {this.renderList()}
      </div>
    );
  }
}

export default App;
