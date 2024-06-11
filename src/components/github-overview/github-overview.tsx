import { Component, h, State } from '@stencil/core';
import { GitHubService } from '../../services/github-service';

@Component({
  tag: 'github-overview',
  styleUrl: 'github-overview.css',
  shadow: true,
})
export class GithubRepositories {
  @State() repos: any[] = [];
  @State() currentIndex: number = 0;
  private GitHubService = new GitHubService('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');

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

  render() {
    const currentRepo = this.getRepo(this.currentIndex);
    const prevRepo = this.getRepo(this.currentIndex - 1);
    const nextRepo = this.getRepo(this.currentIndex + 1);

    return (
      <div>
        <div class="carousel-container">
          <div class="carousel">
          <div class="button-wrapper" onClick={() => this.prevRepo()}></div>
          <div class="button-wrapper" onClick={() => this.nextRepo()}></div>          {prevRepo && (
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
          
        </div>
      </div>
    );
  }
}