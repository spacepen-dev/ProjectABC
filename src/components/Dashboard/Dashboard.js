import React, { useState } from "react";
import { Navbar, Container, Col, Row, Offcanvas } from "react-bootstrap";
import { Routes, Route,  } from "react-router-dom";
import SideBar from "./SideBar";
// import CompanyProfile from "./company-profile";
import Profile from "./company-profile/Profile";
import Overview from "./overview";
import ViewAccountHistory from "./view-account-history/ViewAccountHistory";
import AddEmployee from "./Add-employee";
import ViewEmployee from "./view-employee/ViewEmployee";
import ViewSalaryHistory from "./view-salary-history";
import SignOut from "./Sign-out";
import ViewTaxHistory from "./view-tax-history";
import EmployeeSalariesPage from "./pay-employee";
import CompanyWalletPage from "./companywallet";

const Dashboard = () => {
	const [page, setPage] = useState(1);

	return (
		<Container fluid>
			<Row className="row ">
				<Navbar bg="light" className="nav-bar" expand={false}>
					<Container fluid>
						<Navbar.Toggle aria-controls="offcanvasNavbar" />
						<Navbar.Offcanvas
							id="offcanvasNavbar"
							className="sidebar-menu"
							aria-labelledby="offcanvasNavbarLabel"
							placement="start">
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
							</Offcanvas.Header>
							<SideBar pageId={(id) => setPage(id)} page={page} />
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
				<Col className="d-none d-lg-block col-1">
					<SideBar pageId={(id) => setPage(id)} page={page} />
				</Col>
				<Col className="col-2">
					<Routes>
						<Route
							index
							element={<Overview getPageId={(id) => setPage(id)} />}
						/>
						<Route
							path="/overview"
							element={<Overview getPageId={(id) => setPage(id)} />}
						/>

						<Route path="/add/employee" element={<AddEmployee />} />
						<Route path="/view/employees" element={<ViewEmployee />} />
						<Route
							path="/view/salary/history"
							element={<ViewSalaryHistory />}
						/>
						<Route
							path="/view/wallet/history"
							element={<ViewAccountHistory />}
						/>
						<Route path="/view/tax/history" element={<ViewTaxHistory />} />

						<Route
							path="/pay/employee/salaries"
							element={<EmployeeSalariesPage />}
						/>

						<Route path="/company/profile" element={<Profile />} />
						<Route path="/top/up" element={<CompanyWalletPage />} />
						<Route path="/signout" element={<SignOut />} />
					</Routes>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
