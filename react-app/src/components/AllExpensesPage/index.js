import LeftNavigationBar from "../LeftNavigationBar";
import PaymentDetailsSection from "../PaymentDetailsSection"

function AllExpensesPage() {
    return (
        <>
            <h1>AllExpenses Page</h1>
            <LeftNavigationBar />
            <PaymentDetailsSection paymentId={2} />
        </>
    );
}

export default AllExpensesPage;
