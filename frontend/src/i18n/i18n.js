// frontend/src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
const en = {
  navbar: {
    home: 'Home',
    states: 'States',
    destinations: 'Destinations',
    about: 'About',
    contact: 'Contact',
    search: 'Search',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    profile: 'Profile',
    admin: 'Admin'
  },
  home: {
    title: 'Explore India State by State',
    subtitle: 'Discover tourist destinations across all regions of India',
    exploreStates: 'Explore States',
    viewDestinations: 'View Destinations',
    featured: 'Featured Destinations',
    categories: 'Categories',
    planYourJourney: 'Plan Your Journey'
  },
  states: {
    title: 'States of India',
    subtitle: 'Discover tourist destinations across all 28 states and 8 union territories',
    searchPlaceholder: 'Search states by name, capital, or famous places...',
    noResults: 'No states found',
    capital: 'Capital',
    region: 'Region',
    destinations: 'destinations',
    famousFor: 'Famous For'
  },
  destinations: {
    title: 'Tourist Destinations',
    subtitle: 'Discover India\'s most beautiful places, heritage sites, and hidden gems',
    searchPlaceholder: 'Search destinations by name...',
    noResults: 'No destinations found',
    rating: 'Rating',
    bestTime: 'Best Time to Visit',
    entryFee: 'Entry Fee',
    timings: 'Timings',
    nearbyAttractions: 'Nearby Attractions',
    categories: {
      all: 'All Categories',
      heritage: 'Heritage',
      nature: 'Nature',
      adventure: 'Adventure',
      religious: 'Religious',
      beach: 'Beach',
      hillStation: 'Hill Station',
      wildlife: 'Wildlife'
    }
  },
  auth: {
    login: 'Login',
    register: 'Register',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    username: 'Username',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account'
  },
  admin: {
    dashboard: 'Dashboard',
    manageStates: 'Manage States',
    manageDestinations: 'Manage Destinations',
    categories: 'Categories',
    addNew: 'Add New',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirmDelete: 'Are you sure you want to delete'
  },
  booking: {
    planYourJourney: 'Plan Your Journey',
    bookFlights: 'Book flights, trains, buses & more',
    flights: 'Flights',
    trains: 'Trains',
    buses: 'Buses',
    cabs: 'Cabs',
    accommodations: 'Accommodations',
    tourPackages: 'Tour Packages',
    oneWay: 'One Way',
    roundTrip: 'Round Trip',
    from: 'From',
    to: 'To',
    depart: 'Depart',
    return: 'Return',
    travelers: 'Travelers',
    cabin: 'Cabin',
    search: 'Search'
  }
};

const hi = {
  navbar: {
    home: 'होम',
    states: 'राज्य',
    destinations: 'पर्यटन स्थल',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    search: 'खोजें',
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    profile: 'प्रोफ़ाइल',
    admin: 'एडमिन'
  },
  home: {
    title: 'भारत को राज्य दर राज्य खोजें',
    subtitle: 'भारत के सभी क्षेत्रों में पर्यटन स्थलों की खोज करें',
    exploreStates: 'राज्य खोजें',
    viewDestinations: 'पर्यटन स्थल देखें',
    featured: 'विशेष पर्यटन स्थल',
    categories: 'श्रेणियाँ',
    planYourJourney: 'अपनी यात्रा की योजना बनाएं'
  },
  states: {
    title: 'भारत के राज्य',
    subtitle: 'सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों में पर्यटन स्थलों की खोज करें',
    searchPlaceholder: 'राज्य, राजधानी या प्रसिद्ध स्थानों के नाम से खोजें...',
    noResults: 'कोई राज्य नहीं मिला',
    capital: 'राजधानी',
    region: 'क्षेत्र',
    destinations: 'पर्यटन स्थल',
    famousFor: 'प्रसिद्ध'
  },
  destinations: {
    title: 'पर्यटन स्थल',
    subtitle: 'भारत के सबसे खूबसूरत स्थलों, विरासत स्थलों और छिपे हुए रत्नों की खोज करें',
    searchPlaceholder: 'पर्यटन स्थलों को नाम से खोजें...',
    noResults: 'कोई पर्यटन स्थल नहीं मिला',
    rating: 'रेटिंग',
    bestTime: 'यात्रा का सर्वोत्तम समय',
    entryFee: 'प्रवेश शुल्क',
    timings: 'समय',
    nearbyAttractions: 'आस-पास के आकर्षण',
    categories: {
      all: 'सभी श्रेणियाँ',
      heritage: 'विरासत',
      nature: 'प्रकृति',
      adventure: 'साहसिक',
      religious: 'धार्मिक',
      beach: 'समुद्र तट',
      hillStation: 'पहाड़ी स्टेशन',
      wildlife: 'वन्यजीव'
    }
  },
  auth: {
    login: 'लॉगिन',
    register: 'पंजीकरण',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    username: 'उपयोगकर्ता नाम',
    forgotPassword: 'पासवर्ड भूल गए?',
    noAccount: 'खाता नहीं है?',
    hasAccount: 'पहले से खाता है?',
    welcomeBack: 'वापस स्वागत है',
    createAccount: 'खाता बनाएं'
  },
  admin: {
    dashboard: 'डैशबोर्ड',
    manageStates: 'राज्य प्रबंधन',
    manageDestinations: 'पर्यटन स्थल प्रबंधन',
    categories: 'श्रेणियाँ',
    addNew: 'नया जोड़ें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    confirmDelete: 'क्या आप वाकई हटाना चाहते हैं'
  },
  booking: {
    planYourJourney: 'अपनी यात्रा की योजना बनाएं',
    bookFlights: 'उड़ानें, ट्रेनें, बसें और भी बुक करें',
    flights: 'उड़ानें',
    trains: 'ट्रेनें',
    buses: 'बसें',
    cabs: 'कैब्स',
    accommodations: 'आवास',
    tourPackages: 'टूर पैकेज',
    oneWay: 'एक तरफा',
    roundTrip: 'दो तरफा',
    from: 'से',
    to: 'तक',
    depart: 'प्रस्थान',
    return: 'वापसी',
    travelers: 'यात्री',
    cabin: 'केबिन',
    search: 'खोजें'
  }
};

const resources = {
  en: { translation: en },
  hi: { translation: hi }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;