import React from 'react';
import PropTypes from 'prop-types';
import '../../src/assets/scss/goal/goalitem.scss';

const GoalItem = ({ date, title, onClick }) => {
  return (
    <div className="goal-item" onClick={onClick}>
      <div className="goal-date">{date}</div>
      <div className="goal-title">{title}</div>
    </div>
  );
};

GoalItem.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GoalItem;
