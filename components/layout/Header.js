import styles from './main-header.module.css';
import { useState, useEffect } from 'react';

const Header = (props) => {
	const { darkMode, setDarkMode } = props;
	
	const handleColorMode = () => {
		setDarkMode(!darkMode);
		
		if(!darkMode) {			
			localStorage.setItem('colorMode', 'darkMode');
			document.body.classList.add('darkMode');
			document.querySelector('.material-icons').style.color = '#353a48';
		}else {
			localStorage.setItem('colorMode', 'lightMode');
			document.body.classList.remove('darkMode');
			document.querySelector('.material-icons').style.color = '#fff';
		}
	}
	
	useEffect(() => {
		// Light / dark mode local storage functionality when app loads
		const localData = localStorage.getItem('colorMode');
		
		if(localData === 'lightMode') {
			document.body.classList.remove('darkMode');
			document.querySelector('.material-icons').style.color = '#fff';
		}
		
		if(localData === 'darkMode') {
			setDarkMode(!darkMode);
			document.body.classList.add('darkMode');
			document.querySelector('.material-icons').style.color = '#353a48';
		}
		
	}, [setDarkMode]);
	
	return (
		<header className={styles.mainHeader}>
			<div className="container relative">
				<h1 className={styles.logo}>(G)</h1>
				<span className={styles.colorMode}>
					<span className={`material-icons ${styles.material_icons}`} onClick={handleColorMode}>
						brightness_6
					</span>
				</span>
			</div>			
		</header>
	)
}

export default Header;