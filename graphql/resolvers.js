import axios from 'axios';

const API_URL = process.env.GITHUB_JOBS_API;

export async function jobs() {
	try {
		const { data } = await axios.get(`${API_URL}.json`);
		return data.map((job) => ({
			id: job.id,
			title: job.title,
			type: job.type,
			company: job.company,
			description: job.description,
			url: job.url,
			location: job.location,
			created_at: job.created_at,
		}));
	} catch (error) {
		throw error;
	}
}

export async function job(req, _res) {
	try {
		const { data } = await axios.get(`${API_URL}/${req.id}.json`);
		return {
			id: data.id,
			title: data.title,
			type: data.type,
			company: data.company,
			description: data.company,
			url: data.url,
			location: data.location,
			created_at: data.created_at,
		};
	} catch (error) {
		throw error;
	}
}
