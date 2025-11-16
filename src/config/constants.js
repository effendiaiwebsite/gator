// App-wide constants

export const STATUS_LEVELS = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold'
};

export const PROVINCES = [
  { code: 'ON', name: 'Ontario' },
  { code: 'QC', name: 'Quebec' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'AB', name: 'Alberta' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'NL', name: 'Newfoundland and Labrador' }
];

export const REVENUE_RANGES = [
  { value: '0-50k', label: 'Under $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-250k', label: '$100,000 - $250,000' },
  { value: '250k-500k', label: '$250,000 - $500,000' },
  { value: '500k+', label: 'Over $500,000' }
];

export const EMPLOYEE_COUNTS = [
  { value: '0', label: 'Just me (sole proprietor)' },
  { value: '1-5', label: '1-5 employees' },
  { value: '6-15', label: '6-15 employees' },
  { value: '16-50', label: '16-50 employees' },
  { value: '51+', label: '51+ employees' }
];

export const DOCUMENT_TYPES = {
  T4: 'T4',
  INVOICE: 'Invoice',
  RECEIPT: 'Receipt',
  OTHER: 'Other'
};

export const GATOR_IMAGES = {
  BUSINESS_SUIT: '/gator/business-suit.png',
  THUMBS_UP: '/gator/thumbs-up.png',
  POINTING: '/gator/pointing.png',
  CHILL: '/gator/chill.png',
  LOGO: '/gator/logo.png'
};
