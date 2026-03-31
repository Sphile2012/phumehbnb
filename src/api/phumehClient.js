import { MOCK_PROPERTIES, MOCK_REVIEWS, MOCK_BOOKINGS } from './mockData';

// In-memory stores
let properties = [...MOCK_PROPERTIES];
let reviews = { ...MOCK_REVIEWS };
let bookings = [...MOCK_BOOKINGS];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const makeStore = (getAll, setAll) => ({
  filter: async (filters = {}, sort, limit) => {
    await delay();
    let results = getAll();
    Object.entries(filters).forEach(([key, val]) => {
      results = results.filter((item) => item[key] === val);
    });
    if (limit) results = results.slice(0, limit);
    return results;
  },
  create: async (data) => {
    await delay();
    const item = { ...data, id: `${Date.now()}`, created_date: new Date().toISOString() };
    setAll([...getAll(), item]);
    return item;
  },
  update: async (id, data) => {
    await delay();
    const updated = getAll().map((item) => item.id === id ? { ...item, ...data } : item);
    setAll(updated);
    return updated.find((i) => i.id === id);
  },
  delete: async (id) => {
    await delay();
    setAll(getAll().filter((item) => item.id !== id));
    return { success: true };
  },
});

const reviewStore = {
  filter: async (filters = {}) => {
    await delay();
    const allReviews = Object.values(reviews).flat();
    return allReviews.filter((r) =>
      Object.entries(filters).every(([k, v]) => r[k] === v)
    );
  },
  create: async (data) => {
    await delay();
    const item = { ...data, id: `rev_${Date.now()}`, created_date: new Date().toISOString() };
    const pid = data.property_id;
    reviews[pid] = [...(reviews[pid] || []), item];
    return item;
  },
};

export const phumeh = {
  auth: {
    me: async () => {
      await delay(100);
      const stored = localStorage.getItem('phumeh_user');
      if (stored) return JSON.parse(stored);
      throw new Error('Not authenticated');
    },
    redirectToLogin: () => {
      window.location.href = '/login';
    },
    logout: () => {
      localStorage.removeItem('phumeh_user');
      window.location.href = '/';
    },
  },
  entities: {
    Property: makeStore(
      () => properties,
      (v) => { properties = v; }
    ),
    Booking: makeStore(
      () => bookings,
      (v) => { bookings = v; }
    ),
    Review: reviewStore,
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        await delay(500);
        // Return a placeholder image URL for demo
        return { file_url: `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop` };
      },
    },
  },
};
