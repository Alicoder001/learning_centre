import styled from 'styled-components';

export const NavbarAdminStyled = styled.nav`
	width: 100%;
	padding-top: 2rem;
	margin-bottom: 2rem;
	.container {
		display: flex;
		justify-content: space-between;
	}
	.left-wrapper {
		display: flex;
		align-items: center;
		row-gap: 1rem;
		column-gap: 4rem;
		max-width: none;

		@media screen and (max-width: 1200px) {
			column-gap: 3rem;
		}
		.toggle {
			display: none;
			@media screen and (max-width: 768px) {
				display: block;
			}
		}
		&__logo {
			h1 {
				font-size: 2.6rem;
				line-height: 1.2;
				font-weight: 700;
				@media screen and (max-width: 1200px) {
					font-size: 2rem;
				}
			}
		}
		&__page {
			h1 {
				font-size: 3.4rem;
				line-height: 1.23;
				letter-spacing: -0.68px;
				@media screen and (max-width: 1200px) {
					font-size: 2.8rem;
				}
			}
			p {
				font-weight: 500;
				line-height: 1.7;
			}
		}
	}
	.right-wrapper {
		display: flex;
		align-items: center;
		padding: 1rem;
		border-radius: 3rem;
		background-color: var(--card-wrap);
		gap: 2rem;
		box-shadow: var(--box-shadow);
		@media screen and (max-width: 1200px) {
			gap: 1.5rem;
		}
		&__search {
			max-width: 21.4rem;
			width: 100%;
			display: flex;
			align-items: center;
			gap: 1.1rem;
			padding: 1rem 2rem;
			background-color: var(--bg);
			border-radius: 2rem;
			input {
				width: 100%;
				border: none;
				background-color: transparent;
				color: var(--title-color);
				outline: none;
				font-size: 1.4rem;
				line-height: 1.42;
				@media screen and (max-width: 680px) {
					display: none;
				}
				&::placeholder {
					color: var(--subt-color);
				}
			}
		}

		&__profile {
			position: relative;
			img {
				width: 4.1rem;
				height: 4.1rem;
				@media screen and (max-width: 1200px) {
					width: 3rem;
					height: 3rem;
				}
			}
			.profile-info {
				display: none;
				position: absolute;
				width: 20rem;
				background-color: var(--card-bg);
				top: 100%;
				right: -1rem;
				box-shadow: var(--box-shadow);
				ul {
					display: flex;
					flex-direction: column;
				}
				li {
					display: flex;
					align-items: center;
					justify-content: space-between;
					text-align: start;
					padding: 0.5rem 2rem;
					&:hover {
						background-color: var(--line-color);
						cursor: pointer;
					}
				}
				p {
					font-size: 1.4rem;
				}
			}
			&:hover {
				.profile-info {
					display: block;
				}
			}
		}
	}
`;
