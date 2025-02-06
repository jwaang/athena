import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { UserResponse } from './types/User';
import { calculatePartTwo } from './utils';
import { fetchAllUsers } from './api/users';
import SocialSecurityClaim from './components/SocialSecurityClaim/SocialSecurityClaim';
import ClaimSummary from './components/ClaimSummary/ClaimSummary';

function App() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [currentUser, setCurrentUser] = useState<UserResponse>({} as UserResponse);
  const [retirementAge, setRetirementAge] = useState<number>(0);

  useEffect(() => {
    fetchAllUsers()
      .then(users => {
        setUsers(users);
        if (users.length > 0) {
          setCurrentUser(users[0]);
          setRetirementAge(users[0].assumptions.retirement_age);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  calculatePartTwo(users);

  return (
    <main className="interaction-container">
      <header className="recommendation-header">
        <h1>Best Social Security Claimed Age</h1>
        <h2>Our Recommendation</h2>
      </header>
      <ClaimSummary currentUser={currentUser} />
      <hr className="divider" />
      <SocialSecurityClaim users={users} currentUser={currentUser} setCurrentUser={setCurrentUser} retirementAge={retirementAge} setRetirementAge={setRetirementAge} />
    </main>
  )
}

export default App
