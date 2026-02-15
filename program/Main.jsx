import React, { useState, useEffect } from "react";

function Main() {
  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (stopwatchRunning) {
      interval = setInterval(() => setStopwatchTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  // Digital Clock state
  const [clockTime, setClockTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setClockTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Color Picker state
  const [color, setColor] = useState("#000000");

  // To‑Do List state
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Stopwatch */}
      <div style={{ marginBottom: "30px" }}>
        <h2>⏱ Stopwatch</h2>
        <p>{stopwatchTime} seconds</p>
        <button onClick={() => setStopwatchRunning(true)}>Start</button>
        <button onClick={() => setStopwatchRunning(false)}>Stop</button>
        <button onClick={() => setStopwatchTime(0)}>Reset</button>
      </div>

      {/* Digital Clock */}
      <div style={{ marginBottom: "30px" }}>
        <h2>🕒 Digital Clock</h2>
        <p>{clockTime.toLocaleTimeString()}</p>
      </div>

      {/* Color Picker */}
      <div style={{ marginBottom: "30px" }}>
        <h2>🎨 Color Picker</h2>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <p>Selected Color: {color}</p>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: color,
            border: "1px solid #000",
          }}
        />
      </div>

      {/* To‑Do List */}
      <div>
        <h2>📝 To‑Do List</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}{" "}
              <button onClick={() => removeTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;