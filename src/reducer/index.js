import { combineReducers } from "redux";
import DashboardReducer, {
	CompanyDetailsReducers,
	FetchWalletHistory,
	FetchBusinessDepartment,
	FetchSalaryHistory,
} from "./DashboardReducer";
import UserRegistration from './UserRegistration'
import { AddDepartment } from "../pages/business-registration/add-department/DepartmentAction";
import { FetchRegisteredBusinessList } from "./RegisterBusiness";
import { BusinessRegistration } from "../pages/business-registration/bank-details/DetailsAction";
import { AddEmployeeReducer } from "./LoginReducers";
import { PasswordLoginReducers } from "../pages/registration/loginpassword/LoginAction";
import { LoginReducers } from "../pages/registration/emailLogin/LoginAction";
import { FetchTaxHistoryReducer } from "../components/Dashboard/tax-history/TaxAction";
import { PayEmployeeReducer } from "../components/Dashboard/pay-employee/PayEmployeeAction";
import { UpdateEmployeeReducer } from "../components/Dashboard/Edit-employee/EditEmployeeAction";
import {
	FetchEmployeeReducer,
	DeleteEmployeeReducer,
} from "../components/Dashboard/view-employee/EmployeeAction";
import { UploadImageReducer } from "../components/Dashboard/Logo-upload/UploadAction";
// import AppReducers from "./AppReducers";

export default combineReducers({
	DashboardReducer,
	UserRegistration,
	BusinessRegistration,
	AddDepartment,
	LoginReducers,
	PasswordLoginReducers,
	FetchRegisteredBusinessList,
	CompanyDetailsReducers,
	FetchBusinessDepartment,
	FetchWalletHistory,
	FetchSalaryHistory,
	FetchTaxHistoryReducer,
	AddEmployeeReducer,
	PayEmployeeReducer,
	FetchEmployeeReducer,
	DeleteEmployeeReducer,
	UpdateEmployeeReducer,
	UploadImageReducer,
	// AppReducers,
	// form: formReducer,
});
