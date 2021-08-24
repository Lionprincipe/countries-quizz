type AnswerItemProps = {
  isSelected: boolean
  isValid: boolean
  onClick: () => void
  value: string
  disabled: boolean
}
const AnswerItem: React.FC<AnswerItemProps> = ({
  isSelected,
  isValid,
  onClick,
  value,
  disabled,
}) => {
  return (
    <li
      className={`quizz-answer-item ${
        isValid ? 'success' : isSelected ? 'faillure' : ''
      } `}
      onClick={() => onClick()}
    >
      <span>{value}</span>
    </li>
  )
}

export default AnswerItem
