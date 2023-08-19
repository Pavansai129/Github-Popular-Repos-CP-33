import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusObj = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    selectedFilterId: 'ALL',
    githubReposList: [],
    apiStatus: apiStatusObj.loading,
  }

  componentDidMount() {
    this.getGithubRepos()
  }

  updateSelectedFilter = id => {
    this.setState({selectedFilterId: id}, this.getGithubRepos)
  }

  getGithubRepos = async () => {
    this.setState({apiStatus: 'loading'})
    const {selectedFilterId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${selectedFilterId}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedPopularRepos = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
      }))
      this.setState({
        apiStatus: apiStatusObj.success,
        githubReposList: updatedPopularRepos,
      })
    } else if (response.status === 502) {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

  renderLanguageFilterItems = () => (
    <ul className="list">
      {languageFiltersData.map(eachFilterItem => (
        <LanguageFilterItem
          key={eachFilterItem.id}
          eachItem={eachFilterItem}
          updateSelectedFilter={this.updateSelectedFilter}
        />
      ))}
    </ul>
  )

  renderGithubRepos = () => {
    const {githubReposList} = this.state
    return (
      <ul className="list">
        {githubReposList.map(each => (
          <RepositoryItem key={each.id} repoItem={each} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'loading':
        return this.renderLoadingView()
      case 'success':
        return this.renderGithubRepos()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  render() {
    return (
      <div>
        <h1>Popular</h1>
        {this.renderLanguageFilterItems()}
        {this.renderRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
