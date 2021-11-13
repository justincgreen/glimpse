import styles from './Error.module.css'

const Error = (props) => {
	const { error } = props;
	return (
		<div className={`${styles.error_wrapper} error_ui`}>
			{ error }
		</div>
	)
}

export default Error;