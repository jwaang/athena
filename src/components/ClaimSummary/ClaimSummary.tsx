import { PieChart } from "react-minimal-pie-chart";
import { formatToThousands } from "../../utils";
import { UserResponse } from "../../types/User";
import './ClaimSummary.css';

const ClaimSummary = ({ currentUser }: { currentUser: UserResponse }) => {
  return (
    <section className="recommendation-details">
      <ul className="claim-options" aria-label="Claiming age options">
        <li><span className="primary-option">{currentUser?.user_info?.full_name?.split(' ')[0]} claim in 70</span></li>
      </ul>

      <figure className="pie-chart-container">
        <PieChart
          data={[
            { title: currentUser?.user_info?.full_name, value: currentUser?.user_info?.household_income || 0, color: '#090CBD' },
          ]}
          lineWidth={10}
          label={({ x, y, dx, dy, dataEntry }) => {
            return <text
              x={x}
              y={y}
              dx={dx}
              dy={dy}
              dominant-baseline="central"
              text-anchor="middle"
              color="black"
              style={{
                fontSize: '.5rem',
                "fontFamily": "Poppins",
                "fontWeight": "bold",
              }}
              fill="black"
            >
              {formatToThousands(dataEntry.value)}
            </text>
          }}
          labelPosition={-85}
        />
        <figcaption>Estimated Household Annual Income</figcaption>
        <div className="chart-value">{formatToThousands(currentUser?.user_info?.household_income || 0)}</div>
      </figure>
    </section>
  )
}

export default ClaimSummary;