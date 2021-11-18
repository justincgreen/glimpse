import styles from './BillList.module.css';
import { useEffect } from 'react';

const BillList = (props) => {
	const { 
		billDataList, 
		setBillDataList,
		paid,
		setPaid,
		billsTotal,
		setBillsTotal,
		formHidden,
		setFormHidden
	} = props;
	
	// Delete bill item
	const deleteBill = (id) => {
		const filterItems = billDataList.filter((element) => {
			return element.id !== id; 
		})		
				
		setBillDataList(filterItems);
		localStorage.setItem('billData', JSON.stringify(filterItems));		
	}	
	
	// Delete all bill items
	const deleteAllBills = () => {
		setBillDataList([]);
		setBillsTotal(0);
		localStorage.setItem('billData', '[]');
		localStorage.setItem('billsTotal', '0');
	}
	
	// Show form
	const showForm = () => {
		setFormHidden(!formHidden);
		
		// scroll back to top - behavior for mobile
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}
	
	useEffect(() => {
		// Hide paid button on bill items if paid class has already been applied previously
		const billItemsPaid = document.querySelectorAll('.bill_element');
		billItemsPaid.forEach((billItem) => {
			if(billItem.classList.contains('paid')) {
				billItem.querySelector('.btn-paid').style.display = 'none';
			}
		});
	},[billDataList]);
	
	useEffect(() => {
		// if Bill elements are greater than or equal to 1 add local storage class to offset default .bill_element css properties 
		// other wise the bill elements wouldn't be visible due to them being set to top: -50px; and opacity: 0; by default
		// because these items are saved in local storage they need to be accounted for on page load
		const billElements = document.querySelectorAll('.bill_element');
		const billElementsCount = document.querySelectorAll('.bill_element').length;
		if(billElementsCount >= 1) {
			billElements.forEach((bill) => {
				bill.classList.add('local-storage');
			})
		}
	}, [billDataList])
	
	return (
		<div className={`${styles.bill_list} bill_list`}>
			<h3 className={styles.bill_list_heading}>Bill List</h3>
			{
				billDataList.length >= 1 && (
					<h6>Total Amount: ${billsTotal.toFixed(2)}</h6>
				)
			}
							
			{
				billDataList.length < 1 && (
					<div>
						<h6>You currently have no items in your list</h6>
					</div>
				)
			}
			{
				billDataList.length > 0 && (
					billDataList.map((bill) => {
						return (
							<div key={bill.id} className={`${styles.bill_item} bill_element ${bill.paid === true ? 'paid' : ''}`}>
								<div className="clearfix">									
									<span className={`${styles.badge_due_date} badge badge-orange`}>
										Due date: {bill.billDueDate}
									</span>
								</div>
								
								<div>
									<span className="bill_description">{bill.billDescription}</span>
								
									<span className={`${styles.badge_bill_amount} badge badge-primary`}>
										${bill.billAmount} 
									</span>								
								</div>
								
								<div className="mt-2">
									<button className="btn btn-sm btn-paid btn-purple mr-2" onClick={
										(e) => {
											// Grab the specific bill item we are looking for
											const filterBill = billDataList.findIndex((element) => {
												return element.id === bill.id;												
											});
											
											// Create a fresh copy of the billDataList array
											const newBillDataList = [...billDataList];
											
											// Update the paid state in the specific object in the array and then update the billDataList state
											newBillDataList[filterBill] = {...newBillDataList[filterBill], paid: true};
											setBillDataList(newBillDataList);
											
											// Add new array to local storage
											localStorage.setItem('billData', JSON.stringify(newBillDataList));
											
											// Add paid class to element
											e.target.parentNode.parentNode.classList.add('paid');
											
											// Hide paid button
											e.target.style.display = 'none';											
										}
									}>Paid</button>											
									<button className="btn btn-sm btn-danger" onClick={
										(e) => {
											e.target.parentNode.parentNode.classList.add('remove-animation');
											
											// Subtract bills total amount from the removed bill item amount to get the updated amount
											const updatedAmount = parseFloat(billsTotal) - parseFloat(bill.billAmount);
											
											setBillsTotal(updatedAmount);
											localStorage.setItem('billsTotal', JSON.stringify(updatedAmount));
											
											setTimeout(() => {												
												deleteBill(bill.id);
											}, 300);
										}
									}>
										Remove
									</button>
								</div>
																
							</div>
						)
					})
				)
			}
			{
				formHidden === true && (
					<div className="float-left">
						<button className="btn btn-sm btn-purple" onClick={showForm}>Show form</button>
					</div>				
				)
			}
			{
				billDataList.length > 1 && (
					<div className="text-right">
						<button className="btn btn-sm btn-danger" onClick={deleteAllBills}>Remove all bills</button>
					</div>
				)
			}				
		</div>
	)
}

export default BillList;