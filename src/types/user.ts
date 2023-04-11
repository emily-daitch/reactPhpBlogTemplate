const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
};

module.exports = {
    ROLE: ROLE,
    users: [
        {
            id: 1, name: 'Emily', role: ROLE.ADMIN
        }
    ],
    projects: [
        {
            id: 1, name: 'Strava', userId: 1s
        }
    ]
}