import React, { useState } from "react";

const FeedbackForm = () => {
  const initialForm = {
    fullName: "",
    department: "",
    wentWell: "",
    didntGoWell: "",
    challenges: "",
    lessons: "",
    shoutOuts: "",
    startDoing: "",
    stopDoing: "",
    continueDoing: "",
    suggestions: "",
    followUp: "",
    ratings: {
      teamCollab: "1",
      crossTeamCollab: "1",
      workLifeBalance: "1",
      productivity: "1",
      motivation: "1",
      orgInput: "1",
    },
  };

  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);

  const departments = [
    "Software Development",
    "Digital Marketing",
    "Accounting",
    "Data Analysis",
    "Design",
    "Cybersecurity",
    "Product Management",
    "Human Resources",
  ];

  const pages = [
    [
      ["fullName", "Full Name"],
      ["department", "Department / Team"],
      [
        "wentWell",
        "What went well this month? (Share your personal win, team win or anything)",
      ],
      ["didntGoWell", "What didn't go well or could have gone better?"],
    ],
    [
      ["challenges", "Share Challenges, blockers or areas for improvement"],
      ["lessons", "What did you learn this month?"],
      ["shoutOuts", "Any Shout outs / appreciation for team members"],
    ],
    [
      ["startDoing", "Start Doing"],
      ["stopDoing", "Stop Doing"],
      ["continueDoing", "Continue Doing"],
    ],
    [
      ["teamCollab", "Team Collaboration"],
      ["crossTeamCollab", "Cross-Team Collaboration"],
      ["workLifeBalance", "Work-Life Balance"],
      ["productivity", "Personal Productivity"],
      ["motivation", "Motivation"],
      ["orgInput", "Input at Organisation Level"],
      ["suggestions", "Suggestions or ideas for improvement"],
      ["followUp", "Would you like a follow-up conversation?"],
    ],
  ];

  const isRating = (name) => Object.keys(form.ratings).includes(name);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isRating(name)) {
      setForm({
        ...form,
        ratings: {
          ...form.ratings,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://feedback-9ahh.onrender.com/api/feedback",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) throw new Error("Failed to submit feedback");
      alert("✅ Feedback submitted successfully!");
      setForm(initialForm);
      setStep(0);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your feedback.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-blue-700 text-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Staff Monthly Feedback Form
      </h2>

      {step === 2 && (
        <p className="mb-2 font-semibold text-lg">
          Let's improve our workflow/culture, what should we:
        </p>
      )}

          {step === 3 && (
        <p className="mb-2 font-semibold text-lg">
          How would you rate the following? (1 - Poor, 5 - Excellent)
        </p>
      )}
      {pages[step].map(([name, label]) => (
        <div key={name}>
          <label className="block font-semibold mb-1">{label}</label>

          {name === "department" ? (
            <select
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 border border-white text-black rounded-md"
              required
            >
              <option value="">-- Select Department / Team --</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          ) : name === "followUp" ? (
            <select
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 border border-white text-black rounded-md"
              required
            >
              <option value="">-- Select an option --</option>
              <option value="Yes, please reach out">Yes, please reach out</option>
              <option value="No, I am good">No, I am good</option>
              <option value="Only if necessary">Only if necessary</option>
            </select>
          ) : isRating(name) ? (
            <select
              name={name}
              value={form.ratings[name]}
              onChange={handleChange}
              className="w-full p-2 border border-white text-black rounded-md"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          ) : (
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-white text-white rounded-md"
              required={name !== "shoutOuts"}
            />
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="bg-white text-blue-700 font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {step === pages.length - 1 ? (
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="bg-white text-blue-700 font-semibold py-2 px-4 rounded"
          >
            Next
          </button>
        )}
      </div>
    </form>
  );
};

export default FeedbackForm;
