import './AboutPage.css';
import trackBalances from './track-balances.png';
import organizeExpenses from './organize-expenses.png';
import addExpensesEasily from './add-expenses-easily.png';
import payFriendsBack from './pay-friends-back.png';

function AboutPage() {
    return (
        <div className="about-page-container">
            <div className="slideshow">
                <h1>Less stress when sharing expenses<span id="swap-text"> </span></h1>
            </div>
            <div className="about-page-images">
                <img className="track-balances" src={trackBalances}></img>
                <img className="organize-expenses" src={organizeExpenses}></img>
                <img className="add-expenses-easily" src={addExpensesEasily}></img>
                <img className="pay-friends-back" src={payFriendsBack}></img>
            </div>
        </div>
    );
}

export default AboutPage;
