import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import VerificationModal from "../Logo-upload/UploadModal";

import { Form, Button } from "react-bootstrap";
import Loaderbutton from "../../LoaderButton";
import { connect } from "react-redux";
import { FetchCompanyEmployee } from "../view-employee/EmployeeAction";
import { PayEmployeeSalary } from "./PayEmployeeAction";
import NetWorkErrors from "../../NetWorkErrors";
import useBusinessToken from "../../../hooks/useBusinessToken";
import useToken from "../../../hooks/useToken";
import useHandleResponse from "../../../hooks/useHandleResponse";

const initial = {
	request: false,
	response: "",
	netWorkError: "",
	errorMessage: false,
	modal: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "REQUEST":
			return { ...state, request: action.request };
		case "SUCCESS_RESPONSE":
			return {
				...state,
				response: action.response,
				modal: action.modal,
			};
		case "ERROR_RESPONSE":
			return {
				...state,
				response: action.response,
				errorMessage: action.errorMessage,
			};
		case "NETWORK_ERROR":
			return { ...state, netWorkError: action.payload };
		case "CLOSE_MODAL":
			return { ...state, modal: action.modal };
		default:
			return state;
	}
};

const EmployeeSalariesPage = ({
	companyEmployee,
	FetchCompanyEmployee,
	PayEmployeeSalary,
	paySalaryRes,
}) => {
	const navigate = useNavigate();
	const { bizToken } = useBusinessToken();
	const { token } = useToken();
	const [Data] = useHandleResponse(companyEmployee);

	let Months = new Set([
		new Date().getMonth(),
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
	]);

	Months = Array.from(Months);

	const GetMonth = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const Year = [new Date().getFullYear(), new Date().getFullYear() - 1];

	const currentDate = {
		month: GetMonth[new Date().getMonth()],
		year: new Date().getFullYear(),
	};
	const [modalState, setmodalState] = useState({
		modal: false,
		disabled: true,
	});
	const [selectedData, setSelectedData] = useState([]);
	const [selectedDate, setSelectedDate] = useState(currentDate);
	const [payment, setPayment] = useState({});
	// const [request, setRequest] = useState(false);
	const [val, setValue] = useState([]);

	// const value = useRef();

	const onChange = (e) => {
		const { name, value } = e.target;
		setValue([...val, { [name]: value }]);
	};

	const [state, dispatch] = useReducer(reducer, initial);

	// MAKE REQUEST TO FETCH EMPLOYEE DATA

	useEffect(() => {
		FetchCompanyEmployee({ businessToken: bizToken, userToken: token });
	}, [FetchCompanyEmployee, bizToken, token]);

	// FETCH DATA FROM THE REDUX STORE;

	const columns = [
		{ name: "FIRST NAME", selector: (row) => row.employeeFirstname },
		{ name: "LAST NAME", selector: (row) => row.employeeLastname },
		{
			name: "MONTHLY SALARY",
			selector: (row) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "NGN",
				}).format(row.employeeSalary),
		},
		// {
		//   name: "RELIEVES",
		//   selector: (row) =>
		//     new Intl.NumberFormat("en-US", {
		//       style: "currency",
		//       currency: "NGN",
		//     }).format(row.employee_relives),
		// },

		// { name: "DEPARTMENT", selector: (row) => row.employee_department },
		// { name: "ROLE", selector: (row) => row.employee_role },
		{ name: "EMAIL", selector: (row) => row.employeeEmail },
		{ name: "PHONE NUMBER", selector: (row) => row.employeePhoneNumber },
		// { name: "PHONE NUMBER", selector: (row) => row.employeePhoneNumber },

		// {
		//   name: "ANNUAL SALARY",
		//   selector: (row) =>
		//     new Intl.NumberFormat("en-US", {
		//       style: "currency",
		//       currency: "NGN",
		//     }).format(row.employee_annual_gross_salary),
		// },

		{ name: "ACCOUNT NAME", selector: (row) => row.employeeAccountName },
		{
			name: "ACCOUNT NUMBER",
			selector: (row) => row.employeeAccountNumber,
		},
		// { name: "BANK NAME", selector: (row) => row.employee_bank_name },
		// { name: "EMPLOYEE TOKEN", selector: (row) => row.employeeToken },

		// {
		//   cell: (row) => <EditCompanyEmployee data={row} />,
		//   ignoreRowClick: true,
		//   allowOverflow: true,
		//   name: "EDIT EMPLOYEE ",
		// },
		// {
		//   cell: (row) => (
		//     <DeleteEmployee data={row} deleteAction={DeleteEmployeeAction} />
		//   ),
		//   ignoreRowClick: true,
		//   allowOverflow: true,
		//   name: "REMOVE EMPLOYEE",
		// },
		{
			cell: (row) => (
				<input
					name="narration"
					type="text"
					placeholder="Add narration"
					className="py-2"
					onBlur={onChange}
				/>
			),
			// ignoreRowClick: true,
			// allowOverflow: true,
			name: "NARRATION",
		},
	];

	const checkedEmployeeData = ({ selectedRows, selectedCount }) => {
		let arr = [];
		if (!selectedCount) {
			setmodalState((state) => {
				return { ...state, disabled: true };
			});
		} else {
			setmodalState((state) => {
				return { ...state, disabled: false };
			});
		}
		if (val.length === 0) {
			selectedRows.forEach((cur) => {
				arr.push({ ...cur, narration: "Salary Payment" });
			});
		} else {
			val.forEach(({ narration }, index) => {
				if (!selectedRows[index]) {
					arr = selectedRows;
				} else {
					selectedRows.forEach((cur) => {
						// arr.push({ ...cur, narration: "Employee Salary Paid" });
						arr.push({ ...cur, narration });
					});
				}
			});
		}
		setSelectedData(arr, selectedCount);
	};

	const onDateChange = (e) => {
		const { name, value } = e.target;
		setSelectedDate((state) => {
			return { ...state, [name]: value };
		});
	};

	const sumMonthlySalary = (data) => {
		return data.reduce((acc, cur) => {
			return acc + parseFloat(cur.employeeSalary);
		}, 0);
	};

	const closeModal = () =>
		setmodalState((state) => {
			return { ...state, modal: false };
		});

	const onRequest = useCallback((arg) => {
		dispatch({ type: "REQUEST", request: arg });
	}, []);

	const onError = useCallback((arg) => {
		dispatch({ type: "ERROR_RESPONSE", response: arg, errorMessage: true });
	}, []);

	const onSuccess = useCallback((arg) => {
		dispatch({ type: "SUCCESS_RESPONSE", response: arg, modal: true });
	}, []);

	const onClose = useCallback(
		(arg) => {
			dispatch({ type: "CLOSE_MODAL", modal: false });
			window.location.reload();
			navigate("/view/salary/history");
		},
		[navigate]
	);

	useEffect(() => {
		if (!paySalaryRes) return null;
		else {
			onRequest(false);
			closeModal();
		}
	}, [paySalaryRes, onError, onSuccess, onRequest]);

	return (
		<div>
			<div>
				<h4 className="entire-page-headers">PAY SALARIES</h4>
			</div>
			<div className="paySelect">
				<Form className="form">
					<Form.Group className="mb-3 form-group" controlId="formSelect">
						<Form.Label>Month</Form.Label>
						<select size="sm" name="month" onChange={onDateChange}>
							{Months.map((month) => {
								return (
									<React.Fragment key={month}>
										<option value={GetMonth[month]}>{GetMonth[month]}</option>
									</React.Fragment>
								);
							})}
						</select>
					</Form.Group>
					<Form.Group className="mb-3 ms-4 form-group" controlId="formSelect">
						<Form.Label>Year</Form.Label>
						<select size="sm" name="year" onChange={onDateChange}>
							{Year.map((year) => {
								return (
									<React.Fragment>
										<option value={year}>{year}</option>
									</React.Fragment>
								);
							})}
						</select>
					</Form.Group>
				</Form>

				<div className="pBtn">
					<div className="pBtn">
						<Button
							type="submit"
							disabled={modalState.disabled ? true : false}
							className="payBtn py-2 px-3"
							onClick={function () {
								setPayment((state) => {
									return {
										...state,
										// tax: sumSelectedSalary(selectedData),
										month: sumMonthlySalary(selectedData),
									};
								});
								setmodalState((state) => {
									return { ...state, modal: true };
								});
							}}>
							Pay employees
						</Button>
					</div>
				</div>
			</div>

			<div className=" mt-5">
				<DataTable
					columns={columns}
					selectableRows
					data={Data}
					pagination
					onSelectedRowsChange={checkedEmployeeData}
				/>
			</div>
			{state.modal && (
				<VerificationModal
					message="Successful, We are processing this payment, we will notify you when we complete the payment."
					close={onClose}
				/>
			)}
			{state.errorMessage && <NetWorkErrors serverErr={state.response} />}
			{state.netWorkError && <NetWorkErrors serverErr={state.netWorkError} />}
			{modalState.modal && (
				<ModalPayEmployee
					date={selectedDate}
					payment={payment}
					data={selectedData}
					userToken={token}
					businessToken={bizToken}
					onCloseModal={closeModal}
					state={state}
					onRequestClick={(value) => onRequest(value)}
					payEmployee={PayEmployeeSalary}
				/>
			)}
		</div>
	);
};;

const ModalPayEmployee = ({
	date,
	payment,
	data,
	onCloseModal,
	state,
	onRequestClick,
	payEmployee,
	userToken,
	businessToken,
}) => {
	const { month } = payment;

	const onConfirm = (e) => {
		e.preventDefault();
		onRequestClick(true);
		payEmployee({ userToken, businessToken, employees: data });
		// console.log(data);
	};

	return ReactDOM.createPortal(
		<div>
			<div className="backdrop hidden"></div>
			<div className="modal-1 hidden">
				<div className="modal-row">
					<div className="column first-column">
						<p className="first-column-paragraph">Month</p>
						<p className="first-column-paragraph">Year</p>
						<p className="first-column-paragraph">Number of Employees</p>
						{/* <p className='first-column-paragraph'>Tax deductions</p> */}
						<p className="first-column-paragraph">Amount</p>
					</div>
					<div className="column second-column">
						<p className="second-column-paragraph">{date.month}</p>
						<p className="second-column-paragraph">{date.year}</p>
						<p className="second-column-paragraph">{`${data.length} Employees`}</p>
						{/* <p className='second-column-paragraph'>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NGN",
              }).format(0)}
            </p> */}
						<p className="second-column-paragraph">
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "NGN",
							}).format(month)}
						</p>
					</div>
				</div>
				<Form
					className="button-container double-btns d-flex justify-content-start align-items-center"
					onSubmit={onConfirm}>
					<Button
						type="button"
						className="button ms-auto"
						onClick={onCloseModal}>
						Close
					</Button>
					<Loaderbutton
						btnName="CONFIRM"
						request={state.request}
						btnStyle={" ms-4 me-3 next"}
					/>
				</Form>
			</div>
		</div>,
		document.querySelector("#ModalPayEmployee")
	);
};

const mapStateToProps = (state) => {
	return {
		companyEmployee: state.FetchEmployeeReducer,
		paySalaryRes: state.PayEmployeeReducer,
		// paySalaryErr: state.DashboardReducer.payEmployeeErr,
	};
};

export default connect(mapStateToProps, {
	FetchCompanyEmployee,
	PayEmployeeSalary,
})(EmployeeSalariesPage);
