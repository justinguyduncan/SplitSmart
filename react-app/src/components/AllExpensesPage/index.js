import LeftNavigationBar from "../LeftNavigationBar";
import PaymentDetailsSection from "../PaymentDetailsSection"
import "./AllExpensesPage.css"

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
