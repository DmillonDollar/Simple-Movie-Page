import React from 'react'

const Search = ({setSearchTerm, searchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src='search.svg'/>

            <input
            type='text'
            placeholder='Search Any Movie'
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search