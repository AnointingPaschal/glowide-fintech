import { Routes, Route, Link } from 'react-router-dom';
import { PublicLayout, AppLayout } from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Features from './pages/public/Features';
import Personal from './pages/public/Personal';
import Business from './pages/public/Business';
import Payments from './pages/public/Payments';
import Multichain from './pages/public/Multichain';
import Developers from './pages/public/Developers';
import Security from './pages/public/Security';
import Help from './pages/public/Help';
import Contact from './pages/public/Contact';
import Terms from './pages/public/Terms';
import Privacy from './pages/public/Privacy';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Dashboard from './pages/app/Dashboard';
import Money from './pages/app/Money';
import Transactions from './pages/app/Transactions';
import PaymentLinks from './pages/app/PaymentLinks';
import Qr from './pages/app/Qr';
import Scheduled from './pages/app/Scheduled';
import Wallet from './pages/app/Wallet';
import AddressBook from './pages/app/AddressBook';
import Ai from './pages/app/Ai';
import BusinessPortal from './pages/app/BusinessPortal';
import Settings from './pages/app/Settings';
import SecurityApp from './pages/app/Security';
import Notifications from './pages/app/Notifications';
import AdminOverview from './pages/admin/Overview';
import AdminUsers from './pages/admin/Users';
import AdminBusinesses from './pages/admin/Businesses';
import AdminTransactions from './pages/admin/TransactionsAdmin';
import AdminBlockchain from './pages/admin/Blockchain';
import AdminIntegrations from './pages/admin/Integrations';
import AiAdmin from './pages/admin/AiAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import Audit from './pages/admin/Audit';
import SecurityAdmin from './pages/admin/SecurityAdmin';
import { Page } from './components/ui';

function NotFound(){ return <Page><section className="mx-auto max-w-2xl px-4 py-24 text-center"><h1 className="text-4xl font-bold text-slate-900 dark:text-white">Page not found</h1><p className="mt-2 text-slate-500">That GlowIDE page does not exist.</p><Link to="/" className="btn-primary mt-6">Back home</Link></section></Page>; }

export default function App(){
 return <Routes>
  <Route element={<PublicLayout/>}>
   <Route path="/" element={<Home/>}/>
   <Route path="/about" element={<About/>}/><Route path="/features" element={<Features/>}/>
   <Route path="/personal" element={<Personal/>}/><Route path="/business" element={<Business/>}/>
   <Route path="/payments" element={<Payments/>}/><Route path="/multichain" element={<Multichain/>}/>
   <Route path="/developers" element={<Developers/>}/><Route path="/security" element={<Security/>}/>
   <Route path="/help" element={<Help/>}/><Route path="/contact" element={<Contact/>}/>
   <Route path="/terms" element={<Terms/>}/><Route path="/privacy" element={<Privacy/>}/>
   <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
   <Route path="*" element={<NotFound/>}/>
  </Route>
  <Route path="/app" element={<AppLayout/>}>
   <Route index element={<Dashboard/>}/>
   <Route path="send" element={<Money kind="send"/>}/><Route path="receive" element={<Money kind="receive"/>}/>
   <Route path="request" element={<Money kind="request"/>}/><Route path="deposit" element={<Money kind="deposit"/>}/>
   <Route path="withdraw" element={<Money kind="withdraw"/>}/><Route path="exchange" element={<Money kind="exchange"/>}/>
   <Route path="transactions" element={<Transactions/>}/><Route path="payment-links" element={<PaymentLinks/>}/>
   <Route path="qr" element={<Qr/>}/><Route path="scheduled" element={<Scheduled/>}/>
   <Route path="wallet" element={<Wallet/>}/><Route path="address-book" element={<AddressBook/>}/>
   <Route path="ai" element={<Ai/>}/><Route path="business" element={<BusinessPortal/>}/>
   <Route path="settings" element={<Settings/>}/><Route path="security" element={<SecurityApp/>}/>
   <Route path="notifications" element={<Notifications/>}/>
  </Route>
  <Route path="/business-portal" element={<AppLayout/>}><Route index element={<BusinessPortal/>}/></Route>
  <Route path="/admin" element={<AdminLayout/>}>
   <Route index element={<AdminOverview/>}/><Route path="users" element={<AdminUsers/>}/>
   <Route path="businesses" element={<AdminBusinesses/>}/><Route path="transactions" element={<AdminTransactions/>}/>
   <Route path="blockchain" element={<AdminBlockchain/>}/><Route path="integrations" element={<AdminIntegrations/>}/>
   <Route path="ai" element={<AiAdmin/>}/><Route path="settings" element={<SettingsAdmin/>}/>
   <Route path="audit" element={<Audit/>}/><Route path="security" element={<SecurityAdmin/>}/>
  </Route>
 </Routes>;
}
