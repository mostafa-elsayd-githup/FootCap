"use client";
import styles from "./Products.module.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useOpneing } from "@/RTK/storcontext";
import Button from "./wishlistButton";

function Products({ wishlist }) {
  const { setIsOpen, setSelectedProduct } = useOpneing();
  const formatPrice = (amount, currency = "EGP", decimals = 0) =>
    Intl.NumberFormat("en", {
      notation: "standard",
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
    }).format(parseInt(amount));

  return (
    <div className={styles.wishlist_page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.bag_title}>Wishlist</h2>
          <span className={styles.item_count}>
            {wishlist?.length} {wishlist?.length === 1 ? "Item" : "Items"} saved
          </span>
        </div>

        {wishlist?.length > 0 && (
          <div className={styles.header_actions}>
            <select className={styles.sort_select} defaultValue="newest">
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className={styles.wishlist_grid}>
          {wishlist?.map((product) => {    
                    
            const price = formatPrice(product.price);
            const oldprice = product.oldPrice
              ? formatPrice(product.oldPrice, "EGP", 2)
              : null;

            return (
              <Card className={styles.card} key={product.id}>
                <div className={styles.image_container}>
                  {product?.Inventory === 0 ? (
                    <span
                      className={`${styles.stock_badge} ${styles.out_stock}`}
                    >
                      Out of Stock
                    </span>
                  ) : product?.Inventory <= 5 ? (
                    <span
                      className={`${styles.stock_badge} ${styles.low_stock}`}
                    >
                      Low Stock
                    </span>
                  ) : null}

                  <Card.Img
                    className={styles.image}
                    src={product.image}
                    alt={product.name}
                  />

                  <div className={styles.action_overlay}>
                    <Button product={product} />
                  </div>

                  <div
                    className={styles.quick_add_bar}
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedProduct(product);
                    }}
                  >
                    Quick Add
                  </div>
                </div>

                <Card.Body className={styles.card_body}>
                  <Link
                    href={`/product/${product.id}`}
                    className={styles.name_link}
                  >
                    <h5 className={styles.name}>{product.name}</h5>
                  </Link>

                  <p className={styles.category}>{product.category}</p>

                  <div className={styles.price_container}>
                    <span
                      className={`${styles.price} ${product.oldPrice ? styles.price_red : ""}`}
                    >
                      {price}
                    </span>
                    {oldprice && (
                      <span className={styles.old_price}>{oldprice}</span>
                    )}
                  </div>

                  {product.url?.length > 0 && (
                    <p className={styles.colors}>{product.url.length} Colors</p>
                  )}
                  {product.made && (
                    <p className={styles.made}>{product.made}</p>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className={styles.empty_state}>
          <div className={styles.empty_content}>
            <div className={styles.empty_icon_wrapper}>
              <FontAwesomeIcon icon={fasHeart} className={styles.empty_heart} />
            </div>

            <p className={styles.empty_label}>Wishlist</p>

            <h3>Nothing here yet</h3>

            <p>
              Save your favourite pieces and come back when you&apos;re ready.
              Your selections will be waiting.
            </p>

            <Link href="/" className={styles.shop_now_btn}>
              <span>Explore Collection</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
