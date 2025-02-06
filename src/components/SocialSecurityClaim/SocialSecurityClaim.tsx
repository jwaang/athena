import { UserResponse } from "../../types/User";
import './SocialSecurityClaim.css';

const SocialSecurityClaim = ({ users, currentUser, setCurrentUser, retirementAge, setRetirementAge }: { users: UserResponse[], currentUser: UserResponse, setCurrentUser: (user: UserResponse) => void, retirementAge: number, setRetirementAge: (age: number) => void }) => {
    return (
        <section className="household-config">
            <div className="form-group">
                <label htmlFor="household-members">Household Members</label>
                <select id="household-members" name="household-members" onChange={(e) => {
                    const selected = users.find(u => u.user_info.full_name === e.target.value);
                    if (selected) {
                        setCurrentUser(selected);
                        setRetirementAge(selected.assumptions.retirement_age);
                    }
                }}
                    value={currentUser?.user_info?.full_name || ''}>
                    <option value="">Choose...</option>
                    {users.map(user => (
                        <option
                            key={user.user_info.full_name}
                            value={user.user_info.full_name}
                        >
                            {user.user_info.full_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="retirement-controls">
                <div className="retire-age-group">
                    <label htmlFor="retire-age">Your ideal retire age</label>
                    <div className="number-input-wrapper">
                        <input
                            type="number"
                            id="retire-age"
                            value={retirementAge}
                            aria-label="Retirement age"
                        />
                        <div className="spinner-buttons">
                            <button aria-label="Increase age" onClick={() => {
                                setRetirementAge(retirementAge + 1)
                            }}>▲</button>
                            <button aria-label="Decrease age" onClick={() => {
                                setRetirementAge(retirementAge - 1)
                            }}>▼</button>
                        </div>
                    </div>
                </div>

                <div className="payment-display">
                    <label>Annual Social Security Payment</label>
                    <output className="payment-amount">$18,000</output>
                </div>
            </div>

            <div className="action-buttons">
                <button className="secondary-button" onClick={() => {
                    console.log(`${currentUser?.user_info?.full_name} - ${retirementAge}`)
                }}>Use ideal {retirementAge}</button>
                <button className="primary-button" onClick={() => {
                    console.log(`${currentUser?.user_info?.full_name} - 70`)
                }}>Accept 70</button>
            </div>
        </section>
    )
}

export default SocialSecurityClaim;