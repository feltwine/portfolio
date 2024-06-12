import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

export class GitHubService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private getHeaders() {
    return {
      Authorization: `token ${this.token}`,
      Accept: 'application/vnd.github.v3+json',
    };
  }

  async getUser(username: string) {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async getRepos() {
    try {
        const response = await axios.get(`${GITHUB_API_BASE_URL}/user/repos`, {
            headers: this.getHeaders(),
            params: {
                affiliation: 'owner,collaborator',
                visibility: 'public',
                per_page: 100
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
}

}