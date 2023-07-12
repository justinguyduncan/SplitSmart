import receipt from "./receipt.jpeg";
import dollar from "./dollar.jpeg";


function SettledItems({ items, user, friendship, deleteExpense, deletePayment }) {

    function formatMoney(amount) {
        return "$" + String(Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    };

    return (
        <div id="settled-items"> SettledItems
            {items.map(obj => {
                const dateStr = new Date(obj.created_at).toDateString();
                const dateMonth = `${dateStr.split(" ")[1].toUpperCase()}`;
                const dateDay = `${dateStr.split(" ")[2]}`;
                switch (obj.type) {
                    case 'created':
                        return (
                            <div className="expense-header">
                                <div className="expense-header-date">
                                    <p className="expense-header-month">{dateMonth}</p>
                                    <p className="expense-header-day">{dateDay}</p>
                                </div>
                                <img className="expense-header-logo" src={receipt} alt="receipt-logo"></img>
                                <div className="expense-header-description">
                                    {obj.description}
                                </div>
                                <div className="expense-header-A">
                                    <p>you paid</p>
                                    <p>{formatMoney(obj.amount)}</p>
                                </div>
                                <div className="expense-header-B teal-amount">
                                    <p>you lent {friendship.friend.short_name}</p>
                                    <p>{formatMoney(obj.participants[0].amount_due)}</p>
                                </div>
                                <button className="delete-expense" onClick={() => deleteExpense(obj.id, true, obj.type)}>
                                    &#x2715;
                                </button>
                            </div>
                        );
                    case 'charged':
                        return (
                            <div className="expense-header">
                                <div className="expense-header-date">
                                    <p className="expense-header-month">{dateMonth}</p>
                                    <p className="expense-header-day">{dateDay}</p>
                                </div>
                                <img className="expense-header-logo" src={receipt} alt="receipt-logo"></img>
                                <div className="expense-header-description">
                                    {obj.expense.description}
                                </div>
                                <div className="expense-header-A">
                                    <p>{friendship.friend.short_name} paid</p>
                                    <p>{formatMoney(obj.expense.amount)}</p>
                                </div>
                                <div className="expense-header-B orange-amount">
                                    <p>{friendship.friend.short_name} lent you</p>
                                    <p>{formatMoney(obj.amount_due)}</p>
                                </div>
                                <button className="delete-expense" onClick={() => deleteExpense(obj.expense.id, true, obj.type)}>
                                    &#x2715;
                                </button>
                            </div>
                        );
                    case 'sent':
                        return (
                            <div className="payment-header">
                                <img className="payment-header-logo" src={dollar} alt="dollar-logo"></img>
                                <div className="payment-header-description">
                                    {user.short_name} paid {friendship.friend.short_name} {formatMoney(obj.amount)}
                                </div>
                                <div className="payment-header-A">
                                    you paid
                                </div>
                                <div className="payment-header-B teal-amount">
                                    {formatMoney(obj.amount)}
                                </div>
                                <button className="delete-payment" onClick={() => deletePayment(obj.id)}>
                                    &#x2715;
                                </button>
                            </div>
                        );
                    case 'received':
                        return (
                            <div className="payment-header">
                                <img className="payment-header-logo" src={dollar} alt="dollar-logo"></img>
                                <div className="payment-header-description">
                                    {friendship.friend.short_name} paid {user.short_name} {formatMoney(obj.amount)}
                                </div>
                                <div className="payment-header-A">
                                    you received
                                </div>
                                <div className="payment-header-B orange-amount">
                                    {formatMoney(obj.amount)}
                                </div>
                                <button className="delete-payment" onClick={() => deletePayment(obj.id)}>
                                    &#x2715;
                                </button>
                            </div>
                        );
                    default:
                        return <></>;
                }
            })}
        </div>
    );
}

export default SettledItems;
