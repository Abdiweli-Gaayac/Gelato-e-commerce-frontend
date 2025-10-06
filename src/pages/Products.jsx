import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid, List, Star, ShoppingCart, Search, Loader, AlertCircle, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Products = () => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [addingToCart, setAddingToCart] = useState({});

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'apparel', name: 'Apparel' },
    { id: 'home', name: 'Home & Living' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'prints', name: 'Prints & Art' }
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data.success ? data.data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our complete collection of custom print-on-demand products</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort and View */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="btn-secondary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <div key={product.id} className={`product-card ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                      <img
                        src={product.image || product.images?.[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image'}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                        }}
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      )}
                      {product.rating && (
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {product.rating} ({product.reviews || 0})
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <button 
                          className={`text-sm flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                            isInCart(product.id) 
                              ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md' 
                              : 'btn-primary'
                          }`}
                          onClick={() => {
                            setAddingToCart(prev => ({ ...prev, [product.id]: true }));
                            addToCart(product, 1);
                            setTimeout(() => {
                              setAddingToCart(prev => ({ ...prev, [product.id]: false }));
                            }, 1000);
                          }}
                          disabled={addingToCart[product.id]}
                        >
                          {addingToCart[product.id] ? (
                            <>
                              <Loader className="h-4 w-4 mr-1 animate-spin" />
                              Adding...
                            </>
                          ) : isInCart(product.id) ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              In Cart ({getItemQuantity(product.id)})
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Load More - Only show if there are products */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
































// // new frontend product.jsx page code

// import React, { useState, useEffect } from 'react';
// import { Grid, List, Star, ShoppingCart, Search, Loader, AlertCircle, Check } from 'lucide-react';
// import { useCart } from '../contexts/CartContext';

// const Products = () => {
//   const { addToCart, isInCart, getItemQuantity } = useCart();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('featured');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [addingToCart, setAddingToCart] = useState({});

//   const categories = [
//     { id: 'all', name: 'All Products' },
//     { id: 'apparel', name: 'Apparel' },
//     { id: 'home', name: 'Home & Living' },
//     { id: 'accessories', name: 'Accessories' },
//     { id: 'prints', name: 'Prints & Art' }
//   ];

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/products');
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();

//         // Adjust for backend structure (MongoDB _id)
//         setProducts(
//           data.success 
//             ? data.data.map(prod => ({ ...prod, id: prod._id })) 
//             : []
//         );
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching products:', err);
//         setError('Failed to load products. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Filter and sort products
//   const filteredProducts = products
//     .filter(product => {
//       const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//       const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            product.description?.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchesCategory && matchesSearch;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'price-low': return a.price - b.price;
//         case 'price-high': return b.price - a.price;
//         case 'rating': return (b.rating || 0) - (a.rating || 0);
//         case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//         default: return 0;
//       }
//     });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
//           <p className="text-gray-600">Discover our complete collection of custom print-on-demand products</p>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//             <div className="flex-1 max-w-md">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               >
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex items-center space-x-4">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="rating">Highest Rated</option>
//                 <option value="newest">Newest</option>
//               </select>

//               <div className="flex border border-gray-300 rounded-lg">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//                 >
//                   <Grid className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
//                 >
//                   <List className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading && (
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <Loader className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
//               <p className="text-gray-600">Loading products...</p>
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
//               <p className="text-red-600 mb-4">{error}</p>
//               <button onClick={() => window.location.reload()} className="btn-primary">Try Again</button>
//             </div>
//           </div>
//         )}

//         {!loading && !error && (
//           <>
//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
//                 <button
//                   onClick={() => {
//                     setSearchTerm('');
//                     setSelectedCategory('all');
//                   }}
//                   className="btn-secondary mt-4"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
//                 {filteredProducts.map((product) => (
//                   <div key={product.id} className={`product-card ${viewMode === 'list' ? 'flex' : ''}`}>
//                     <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
//                       <img
//                         src={product.image || product.images?.[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image'}
//                         alt={product.name}
//                         className="product-image"
//                         onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
//                       />
//                       {product.isNew && <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">New</span>}
//                       {product.isSale && <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">Sale</span>}
//                     </div>
//                     <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
//                       <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">{product.name}</h3>
//                       {product.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>}
//                       {product.rating && (
//                         <div className="flex items-center mb-3">
//                           <div className="flex items-center">
//                             {[...Array(5)].map((_, i) => (
//                               <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
//                             ))}
//                           </div>
//                           <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews || 0})</span>
//                         </div>
//                       )}
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <span className="text-xl font-bold text-gray-900">${product.price}</span>
//                           {product.originalPrice && product.originalPrice > product.price && (
//                             <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//                           )}
//                         </div>
//                         <button 
//                           className={`text-sm flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isInCart(product.id) ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md' : 'btn-primary'}`}
//                           onClick={() => {
//                             setAddingToCart(prev => ({ ...prev, [product.id]: true }));
//                             addToCart(product, 1);
//                             setTimeout(() => { setAddingToCart(prev => ({ ...prev, [product.id]: false })); }, 1000);
//                           }}
//                           disabled={addingToCart[product.id]}
//                         >
//                           {addingToCart[product.id] ? <>Loading...</> : isInCart(product.id) ? `In Cart (${getItemQuantity(product.id)})` : 'Add to Cart'}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;
