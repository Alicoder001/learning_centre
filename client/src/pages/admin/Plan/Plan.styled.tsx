import styled from 'styled-components';

const PlanStyled = styled.div`
	height: 100%;
	padding-top: 10rem;
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15rem;
	}
	.plan {
		&-title {
			font-size: 3rem;
		}
		&-list {
			display: flex;
			max-width: 90rem;
			width: 100%;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			gap: 3rem;
			padding: 1rem;
		}
		&-item {
			padding: 2rem;
			text-align: center;
			max-width: 30%;
			height: 15rem;
			width: 100%;
			background-color: var(--card-bg);
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 1.5rem;
			box-shadow: var(--box-shadow);
			transition: 0.3s;
			min-width: 15rem;
			&:hover {
				scale: 1.1;
				cursor: pointer;
			}
		}
	}
`;
export default PlanStyled;
