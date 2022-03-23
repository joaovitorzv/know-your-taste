import Link from "next/link";
import brand from "./brand.module.scss";
import Image from "next/image";

const Brand = () => {
  return (
    <div className={brand.container}>
      <Link href="/" passHref>
        <a>
          <div className={brand.brand}>
            <Image
              src="/kyt.svg"
              alt="Know Your Taste Logo"
              width={70}
              height={70}
              layout="responsive"
            />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Brand;
