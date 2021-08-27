import React, { Component } from 'react';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    query: '',
  };
  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    if (this.state.query.trim() === '') {
      event.preventDefault();
      toast.error('Введите данные для запроса');
      return;
    }
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
