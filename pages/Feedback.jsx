import React, { useState } from 'react';

const FeedbackForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    department: '',
    wentWell: '',
    didntGoWell: '',
    challenges: '',
    lessons: '',
    shoutOuts: '',
    startDoing: '',
    stopDoing: '',
    continueDoing: '',
    ratings: {
      teamCollab: '1',
      crossTeamCollab: '1',
      workLifeBalance: '1',
      productivity: '1',
      motivation: '1',
      orgInput: '1',
      suggestions: ''
    },
    followUp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.ratings) {
      setForm({
        ...form,
        ratings: {
          ...form.ratings,
          [name]: value
        }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://feedback-9ahh.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Failed to submit feedback');

      const result = await response.json();
      alert("✅ Feedback submitted successfully!");

      setForm({
        fullName: '',
        department: '',
        wentWell: '',
        didntGoWell: '',
        challenges: '',
        lessons: '',
        shoutOuts: '',
        startDoing: '',
        stopDoing: '',
        continueDoing: '',
        ratings: {
          teamCollab: '1',
          crossTeamCollab: '1',
          workLifeBalance: '1',
          productivity: '1',
          motivation: '1',
          orgInput: '1',
          suggestions: ''
        },
        followUp: ''
      });

    } catch (error) {
      console.error(' Submission error:', error);
      alert("There was an error submitting your feedback. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Monthly Feedback Form</h2>

      <div className="space-y-4">
        {/* Text Inputs */}
        {[
          ['fullName', 'Full Name'],
          ['department', 'Department / Team'],
          ['wentWell', 'What went well this month?'],
          ['didntGoWell', "What didn't go well?"],
          ['challenges', 'Challenges or blockers'],
          ['lessons', 'What did you learn this month?'],
          ['shoutOuts', 'Shout outs / appreciation'],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              required={name !== 'shoutOuts'}
            />
          </div>
        ))}

        {/* Start/Stop/Continue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ['startDoing', 'Start Doing'],
            ['stopDoing', 'Stop Doing'],
            ['continueDoing', 'Continue Doing']
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Ratings */}
        <div>
          <h3 className="font-semibold text-lg mt-4 mb-2">Rate the following (1–5)</h3>
          {[
            ['teamCollab', 'Collaboration with Team'],
            ['crossTeamCollab', 'Collaboration Across Team'],
            ['workLifeBalance', 'Work-Life Balance'],
            ['productivity', 'Personal Productivity'],
            ['motivation', 'Motivation'],
            ['orgInput', 'Input at Organisation Level'],
          ].map(([key, label]) => (
            <div key={key} className="flex flex-col mb-2">
              <label className="font-medium mb-1">{label}</label>
              <select
                name={key}
                value={form.ratings[key]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div>
          <label className="block font-medium mb-1">Suggestions or ideas for improvement</label>
          <textarea
            name="suggestions"
            value={form.ratings.suggestions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        {/* Follow-up */}
        <div>
          <label className="block font-medium mb-1">Would you like a follow-up conversation?</label>
          <select
            name="followUp"
            value={form.followUp}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- Select an option --</option>
            <option value="Yes, please reach out">Yes, please reach out</option>
            <option value="No, I am good">No, I am good</option>
            <option value="Only if necessary">Only if necessary</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
