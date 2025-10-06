import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Package, 
  Truck, 
  Home, 
  RefreshCw, 
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Calendar,
  AlertCircle
} from 'lucide-react';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch order data
  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.data);
        setLastUpdated(new Date());
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch order');
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  // Auto-refresh every 30 seconds for live updates
  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(() => {
      fetchOrder();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [orderId]);

  // Status configuration
  const getStatusConfig = (status) => {
    const statusConfigs = {
      pending: {
        icon: Clock,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        title: 'Order Pending',
        description: 'Your order is being processed'
      },
      processing: {
        icon: Package,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        title: 'Processing',
        description: 'Your order is being prepared'
      },
      sent_to_gelato: {
        icon: Package,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        title: 'Sent to Print',
        description: 'Your order has been sent to our printing partner'
      },
      in_production: {
        icon: Package,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
        title: 'In Production',
        description: 'Your products are being printed'
      },
      shipped: {
        icon: Truck,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        title: 'Shipped',
        description: 'Your order is on its way'
      },
      delivered: {
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        title: 'Delivered',
        description: 'Your order has been delivered'
      },
      cancelled: {
        icon: AlertCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        title: 'Cancelled',
        description: 'Your order has been cancelled'
      },
      failed: {
        icon: AlertCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        title: 'Failed',
        description: 'There was an issue with your order'
      }
    };

    return statusConfigs[status] || statusConfigs.pending;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Go Home
            </button>
            <button
              onClick={fetchOrder}
              className="btn-secondary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${statusConfig.bgColor} ${statusConfig.borderColor} border-2 mb-4`}>
            <StatusIcon className={`h-8 w-8 ${statusConfig.color}`} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmation</h1>
          <p className="text-lg text-gray-600">Thank you for your order!</p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {formatDate(lastUpdated.toISOString())}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Status</h2>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${statusConfig.bgColor}`}>
                  <StatusIcon className={`h-6 w-6 ${statusConfig.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{statusConfig.title}</h3>
                  <p className="text-gray-600">{statusConfig.description}</p>
                </div>
              </div>
              
              {order.gelatoTrackingNumber && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                      <p className="text-lg font-mono text-gray-600">{order.gelatoTrackingNumber}</p>
                    </div>
                    {order.gelatoTrackingUrl && (
                      <a
                        href={order.gelatoTrackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Track Package
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image || 'https://via.placeholder.com/80x80?text=No+Image'}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      {Object.keys(item.selectedOptions || {}).length > 0 && (
                        <p className="text-sm text-gray-600">
                          {Object.entries(item.selectedOptions).map(([key, value]) => (
                            <span key={key}>
                              {key}: {value}
                              {Object.keys(item.selectedOptions).indexOf(key) < Object.keys(item.selectedOptions).length - 1 && ' • '}
                            </span>
                          ))}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </span>
                </div>
                <p className="text-gray-600 pl-7">{order.shippingAddress.address}</p>
                <p className="text-gray-600 pl-7">
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p className="text-gray-600 pl-7">{order.shippingAddress.country}</p>
                <div className="flex items-center space-x-2 pt-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{order.shippingAddress.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{order.shippingAddress.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number</span>
                  <span className="font-mono text-gray-900">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date</span>
                  <span className="text-gray-900">{formatDate(order.createdAt)}</span>
                </div>
                {order.gelatoOrderId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gelato Order ID</span>
                    <span className="font-mono text-gray-900">{order.gelatoOrderId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Total</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(order.totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {order.totals.shipping === 0 ? 'Free' : formatCurrency(order.totals.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">{formatCurrency(order.totals.tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {formatCurrency(order.totals.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={fetchOrder}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Status
              </button>
              <Link
                to="/products"
                className="w-full btn-primary flex items-center justify-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;







