import renderHTML from 'react-render-html';
import Link from 'next/link';
import { useReducer, useEffect } from 'react';
import { listSearch } from '../../actions/blog';

const initialState = {
  search: undefined,
  resultes: [],
  searched: false,
  message: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const Search = () => {
  const [searchState, dispatch] = useReducer(reducer, initialState);
  const { search, resultes, searched, message } = searchState;

  const searchSubmit = e => {
    e.preventDefault();
  };

  const handleChange = e => {};

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Search blogs"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-block btn-outline-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="pt-3 pb-5">{searchForm()}</div>
    </div>
  );
};

export default Search;
