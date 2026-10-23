
import { useMemo, useState } from 'react';
import './App.css';

const products = [
  {
    id: 1,
    brand: 'Roadster',
    name: 'Men Solid Casual Shirt',
    category: 'Men',
    price: 799,
    oldPrice: 1599,
    discount: 50,
    rating: '4.3',
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 2,
    brand: 'StyleCast',
    name: 'Women Floral Dress',
    category: 'Women',
    price: 1199,
    oldPrice: 1999,
    discount: 40,
    rating: '4.5',
    image:
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 3,
    brand: 'HRX',
    name: 'Men Sneakers',
    category: 'Footwear',
    price: 1299,
    oldPrice: 1999,
    discount: 35,
    rating: '4.2',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 4,
    brand: 'H&M',
    name: 'Kids Hoodie',
    category: 'Kids',
    price: 699,
    oldPrice: 1099,
    discount: 35,
    rating: '4.4',
    image:
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 5,
    brand: 'Lakme',
    name: 'Makeup Combo',
    category: 'Beauty',
    price: 699,
    oldPrice: 999,
    discount: 30,
    rating: '4.3',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 6,
    brand: 'Home Centre',
    name: 'Cushion Cover (Set of 2)',
    category: 'Home & Living',
    price: 499,
    oldPrice: 999,
    discount: 50,
    rating: '4.1',
    image:
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=85',
  },
];

const categories = [
  { name: 'Men', icon: '👕' },
  { name: 'Women', icon: '👗' },
  { name: 'Kids', icon: '👚' },
  { name: 'Footwear', icon: '👟' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Accessories', icon: '👜' },
  { name: 'Home & Living', icon: '🛋️' },
  { name: 'Sports', icon: '⚽' },
];

const navItems = [
  'Home',
  'Men',
  'Women',
  'Kids',
  'Home & Living',
  'Beauty',
  'Sports',
];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('Home');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products');
  const [notice, setNotice] = useState('');

  const visibleProducts = useMemo(() => {
    let list = products;

    if (view === 'wishlist') {
      list = list.filter((product) => wishlist.includes(product.id));
    } else if (view === 'bag') {
      list = list.filter((product) => cart.includes(product.id));
    } else if (activeCategory !== 'All') {
      list = list.filter(
        (product) => product.category === activeCategory
      );
    }

    const query = search.trim().toLowerCase();

    if (query) {
      list = list.filter((product) =>
        `${product.brand} ${product.name} ${product.category}`
          .toLowerCase()
          .includes(query)
      );
    }

    return list;
  }, [activeCategory, search, wishlist, cart, view]);

  function selectCategory(category) {
    setActiveCategory(category);
    setActiveNav(category === 'All' ? 'Home' : category);
    setView('products');
    document.getElementById('trending')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function toggleWishlist(id) {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function addToBag(id) {
    setCart((previous) => [...previous, id]);
    setNotice('Added to bag successfully!');
    window.setTimeout(() => setNotice(''), 2200);
  }

  function openView(nextView) {
    setView(nextView);
    setSearch('');
    setActiveCategory('All');

    document.getElementById('trending')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function resetHome() {
    setActiveCategory('All');
    setActiveNav('Home');
    setView('products');
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const heading =
    view === 'wishlist'
      ? 'My Wishlist'
      : view === 'bag'
        ? 'My Shopping Bag'
        : activeCategory === 'All'
          ? 'Trending Now'
          : `${activeCategory} Collection`;

  return (
    <div className="store">
      {/* Announcement */}
      <div className="announcement">
        ✨ FESTIVE FASHION SALE — EXTRA 10% OFF ON YOUR FIRST ORDER
      </div>

      {/* Navbar */}
      <header className="navbar">
        <button
          className="brand"
          onClick={resetHome}
          aria-label="StyleNest home"
        >
          <span className="brand-icon">♧</span>
          <span className="brand-copy">
            <span className="brand-name">
              Style<span>Nest</span>
            </span>
            <small>Fashion · Lifestyle · You</small>
          </span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-link ${
                activeNav === item ? 'active' : ''
              }`}
              onClick={() => {
                if (item === 'Home') {
                  resetHome();
                } else {
                  setActiveNav(item);
                  selectCategory(item);
                }
              }}
            >
              {item}
            </button>
          ))}

          <button
            className="nav-link more-link"
            onClick={() =>
              document.getElementById('categories')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            More⌄
          </button>
        </nav>

        <form
          className="search-box"
          onSubmit={(event) => {
            event.preventDefault();
            setView('products');
            document.getElementById('trending')?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          <span className="search-icon">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setView('products');
              setActiveCategory('All');
            }}
            placeholder="Search for products, brands and more..."
            aria-label="Search products"
          />
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>

        <div className="nav-actions">
          <button onClick={() => openView('wishlist')}>
            <span className="action-icon heart-icon">♡</span>
            <span>Wishlist</span>
            {wishlist.length > 0 && <b>{wishlist.length}</b>}
          </button>

          <button onClick={() => openView('bag')}>
            <span className="action-icon">♧</span>
            <span>Bag</span>
            {cart.length > 0 && <b>{cart.length}</b>}
          </button>

          <button
            onClick={() => {
              setNotice('Login feature can be connected to your backend.');
              window.setTimeout(() => setNotice(''), 2500);
            }}
          >
            <span className="action-icon">♙</span>
            <span>Login</span>
          </button>
        </div>
      </header>

      {/* Hero banner */}
      <main>
        <section className="hero">
          <button
            className="hero-arrow hero-prev"
            onClick={() =>
              document.getElementById('categories')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
            aria-label="Previous section"
          >
            ‹
          </button>

          <div className="hero-copy">
            <span className="hero-eyebrow">BIG FASHION SALE</span>

            <h1>
              Upgrade Your
              <br />
              <span>Style Game</span>
              <span className="hero-sparkle">♡</span>
            </h1>

            <p>
              Top brands <i>·</i> Latest trends <i>·</i> Unbeatable offers
            </p>

            <button
              className="shop-button"
              onClick={() =>
                document.getElementById('trending')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
            >
              Shop Now <span>→</span>
            </button>
          </div>

          <div className="hero-model">
            <div className="model-circle" />

            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=90"
              alt="Fashion model wearing a stylish outfit"
            />

            <span className="floating-heart">♡</span>

            <div className="hero-brand-offer">
              <span className="offer-label">UP TO</span>
              <strong>60% OFF</strong>
              <p>On Top Fashion Brands</p>

              <div className="brand-list">
                <span className="hm-brand">H&M</span>
                <span className="zara-brand">zara</span>
                <span className="mango-brand">MANGO</span>
                <span className="puma-brand">PUMA</span>
              </div>
            </div>
          </div>

          <button
            className="hero-arrow hero-next"
            onClick={() =>
              document.getElementById('trending')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
            aria-label="Next section"
          >
            ›
          </button>
        </section>

        {/* Categories */}
        <section className="category-section" id="categories">
          <div className="category-grid">
            {categories.map((category, index) => (
              <button
                key={category.name}
                className={`category-item category-${index + 1}`}
                onClick={() => selectCategory(category.name)}
              >
                <span className="category-emoji">{category.icon}</span>
                <strong>{category.name}</strong>
                <small>Explore Now →</small>
              </button>
            ))}
          </div>
        </section>

        {/* Product collection */}
        <section className="products-section" id="trending">
          <div className="section-heading">
            <div>
              <h2>
                <span className="heading-line" />
                {heading}
              </h2>
              <p className="results-count">
                {view === 'wishlist'
                  ? 'Your favourite styles, all in one place'
                  : view === 'bag'
                    ? 'Your selected fashion essentials'
                    : 'Handpicked just for you'}
              </p>
            </div>

            {view !== 'wishlist' && view !== 'bag' && (
              <button
                className="text-link"
                onClick={() => selectCategory('All')}
              >
                View All →
              </button>
            )}

            {(view === 'wishlist' || view === 'bag') && (
              <button
                className="text-link"
                onClick={() => {
                  setView('products');
                  setActiveCategory('All');
                }}
              >
                Continue Shopping →
              </button>
            )}
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    <span className="discount-badge">
                      {product.discount}% OFF
                    </span>

                    <button
                      className={`heart-button ${
                        wishlist.includes(product.id) ? 'selected' : ''
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={
                        wishlist.includes(product.id)
                          ? 'Remove from wishlist'
                          : 'Add to wishlist'
                      }
                    >
                      {wishlist.includes(product.id) ? '♥' : '♡'}
                    </button>

                    <span className="rating">
                      <span>★</span> {product.rating}
                    </span>
                  </div>

                  <div className="product-info">
                    <h3 className="product-brand">{product.brand}</h3>
                    <p>{product.name}</p>

                    <div className="price-line">
                      <strong>₹{product.price.toLocaleString('en-IN')}</strong>
                      <del>
                        ₹{product.oldPrice.toLocaleString('en-IN')}
                      </del>
                      <span>({product.discount}% OFF)</span>
                    </div>

                    {view === 'bag' ? (
                      <button
                        className="add-button"
                        onClick={() =>
                          setCart((previous) =>
                            previous.filter((id) => id !== product.id)
                          )
                        }
                      >
                        Remove from Bag
                      </button>
                    ) : (
                      <button
                        className="add-button"
                        onClick={() => addToBag(product.id)}
                      >
                        <span className="bag-small-icon">♧</span>
                        Add to Bag
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>{view === 'wishlist' ? '♡' : '⌕'}</span>
              <h3>
                {view === 'wishlist'
                  ? 'Your wishlist is waiting!'
                  : view === 'bag'
                    ? 'Your bag is empty!'
                    : 'No products found'}
              </h3>
              <p>
                {view === 'wishlist'
                  ? 'Tap the heart on a product to save your favourite styles.'
                  : view === 'bag'
                    ? 'Discover something you love and add it to your bag.'
                    : 'Try a different search or explore another category.'}
              </p>
              <button className="shop-button" onClick={resetHome}>
                Explore Collection →
              </button>
            </div>
          )}
        </section>

        {/* Shopping benefits */}
        <section className="benefits">
          <div className="benefit-item">
            <span className="benefit-icon">🚚</span>
            <div>
              <strong>Free Shipping</strong>
              <small>On all orders above ₹499</small>
            </div>
          </div>

          <div className="benefit-item">
            <span className="benefit-icon">⬟</span>
            <div>
              <strong>100% Original Products</strong>
              <small>With brand warranty</small>
            </div>
          </div>

          <div className="benefit-item">
            <span className="benefit-icon">⟲</span>
            <div>
              <strong>Easy Returns</strong>
              <small>Within 7 days</small>
            </div>
          </div>

          <div className="benefit-item">
            <span className="benefit-icon">⬟</span>
            <div>
              <strong>Secure Payments</strong>
              <small>Multiple payment options</small>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="footer-main">
          <div className="footer-about">
            <button className="brand footer-brand" onClick={resetHome}>
              <span className="brand-icon">♧</span>
              <span className="brand-copy">
                <span className="brand-name">
                  Style<span>Nest</span>
                </span>
                <small>Fashion · Lifestyle · You</small>
              </span>
            </button>

            <div className="social-links">
              <a href="https://www.facebook.com/" aria-label="Facebook">f</a>
              <a href="https://www.instagram.com/" aria-label="Instagram">◎</a>
              <a href="https://www.youtube.com/" aria-label="YouTube">▶</a>
              <a href="https://x.com/" aria-label="X">𝕏</a>
              <a href="https://www.pinterest.com/" aria-label="Pinterest">℘</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Shop by Category</h4>
            {['Men', 'Women', 'Kids', 'Footwear', 'Beauty', 'Home & Living'].map(
              (item) => (
                <button key={item} onClick={() => selectCategory(item)}>
                  {item}
                </button>
              )
            )}
          </div>

          <div className="footer-column">
            <h4>Customer Service</h4>
            {[
              'Contact Us',
              'FAQs',
              'Shipping Policy',
              'Returns & Refunds',
              'Privacy Policy',
              'Track Order',
            ].map((item) => (
              <a key={item} href="#footer">
                {item}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h4>About Us</h4>
            {[
              'Our Story',
              'Careers',
              'Blog',
              'Store Locator',
              'Affiliate Program',
            ].map((item) => (
              <a key={item} href="#footer">
                {item}
              </a>
            ))}
          </div>

          <div className="footer-column app-column">
            <h4>Download Our App</h4>
            <a
              className="app-badge"
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
            >
              <span>▶</span>
              <span>
                <small>GET IT ON</small>
                Google Play
              </span>
            </a>

            <a
              className="app-badge"
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
            >
              <span>●</span>
              <span>
                <small>Download on the</small>
                App Store
              </span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 StyleNest. All rights reserved.</span>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Back to top ↑
          </a>
        </div>
      </footer>

      {notice && <div className="toast">{notice}</div>}
    </div>
  );
}

export default App;
