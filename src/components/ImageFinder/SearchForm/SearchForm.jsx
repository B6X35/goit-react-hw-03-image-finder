import { Component } from "react";
import PropTypes from "prop-types";
import style from './SearchForm.module.css'

class SearchForm extends Component {
  state = {
    query: "",
  };

  searchQuery = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submitQuery = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ query: "" });
  };


  render() {
    const { query } = this.state;
    const {submitQuery, searchQuery} = this;
    return (
      <header className={style.searchbar}>
        <form onSubmit={submitQuery} className={style['search-form']}>
          <button type="submit" className={style['search-form-button']}>
            <span className={style['search-form-button-label']}>Search</span>
          </button>

          <input
            className={style['search-form-input']}
            type="text"
            autoComplete="off"
            name="query"
            value={query}
            onChange={searchQuery}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default SearchForm;

SearchForm.propType = {
  onSubmit: PropTypes.func.isRequired
}