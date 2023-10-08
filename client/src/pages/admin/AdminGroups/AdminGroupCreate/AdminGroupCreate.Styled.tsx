import styled from 'styled-components';

export const AdminGroupCreateStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	background-color: var(--card-wrap);
	box-shadow: var(--box-shadow);
	padding: 3rem;
	.form {
		max-width: 100rem;
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
			margin-bottom: 1.6rem;
		}
		&-wrap {
			display: flex;
			justify-content: space-between;
			width: 100%;
			column-gap: 3rem;
			row-gap: 1rem;
			align-items: center;
		}
		&-label {
			display: flex;
			flex-direction: column;
			width: 50%;
			row-gap: 1rem;
			position: relative;
			justify-content: center;
			button {
				box-shadow: var(--box-shadow);
				padding: 0.5rem 2rem;
				border-radius: 2px;
				color: var(--subt-color);
				text-align: start;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 2.4rem;
				&:hover {
					cursor: pointer;
				}
			}
			span {
				font-size: 1.4rem;
				letter-spacing: 0.28px;
				color: var(--title-color);
				font-weight: 500;
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
			flex-shrink: 0;
			font-size: 2rem;
			margin-top: 3rem;
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
		.check-label {
			display: flex;
			flex-direction: row;

			gap: 2rem;
			span {
				margin: 0;
				font-size: 1.7rem;
			}
			input {
				width: 2rem;
				height: 2rem;
			}
		}
		select {
			width: 100%;
			padding: 1rem;
			box-shadow: var(--box-shadow);
			padding: 0.5rem 2rem;
			border-radius: 2px;
			color: var(--subt-color);
			outline: none;
			margin-bottom: 2.4rem;
		}
		.select {
			position: absolute;
			right: 0;
			top: 85%;
			width: 100%;
			background-color: var(--card-bg);
			z-index: 10;
			box-shadow: var(--box-shadow);
			border-radius: 5px;
			display: none;

			&-item {
				padding: 1rem 2rem;
				font-size: 1.4rem;
				&:hover {
					background-color: var(--line-color);
					cursor: pointer;
				}
			}
		}
		.show {
			display: block;
		}
		.message {
			color: #1cf11c;
		}
		.error {
			color: red;
		}
	}
`;
