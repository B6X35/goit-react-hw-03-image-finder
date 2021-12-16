import PropTypes from "prop-types";
import style from './ImageGalleryItem.module.css'
 
const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <li onClick={onClick} className={style['image-gallery-item']}>
      <img className={style['image-gallery-item-image']} src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}