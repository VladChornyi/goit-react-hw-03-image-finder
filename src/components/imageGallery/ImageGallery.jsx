import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { getImagesRequest, getMoreImagesRequest } from '../../redux/imagesSlice';
import { getImages } from '../../redux/selectors';
import Modal from '../modal/Modal';

class ImageGallery extends Component {
  state = {
    page: 1,
    perPage: 12,
    largeImgURL: '',
    isOpenModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ page: 1 });
      this.props.getImagesRequest({ query: this.props.query, page: 1 });
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.props.getMoreImagesRequest({ query: this.props.query, page: this.state.page });
    }
  }
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
    const { loading, images, isOpenModal, largeImgURL, totalImages } = this.props.images;
    return (
      <>
        {loading && (
          <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} timeout={3000} />
        )}
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
          <button
            className="Button"
            type="button"
            onClick={this.handleLoadMore}
            disabled={totalImages === images.length}
          >
            Load more
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({ images: getImages(state) });
export default connect(mapStateToProps, { getImagesRequest, getMoreImagesRequest })(ImageGallery);
