import styled from 'styled-components';
import { loginBgLight } from '../../images';

export const LoginStyled = styled.div`
	display: flex;
	min-height: 100vh;

	.login-container {
		max-width: 72rem;
		width: 100%;
		height: 100%;
		padding: 2rem;
	}
	.left-container {
		margin-left: auto;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		position: relative;
	}
	.right-container {
		margin: 0;
		margin-right: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
	.left-wrap {
		&__back {
			top: 4rem;

			position: absolute;
			display: flex;
			align-items: center;
			gap: 0.6rem;
			a {
				color: var(--subt-color);
				font-weight: 500;
				font-size: 1.4rem;
			}
		}
	}
	.form {
		max-width: 41rem;
		width: 100%;
		display: flex;
		flex-direction: column;
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
	.right-wrapper {
		background-image: url(${loginBgLight});
		background-size: cover;
		background-repeat: no-repeat;
		border-bottom-left-radius: 150px;
	}
	.login-wrapper {
		width: 50%;
		position: relative;
		&__logo {
			width: 20rem;
			height: 20rem;
			margin-bottom: 2.3rem;
		}
		&__logo-name {
			font-size: 3rem;
			line-height: 1;
			margin-bottom: 10rem;
		}
		&__box {
			padding: 3.1rem 12.7rem;
			border-radius: 2.6rem;
			border: 2.198px solid var(--line-color);
			text-align: center;
			span {
				margin-bottom: 3rem;
				font-size: 1.7rem;
			}
			p {
				font-size: 2rem;
				font-weight: 700;
				line-height: 1.7;
			}
		}
		&__mode {
			position: absolute;
			bottom: 3rem;
			right: 3rem;
			&:hover {
				cursor: pointer;
			}
		}
	}
	input {
		color: var(--title-color);
	}
`;
