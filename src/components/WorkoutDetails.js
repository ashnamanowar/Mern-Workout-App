import { useState } from 'react';
import Confetti from 'react-confetti';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [progress, setProgress] = useState(workout.progress);
  const [showConfetti, setShowConfetti] = useState(false);


  const handleProgressClick = async (e) => {
    const barWidth = e.target.offsetWidth;
    const clickX = e.nativeEvent.offsetX; 
    const newProgress = Math.round((clickX / barWidth) * 100);

    setProgress(newProgress); 


    if (newProgress === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

 
    await updateProgress(newProgress);
  };


  const updateProgress = async (newProgress) => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ progress: newProgress }),
    });

    if (response.ok) {
      console.log('Progress updated!');
    }
  };

  // Function to delete workout
  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>

      {/* Progress Bar */}
      <div className="progress-bar-container" onClick={handleProgressClick}>
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor: progress === 100 ? '#1aac83' : '#1aac83',
          }}
        />
      </div>

      <p><strong>Progress:</strong> {progress}%</p>

      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Delete Button */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
