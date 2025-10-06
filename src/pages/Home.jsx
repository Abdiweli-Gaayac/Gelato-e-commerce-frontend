import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones, ShoppingCart, Check, Loader } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Home = () => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [addingToCart, setAddingToCart] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [poemIndex, setPoemIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate poems
  useEffect(() => {
    const id = setInterval(() => {
      setPoemIndex((prev) => (prev + 1) % poems.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const poems = [
    {
      verse: 'Dhulkaa nabad ku noolaa, dadkuna dhaqan ku diirsaday',
      author: 'Hadraawi',
      bg: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60'
    },
    {
      verse: 'Geeraar gu’ iyo dayr, gabaygii ku guuxaya',
      author: 'Gaariye',
      bg: 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca7a?auto=format&fit=crop&w=1200&q=60'
    },
    {
      verse: 'Jacayl waa jamasho iyo janadii la eegayo',
      author: 'Timacadde',
      bg: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Custom T-Shirt',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Premium Mug',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: 'Canvas Print',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: 'Phone Case',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 203
    }
  ];

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-primary-600" />,
      title: 'Fast Shipping',
      description: 'Worldwide delivery in 3-7 business days'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Quality Guarantee',
      description: 'Premium materials and printing quality'
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary-600" />,
      title: '24/7 Support',
      description: 'Our team is here to help you anytime'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Somali Culture & Poetry */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-sky-800 to-cyan-700 text-white min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-purple-300 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-indigo-300 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className={`text-4xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
                Nation of Poets
              </span>
              <span className={`block text-amber-300 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                Somali Culture • Poetry • Prints
              </span>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Celebrate the heartbeat of Somali heritage — the rhythm of gabay, the colors of guntiino,
              the grace of dhaanto. Wear the words. Hang the verses. Gift the culture.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Link
                to="/products"
                className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold text-gray-900 mb-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Nation of Poets</span>?
            </h2>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              We make it easy to create and sell custom products with professional quality and fast delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{transitionDelay: `${600 + index * 200}ms`}}>
                <div className="flex justify-center mb-4 group">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Poem Highlights - Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Gabay & Maanso – Xulasho</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Tuducyo qalbi taabasho leh oo ka yimid hal-abuurka Soomaaliyeed – u beddel farshaxan aad xiran karto.</p>
          </div>
          {/* Slide */}
          <div className="relative rounded-2xl overflow-hidden shadow min-h-[280px]">
            <img
              src={poems[poemIndex].bg}
              alt="Somali landscape"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x600/png?text=Somali+Landscape'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent"></div>
            <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between h-full">
              <div className="max-w-3xl">
                <p className="text-white text-xl md:text-2xl font-semibold italic">“{poems[poemIndex].verse}”</p>
                <p className="text-amber-300 mt-3 font-medium">— {poems[poemIndex].author}</p>
              </div>
              <div className="mt-6 md:mt-0">
                <Link to="/products" className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition">
                  Shop the Verse / Soo Iibso Aayadda
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Controls */}
            <button aria-label="Previous poem" onClick={() => setPoemIndex((poemIndex - 1 + poems.length) % poems.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 grid place-items-center">‹</button>
            <button aria-label="Next poem" onClick={() => setPoemIndex((poemIndex + 1) % poems.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 grid place-items-center">›</button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {poems.map((_, i) => (
                <button key={i} onClick={() => setPoemIndex(i)} className={`w-2.5 h-2.5 rounded-full ${i === poemIndex ? 'bg-amber-400' : 'bg-white/60 hover:bg-white'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Somali Culture — Crafted into Design</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Patterns of guntiino, rhythms of dhaanto, hues of the Indian Ocean — captured on apparel, mugs, and wall art.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              title: 'Guntiino Patterns', img: '/images/Guntiino.png', text: 'Elegant motifs inspired by Somali textiles.'
            },{
              title: 'Dhaanto Rhythm', img: '/images/Dhaanto.png', text: 'Movement and music distilled into graphic lines.'
            },{
              title: 'Indian Ocean Hues', img: '/images/Indianocean.png', text: 'Turquoise, coral, and gold colorways for every product.'
            }].map((c, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-xl transition-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x750/png?text=Somali+Design'; }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-gray-600">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold text-gray-900 mb-4 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Featured Products</span>
            </h2>
            <p className={`text-lg text-gray-600 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Discover our most popular custom products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className={`product-card group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{transitionDelay: `${1200 + index * 200}ms`}}>
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-purple-600 transition-colors duration-300">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 transition-colors duration-300 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current group-hover:text-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <button 
                      className={`group/btn text-sm flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        isInCart(product.id) 
                          ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md' 
                          : 'relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:shadow-lg'
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
                          <ShoppingCart className="h-4 w-4 mr-1 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`text-center mt-8 transition-all duration-1000 delay-2000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Link
              to="/products"
              className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-indigo-700 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full animate-pulse delay-500"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold mb-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Ready to Start Creating?
          </h2>
          <p className={`text-xl mb-8 text-purple-100 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Join thousands of creators who trust Nation of Poets for their custom print-on-demand needs.
          </p>
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Link
              to="/products"
              className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-semibold text-purple-600 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative flex items-center justify-center">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
