import { DashboardContext } from "../context";
import { useContext } from "react";

function useDashboard() {
    return useContext(DashboardContext.Context)
}

export default useDashboard;