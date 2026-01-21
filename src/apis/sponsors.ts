/**
 * Sponsors API Module
 * 
 * All API calls related to sponsors go here.
 */

import Api from './Api';

// Fetch all sponsors
export async function getSponsors() {
    return await Api.get('/euphuism-sponsors');
}
