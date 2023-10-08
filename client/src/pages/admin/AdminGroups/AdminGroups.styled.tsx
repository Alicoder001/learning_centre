import styled from 'styled-components';

export const AdminGroupStyled = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	.groups {
		background-color: var(--card-wrap);
		padding: 2.8rem 0 0;
		box-shadow: var(--box-shadow);
		/* border-radius: 2rem; */
		width: 100%;

		height: 100%;
		padding-bottom: 2rem;
		display: flex;
		flex-direction: column;
		&-title {
			font-size: 3rem;
			padding: 0 2rem;
		}
		&-list {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: 0 0.4rem;
			overflow-y: scroll;

			height: 100%;
			margin-bottom: 2rem;
			background-color: transparent;
			padding: 2rem 2.4rem 2.8rem;
		}
		&-item {
			background-color: var(--card-bg);
			box-shadow: var(--box-shadow);
			border-radius: 0.5rem;
			padding: 1.8rem 2.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			h3 {
				font-size: 2rem;
			}
			p {
				font-size: 1.4rem;
				color: var(--title-color);
			}
			&:hover {
				cursor: pointer;
			}
			&__teacher {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
	.not-active {
		background-color: rgba(179, 173, 173, 0.5);
		box-shadow: none;
	}
	.add-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 1.6rem;
		background-color: var(--primary-btn-bg);
		color: #fff;
		width: 14rem;
		height: 4.6rem;
		position: fixed;
		right: 4rem;
		bottom: 4rem;
		font-size: 1.5rem;
		font-weight: 700;
		transition: 0.3s;
		&:hover {
			cursor: pointer;
			scale: 1.05;
		}
	}
	.modal {
		display: none;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		z-index: 10;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		
	}
	.form {
		max-width: 41rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--card-bg);
		padding: 1rem 2rem;
		border-radius: 1.5rem;
		overflow-y: scroll;
	
		&-title {
			font-size: 3.6rem;
			line-height: 1.55;
			letter-spacing: -0.72px;
			color: var(--title-color);
			margin-bottom: 0.8rem;
		}
		&-subt {
			font-size: 1.6rem;
			line-height: 1;
			letter-spacing: 0.32px;
			color: var(--subt-color);
			margin-bottom: 3.6rem;
		}
		&-label {
			display: flex;
			flex-direction: column;

			span {
				font-size: 1.4rem;
				letter-spacing: 0.28px;
				color: var(--title-color);
				font-weight: 500;
				margin-bottom: 1.3rem;
			}
		}
		.input-wrap {
			position: relative;
			img {
				position: absolute;
				top: 1.8rem;
				right: 1.8rem;
			}
		}

		&-input {
			width: 100%;
			display: block;
			border: none;
			background-color: transparent;
			border-radius: 1.6rem;
			border: 1px solid var(--line-color);
			padding: 1.8rem 2.4rem;
			font-size: 1.4rem;
			margin-bottom: 3.3rem;
			&::placeholder {
				color: var(--subt-color);
			}
			&:focus {
				outline: none;
			}
		}
		.email-input {
			margin-bottom: 2.4rem;
		}
		&-btn {
			background-color: var(--primary-btn-bg);
			border: none;
			color: #fff;
			height: 5.4rem;
			border-radius: 1.6rem;
			font-weight: 700;
			letter-spacing: -0.28px;
			margin-bottom: 2.6rem;
		}
		&-create__subt {
			font-size: 1.4rem;
			color: var(--title-color);
			line-height: 2.6rem;
			letter-spacing: -0.28px;
			a {
				font-weight: 700;
				color: var(--primary-btn-bg);
			}
		}
	}
`;
