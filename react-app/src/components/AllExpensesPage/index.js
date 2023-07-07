import LeftNavigationBar from "../LeftNavigationBar";
import ExpenseDetailsSection from "../ExpenseDetailsSection"
function AllExpensesPage() {
    return (
        <>
            <h1>AllExpenses Page</h1>
            <LeftNavigationBar />
            <ExpenseDetailsSection expenseId={2}/>
        </>
    );
}

export default AllExpensesPage;
