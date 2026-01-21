/**
 * Team API Module
 * 
 * All API calls related to team/committee members go here.
 */

import Api from './Api';

// Fetch all committee members
export async function getTeamMembers() {
    return await Api.get('/euphuism-team');
}

// Fetch WebDev committee members
export async function getWebDevTeam() {
    return await Api.get('/euphuism-team', {
        filter: { department: 'webdev' },
    });
}
