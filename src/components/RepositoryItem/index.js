import './index.css'
// Write your code here
const RepositoryItem = props => {
  const {repoItem} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = repoItem
  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="repo-name">{name}</h1>
      <div className="count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="image"
        />
        <p>{starsCount}</p>
      </div>
      <div className="count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="image"
        />
        <p>{forksCount}</p>
      </div>
      <div className="count">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="image"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
