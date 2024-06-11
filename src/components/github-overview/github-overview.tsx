import { Component, h, State } from '@stencil/core';
import { GitHubService } from '../../services/github-service';
import { GITHUB_API_TOKEN } from '../../../github-token';

@Component({
  tag: 'github-overview',
  styleUrl: 'github-overview.css',
  shadow: true,
})
export class GithubRepositories {
  @State() repos: any[] = [];
  @State() currentIndex: number = 0;

  private GitHubService = new GitHubService(GITHUB_API_TOKEN);

  async componentWillLoad() {
    try {
      const repos = await this.GitHubService.getRepos('feltwine');
      this.repos = repos;
    } catch (error) {
      console.error("Error loading repositories: ", error);
    }
  }

  nextRepo() {
    this.currentIndex = (this.currentIndex + 1) % this.repos.length;
  }

  prevRepo() {
    this.currentIndex = (this.currentIndex - 1 + this.repos.length) % this.repos.length;
  }

  getRepo(index: number) {
    return this.repos[(index + this.repos.length) % this.repos.length];
  }

  formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  render() {
    const currentRepo = this.getRepo(this.currentIndex);
    const prevRepo = this.getRepo(this.currentIndex - 1);
    const nextRepo = this.getRepo(this.currentIndex + 1);

    return (
      <div class="main">
        <div class="carousel-container">
          <div class="carousel">
            <div class="button-wrapper" onClick={() => this.prevRepo()}></div>
            <div class="button-wrapper" onClick={() => this.nextRepo()}></div>
            {prevRepo && (
              <div class="repo-card side-card">
                <h2>{prevRepo.name}</h2>
                <p>{prevRepo.description}</p>
              </div>
            )}
            {currentRepo && (
              <div class="repo-card main-card">
                <h2>{currentRepo.name}</h2>
                <p>{currentRepo.description}</p>
              </div>
            )}
            {nextRepo && (
              <div class="repo-card side-card">
                <h2>{nextRepo.name}</h2>
                <p>{nextRepo.description}</p>
              </div>
            )}
          </div>
        </div>
        <div class="repo-detail">
          {currentRepo && (
            <div>
              <h3>Additional Details</h3>
              <ul>
                <li><strong>Programming Language:</strong> {currentRepo.language}</li>
                <li><strong>Last Updated:</strong> {this.formatDate(currentRepo.updated_at)}</li>
                <li><strong>Number of Stars:</strong> {currentRepo.stargazers_count}</li>
                <li><strong>License:</strong> {currentRepo.license ? currentRepo.license.name : 'N/A'}</li>
                <li><strong>Contributors:</strong> {currentRepo.contributors}</li>
                <li><strong>Open Issues:</strong> {currentRepo.open_issues}</li>
                {/* Add more details as needed */}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}
