// All currency values are in Indian Rupees (INR)
export const stats = {
  totalFarmers: 120,
  activeCrops: 45,
  totalPayments: 300,
  revenue: 125000, // ₹1,25,000
};

export const lineChartData = [
  { month: 'Jan', revenue: 10000 },   // ₹10,000
  { month: 'Feb', revenue: 12000 },   // ₹12,000
  { month: 'Mar', revenue: 15000 },   // ₹15,000
  { month: 'Apr', revenue: 13000 },   // ₹13,000
  { month: 'May', revenue: 17000 },   // ₹17,000
  { month: 'Jun', revenue: 19000 },   // ₹19,000
];

export const usersData = [
  { id: 1, name: 'Yash Patil', email: 'aarav@verdure.in', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Manisha Gayakwad', email: 'neha@verdure.in', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Uday Kale', email: 'ravi@verdure.in', role: 'User', status: 'Active' },
  { id: 4, name: 'Kavita More', email: 'kavita@verdure.in', role: 'Moderator', status: 'Active' },
];

export const farmersData = [
  { id: 1, name: 'Ramesh Patil', location: 'Maharashtra', crop: 'Tomato', status: 'Active' },
  { id: 2, name: 'Sunita Mohite', location: 'Uttar Pradesh', crop: 'Maize', status: 'Inactive' },
  { id: 3, name: 'Manoj Bhoite', location: 'Punjab', crop: 'Sugarcane', status: 'Active' },
];

export const cropsData = [
  { id: 1, name: 'Tomato', type: 'Vegetable', season: 'Kharif', status: 'Active' },
  { id: 2, name: 'Maize', type: 'Grain', season: 'Rabi', status: 'Active' },
  { id: 3, name: 'Sugarcane', type: 'Cash Crop', season: 'Annual', status: 'Inactive' },
];

export const paymentsData = [
  { id: 1, planName: 'Basic', farmerName: 'Rajesh Patil', amount: 100, status: 'Paid', date: '2024-05-01' },    // ₹100
  { id: 2, planName: 'Premium', farmerName: 'Sunita Mohite', amount: 200, status: 'Pending', date: '2024-05-03' }, // ₹200
  { id: 3, planName: 'Basic', farmerName: 'Manoj Bhoite', amount: 100, status: 'Paid', date: '2024-05-05' },    // ₹100
];

export const paymentsSummary = {
  totalRevenue: 40000, // ₹40,000
  activeSubscriptions: 75,
};
