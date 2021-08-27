import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { getImagesApi } from '../../utils/serviceAPI';
import Modal from '../modal/Modal';

class ImageGallery extends Component {
  state = {
    page: 1,
    perPage: 12,
    images: [],
    loading: false,
    largeImgURL: '',
    isOpenModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.getImages({ query: this.props.query });
      this.setState({ page: 1, images: [] });
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.getImages({ query: this.props.query, page: this.state.page });
    }
  }
  getImages = ({ page, query }) => {
    this.setState({ loading: true });
    getImagesApi({ query, page })
      .then(pictures =>
        this.setState(prev => ({
          images: [...prev.images, ...pictures],
          length: pictures.totalHits,
        })),
      )
      .finally(() => {
        this.setState({ loading: false });
        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  toggleModal = () => {
    this.setState(prev => ({ isOpenModal: !prev.isOpenModal }));
  };
  setLargeImg = largeImgURL => {
    this.setState({ largeImgURL });
  };
  render() {
    const { loading, images, isOpenModal, largeImgURL } = this.state;
    return (
      <>
        {loading && (
          <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} timeout={3000} />
        )}
        {/* {!length && <h1>Введите корректные данные запроса</h1>} */}
        {images.length > 0 && (
          <ul className="ImageGallery">
            {images.map(image => (
              <li key={image.id} onClick={this.toggleModal} className="ImageGalleryItem">
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  onClick={() => this.setLargeImg(image.largeImageURL)}
                  className="ImageGalleryItem-image"
                />
              </li>
            ))}
          </ul>
        )}

        {isOpenModal && <Modal largeImageURL={largeImgURL} closeModal={this.toggleModal} />}
        {images.length > 1 && (
          <button className="Button" type="button" onClick={this.handleLoadMore}>
            Load more
          </button>
        )}
      </>
    );
  }
}

export default ImageGallery;
