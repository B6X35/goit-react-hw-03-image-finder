import style from './Button.module.css'
import PropTypes from "prop-types"; 

const Button = ({onLoadMore}) => {
    return (
        <button type='button' onClick={onLoadMore} className={style.button}>Load More</button>
    )
}

export default Button;

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
}