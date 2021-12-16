import { Component } from "react";
import { ApiService } from "../../shared/api/api";
import style from "./ImageFinder.module.css";
import Loader from "react-loader-spinner";
import SearchForm from "./SearchForm";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import Button from "./Button";

class ImageFinder extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    query: "",
    id: "",
    modalOpen: false,
    largeImageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, items } = this.state;
    if (prevState.query !== query && query) {
      this.setState({ loading: true, items: [] });
      this.fetchQuery();
  }
  if (items.length > 12) {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }}

  async fetchQuery() {
    const { page, query } = this.state;
    try {
      const { data } = await ApiService.searchQuery(page, query);
      this.setState(({ items, page }) => {
        return {
          items: [...items, ...data.hits],
          loading: false,
          error: null,
          page: page + 1,
        };
      });
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
    }
  }

  changeQuery = ({ query }) => {
      this.setState({ query, page: 1, });
  };

  showModal = (id) => {
    this.setState((prevState) => {
      const { items } = prevState;
      const { largeImageURL } = items.find((item) => item.id === id);
      return {
        modalOpen: true,
        largeImageURL,
      };
    });
  };

  closeModal = (e) => {
    this.setState({ modalOpen: false });
  };
  
  LoadMore = (e) => {
    this.fetchQuery();
  }

  render() {
    const { items, query, error, loading, modalOpen, largeImageURL } = this.state;
    const { changeQuery, showModal, closeModal, LoadMore } = this;
    const showBtn = items.length >= 12 && !loading
    return (
      <div>
        {modalOpen && (
          <Modal closeModal={closeModal}>
            <img className={style['img-modal']} src={largeImageURL} alt={query} />
          </Modal>
        )}
        <SearchForm onSubmit={changeQuery} />
        {!error && <ImageGallery onClick={showModal} items={items} />}
        {showBtn && <div className={style.center}><Button onLoadMore={LoadMore} /></div>}
        {loading && (
          <div className={style.loaderCentre}>
            <Loader type="Oval" color="#a200ff" height={150} width={150} />{" "}
          </div>
        )}
      </div>
    );
  }
}

export default ImageFinder;
