import { UserResponse } from "./types/User";

export const formatToThousands = (value: number): string => {
    if (!value) return '0K';

    const roundedThousands = Math.round(value / 1000);

    return `${roundedThousands}K`;
};

export const calculatePartTwo = (users: UserResponse[]) => {
    console.log('All users: ', users)
    // Sort the users alphabetically by last name 
    console.log('Sorted users by last name: ', users.sort((a, b) => a.user_info.full_name.split(' ')[1].localeCompare(b.user_info.full_name.split(' ')[1])))
    // Only display users with income greater than $250,000 
    console.log('Users with income greater than $250,000: ', users.filter(user => user.user_info.household_income > 250000))
    // Sort users by age and only show users who are eligible. 
    console.log('Users sorted by age and eligible: ', users
        .map(user => ({
            ...user,
            age: new Date().getFullYear() - new Date(user.user_info.date_of_birth).getFullYear()
        }))
        .filter(user => user.age >= 40)
        .sort((a, b) => a.age - b.age))

}