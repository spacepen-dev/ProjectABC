import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
// import TableSpinner from "./TableSpinner";
import EditCompanyEmployee from "../EditCompanyEmployee";
import { DeleteEmployeeAction } from "./EmployeeAction";
import { FetchCompanyEmployee } from "./EmployeeAction";
import DeleteEmployee from "../OptionsModal";
import useBusinessToken from "../../../hooks/useBusinessToken";
import useToken from "../../../hooks/useToken";
import useHandleResponse from "../../../hooks/useHandleResponse";
// import { EmployeeIcon } from "./svg/SVG";

const ViewEmployee = ({
	FetchCompanyEmployee,
	companyEmployee,
	DeleteEmployeeAction,
}) => {
	const [filterValue, setFilterValue] = useState("");
	const [pending, setPending] = useState(false);
	const { bizToken } = useBusinessToken();
	const { token } = useToken();
	const [Data] = useHandleResponse(companyEmployee);

	// FETCH ALL COMPANY EMPLOYEE DATA AND FETCH TOKEN FROM CACHE
	useEffect(() => {
		setPending(true);
		FetchCompanyEmployee({ businessToken: bizToken, userToken: token });
	}, [FetchCompanyEmployee, bizToken, token]);

	// GET EMPLOYEE DATA

	const heading = [
		{ name: "FIRST NAME", selector: (row) => row.employeeFirstname },
		{ name: "LAST NAME", selector: (row) => row.employeeLastname },
		{ name: "EMAIL", selector: (row) => row.employeeEmail },
		{ name: "STATE", selector: (row) => row.employeeState },
		{ name: "PHONE", selector: (row) => row.employeePhoneNumber },
		{ name: "DEPARTMENT", selector: (row) => row.employeeDepartment },
		{ name: "ROLE", selector: (row) => row.employeeRole },
		{
			name: "MONTHLY SALARY",
			selector: (row) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "NGN",
				}).format(row.employeeSalary),
		},
		{
			name: "ANNUAL SALARY",
			selector: (row) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "NGN",
				}).format(row.employeeAnnualGrossSalary),
		},
		{
			name: "RELIEVES",
			selector: (row) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "NGN",
				}).format(row.employeeRelives),
		},
		{ name: "ACCOUNT NAME", selector: (row) => row.employeeAccountName },
		{
			name: "ACCOUNT NUMBER",
			selector: (row) => row.employeeAccountNumber,
		},
		{ name: "BANK NAME", selector: (row) => row.employeeBankName },
		{ name: "TIN", selector: (row) => console.log(row.employeeTin) },
		// { name: "EMPLOYEE TOKEN", selector: (row) => row.employeeToken },

		{
			cell: (row) => <EditCompanyEmployee data={row} />,
			ignoreRowClick: true,
			allowOverflow: true,
			name: "EDIT EMPLOYEE ",
		},
		{
			cell: (row) => (
				<DeleteEmployee data={row} deleteAction={DeleteEmployeeAction} />
			),
			ignoreRowClick: true,
			allowOverflow: true,
			name: "REMOVE EMPLOYEE",
		},
	];

	const onFilterChange = (e) => {
		setFilterValue(e.target.value);
	};

	// GET EMPLOYEE DATA
	useEffect(() => {
		if (!companyEmployee) {
			return null;
		}
		setPending(false);

		return;
	}, [companyEmployee]);

	const filteredItems = Data?.filter((item) => {
		return String(Object.values(item))
			.toLowerCase()
			.includes(filterValue.toLowerCase());
	});

	return (
		<div className="mt-1">
			<div>
				<h4 className="entire-page-headers">REGISTERED EMPLOYEE</h4>
			</div>
			<div className="filter-container d-flex align-items-end justify-content-center">
				<div className="w-100 px-4 py-2 my-2">
					<input
						className="w-100 filter-input px-3 rounded"
						id="filterInput"
						type="text"
						placeholder="Search Employee Details..."
						onChange={onFilterChange}
					/>
				</div>
			</div>
			<DataTable
				columns={heading}
				data={filteredItems}
				progressPending={pending}
				striped
				pagination
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		companyEmployee: state.FetchEmployeeReducer,
		removeEmployeeRes: state.DashboardReducer.removeEmployee,
	};
};

export default connect(mapStateToProps, {
  FetchCompanyEmployee,
  DeleteEmployeeAction,
})(ViewEmployee);
