import LeftNavigationBar from "../LeftNavigationBar";
import TopNavigationBar from "../TopNavigationBar";
import MainHeader from "../MainHeader"
import { useEffect, useState } from "react";
import { getSettledExpenses, getUnsettledExpenses, getSummary} from "../../store/expense";
import { useSelector, useDispatch } from "react-redux";
function DashboardPage() {
    const dispatch=useDispatch()
    const unsettledExpenses=useSelector((state)=>Object.values(state.expense.unsettledExpenses))
    const summary = useSelector((state)=>state.expense.summary)

   

    useEffect(()=>{
        dispatch(getUnsettledExpenses())
        dispatch(getSettledExpenses())
        dispatch(getSummary())
    },[])
    return (
        <>
            
            <TopNavigationBar/>
            <LeftNavigationBar/>
            <MainHeader/>

            <section>
                <p>
                total balance: ${+(summary.balance)}.00
                </p>
                <p>
                you owe: ${+(summary['you owe'])}
                </p>
                <p>
                you are owed: ${+(summary['you are owed'])}.00
                </p>

            </section>

            <section>
                {unsettledExpenses.map(item=>(
                    <li>
                        ${+(item.amount_due)}.00
                    </li>
                ))}
            </section>
        </>
    );
}

export default DashboardPage;
