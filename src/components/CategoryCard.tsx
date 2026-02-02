import { Link } from "react-router-dom";

const CategoryCard = ({ name, image, slug }: any) => {
  return (
    <Link to={`/category/${slug}`} className="cat cat-3d">
      <div className="flip-wrapper">
        <div className="flip-front">
          <img src={image} alt={name} />
          {/* <span>{name}</span> */}
        </div>
        <div className="flip-back">
          <span>{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
