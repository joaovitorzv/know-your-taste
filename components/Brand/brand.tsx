import Link from "next/link";
import brand from "./brand.module.scss";

const Brand = () => {
  return (
    <div className={brand.container}>
      <Link href="/" passHref>
        <a className={brand.brand}>
          Know <br /> Your <br /> Taste.
        </a>
      </Link>
    </div>
  );
};

export default Brand;
