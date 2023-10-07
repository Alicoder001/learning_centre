import styled from 'styled-components';

export const AdminDashboardStyled = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding-bottom: 3rem;
	.category {
		display: grid;
		/* display: flex; */
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		align-items: center;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 3rem;
		&-item {
			max-width: 100%;
			width: 100%;
			background-color: var(--card-bg);
			padding: 2rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 1rem;
			flex-direction: column;
			gap: 1rem;
			box-shadow: var(--box-shadow);
			h3 {
				font-size: 2rem;
			}
			p {
				font-size: 1.7rem;
			}
		}
	}
	.lessons {
		background-color: var(--card-wrap);
		padding: 2.8rem 2rem;
		box-shadow: var(--box-shadow);
		border-radius: 2rem;
		width: 100%;
		margin-bottom: 3rem;
		display: flex;
		flex-direction: column;
		&-title {
			font-size: 3rem;
			margin-bottom: 2rem;
		}
		&-list {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: 0 0.4rem;
			overflow-y: scroll;
			/* max-height: 40rem; */
			height: 100%;
			margin-bottom: 2rem;
		}
		&-item {
			background-color: var(--card-bg);
			box-shadow: var(--box-shadow);
			border-radius: 1.5rem;
			padding: 1.8rem 2.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&__title {
				font-size: 2rem;
				margin-bottom: 2rem;
			}
			&__subt {
				font-size: 1.5rem;
			}
			&__right {
				text-align: end;
			}
		}
		.not-done {
			background-color: red;
			.lessons-item__title {
				font-size: 2rem;
				margin-bottom: 2rem;
				color: white;
			}
			.lessons-item__subt {
				font-size: 1.5rem;
				color: #f3c6c6;
			}
		}
	}
	.transactions {
		background-color: var(--card-wrap);
		padding: 2.8rem 2rem;
		box-shadow: var(--box-shadow);
		border-radius: 2rem;
		width: 100%;

		&-title {
			font-size: 3rem;
			margin-bottom: 2rem;
		}
		&-list {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: 0 0.4rem;
			overflow-y: scroll;
			max-height: 40rem;
			/* height: 100%; */
			margin-bottom: 2rem;
		}
		&-item {
			background-color: var(--card-bg);
			box-shadow: var(--box-shadow);
			border-radius: 1.5rem;
			padding: 1.8rem 2.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
`;
