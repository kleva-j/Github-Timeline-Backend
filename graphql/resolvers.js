import axios from 'axios';
import { setQueryParams } from '../util';

const API_URL = process.env.GITHUB_JOBS_API;

export async function jobs(args) {
	let queryParams;
	const isArgsEmpty =
		Object.keys(args).length === 0 && args.constructor === Object;
	queryParams = isArgsEmpty ? '' : setQueryParams(args);
	const url = `${API_URL}.json${queryParams}`;

	try {
		const { data } = await axios.get(url);
		return data.map((job) => ({
			id: job.id,
			url: job.url,
			type: job.type,
			title: job.title,
			company: job.company,
			location: job.location,
			created_at: job.created_at,
			description: job.description,
			company_url: job.company_url || '',
			company_logo: job.company_logo || '',
			how_to_apply: job.how_to_apply || '',
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
			url: data.url,
			type: data.type,
			title: data.title,
			company: data.company,
			location: data.location,
			description: data.company,
			created_at: data.created_at,
			company_url: data.company_url,
			company_logo: data.company_logo,
			how_to_apply: data.how_to_apply,
		};
	} catch (error) {
		throw error;
	}
}
