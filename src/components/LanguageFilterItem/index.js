import './index.css'
// Write your code here
const LanguageFilterItem = props => {
  const {eachItem, updateSelectedFilter} = props
  const {id, language} = eachItem
  const onCLickLanguageFilter = () => {
    updateSelectedFilter(id)
  }
  return (
    <li className="language_item" onClick={onCLickLanguageFilter}>
      <button type="button">{language}</button>
    </li>
  )
}

export default LanguageFilterItem
