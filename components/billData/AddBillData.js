import styles from './AddBillData.module.css';
import TimeStamp from '../../components/ui/TimeStamp';

const AddBillData = (props) => {
	const {
		 billDataList, 
		 setBillDataList, 
		 billDescription, 
		 setBillDescription, 
		 billAmount, 
		 setBillAmount,
		 billDueDate,
		 setBillDueDate,
		 paid,
		 setPaid,
		 error,
		 setError
	 } = props;
	
	const handleForm = (e) => {
		e.preventDefault();
		
		if(billDescription === '') {
			setError('Enter a bill description');
			document.querySelector('.error_ui').classList.add('active');
			
			setTimeout(() => {
				document.querySelector('.error_ui').classList.remove('active');
			}, 3000)
		}else {
			// save bill data info to a new object
			const formattedDate = new Date(billDueDate).toLocaleDateString('en-US', {
				timeZone: 'UTC',
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});
			
			const billItem = {
				id: Date.now(),
				billDescription,
				billAmount,
				billDueDate: formattedDate,
				paid
			}
			
			// Add new bill item object to bill data array
			const updatedBillDataList = [...billDataList, billItem];
			
			// Add to bill data to local storage
			localStorage.setItem('billData', JSON.stringify(updatedBillDataList));			
			
			// Updated bill data list array
			setBillDataList(updatedBillDataList);
			setBillDescription('');
			setBillAmount(0);
			setBillDueDate('');
			setError('');
			
			setTimeout(() => {				
				const billElements = document.querySelectorAll('.bill_element');
				const billElementsCount = document.querySelectorAll('.bill_element').length;
				if(billElementsCount >= 1) {
					billElements.forEach((bill) => {
						bill.classList.add('animate-in')
					})
				}
			},200);	
		}				
	}
	
	return (
		<div className={styles.bill_data_info}>						
			<div className="shadow p-4 card_wrapper">
				<TimeStamp />
				<h3 className={styles.title}>Add bill information</h3>
				<form onSubmit={handleForm}>
					<div className="form-group">
						<label htmlFor="bill-description">Description</label>
						<input 
							id="bill-description"
							type="text" 
							placeholder="Enter description" 
							className="form-control" 
							value={billDescription} 
							onChange={(e) => setBillDescription(e.target.value)} 
						/>
					</div>
					
					<div className="form-group">
						<label htmlFor="bill-amount">Amount</label>
						<input 
							id="bill-amount"
							type="number" 
							placeholder="Enter amount" 
							className="form-control"
							value={billAmount} 
							onChange={(e) => setBillAmount(e.target.value)}  
						/>
					</div>	
					
					<div className="form-group">
						<label htmlFor="bill-due-date">Due Date</label>
						<input 
							type="date" 
							className="form-control"
							value={billDueDate}
							onChange={(e) => setBillDueDate(e.target.value)}
						/>
					</div>
					
					<button className="btn btn-purple mt-2">
						Add bill 
						<span className={`material-icons ${styles.material_icons}`}>
							add_circle_outline
						</span>
					</button>					
				</form>
			</div>
		</div>
	)
}

export default AddBillData;