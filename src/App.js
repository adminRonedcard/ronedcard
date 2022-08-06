import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import RegisterSendOtp from "./pages/RegisterSendOtp";
import VerifyOtpRegister from "./pages/VerifyOtpRegister";
import CreateUser from "./pages/CreateUser";
import UserDetails from "./pages/UserDetails";
import LoginSendOtp from "./pages/LoginSendOtp";
import VerifyOtpLogin from "./pages/VerifyOtpLogin";
import ProfileSettings from "./pages/ProfileSettings";
import AccountSettings from "./pages/AccountSettings";
import Wallet from "./pages/Wallet";
import BuyRoneCard from "./pages/BuyRoneCard";
import HomePage from "./pages/HomePage";
import ShareProfile from "./pages/ShareProfile";
import PaymentUser from "./pages/PaymentUser";
import SuccessPage from "./pages/SuccessPage";
import QrScan from "./pages/QrScan";
import Tc from "./pages/Tc";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import DisclaimerHome from "./pages/DisclaimerHome";
import TcHome from "./pages/TcHome";
import PrivacyPolicyHome from "./pages/PrivacyPolicyHome";
import CookiePolicyHome from "./pages/CookiePolicyHome";
import RefundPolicyHome from "./pages/RefundPolicyHome";
import About from "./pages/About";
import AboutHome from "./pages/AboutHome";
import CookiePolicy from "./pages/CookiePolicy";
import RefundPolicy from "./pages/RefundPolicy";
import EmailVerification from "./pages/EmailVerification";
import EmailUpdate from "./pages/EmailUpdate";
//import DevelopmentMode from "./pages/DevelopmentMode";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/register" component={RegisterSendOtp} />
          <Route path="/success-payment" component={SuccessPage} />
          <Route exact path="/profile" component={Main} />
          <Route path="/admin/email-update" component={EmailUpdate} />
          <Route path="/about" component={About} />
          <Route path="/link/about" component={AboutHome} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/link/disclaimer" component={DisclaimerHome} />
          <Route path="/terms-and-conditions" component={Tc} />
          <Route path="/link/terms-and-conditions" component={TcHome} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/link/privacy-policy" component={PrivacyPolicyHome} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/link/cookie-policy" component={CookiePolicyHome} />
          <Route path="/refund-policy" component={RefundPolicy} />
          <Route path="/link/refund-policy" component={RefundPolicyHome} />
          <Route path="/verifyotpregister" component={VerifyOtpRegister} />
          <Route path="/createuser" component={CreateUser} />
          <Route path="/userdetails" component={UserDetails} />
          <Route path="/login" component={LoginSendOtp} />
          <Route path="/verifyotplogin" component={VerifyOtpLogin} />
          <Route path="/settings/profile" component={ProfileSettings} />
          <Route path="/settings/Accont" component={AccountSettings} />
          <Route path="/settings/Wallet" component={Wallet} />
          <Route path="/settings/QR-code" component={QrScan} />
          <Route path="/buyronecard" component={BuyRoneCard} />
          <Route path="/profile/:id" component={ShareProfile} />
          <Route path="/email-verification" component={EmailVerification} />
          <Route path="/:id" component={PaymentUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
