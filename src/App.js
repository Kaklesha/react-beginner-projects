import React from 'react';
import {Collection }from './Collections.jsx';
import data from './data.json'
import './index.scss';

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState(data.collections[page-1]);

  React.useEffect(() => {
    if (categoryId == 0){
      setCollections(data.collections[page-1])
    }
    else{
      setCollections(data.collections[page-1].filter(obj => obj.category == categoryId))
    }
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            data.categories.map((obj, i) => <li onClick={() => setCategoryId(i)} className={categoryId == i ? "active" : ''} key={obj.name}>{obj.name}</li>)
          }
        </ul>
        <input 
          value={searchValue} 
          onChange={e => setSearchValue(e.target.value)} 
          className="search-input" 
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())).map((obj, index) => (
          <Collection
            key={index}
            name={obj.name}
            images={obj.photos}
          />
        ))

        }
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page == i + 1 ? "active" : ''}>{i + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;