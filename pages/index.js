import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import SimpleFilters from '../components/SimpleFilters';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export default function Home({ products: initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (filters) => {
    let filtered = [...products];

    const hasActiveFilters = Object.keys(filters).some(key => {
      const value = filters[key];
      return value && value.length > 0;
    });

    if (hasActiveFilters) {
      filtered = filtered.filter(product => {
        if (filters.category && filters.category.length > 0) {
          return filters.category.includes(product.category);
        }
        return true;
      });
    }

    // Apply sorting to filtered products
    const sortedProducts = sortProducts(filtered, sortBy);
    setFilteredProducts(sortedProducts);
  };

  const sortProducts = (productsToSort, sortType) => {
    const sorted = [...productsToSort];
    
    switch (sortType) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.id) - new Date(a.id));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.id) - new Date(b.id));
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const sortedProducts = sortProducts(filteredProducts, newSortBy);
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="app">
      <Head>
        <title>NEXIVO - Premium Shopping Experience</title>
        <meta name="description" content="Discover premium products at NEXIVO. Shop our curated collection of high-quality items." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="NEXIVO - Premium Shopping Experience" />
        <meta property="og:description" content="Discover premium products at NEXIVO" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "NEXIVO Products",
              "description": "Premium products available at NEXIVO",
              "numberOfItems": filteredProducts.length,
              "itemListElement": filteredProducts.map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.name,
                  "description": product.description,
                  "image": product.image,
                  "offers": {
                    "@type": "Offer",
                    "price": product.price,
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }))
            })
          }}
        />
      </Head>

      <Header />

      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">DISCOVER OUR PRODUCTS</h1>
            <p className="hero-description">
              Shop our curated collection of premium products designed for quality, comfort, and style. 
              From everyday essentials to statement pieces, each item is carefully selected to meet your lifestyle needs.
            </p>
          </div>
        </div>
      </section>

      <section className="hero-stats">
        <div className="container">
          <div className="stats-content">
            <div className="stat-left">
              <button className="filter-toggle-btn" onClick={() => {
                console.log('Filter toggle clicked, current state:', showFilters);
                setShowFilters(!showFilters);
              }}>
                SHOW FILTER
              </button>
              <span className="stat-label">ITEMS</span>
            </div>
            <div className="stat-center">
            </div>
            <div className="stat-right">
              <select 
                className="sort-dropdown" 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="Sort products"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <main className="main-content">
        <div className="content-wrapper">
          <aside className="filters-section d-none d-md-block">
            <SimpleFilters 
              onFilterChange={handleFilterChange} 
              isVisible={true} 
              onClose={() => setShowFilters(false)} 
            />
          </aside>
          <section className="products-section">
            <ProductGrid products={filteredProducts} loading={loading} />
          </section>
        </div>
        
        {/* Mobile Filters (Hidden by default, shown when toggled) */}
        {showFilters && (
          <div className="filters-mobile d-md-none">
            <div className="filters-overlay" onClick={() => setShowFilters(false)}></div>
            <aside className="filters">
              <div className="filters-header">
                <div className="filters-header-content">
                  <h2 className="filters-title">Filters</h2>
                  <button className="filters-close-btn" onClick={() => setShowFilters(false)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="filters-content">
                {[
                  { id: 'customizable', title: 'CUSTOMIZABLE', options: ['Yes', 'No'] },
                  { id: 'idealFor', title: 'IDEAL FOR', options: ['Men', 'Women', 'Kids', 'Unisex'] },
                  { id: 'occasion', title: 'OCCASION', options: ['Casual', 'Formal', 'Party', 'Work', 'Sports'] },
                  { id: 'work', title: 'WORK', options: ['Office', 'Remote', 'Field', 'Workshop'] },
                  { id: 'fabric', title: 'FABRIC', options: ['Cotton', 'Polyester', 'Wool', 'Silk', 'Linen', 'Denim'] },
                  { id: 'segment', title: 'SEGMENT', options: ['Premium', 'Standard', 'Budget', 'Luxury'] },
                  { id: 'suitableFor', title: 'SUITABLE FOR', options: ['Summer', 'Winter', 'All Season', 'Rainy'] },
                  { id: 'rawMaterials', title: 'RAW MATERIALS', options: ['Organic', 'Synthetic', 'Natural', 'Recycled'] },
                  { id: 'pattern', title: 'PATTERN', options: ['Solid', 'Striped', 'Checked', 'Printed', 'Embroidered'] }
                ].map((section) => (
                  <div key={section.id} className="filter-section">
                    <button
                      className="filter-section-header"
                      onClick={() => {
                        const expandedSections = {};
                        expandedSections[section.id] = true;
                      }}
                      aria-expanded="false"
                    >
                      <span className="filter-section-title">{section.title}</span>
                      <svg
                        className="filter-chevron"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    
                    <div className="filter-section-content">
                      <ul className="filter-options">
                        {section.options.map((option) => (
                          <li key={option} className="filter-option">
                            <label className="filter-label">
                              <input
                                type="checkbox"
                                className="filter-checkbox"
                                onChange={() => handleFilterChange({ [section.id]: [option] })}
                              />
                              <span className="filter-text">{option}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const products = await res.json();
    
    // Transform the data to match our component structure with SEO-friendly names
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      category: product.category
    }));

    return {
      props: {
        products: transformedProducts
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // Return sample products as fallback with valid placeholder images
    const sampleProducts = [
      {
        id: 1,
        name: 'Fjallraven - Foldsack No. 1 Backpack',
        price: 109.95,
        image: 'https://picsum.photos/seed/backpack/400/300.jpg',
        description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: 'clothing'
      },
      {
        id: 2,
        name: 'Mens Casual Premium Slim Fit T-Shirts',
        price: 22.3,
        image: 'https://picsum.photos/seed/tshirt/400/300.jpg',
        description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable comfort',
        category: 'clothing'
      },
      {
        id: 3,
        name: 'Mens Cotton Jacket',
        price: 55.99,
        image: 'https://picsum.photos/seed/jacket/400/300.jpg',
        description: 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.',
        category: 'clothing'
      },
      {
        id: 4,
        name: 'Mens Casual Slim Fit',
        price: 15.99,
        image: 'https://picsum.photos/seed/pants/400/300.jpg',
        description: 'The color could be slightly different between the actual product and the photo due to monitor display or lighting.',
        category: 'clothing'
      },
      {
        id: 5,
        name: 'John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet',
        price: 695,
        image: 'https://picsum.photos/seed/bracelet/400/300.jpg',
        description: 'From our Legends Collection, Naga was inspired by the mythical dragon of Southeast Asia. Follow the dragon\'s path as it guides you through the mysteries of life.',
        category: 'jewelery'
      },
      {
        id: 6,
        name: 'Solid Gold Petite Micropave',
        price: 168,
        message: 'Sleek and sophisticated, this petite micropave ring features a stunning array of diamonds set in 18k gold. Perfect for special occasions.',
        image: 'https://picsum.photos/seed/ring/400/300.jpg',
        description: 'Sleek and sophisticated, this petite micropave ring features a stunning array of diamonds set in 18k gold. Perfect for special occasions.',
        category: 'jewelery'
      }
    ];

    return {
      props: {
        products: sampleProducts
      }
    };
  }
}
