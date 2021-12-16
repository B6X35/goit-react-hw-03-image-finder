import PropTypes from "prop-types";
import ImageGalleryItem from './ImageGalleryItem'
import style from './ImageGallery.module.css'

const ImageGallery = ({ items, onClick }) => {
  const elements = items.map((item) => (
    <ImageGalleryItem onClick={() => onClick(item.id)} key={item.id} {...item} />
  ));
  return <ul className={style['image-gallery']}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired
  })),
  onClick: PropTypes.func.isRequired
}