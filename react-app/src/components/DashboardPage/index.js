import LeftNavigationBar from "../LeftNavigationBar";
import TopNavigationBar from "../TopNavigationBar";
import MainHeader from "../MainHeader"
import { useEffect } from "react";
import { getSettledExpenses, getUnsettledExpenses } from "../../store/expense";
import { useSelector, useDispatch } from "react-redux";
function DashboardPage() {
    const dispatch=useDispatch()
    const unsettledExpenses=useSelector((state)=>console.log(state))
    useEffect(()=>{
        dispatch(getUnsettledExpenses())
        dispatch(getSettledExpenses())
    },[])
    return (
        <>
            
            <TopNavigationBar/>
            <LeftNavigationBar/>
            <MainHeader/>
        </>
    );
}

export default DashboardPage;
