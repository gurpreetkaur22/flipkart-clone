import { Link } from "react-router-dom";

const CategoryCard = ({ name, image, slug }: any) => {
  return (
    <Link to={`/category/${slug}`} className="cat">
      <img src={image} alt={name} />
      <span>{name}</span>
    </Link>
  );
};

export default CategoryCard;
