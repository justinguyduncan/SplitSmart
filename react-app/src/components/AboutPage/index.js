import './AboutPage.css';

function AboutPage() {
    return (
        <div className="about-page-container">
            <div className="slideshow">
                <h1>Less stress when sharing expenses<span id="swap-text"> </span></h1>
            </div>
            <div className="track-balances">
                <h2>Track balances</h2>
                <h3>Keep track of shared expenses, balances, and who owes who.</h3>
            </div>
            <div className="organize-expenses">
                <h2>Organize expenses</h2>
                <h3>Split expenses with any group: trips, housemates, friends, and family.</h3>
            </div>
            <div className="add-expenses-easily">
                <h2>Add expenses easily</h2>
                <h3>Quickly add expenses on the go before you forget who paid.</h3>
            </div>
            <div className="pay-friends-back">
                <h2>Pay friends back</h2>
                <h3>Settle up with a friend and record any cash or online payment.</h3>
            </div>
        </div>
    );
}

export default AboutPage;
